const express = require("express");
const { v4: uuidv4 } = require("uuid");
const fs = require("fs");
const cors = require("cors");
const {
  getNotesFromHTML,
  getIndexHTML,
} = require("./controllers/htmlController");
const getNotesFromDatabase = require("./controllers/apiController");

const util = require("util");
const readFileAsync = util.promisify(fs.readFile);
const writeFileAsync = util.promisify(fs.writeFile);

// const js = require("index.js");

// const { htmlRoutes } = require("./src/routes/htmlRoutes");
const app = express();
const PORT = process.env.PORT || 3000;

app.use(express.json());
app.use(cors());
app.use(express.static("public"));
app.use(express.urlencoded({ extended: true }));

app.get("/", getIndexHTML);
app.get("/notes", getNotesFromHTML);
// app.use("/api", apiRoutes);
// app.use("/", htmlRoutes);

app.get("/api/notes", async (req, res) => {
  try {
    const notes = await readFileAsync("./db/db.json", "utf-8");
    res.json(JSON.parse(notes));
  } catch (error) {
    throw error;
  }
});

app.post("/api/notes", async (req, res) => {
  console.log("hello from api notes");
  try {
    const notes = await readFileAsync("./db/db.json", "utf-8");
    const newNote = req.body;
    const newNoteID = uuidv4();
    const newNoteData = {
      id: newNoteID,
      title: newNote.title,
      text: newNote.text,
    };
    const parseNotes = JSON.parse(notes);
    parseNotes.push(newNoteData);
    res.json(newNoteData);

    await writeFileAsync("./db/db.json", JSON.stringify(parseNotes));

    // res.json(JSON.parse(notes));
  } catch (error) {
    throw error;
  }
});

app.listen(PORT, () => {
  console.log(`Note taker app listening at http://localhost:${PORT}`);
});
