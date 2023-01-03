import React, { useState } from "react";

function App() {
  const [input, setInput] = useState("");
  const [chatLog, setChatLog] = useState([]);

  const handleSubmit = async () => {
    let newChatLog = [...chatLog, { user: "me", message: input.trim("") }];
    await setChatLog(newChatLog);
    console.log({ newChatLog });
    setInput("");
    const response = await fetch("http://localhost:5000/", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        message: newChatLog.map((message) => message.message).join("\n"),
      }),
    });
    const data = await response.json();
    console.log(data);
    await setChatLog([
      ...newChatLog,
      { user: "gpt", message: `${data.message}` },
    ]);
  };

  return (
    <main>
      <section>
        {chatLog.map((item, index) => (
          <div key={index}>
            <h3>{item.user}</h3>
            <span>{item.message}</span>
          </div>
        ))}
      </section>
      <section>
        <input
          type="text"
          value={input}
          onChange={(e) => setInput(e.target.value)}
        ></input>
        <button onClick={handleSubmit}>Submit</button>
      </section>
    </main>
  );
}

export default App;
