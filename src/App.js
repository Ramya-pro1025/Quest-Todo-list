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

  return (
    <div className="app-container">
      <h1 className="title">📝 My Stylish To-Do List</h1>

      <div className="input-group">
        <input
          className="quest-input"
          placeholder="Add a new task..."
          value={enteredvalue}
          onChange={handlevalue}
        />
        <button className="add-button" onClick={add}>
          ➕ Add
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


