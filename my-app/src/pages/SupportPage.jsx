// src/pages/SupportPage.jsx

import React, { useState, useEffect, useRef } from 'react';
import { useNavigate } from 'react-router-dom';
import '../styles/support.css'; 

import logo from "../assets/img/logo.png"; 

const initialMessages = [
    {
        id: 1,
        text: "Здравствуйте! Расскажите о вашей проблеме.",
        sender: 'support', 
    },
    {
        id: 2,
        text: "часто задаваемые вопросы",
        sender: 'user', 
    },
];

const SupportPage = () => {
    const navigate = useNavigate();
    const [messages, setMessages] = useState(initialMessages);
    const [inputMessage, setInputMessage] = useState('');
    const messagesEndRef = useRef(null);

    const scrollToBottom = () => {
        messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
    };

    useEffect(scrollToBottom, [messages]);

    const handleClose = () => {
        navigate('/afisha'); 
    };

    const handleSend = (e) => {
        e.preventDefault();
        if (inputMessage.trim() === '') return;

        const newMessage = {
            id: messages.length + 1,
            text: inputMessage.trim(),
            sender: 'user', 
        };

        setMessages([...messages, newMessage]);
        setInputMessage('');
    };
    
    const handleKeyPress = (e) => {
        if (e.key === 'Enter' && !e.shiftKey) { 
            e.preventDefault(); 
            handleSend();
        }
    };

    return (
        <div className="support-container">
            
            <header className="chat-header">
                <div className="chat-logo">
                    <img src={logo} alt="Sunlight cinema" />
                </div>
                <button className="close-chat-btn" onClick={handleClose}>
                    &times;
                </button>
            </header>

            <div className="chat-messages-area">
                {messages.map((msg) => (
                    <div key={msg.id} className={`message-row ${msg.sender}`}>
                        <div className={`message-bubble ${msg.sender}`}>
                            {msg.text === "часто задаваемые вопросы" ? (
                                <button className="faq-button">{msg.text}</button>
                            ) : (
                                msg.text
                            )}
                        </div>
                    </div>
                ))}
                <div ref={messagesEndRef} />
            </div>

            <form className="chat-input-area" onSubmit={handleSend}>
                <input
                    type="text"
                    placeholder="Опишите вашу проблему..."
                    value={inputMessage}
                    onChange={(e) => setInputMessage(e.target.value)}
                    onKeyPress={handleKeyPress}
                    className="chat-input"
                />
                <button type="submit" style={{ display: 'none' }} />
            </form>
        </div>
    );
};

export default SupportPage;