const express = require("express");
const cors = require("cors");

const app = express();
app.use(cors());
app.use(express.json());

let tasks = [];
let nextId = 1;

app.get("/tasks", (req, res) => {
  res.json(tasks);
});

app.post("/tasks", (req, res) => {
  const newTask = {
    id: nextId++,
    text: req.body.text,
    completed: false,
  };
  tasks.push(newTask);
  res.json(newTask);
});

app.delete("/tasks/:id", (req, res) => {
  const { id } = req.params;
  tasks = tasks.filter((task) => task.id !== parseInt(id));
  res.json({ message: "Task deleted" });
});

app.put("/tasks/:id", (req, res) => {
  const { id } = req.params;
  const { completed } = req.body;

  tasks = tasks.map((task) =>
    task.id === parseInt(id) ? { ...task, completed } : task
  );

  res.json(tasks.find((task) => task.id === parseInt(id)));
});

// Start the server
const PORT = 5000;
app.listen(PORT, () => {
  console.log(`Server running at http://localhost:${PORT}`);
});
