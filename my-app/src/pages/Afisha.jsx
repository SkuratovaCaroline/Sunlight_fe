// src/pages/Afisha.jsx

import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import SidebarMenu from '../components/SidebarMenu'; 
import "../styles/afisha.css";
// import { useWebSocket } from '../context/WebSocketContext'; 

import logo from "../assets/img/logo.png";
import searchIcon from "../assets/img/search.png";
import accountIcon from "../assets/img/account.png";

const mockPosterData = [
    { id: 1, src: '../assets/img/poster1.jpg', genre: 'action', format: '3d', title: 'Фильм A' },
    { id: 2, src: '../assets/img/poster2.jpg', genre: 'comedy', format: '2d', title: 'Фильм B' },
    { id: 3, src: '../assets/img/poster3.jpg', genre: 'drama', format: 'imax', title: 'Фильм C' },
    { id: 4, src: '../assets/img/poster4.jpg', genre: 'action', format: '2d', title: 'Фильм D' },
    { id: 5, src: '../assets/img/poster5.jpg', genre: 'comedy', format: '3d', title: 'Фильм E' },
];


function Afisha() {
    const navigate = useNavigate();
    const [activeTab, setActiveTab] = useState("Сегодня");
    const [toast, setToast] = useState(null);
    const [fullPosters, setFullPosters] = useState([]); 
    // const { lastNotification } = useWebSocket(); 
    const lastNotification = null; 
    
    const [filters, setFilters] = useState({
        genre: 'all',
        format: 'all'
    });

    const handleFilterChange = (e) => {
        const { name, value } = e.target;
        setFilters(prev => ({
            ...prev,
            [name]: value
        }));
    };

    const filteredPosters = fullPosters.filter(poster => {
        const genreMatch = filters.genre === 'all' || poster.genre === filters.genre;
        const formatMatch = filters.format === 'all' || poster.format === filters.format;
        return genreMatch && formatMatch;
    });

    function showToast(title, body) {
        setToast(null); 
        setToast({ title, body });
        setTimeout(() => setToast(null), 3000);
    }

    useEffect(() => {
        const loadImages = async () => {
            const imageModules = import.meta.glob('../assets/img/*.{jpg,jpeg,png,webp}', { eager: true, import: 'default' });
            
            const loadedData = mockPosterData.map(data => {
                const key = data.src; 
                const imageSrc = imageModules[key]; 

                if (!imageSrc) {
                    console.error(`Изображение по пути ${key} не найдено.`);
                }

                return { 
                    ...data, 
                    src: imageSrc 
                };
            }).filter(d => d.src); 
            
            setFullPosters(loadedData);
        };
        
        loadImages();
        showToast("Приветствие", "Приложение запущено.");
    }, []);
    
    useEffect(() => {
        if (lastNotification) {
            showToast(
                lastNotification.title ?? "Новое сообщение", 
                lastNotification.body ?? "Получено обновление от сервера."
            );
        }
    }, [lastNotification]); 

    const onTabClick = (tab) => {
        setActiveTab(tab);
    };

    const onPosterClick = (id) => {
        navigate("/film"); 
    };

    return (
        <>
            <header className="topbar">
                <a className="logo" href="#">
                    <img src={logo} alt="Sunlight cinema" />
                </a>

                <nav className="mainmenu">
                    <a className="menu-link active" href="#">афиша</a>
                    <a className="menu-link" href="#">пространства</a>

                    <img className="icon search" src={searchIcon} alt="Поиск" onClick={() => console.log("search")} />
                    <img className="icon account" src={accountIcon} alt="Аккаунт" onClick={() => navigate("/login")} />
                </nav>
            </header>

            <div className="afisha-content">
                <div className="tabs-original">
                    {["Сегодня", "Завтра", "На неделю", "Скоро"].map((tab) => (
                        <span
                            key={tab}
                            className={`tab ${activeTab === tab ? "active" : ""}`}
                            onClick={() => onTabClick(tab)}
                        >
                            {tab}
                        </span>
                    ))}
                </div>

                <div className="filters-controls">
                    <select 
                        className="filter-select" 
                        name="genre" 
                        value={filters.genre}
                        onChange={handleFilterChange}
                    >
                        <option value="all">Все жанры</option>
                        <option value="action">Боевик</option>
                        <option value="comedy">Комедия</option>
                        <option value="drama">Драма</option>
                    </select>

                    <select 
                        className="filter-select" 
                        name="format" 
                        value={filters.format}
                        onChange={handleFilterChange}
                    >
                        <option value="all">Все форматы</option>
                        <option value="2d">2D</option>
                        <option value="3d">3D</option>
                        <option value="imax">IMAX</option>
                    </select>
                </div>

                <div className="poster-grid-original">
                    {filteredPosters.map((data) => (
                        <figure className="movie" key={data.id} onClick={() => onPosterClick(data.id)}>
                            {data.src && <img src={data.src} alt={data.title} />} 
                        </figure>
                    ))}
                    
                    {fullPosters.length > 0 && filteredPosters.length === 0 && (
                        <p style={{ 
                            gridColumn: '1 / -1', 
                            textAlign: 'center', 
                            fontSize: '20px',
                            opacity: 0.7
                        }}>
                            Фильмы по вашим фильтрам не найдены.
                        </p>
                    )}
                    
                    {fullPosters.length === 0 && (
                        <p style={{ 
                            gridColumn: '1 / -1', 
                            textAlign: 'center',
                            fontSize: '20px',
                            opacity: 0.7
                        }}>
                            Загрузка фильмов...
                        </p>
                    )}
                </div>
            </div>

            {toast && (
                <div className="toast-container">
                    <div className="toast">
                        <h3>{toast.title}</h3>
                        <p>{toast.body}</p>
                    </div>
                </div>
            )}
            
            <SidebarMenu />
        </>
    );
}

export default Afisha;
