import { useState } from "react";

const Chatbot = () => {
  const [messages, setMessages] = useState([]);
  const [input, setInput] = useState("");
  const [urlIndex, setUrlIndex] = useState(0); // Default URL index

  const sendMessage = async () => {
    if (!input.trim()) return;

    // Send POST request to your backend
    const response = await fetch("https://python-chatbot-searcher.onrender.com/chat", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ message: input, url_index: urlIndex }),
    });

    const data = await response.json();

    setMessages([...messages, { user: input, bot: data.response }]);
    setInput("");
  };

  return (
    <div className="p-4 max-w-lg mx-auto">
      <h1 className="text-2xl font-bold mb-4">Chatbot</h1>
      <div className="border p-4 rounded mb-4">
        {messages.map((msg, idx) => (
          <div key={idx} className="mb-2">
            <p><strong>User:</strong> {msg.user}</p>
            <p><strong>Bot:</strong> {msg.bot}</p>
          </div>
        ))}
      </div>
      <input
        type="text"
        placeholder="Type your message..."
        className="border p-2 rounded w-full mb-2"
        value={input}
        onChange={(e) => setInput(e.target.value)}
      />
      <select
        value={urlIndex}
        onChange={(e) => setUrlIndex(parseInt(e.target.value))}
        className="border p-2 rounded w-full mb-2"
      >
        <option value={0}>First URL</option>
        <option value={1}>Second URL</option>
        <option value={2}>Third URL</option>
      </select>
      <button
        onClick={sendMessage}
        className="bg-blue-500 text-white px-4 py-2 rounded"
      >
        Send
      </button>
    </div>
  );
};

export default Chatbot;
