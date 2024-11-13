import { useState, useEffect } from 'react';

const ChatPage = () => {
  const [messages, setMessages] = useState([]);
  const [newMessage, setNewMessage] = useState('');
  const [socket, setSocket] = useState(null);

  useEffect(() => {
    // Initialize WebSocket connection
    const ws = new WebSocket('ws://localhost:8080'); // Update with actual WebSocket server URL
    setSocket(ws);

    ws.onmessage = (event) => {
      const message = JSON.parse(event.data);
      setMessages((prev) => [...prev, message]);
    };

    ws.onclose = () => {
      console.log('WebSocket disconnected');
    };

    return () => ws.close();
  }, []);

  const sendMessage = () => {
    if (socket && newMessage.trim()) {
      const messageData = {
        user: 'User', // Replace with actual user data
        text: newMessage,
        timestamp: new Date().toISOString(),
      };
      socket.send(JSON.stringify(messageData));
      setMessages((prev) => [...prev, messageData]);
      setNewMessage('');
    }
  };

  return (
    <section className="container mx-auto py-6 px-4">
      <h1 className="text-3xl font-bold mb-6">Chat</h1>
      <div className="bg-white p-6 rounded-lg shadow-md max-w-md mx-auto">
        <div className="mb-4">
          <ul className="overflow-y-auto max-h-64">
            {messages.map((msg, index) => (
              <li key={index} className="p-2 mb-2 border-b">
                <strong>{msg.user}: </strong>
                <span>{msg.text}</span>
              </li>
            ))}
          </ul>
        </div>
        <div className="flex">
          <input
            type="text"
            value={newMessage}
            onChange={(e) => setNewMessage(e.target.value)}
            className="border p-2 flex-grow rounded-l"
            placeholder="Type a message..."
          />
          <button onClick={sendMessage} className="bg-indigo-500 text-white p-2 rounded-r">
            Send
          </button>
        </div>
      </div>
    </section>
  );
};

export default ChatPage;
