const { Router } = require("express");
const js = require("./index.js");

const router = Router();

router.get(
  "/" //unsure of function to go here//)
);

router.get("/notes", getAndRenderNotes);

module.exports = router;
