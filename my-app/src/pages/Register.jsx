import React, { useState } from "react";
import { useNavigate } from "react-router-dom";

import { registerUser } from '../api/auth'; 

function Register() {
  const navigate = useNavigate();


  const [formData, setFormData] = useState({
    firstName: '',
    lastName: '', 
    username: '',
    email: '',
    password: '',
    confirmPassword: '', 
  });
  const [message, setMessage] = useState('');
  const [error, setError] = useState(null);

  
  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
    if (error) setError(null);
    if (message) setMessage('');
  };


  const handleSubmit = async (e) => {
    e.preventDefault();
    setMessage('');
    setError(null);


    if (formData.password !== formData.confirmPassword) {
      setError("Пароли не совпадают!");
      return;
    }


    const userData = {
        username: formData.username,
        password: formData.password,
        email: formData.email,
        firstName: formData.firstName,
        lastName: formData.lastName || "" 
    };

    
    try {
      await registerUser(userData);
      
      setMessage('✅ Регистрация прошла успешно! Вы будете перенаправлены на вход.');
      
      
      setTimeout(() => {
          navigate("/login"); 
      }, 1500);

    } catch (err) {
      const apiMessage = err.response?.data?.message || "Пользователь с таким логином или email уже существует, либо данные неверны.";
      setError(`❌ Ошибка: ${apiMessage}`);
      console.error("Ошибка API при регистрации:", err);
    }
  };

  return (
    <div style={styles.overlay}>
      <div style={styles.card}>
        <h1 style={styles.title}>РЕГИСТРАЦИЯ</h1>

        {/* Сообщения об успехе или ошибке */}
        {message && <p style={{ ...styles.message, color: 'lightgreen' }}>{message}</p>}
        {error && <p style={{ ...styles.message, color: 'salmon' }}>{error}</p>}

        <form onSubmit={handleSubmit} style={styles.form}>
          {/* Поле firstName */}
          <input 
            name="firstName" 
            type="text" 
            placeholder="Имя (firstName)" 
            style={styles.input} 
            onChange={handleChange} 
            value={formData.firstName} 
            required 
          />
          
          {/* Поле lastName */}
          <input 
            name="lastName" 
            type="text" 
            placeholder="Фамилия (lastName)" 
            style={styles.input} 
            onChange={handleChange} 
            value={formData.lastName} 
          />


          {/* Поле username */}
          <input 
            name="username" 
            type="text" 
            placeholder="Имя пользователя (username)" 
            style={styles.input} 
            onChange={handleChange} 
            value={formData.username} 
            required 
          />
          
          {/* Поле email */}
          <input 
            name="email" 
            type="email" 
            placeholder="Email (email)" 
            style={styles.input} 
            onChange={handleChange} 
            value={formData.email} 
            required 
          />
          
          {/* Поле password */}
          <input 
            name="password" 
            type="password" 
            placeholder="Пароль (password)" 
            style={styles.input} 
            onChange={handleChange} 
            value={formData.password} 
            required 
          />
          
          {/* Поле для клиентской проверки пароля */}
          <input 
            name="confirmPassword" 
            type="password" 
            placeholder="Повторите пароль" 
            style={styles.input} 
            onChange={handleChange} 
            value={formData.confirmPassword} 
            required 
          />

          <button type="submit" style={styles.button}>ЗАРЕГИСТРИРОВАТЬСЯ</button>
        </form>

        <p style={styles.link} onClick={() => navigate("/login")}>
          Уже есть аккаунт? Войти
        </p>

        <p style={styles.link} onClick={() => navigate("/")}>
          ← Назад к афише
        </p>
      </div>
    </div>
  );
}

const messageStyle = {
    marginBottom: "10px",
    fontSize: "14px",
    fontWeight: "bold"
};

const styles = {
  overlay: {
    position: "fixed",
    top: 0,
    left: 0,
    width: "100vw",
    height: "100vh",
    background: "radial-gradient(ellipse at bottom, #0d1b2a, #000)",
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
    fontFamily: "Montserrat, sans-serif",
    zIndex: 9999,
  },

  card: {
    background: "radial-gradient(circle at top, #1e3c72, #0d1b2a, #000)",
    padding: "35px 45px",
    borderRadius: "20px",
    width: "500px",
    textAlign: "center",
    boxShadow: "0 0 40px rgba(255,255,255,0.2)",
  },
  title: {
    marginBottom: "25px",
    fontSize: "26px",
    color: "#fff",
  },
  form: {
    display: "flex",
    flexDirection: "column",
    gap: "12px",
  },
  input: {
    height: "45px",
    borderRadius: "8px",
    border: "none",
    padding: "0 15px",
    fontSize: "16px",
  },
  button: {
    marginTop: "10px",
    height: "50px",
    borderRadius: "10px",
    border: "none",
    background: "rgba(255, 0, 0, 0.4)",
    color: "#fff",
    fontSize: "18px",
    cursor: "pointer",
    boxShadow: "0 0 20px rgba(255, 0, 0, 0.8)",
  },
  link: {
    marginTop: "8px",
    cursor: "pointer",
    color: "#fff",
    textDecoration: "underline",
  },
  message: messageStyle, 
};

export default Register;
