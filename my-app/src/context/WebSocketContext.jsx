// src/context/WebSocketContext.jsx
import React, { createContext, useContext, useEffect, useState } from 'react';

const WEBSOCKET_URL = "ws://26.70.131.160:8080/ws/notifications"; 

const WebSocketContext = createContext(null);

export const useWebSocket = () => {
    return useContext(WebSocketContext);
};

export const WebSocketProvider = ({ children }) => {
    const [lastNotification, setLastNotification] = useState(null);
    const [isConnected, setIsConnected] = useState(false);
    const [socket, setSocket] = useState(null);

    useEffect(() => {
    
        console.warn("WebSocket временно отключен. Используется заглушка.");
        return () => {
             
        };
        // =========================================================

        /* // 
        if (socket && socket.readyState === WebSocket.OPEN) return; 

        console.log("Attempting to connect to WebSocket:", WEBSOCKET_URL);
        const newSocket = new WebSocket(WEBSOCKET_URL);
        setSocket(newSocket);

        newSocket.onmessage = (event) => {
            try {
                const message = JSON.parse(event.data);
                console.log("WS Message received:", message);
                setLastNotification(message); 
            } catch (error) {
                console.error("Error parsing WS message:", error);
            }
        };

        newSocket.onopen = () => {
            console.log("WebSocket connected successfully.");
            setIsConnected(true);
        };

        newSocket.onclose = (event) => {
            console.log(`WebSocket disconnected. Code: ${event.code}, Reason: ${event.reason}`);
            setIsConnected(false);
            setSocket(null); 
        };
        
        newSocket.onerror = (error) => {
            console.error("WebSocket error occurred:", error);
        };

        return () => {
            if (newSocket.readyState === WebSocket.OPEN || newSocket.readyState === WebSocket.CONNECTING) {
                 newSocket.close(1000, "Component unmounted");
                 console.log("WebSocket client closed.");
            }
        };
        */

    }, []); 

    const value = {
        lastNotification,
        isConnected,
      
        sendMessage: (data) => {
            console.warn("WS: Сообщение не отправлено. Соединение отключено.", data);
        }
    };

    return (
        <WebSocketContext.Provider value={value}>
            {children}
        </WebSocketContext.Provider>
    );
};
