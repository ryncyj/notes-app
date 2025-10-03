import express from "express";
import notesRouter from "./routes/note.js";
import cors from "cors";

const app = express();
const PORT = 5000;

app.use(cors({
  origin: "http://localhost:5173"
}));

app.use(express.json());

// Root endpoint
app.get("/", (req, res) => {
  res.json({ success: true, message: "Working fine" });
});

// Notes CRUD
app.use("/note", notesRouter);

app.listen(PORT, () => {
  console.log(`Server running at http://localhost:${PORT}`);
});
