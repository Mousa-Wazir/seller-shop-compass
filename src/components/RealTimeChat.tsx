
import { useState } from "react";
import { MessageSquare, Send, User, Package, Clock } from "lucide-react";

const RealTimeChat = () => {
  const [chatThreads] = useState([
    {
      id: 1,
      productName: "MacBook Pro 16-inch",
      productImage: "https://images.unsplash.com/photo-1517336714731-489689fd1ca8?w=400",
      customerName: "John Smith",
      customerAvatar: "https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=400",
      lastMessage: "Hi! I'm interested in renting this MacBook. Is it still available?",
      lastMessageTime: "2024-06-10T14:30:00",
      unreadCount: 2,
      messages: [
        {
          id: 1,
          sender: "customer",
          text: "Hi! I'm interested in your product MacBook Pro 16-inch.",
          timestamp: "2024-06-10T14:20:00"
        },
        {
          id: 2,
          sender: "customer",
          text: "Is it still available for rent?",
          timestamp: "2024-06-10T14:30:00"
        }
      ]
    },
    {
      id: 2,
      productName: "Canon EOS R Camera",
      productImage: "https://images.unsplash.com/photo-1606983340126-99ab4feaa64a?w=400",
      customerName: "Sarah Johnson",
      customerAvatar: "https://images.unsplash.com/photo-1494790108755-2616b332c3f4?w=400",
      lastMessage: "Thank you! The camera works perfectly.",
      lastMessageTime: "2024-06-09T16:45:00",
      unreadCount: 0,
      messages: [
        {
          id: 1,
          sender: "customer",
          text: "Hi! I'm interested in your product Canon EOS R Camera.",
          timestamp: "2024-06-09T10:00:00"
        },
        {
          id: 2,
          sender: "seller",
          text: "Hello! Yes, it's available. When would you like to rent it?",
          timestamp: "2024-06-09T10:15:00"
        },
        {
          id: 3,
          sender: "customer",
          text: "I'd like to rent it for this weekend. Is that possible?",
          timestamp: "2024-06-09T10:20:00"
        },
        {
          id: 4,
          sender: "seller",
          text: "Absolutely! I'll send you the rental details.",
          timestamp: "2024-06-09T10:25:00"
        },
        {
          id: 5,
          sender: "customer",
          text: "Thank you! The camera works perfectly.",
          timestamp: "2024-06-09T16:45:00"
        }
      ]
    },
    {
      id: 3,
      productName: "Professional Tripod",
      productImage: "https://images.unsplash.com/photo-1606918801925-e2c914c4b503?w=400",
      customerName: "Mike Chen",
      customerAvatar: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=400",
      lastMessage: "What's the rental price for a week?",
      lastMessageTime: "2024-06-08T11:20:00",
      unreadCount: 1,
      messages: [
        {
          id: 1,
          sender: "customer",
          text: "Hi! I'm interested in your product Professional Tripod.",
          timestamp: "2024-06-08T11:00:00"
        },
        {
          id: 2,
          sender: "customer",
          text: "What's the rental price for a week?",
          timestamp: "2024-06-08T11:20:00"
        }
      ]
    }
  ]);

  const [selectedThread, setSelectedThread] = useState<number | null>(null);
  const [newMessage, setNewMessage] = useState("");

  const formatTime = (timestamp: string) => {
    const date = new Date(timestamp);
    const now = new Date();
    const diffInHours = (now.getTime() - date.getTime()) / (1000 * 60 * 60);

    if (diffInHours < 24) {
      return date.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' });
    } else {
      return date.toLocaleDateString();
    }
  };

  const handleSendMessage = () => {
    if (newMessage.trim() && selectedThread) {
      console.log(`Sending message to thread ${selectedThread}:`, newMessage);
      // Here you would handle sending the message
      setNewMessage("");
    }
  };

  const handleKeyPress = (e: React.KeyboardEvent) => {
    if (e.key === 'Enter' && !e.shiftKey) {
      e.preventDefault();
      handleSendMessage();
    }
  };

  const selectedThreadData = chatThreads.find(thread => thread.id === selectedThread);
  const totalUnread = chatThreads.reduce((sum, thread) => sum + thread.unreadCount, 0);

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-3xl font-bold text-black mb-2">Real-time Chat</h1>
        <p className="text-gray-600">Communicate with customers about your products in real-time.</p>
      </div>

      {/* Chat Statistics */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <div className="bg-white rounded-lg border border-gray-200 p-6">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm font-medium text-gray-600">Active Conversations</p>
              <p className="text-2xl font-bold text-black">{chatThreads.length}</p>
            </div>
            <MessageSquare className="text-black" size={24} />
          </div>
        </div>
        <div className="bg-white rounded-lg border border-gray-200 p-6">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm font-medium text-gray-600">Unread Messages</p>
              <p className="text-2xl font-bold text-red-600">{totalUnread}</p>
            </div>
            <MessageSquare className="text-red-500" size={24} />
          </div>
        </div>
      </div>

      {/* Chat Interface */}
      <div className="bg-white rounded-lg border border-gray-200 h-96 md:h-[500px] flex">
        {/* Chat List */}
        <div className={`${selectedThread ? 'hidden md:block' : 'block'} w-full md:w-1/3 border-r border-gray-200`}>
          <div className="p-4 border-b border-gray-200">
            <h3 className="font-semibold text-black">Conversations</h3>
          </div>
          <div className="overflow-y-auto h-full">
            {chatThreads.map((thread) => (
              <div
                key={thread.id}
                onClick={() => setSelectedThread(thread.id)}
                className={`p-4 border-b border-gray-100 hover:bg-gray-50 cursor-pointer ${
                  selectedThread === thread.id ? 'bg-gray-50' : ''
                }`}
              >
                <div className="flex items-start space-x-3">
                  <div className="relative">
                    <img
                      src={thread.customerAvatar}
                      alt={thread.customerName}
                      className="w-12 h-12 rounded-full object-cover"
                    />
                    {thread.unreadCount > 0 && (
                      <span className="absolute -top-1 -right-1 bg-red-500 text-white text-xs rounded-full h-5 w-5 flex items-center justify-center">
                        {thread.unreadCount}
                      </span>
                    )}
                  </div>
                  <div className="flex-1 min-w-0">
                    <div className="flex items-center justify-between">
                      <p className="text-sm font-medium text-black truncate">{thread.customerName}</p>
                      <p className="text-xs text-gray-500">{formatTime(thread.lastMessageTime)}</p>
                    </div>
                    <div className="flex items-center space-x-2 mt-1">
                      <Package size={12} className="text-gray-400" />
                      <p className="text-xs text-gray-500 truncate">{thread.productName}</p>
                    </div>
                    <p className="text-sm text-gray-600 truncate mt-1">{thread.lastMessage}</p>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Chat Messages */}
        <div className={`${selectedThread ? 'block' : 'hidden md:block'} flex-1 flex flex-col`}>
          {selectedThreadData ? (
            <>
              {/* Chat Header */}
              <div className="p-4 border-b border-gray-200 flex items-center justify-between">
                <div className="flex items-center space-x-3">
                  <button
                    onClick={() => setSelectedThread(null)}
                    className="md:hidden text-gray-600 hover:text-black"
                  >
                    ←
                  </button>
                  <img
                    src={selectedThreadData.customerAvatar}
                    alt={selectedThreadData.customerName}
                    className="w-10 h-10 rounded-full object-cover"
                  />
                  <div>
                    <p className="font-medium text-black">{selectedThreadData.customerName}</p>
                    <div className="flex items-center space-x-1 text-sm text-gray-500">
                      <Package size={12} />
                      <span>{selectedThreadData.productName}</span>
                    </div>
                  </div>
                </div>
              </div>

              {/* Messages */}
              <div className="flex-1 overflow-y-auto p-4 space-y-4">
                {selectedThreadData.messages.map((message) => (
                  <div
                    key={message.id}
                    className={`flex ${message.sender === 'seller' ? 'justify-end' : 'justify-start'}`}
                  >
                    <div
                      className={`max-w-xs lg:max-w-md px-4 py-2 rounded-lg ${
                        message.sender === 'seller'
                          ? 'bg-black text-white'
                          : 'bg-gray-100 text-black'
                      }`}
                    >
                      <p className="text-sm">{message.text}</p>
                      <p
                        className={`text-xs mt-1 ${
                          message.sender === 'seller' ? 'text-gray-300' : 'text-gray-500'
                        }`}
                      >
                        {formatTime(message.timestamp)}
                      </p>
                    </div>
                  </div>
                ))}
              </div>

              {/* Message Input */}
              <div className="p-4 border-t border-gray-200">
                <div className="flex space-x-2">
                  <textarea
                    value={newMessage}
                    onChange={(e) => setNewMessage(e.target.value)}
                    onKeyPress={handleKeyPress}
                    placeholder="Type your message..."
                    className="flex-1 p-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-gray-500 focus:border-transparent resize-none"
                    rows={1}
                  />
                  <button
                    onClick={handleSendMessage}
                    disabled={!newMessage.trim()}
                    className="px-4 py-2 bg-black text-white rounded-lg hover:bg-gray-800 disabled:bg-gray-300 disabled:cursor-not-allowed transition-colors"
                  >
                    <Send size={16} />
                  </button>
                </div>
              </div>
            </>
          ) : (
            <div className="flex-1 flex items-center justify-center">
              <div className="text-center text-gray-500">
                <MessageSquare size={48} className="mx-auto mb-4 text-gray-300" />
                <p>Select a conversation to start chatting</p>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default RealTimeChat;
