// The path, fs, util, readfileasync and writefileasync are imported
const path = require("path");
const fs = require("fs");
const util = require("util");
const readFileAsync = util.promisify(fs.readFile);
const writeFileAsync = util.promisify(fs.writeFile);

// Async function reads the db file and the response if the parsed notes
const getNotesFromDatabase = async (req, res) => {
  try {
    const notes = await readFileAsync("../db/db.json");
    res.json(JSON.parse(notes));

    // Catch/throw block catches any errors
  } catch (error) {
    throw error;
  }
};

// Exports getNotesFromDatabase
module.exports = getNotesFromDatabase;
