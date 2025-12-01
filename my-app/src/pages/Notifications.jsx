// src/pages/NotificationsPage.jsx

import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import '../styles/afisha.css'; 
import SidebarMenu from '../components/SidebarMenu'; 

import logo from "../assets/img/logo.png";
import searchIcon from "../assets/img/search.png";
import accountIcon from "../assets/img/account.png";

const mockNotifications = [
    { id: 1, title: 'Билеты куплены!', body: 'Ваши билеты на "Аватар" готовы. Места 4D-6, ряд 7.' },
    { id: 2, title: 'Акция 50%', body: 'Скидка 50% на все попкорны в эту субботу! Спешите!' },
    { id: 3, title: 'Новый фильм', body: 'В прокате "Дюна: Часть вторая". Купите билеты заранее.' },
];

const NotificationsPage = () => {
    const navigate = useNavigate();
    const [notifications, setNotifications] = useState(mockNotifications);

    const goToAfisha = () => navigate('/afisha');
    const goToLogin = () => navigate('/login');

    const handleNotificationClick = (id) => {
        console.log(`Уведомление ${id} прочитано.`);
    };

    return (
        <>
            <header className="topbar">
                <a className="logo" onClick={goToAfisha}>
                    <img src={logo} alt="Sunlight cinema" />
                </a>

                <nav className="mainmenu">
                    <a className="menu-link" onClick={goToAfisha}>афиша</a>
                    <a className="menu-link" href="#">пространства</a>

                    <img className="icon search" src={searchIcon} alt="Поиск" onClick={() => console.log("search")} />
                    <img className="icon account" src={accountIcon} alt="Аккаунт" onClick={goToLogin} />
                    {}
                </nav>
            </header>

            <div className="notifications-content">
                <h2>Ваши уведомления</h2>
                
                {notifications.length > 0 ? (
                    notifications.map(n => (
                        <div 
                            key={n.id} 
                            className="notification-card"
                            onClick={() => handleNotificationClick(n.id)}
                        >
                            <h3>{n.title}</h3>
                            <p>{n.body}</p>
                        </div>
                    ))
                ) : (
                    <p style={{ marginTop: '50px', fontSize: '18px', opacity: 0.7 }}>
                        У вас нет новых уведомлений.
                    </p>
                )}
            </div>

            {}
            <SidebarMenu />
        </>
    );
};

export default NotificationsPage;