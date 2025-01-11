import "./styles.css";
import Input from "./components/Input";
import ListItem from "./components/ListItem";
import { useState } from "react";
import axios from "axios";

export default function App() {
  const [taskInput, setTaskInput] = useState("");
  const [tasks, setTasks] = useState([]);
  const [completedTasks, setCompletedTasks] = useState([]);

  const handleTaskInput = (str) => {
    setTaskInput(str);
  };

  const addTask = () => {
    if (taskInput.trim() !== "") {
      axios
        .post("https://t6fvk2.csb.app/tasks", { text: taskInput })
        .then((response) => {
          setTasks([...tasks, response.data]);
          setTaskInput("");
        })
        .catch((error) => console.error("Error adding task:", error));
    }
  };

  const handleDelete = (index) => {
    axios
      .delete(`https://t6fvk2.csb.app/tasks`)
      .then(() => {
        setTasks(tasks.filter((task) => task.id !== id));
      })
      .catch((error) => console.error("Error deleting task:", error));
    setTasks(completedTasks);
  };

  const moveToCompleted = (index, isCompletedList) => {
    if (isCompletedList) {
      const taskToRevert = completedTasks[index];
      setCompletedTasks(completedTasks.filter((_, i) => i !== index));
      setTasks([...tasks, taskToRevert]);
    } else {
      const taskToMove = tasks[index];
      setTasks(tasks.filter((_, i) => i !== index));
      setCompletedTasks([...completedTasks, taskToMove]);
    }
  };

  return (
    <div className="App">
      <h1>A Simple ToDo List App</h1>
      <div className="headp">
        <Input
          taskInput={taskInput}
          handleTaskInput={handleTaskInput}
          addTask={addTask}
          className="labeloftask"
        />
      </div>

      <h1>Added Tasks</h1>
      <div class="addtask">
        <ListItem
          tasks={tasks}
          handleDelete={handleDelete}
          moveToCompleted={moveToCompleted}
          isCompletedList={false}
        />
      </div>
      <h1>Completed Tasks</h1>
      <div class="completedtask">
        <ListItem
          tasks={completedTasks}
          moveToCompleted={moveToCompleted}
          isCompletedList={true}
        />
      </div>
    </div>
  );
}
