import { useState, useEffect } from "react";
import axios from "axios";
import "./App.css";

function App() {
  const [enteredvalue, setevalue] = useState("");
  const [quests, setQuests] = useState([]);

  useEffect(() => {
    axios
      .get("http://localhost:5000/questslist")
      .then((res) => setQuests(res.data))
      .catch((err) => console.error(err));
  }, []);

  function handlevalue(event) {
    setevalue(event.target.value);
  }

  function add() {
    if (!enteredvalue.trim()) return;

    axios.post("http://localhost:5000/addquests", { newquests: enteredvalue });
    setQuests([...quests, { name: enteredvalue }]);
    setevalue("");
  }
function removeAll() {
    axios
      .delete("http://localhost:5000/removeall") // Backend endpoint to delete all tasks
      .then(() => {
        setQuests([]); // Clear frontend state
        setevalue(""); // Clear input
      })
      .catch((err) => console.error("Failed to delete tasks:", err));
  }
  return (
    <div className="app-container">
      <h1 className="title">Questify</h1>

      <div className="input-group">
        <input
          className="quest-input"
          placeholder="Add a new task..."
          value={enteredvalue}
          onChange={handlevalue}
        />
        <button className="add-button" onClick={add}>
          Add
        </button>
            <button className="remove-button" onClick={removeAll}>
    Remove All
      </button>
      </div>

      <div className="quest-list">
        {quests.map((item, index) => (
          <div className="quest-item fade" key={index}>
            <span>{item.name}</span>
          </div>
        ))}
      </div>
    </div>
  );
}

export default App;


