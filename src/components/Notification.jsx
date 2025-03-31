import React, { useState } from "react";
import { FaBell, FaCheckCircle, FaTimesCircle, FaTrashAlt } from "react-icons/fa";

const Notification = () => {
    const [notifications, setNotifications] = useState([
        { id: 1, message: "You have earned 50 gems! 🎯", isRead: false, time: "5 mins ago" },
        { id: 2, message: "Daily Challenge unlocked! 🚀", isRead: true, time: "1 hour ago" },
        { id: 3, message: "New achievement unlocked: 'Streak Master' 🏆", isRead: false, time: "Yesterday" },
    ]);

    const markAsRead = (id) => {
        setNotifications((prev) =>
            prev.map((note) =>
                note.id === id ? { ...note, isRead: true } : note
            )
        );
    };

    const deleteNotification = (id) => {
        setNotifications((prev) =>
            prev.filter((note) => note.id !== id)
        );
    };

    const clearAll = () => {
        setNotifications([]);
    };

    return (
        <div className="min-h-screen bg-gradient-to-br from-blue-100 to-blue-300 p-8 flex items-center justify-center">
            <div className="bg-white shadow-lg rounded-3xl p-6 w-full max-w-2xl border-4 border-blue-400">

                <div className="flex justify-between items-center mb-6">
                    <h2 className="text-3xl font-bold text-blue-600 flex items-center gap-2">
                        <FaBell /> Notifications
                    </h2>

                    {notifications.length > 0 && (
                        <button
                            onClick={clearAll}
                            className="bg-red-500 text-white px-4 py-2 rounded-full shadow-md hover:bg-red-600 transition-transform"
                        >
                            Clear All
                        </button>
                    )}
                </div>

                <div className="space-y-4">
                    {notifications.length > 0 ? (
                        notifications.map(({ id, message, isRead, time }) => (
                            <div
                                key={id}
                                className={`flex items-center justify-between p-4 rounded-lg shadow-md 
                                ${isRead ? "bg-blue-50" : "bg-blue-200 border-l-4 border-blue-500"}`}
                            >
                                <div className="flex flex-col gap-1">
                                    <p
                                        className={`text-md ${
                                            isRead ? "text-blue-500" : "text-blue-700 font-bold"
                                        }`}
                                    >
                                        {message}
                                    </p>
                                    <span className="text-sm text-gray-500">{time}</span>
                                </div>

                                <div className="flex items-center gap-3">
                                    {!isRead && (
                                        <button
                                            onClick={() => markAsRead(id)}
                                            className="bg-green-500 text-white p-2 rounded-full hover:bg-green-600 transition"
                                        >
                                            <FaCheckCircle />
                                        </button>
                                    )}
                                    <button
                                        onClick={() => deleteNotification(id)}
                                        className="bg-red-500 text-white p-2 rounded-full hover:bg-red-600 transition"
                                    >
                                        <FaTrashAlt />
                                    </button>
                                </div>
                            </div>
                        ))
                    ) : (
                        <p className="text-center text-blue-500 italic">
                            No new notifications 🎉
                        </p>
                    )}
                </div>
            </div>
        </div>
    );
};

export default Notification;
