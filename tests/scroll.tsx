import React, {useEffect, useRef, useState} from "react";
import ReactDOM from "react-dom";
import uuid from "uuid";

function Scroll() {
  const [messages, setMessages] = useState([]);

  const addMessages = () => {
    setMessages(m => [...m, uuid()]);
  };

  const messagesEndRef = useRef(null);

  const scrollToBottom = () => {
    console.log(messagesEndRef.current)
    messagesEndRef.current.scrollIntoView({behavior: "smooth"});
  };

  useEffect(scrollToBottom, [messages]);
  return (
    <div className="App">
      <button className="addButton" onClick={addMessages}>
        Add message
      </button>
      <div style={{
        display: "flex",
        flexDirection: "column",
        height: "100px",
        overflow: "scroll",
        marginTop: "30px",
        border: "1px solid #000"
      }}>
        {messages.map(message => (
          <span key={message}>{message}</span>
        ))}
        <div ref={messagesEndRef}/>
      </div>
    </div>
  );
}

const rootElement = document.getElementById("root");
ReactDOM.render(<Scroll/>, rootElement);