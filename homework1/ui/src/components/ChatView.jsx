import React, { useState } from "react";
import ReactDOM from "react-dom/client";
import ChatHistory from "./ChatHistory";
import LogoutButton from "./LogoutButton";

const ChatView = () => {
  const [input, setInput] = useState("");
  const [output, setOutput] = useState("");
  const [history, setHistory] = useState([]);

  let username = localStorage.getItem("username")

  // TODO: load the chat history for the user and render it on the page
  useEffect(() => {
    fetch(`http://127.0.0.1:4444/chat_history?username=${username}`)
   .then(response => response.json())
   .then(data => {
     if (data !== undefined && data.length > 0) {
       setHistory(data)
     }
   })
   .catch(error => console.error(error));
 }, [])

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
        setOutput(data.answer);
        setInput(input);
        setHistory([...history, { input, output }]);
      })
      .catch((err) => {
        console.error(err);
      });  
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
