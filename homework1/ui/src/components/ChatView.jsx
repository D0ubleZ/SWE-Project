import React, { useState } from "react";
import ReactDOM from "react-dom/client";
import ChatHistory from "./ChatHistory";
import LogoutButton from "./LogoutButton";

const ChatView = () => {
  const [input, setInput] = useState("");
  const [output, setOutput] = useState("");
  const [history, setHistory] = useState([]);

  // TODO: load the chat history for the user and render it on the page
  let container = null;

  document.addEventListener('DOMContentLoaded', function(event) {
    event.preventDefault();

    const username = localStorage.getItem("username");
    fetch("http://127.0.0.1:5000/chat_history", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        'Accept': 'application/json'
      },
      body: JSON.stringify({
        username
      })
    })
      .then((res) => {
        if (!res.ok) {
          console.error('Response not OK:', res.status, res.statusText);
          throw new Error(res.statusText);
        }
        return res.json();
      })
      .then((data) => {
        if (data.error) {
          console.log(data.error);
        } else {
          const response = data.response
          setHistory([...history, { username, response }]);
        }
      })
      .catch((err) => {
        console.error(err);
      });
    

    if (!container) {
      container = document.getElementById('root1');
      const root = ReactDOM.createRoot(container)
      root.render(
        <ul className="history-list">
          {history.map((item, index) => (
            <li key={index}>
              <div className="history-item">
                <div className="history-input">{item.input}</div>
                <div className="history-output">{item.output}</div>
              </div>
            </li>
          ))}
        </ul>);
    }
  });

  const handleInputChange = (event) => {
    setInput(event.target.value);
  };

  const handleSubmit = (event) => {
    event.preventDefault();
    // TODO: Send the input to an API to get the response from AI
    const username = localStorage.getItem("username");
    fetch("http://127.0.0.1:5000/chat", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        'Accept': 'application/json'
      },
      body: JSON.stringify({
        input,
        username
      })
    })
      .then((res) => {
        if (!res.ok) {
          console.error('Response not OK:', res.status, res.statusText);
          throw new Error(res.statusText);
        }
        return res.json();
      })
      .then((data) => {
        if (data.error) {
          console.log(data.error);
        } else {
          setOutput(data.response);
        }
      })
      .catch((err) => {
        console.error(err);
      });
    setInput(input);
    setHistory([...history, { input, output }]);
  };

  return (
    <div className="chat-view">
      <div id="root"></div>
      <div className="left-panel">
        <ChatHistory history={history} />
        <LogoutButton></LogoutButton>
      </div>
      <div className="right-panel">
        <form onSubmit={handleSubmit}>
          <input
            type="text"
            placeholder="Ask something..."
            value={input}
            onChange={handleInputChange}
          />
          <button type="submit">Submit</button>
        </form>
        <div className="output">{output}</div>
      </div>
    </div>
  );
};

export default ChatView;
