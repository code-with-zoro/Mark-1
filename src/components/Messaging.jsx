import { useState } from 'react';
import { FiSearch, FiSend, FiPaperclip } from 'react-icons/fi';

const Messaging = () => {
  const [activeChat, setActiveChat] = useState(0);
  const [message, setMessage] = useState('');

  // Mock data - no backend needed
  const mockChats = [
    {
      id: 1,
      user: {
        name: "Priya (CSE)",
        avatar: "https://i.pravatar.cc/150?img=5",
        status: "Online",
        distance: "2km away"
      },
      messages: [
        { text: "Hey, did you finish the ML assignment?", sent: true, time: "10:30 AM" },
        { text: "Almost done! Need help with Q3?", sent: false, time: "10:32 AM" }
      ]
    },
    {
      id: 2,
      user: {
        name: "Rahul (CA)",
        avatar: "https://i.pravatar.cc/150?img=7",
        status: "Offline",
        distance: "5km away"
      },
      messages: [
        { text: "Let's study for exams together!", sent: false, time: "Yesterday" }
      ]
    }
  ];

  const handleSendMessage = () => {
    if (message.trim()) {
      const newMessage = {
        text: message,
        sent: true,
        time: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })
      };
      mockChats[activeChat].messages.push(newMessage);
      setMessage('');
    }
  };

  return (
    <div className="flex h-[calc(100vh-80px)] bg-white rounded-xl shadow-sm overflow-hidden">
      {/* Sidebar */}
      <div className="w-1/3 border-r border-gray-200">
        <div className="p-4 border-b border-gray-200">
          <h2 className="text-xl font-bold text-gray-800">Messages</h2>
          <div className="relative mt-4">
            <FiSearch className="absolute left-3 top-3 text-gray-400" />
            <input
              type="text"
              placeholder="Search chats..."
              className="w-full pl-10 pr-4 py-2 bg-gray-100 rounded-lg focus:outline-none"
            />
          </div>
        </div>
        <div className="overflow-y-auto h-[calc(100%-80px)]">
          {mockChats.map((chat, index) => (
            <div
              key={chat.id}
              onClick={() => setActiveChat(index)}
              className={`flex items-center p-4 border-b border-gray-100 cursor-pointer hover:bg-gray-50 ${
                activeChat === index ? 'bg-green-50' : ''
              }`}
            >
              <img
                src={chat.user.avatar}
                alt={chat.user.name}
                className="w-12 h-12 rounded-full mr-3"
              />
              <div>
                <h3 className="font-medium">{chat.user.name}</h3>
                <p className="text-sm text-gray-500 truncate max-w-[180px]">
                  {chat.messages[chat.messages.length - 1]?.text}
                </p>
              </div>
              <span className="ml-auto text-xs text-gray-400">
                {chat.messages[chat.messages.length - 1]?.time}
              </span>
            </div>
          ))}
        </div>
      </div>

      {/* Chat Area */}
      <div className="flex-1 flex flex-col">
        {/* Chat Header */}
        <div className="p-4 border-b border-gray-200 flex items-center">
          <img
            src={mockChats[activeChat].user.avatar}
            alt={mockChats[activeChat].user.name}
            className="w-10 h-10 rounded-full mr-3"
          />
          <div>
            <h3 className="font-medium">{mockChats[activeChat].user.name}</h3>
            <p className="text-xs text-gray-500">
              {mockChats[activeChat].user.status} • {mockChats[activeChat].user.distance}
            </p>
          </div>
        </div>

        {/* Messages */}
        <div className="flex-1 p-4 overflow-y-auto bg-gray-50">
          {mockChats[activeChat].messages.map((msg, i) => (
            <div
              key={i}
              className={`mb-4 flex ${msg.sent ? 'justify-end' : 'justify-start'}`}
            >
              <div
                className={`max-w-[70%] p-3 rounded-lg ${
                  msg.sent
                    ? 'bg-green-500 text-white rounded-br-none'
                    : 'bg-white border border-gray-200 rounded-bl-none'
                }`}
              >
                <p>{msg.text}</p>
                <p className="text-xs mt-1 opacity-80 text-right">
                  {msg.time}
                </p>
              </div>
            </div>
          ))}
        </div>

        {/* Message Input */}
        <div className="p-4 border-t border-gray-200 flex items-center">
          <button className="p-2 text-gray-500 hover:text-gray-700">
            <FiPaperclip size={20} />
          </button>
          <input
            type="text"
            value={message}
            onChange={(e) => setMessage(e.target.value)}
            placeholder="Type a message..."
            className="flex-1 mx-4 p-2 border border-gray-200 rounded-lg focus:outline-none focus:border-green-500"
            onKeyPress={(e) => e.key === 'Enter' && handleSendMessage()}
          />
          <button
            onClick={handleSendMessage}
            className="p-2 bg-green-500 text-white rounded-lg hover:bg-green-600"
          >
            <FiSend size={20} />
          </button>
        </div>
      </div>
    </div>
  );
};

export default Messaging;