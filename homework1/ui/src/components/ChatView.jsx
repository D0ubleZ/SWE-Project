import React, { useState } from "react";
import { render } from "react-dom";
import ChatHistory from "./ChatHistory";
import LogoutButton from "./LogoutButton";

const ChatView = () => {
  const [input, setInput] = useState("");
  const [output, setOutput] = useState("");
  const [history, setHistory] = useState([]);

  var ReactDOM = require('react-dom');
  // TODO: load the chat history for the user and render it on the page
  ReactDOM.render(
    <ul className="history-list">
      {history.map((item, index) => (
        <li key={index}>
          <div className="history-item">
            <div className="history-input">{item.input}</div>
            <div className="history-output">{item.output}</div>
          </div>
        </li>
      ))}
    </ul>, 
  document.getElementById('root'));

  const handleInputChange = (event) => {
    setInput(event.target.value);
  };

  const handleSubmit = (event) => {
    event.preventDefault();
    // TODO: Send the input to an API to get the response from AI

    setOutput("AI's response");
    setHistory([...history, { input, output }]);
    setInput("");
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
