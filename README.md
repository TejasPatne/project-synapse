# Project Synapse

## Instructions

To update every year, follow these steps:

1. **Add the Year**: Update the `excelUrls` in the `scripts/excelToJson.js` file with the appropriate year. For example, for the 2025-26 year, add the URL of the Google Sheet under the corresponding year key.

2. **Google Sheet Template**: The Google Sheets document must strictly follow the provided template:
   [Google Sheet Template](https://docs.google.com/spreadsheets/d/1pGHCFBT3SH4mmhVEBfLZh3WzbQiwsvHWOhTk8E9BHd8/edit?usp=sharing). 
   
   **Important**:
   - The sheet should **NOT** contain any hyperlinks.
   - Ensure the data structure in the sheet matches the template exactly.
   - YouTube video links should be in the format of `https://www.youtube.com/embed/<video_id>`

3. **Updating the URL**: After adding the Google Sheet link for the desired year, the `excelUrls` in the `scripts/excelToJson.js` should look like this:

   ```js
   const excelUrls = {
     "2023-24": "https://docs.google.com/spreadsheets/d/1J1l2kgFThQbZEfVpVGgsP2dsU_xX46bWgzz9it7qMDw/export?format=xlsx",
     "2024-25": "https://docs.google.com/spreadsheets/d/1Ru8gJX435uWEUgyiCefIT-yBX9IORlG_kioHpNQJ-fY/export?format=xlsx",
     "2025-26": "sheet link will go here",
   };
