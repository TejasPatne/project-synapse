import XLSX from 'xlsx';
import fs from 'fs';
import axios from 'axios';
import path from 'path';
import { fileURLToPath } from 'url';
import { dirname } from 'path';

// Get the directory name of the current module
const __dirname = dirname(fileURLToPath(import.meta.url));

async function downloadFile(url, destination) {
    const response = await axios.get(url, { responseType: 'arraybuffer' });
    fs.writeFileSync(destination, Buffer.from(response.data, 'binary'));
}

function excelToJson(excelFile, jsonFile) {
    // Read Excel file
    const workbook = XLSX.readFile(excelFile);
    const sheetName = workbook.SheetNames[0];
    const worksheet = workbook.Sheets[sheetName];

    // Convert Excel data to JSON
    const jsonData = XLSX.utils.sheet_to_json(worksheet, {
        raw: true,
        header: 2, // Use the first row as headers
        defval: null, // Treat blank cells as null values
        blankrows: false, // Skip blank rows
    });

    // Filter out rows where all column values are null
    const nonEmptyRows = jsonData.filter(row => {
        return !Object.keys(row).every(key => {
            return key === "__EMPTY" || row[key] === null || row[key] === undefined || row[key] === '';
        });
    });

    // Identify non-empty columns
    const nonEmptyColumns = new Set();
    nonEmptyRows.forEach(row => Object.keys(row).forEach(column => row[column] !== null && nonEmptyColumns.add(column)));

    // Generate JSON data with non-empty columns
    const jsonDataWithNonEmptyColumns = nonEmptyRows.map(row => {
        const newRow = {};
        nonEmptyColumns.forEach(column => {
            newRow[column] = row[column];
        });
        return newRow;
    });

    // Ensure the directory exists
    const outputDir = path.dirname(jsonFile);
    if (!fs.existsSync(outputDir)) {
        fs.mkdirSync(outputDir, { recursive: true });
    }

    // Write JSON to file
    fs.writeFileSync(jsonFile, JSON.stringify(jsonDataWithNonEmptyColumns, null, 4));
}

// Usage
const excelUrl = 'https://docs.google.com/spreadsheets/d/1J1l2kgFThQbZEfVpVGgsP2dsU_xX46bWgzz9it7qMDw/edit?usp=sharing'; // Direct link to the Excel file
const excelFile = path.join(__dirname, '..', 'db', 'test.xlsx'); // Destination to save the Excel file
const jsonFile = path.join(__dirname, '..', 'db', 'output.json');

// Ensure the `db` folder exists in the `src` folder
const dbFolder = path.join(__dirname, '..', 'db');
if (!fs.existsSync(dbFolder)) {
    fs.mkdirSync(dbFolder, { recursive: true });
}

downloadFile(excelUrl, excelFile)
    .then(() => {
        console.log('Excel file downloaded successfully.');
        excelToJson(excelFile, jsonFile);
        console.log('JSON file created successfully.');
    })
    .catch(error => console.error('Error downloading Excel file:', error));
