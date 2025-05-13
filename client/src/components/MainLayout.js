import React from "react";
import { useAuth } from "../contexts/AuthContext";
import { Link } from "react-router-dom";

const MainLayout = () => {
  const { user, logout } = useAuth();

  return (
    <div className="min-h-screen bg-gray-100">
      {/* Navbar */}
      <nav className="bg-white shadow-lg">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between h-16">
            <div className="flex items-center">
              <h1 className="text-xl font-bold text-gray-800">Message App</h1>
            </div>
            <div className="flex items-center space-x-4">
              <span className="text-gray-600">Welcome, {user?.username}</span>
              <button
                onClick={logout}
                className="bg-red-500 hover:bg-red-600 text-white px-4 py-2 rounded-md text-sm font-medium"
              >
                Logout
              </button>
            </div>
          </div>
        </div>
      </nav>

      {/* Main Content */}
      <div className="max-w-7xl mx-auto py-6 sm:px-6 lg:px-8">
        <div className="px-4 py-6 sm:px-0">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {/* User List */}
            <div className="bg-white shadow rounded-lg p-6">
              <h2 className="text-lg font-semibold mb-4">Users</h2>
              <div className="space-y-4">
                {/* User list will be populated here */}
                <div className="flex items-center space-x-3 p-2 hover:bg-gray-50 rounded-md cursor-pointer">
                  <div className="w-10 h-10 bg-blue-500 rounded-full flex items-center justify-center text-white">
                    JD
                  </div>
                  <div>
                    <p className="font-medium">John Doe</p>
                    <p className="text-sm text-gray-500">Online</p>
                  </div>
                </div>
                {/* Add more users here */}
              </div>
            </div>

            {/* Chat Area */}
            <div className="md:col-span-2 bg-white shadow rounded-lg p-6">
              <h2 className="text-lg font-semibold mb-4">Chat</h2>
              <div className="h-[500px] flex flex-col">
                {/* Messages will be displayed here */}
                <div className="flex-1 overflow-y-auto p-4 space-y-4">
                  <div className="flex items-start space-x-3">
                    <div className="w-8 h-8 bg-blue-500 rounded-full flex items-center justify-center text-white text-sm">
                      JD
                    </div>
                    <div className="bg-gray-100 rounded-lg p-3 max-w-[70%]">
                      <p className="text-sm">Hello! How are you?</p>
                      <p className="text-xs text-gray-500 mt-1">10:30 AM</p>
                    </div>
                  </div>
                </div>

                {/* Message Input */}
                <div className="border-t p-4">
                  <div className="flex space-x-4">
                    <input
                      type="text"
                      placeholder="Type a message..."
                      className="flex-1 border rounded-lg px-4 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
                    />
                    <button className="bg-blue-500 text-white px-4 py-2 rounded-lg hover:bg-blue-600">
                      Send
                    </button>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default MainLayout;
