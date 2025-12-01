// src/components/SidebarMenu.jsx

import React, { useState } from 'react'; 
import { useNavigate } from 'react-router-dom';
import '../components/SidebarMenu.css'; 

const SidebarMenu = () => {
    const navigate = useNavigate();
    const [isOpen, setIsOpen] = useState(false); 

    const handleToggle = () => {
        setIsOpen(!isOpen);
    };

    const handleNavigation = (path) => {
        setIsOpen(false); 
        navigate(path);
    };

    const menuClass = `circular-menu ${isOpen ? 'open' : ''}`;
    const burgerClass = `burger ${isOpen ? 'open' : ''}`;

    return (
        <>
            {/* Кнопка открытия/закрытия */}
            <div className="menu-toggle" onClick={handleToggle}>
                <div className={burgerClass}></div>
            </div>

            {/* Круглое меню */}
            <div className={menuClass}>
                <ul>
                    <li><a onClick={() => handleNavigation('/afisha')}>Афиша</a></li>
                    <li><a onClick={() => handleNavigation('/login')}>Личный кабинет</a></li>
                    <li><a href="#">Сертификаты</a></li>
                    <li><a href="#">Карьера</a></li>
                    <li><a href="#">Контакты</a></li>
                    <li><a onClick={() => handleNavigation('/support')}>Поддержка</a></li>
                    <li><a onClick={() => handleNavigation('/notifications')}>Уведомления</a></li>
                </ul>
            </div>
        </>
    );
};

export default SidebarMenu;
