import express from "express";
import db from "../db.js";

const router = express.Router();

// create
router.post("/", (req, res) => {
  const { title, content } = req.body;
  db.run("INSERT INTO notes (title, content) VALUES (?, ?)", [title, content], function (err) {
    if (err) return res.status(500).json({ error: err.message });
    res.status(201).json({ id: this.lastID, title, content });
  });
});

// retrieve all
router.get("/", (req, res) => {
  db.all("SELECT * FROM notes ORDER BY created_at DESC", [], (err, rows) => {
    if (err) return res.status(500).json({ error: err.message });
    res.json(rows);
  });
});

// retrieve single
router.get("/:id", (req, res) => {
  db.get("SELECT * FROM notes WHERE id = ?", [req.params.id], (err, row) => {
    if (err) return res.status(500).json({ error: err.message });
    if (!row) return res.status(404).json({ error: "Note not found" });
    res.json(row);
  });
});

// update (PUT)
router.put("/:id", (req, res) => {
  const { title, content } = req.body;

  if (title === undefined || content === undefined) {
    return res.status(400).json({ error: "Title and content are required" });
  }

  const query = `UPDATE notes SET title = ?, content = ? WHERE id = ?`;
  const values = [title, content, req.params.id];

  db.run(query, values, function (err) {
    if (err) return res.status(500).json({ error: err.message });
    if (this.changes === 0) return res.status(404).json({ error: "Note not found" });

    res.json({ id: req.params.id, title, content });
  });
});

// delete
router.delete("/:id", (req, res) => {
  db.run("DELETE FROM notes WHERE id = ?", [req.params.id], function (err) {
    if (err) return res.status(500).json({ error: err.message });
    if (this.changes === 0) return res.status(404).json({ error: "Note not found" });
    res.json({ message: "Note deleted" });
  });
});

export default router;
