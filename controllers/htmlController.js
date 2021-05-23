// The path is imported
const path = require("path");

// Function returns the index file via the file path
const getIndexHTML = (req, res) => {
  filePath = path.join(__dirname, "../public", "index.html");
  res.sendFile(filePath);
  return filePath;
};

// Function returns the file path from the public folder
const getNotesFromHTML = (req, res) => {
  filePath = path.join(__dirname, "../public", "notes.html");
  res.sendFile(filePath);
  return filePath;
};

// Both functions are exported
module.exports = {
  getNotesFromHTML,
  getIndexHTML,
};
