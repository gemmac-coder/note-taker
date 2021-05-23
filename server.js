// Importing required packages and frameworks
const express = require("express");
const { v4: uuidv4 } = require("uuid");
const fs = require("fs");
const cors = require("cors");

// Requiring controller files
const {
  getNotesFromHTML,
  getIndexHTML,
} = require("./controllers/htmlController");
const getNotesFromDatabase = require("./controllers/apiController");

const util = require("util");

// Using fs to read the file and util to promisify
const readFileAsync = util.promisify(fs.readFile);

// Using fs to write the file and util to promisify
const writeFileAsync = util.promisify(fs.writeFile);

const app = express();

// Declaring the required port
const PORT = process.env.PORT || 3000;

// Declaring which packages the app will use
app.use(express.json());
app.use(cors());
app.use(express.static("public"));
app.use(express.urlencoded({ extended: true }));

// The "/" home page route requires the getIndexHTML function
app.get("/", getIndexHTML);

// The "/notes"route requires the getNotesFromHTML function
app.get("/notes", getNotesFromHTML);

// Async get function which will retrieve the saved notes by reading the database file
app.get("/api/notes", async (req, res) => {
  // Try/catch block in place to reveal any errors
  try {
    const notes = await readFileAsync("./db/db.json", "utf-8");
    res.json(JSON.parse(notes));
  } catch (error) {
    throw error;
  }
});

// Async post function which will allow notes to be saved by writing to the database file
app.post("/api/notes", async (req, res) => {
  // Try/catch block in place to handle any errors
  try {
    const notes = await readFileAsync("./db/db.json", "utf-8");
    const newNote = req.body;
    // A unique id is generated from uuid for every new note
    const newNoteID = uuidv4();
    const newNoteData = {
      // The new note object includes an id, a title and some descriptive text
      id: newNoteID,
      title: newNote.title,
      text: newNote.text,
    };
    const parseNotes = JSON.parse(notes);
    // The parsed notes are pushed into the new note data array
    parseNotes.push(newNoteData);
    res.json(newNoteData);

    // Function writes the parse notes to the db file
    await writeFileAsync("./db/db.json", JSON.stringify(parseNotes));
    // Catch/throw block throws any errors
  } catch (error) {
    throw error;
  }
});

// The app is listening to the specified port
app.listen(PORT, () => {
  console.log(`Note taker app listening at http://localhost:${PORT}`);
});
