const path = require("path");

const getIndexHTML = (req, res) => {
  filePath = path.join(__dirname, "../public", "index.html");
  res.sendFile(filePath);
  return filePath;
};

const getNotesFromHTML = (req, res) => {
  filePath = path.join(__dirname, "../public", "notes.html");
  res.sendFile(filePath);
  return filePath;
};

module.exports = {
  getNotesFromHTML,
  getIndexHTML,
};
