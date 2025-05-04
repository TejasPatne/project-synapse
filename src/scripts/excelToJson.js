import XLSX from "xlsx";
import fs from "fs";
import axios from "axios";
import path from "path";
import { fileURLToPath } from "url";
import { dirname } from "path";

const __dirname = dirname(fileURLToPath(import.meta.url));

// Google Sheet will go here
const excelUrls = {
  "2023-24":
    "https://docs.google.com/spreadsheets/d/1J1l2kgFThQbZEfVpVGgsP2dsU_xX46bWgzz9it7qMDw/export?format=xlsx",
  "2024-25":
    "https://docs.google.com/spreadsheets/d/1Ru8gJX435uWEUgyiCefIT-yBX9IORlG_kioHpNQJ-fY/export?format=xlsx",
};

async function downloadFile(url, destination) {
  const response = await axios.get(url, { responseType: "arraybuffer" });
  fs.writeFileSync(destination, Buffer.from(response.data, "binary"));
}

function excelToJson(excelFile) {
  const workbook = XLSX.readFile(excelFile);
  const sheetName = workbook.SheetNames[0];
  const worksheet = workbook.Sheets[sheetName];

  const jsonData = XLSX.utils.sheet_to_json(worksheet, {
    raw: true,
    header: 2,
    defval: null,
    blankrows: false,
  });

  const nonEmptyRows = jsonData.filter((row) => {
    return !Object.keys(row).every(
      (key) =>
        key === "__EMPTY" ||
        row[key] === null ||
        row[key] === undefined ||
        row[key] === ""
    );
  });

  const nonEmptyColumns = new Set();
  nonEmptyRows.forEach((row) =>
    Object.keys(row).forEach(
      (column) => row[column] !== null && nonEmptyColumns.add(column)
    )
  );

  return nonEmptyRows.map((row) => {
    const newRow = {};
    nonEmptyColumns.forEach((column) => {
      newRow[column] = row[column];
    });
    return newRow;
  });
}

async function processAllFiles(urlMap, outputJsonPath) {
  const dbFolder = path.dirname(outputJsonPath);
  if (!fs.existsSync(dbFolder)) {
    fs.mkdirSync(dbFolder, { recursive: true });
  }

  const finalOutput = {};

  for (const [year, url] of Object.entries(urlMap)) {
    const excelFile = path.join(__dirname, "..", "db", `${year}.xlsx`);

    try {
      await downloadFile(url, excelFile);
      console.log(`Downloaded ${year} Excel file.`);

      const jsonData = excelToJson(excelFile);
      finalOutput[year] = jsonData;

      fs.unlinkSync(excelFile);
      console.log(`Deleted ${year}.xlsx`);
    } catch (err) {
      console.error(`Error processing ${year}:`, err);
    }
  }

  fs.writeFileSync(outputJsonPath, JSON.stringify(finalOutput, null, 4));
  console.log("Final JSON written to", outputJsonPath);
}

// Run the processing
const jsonFile = path.join(__dirname, "..", "db", "output.json");
processAllFiles(excelUrls, jsonFile);
