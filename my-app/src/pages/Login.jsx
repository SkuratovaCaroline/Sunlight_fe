import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { loginUser } from "../api/auth"; 

function Login() {
  const navigate = useNavigate();

  const [form, setForm] = useState({
    usernameOrEmail: "",
    password: "",
  });
  const [message, setMessage] = useState("");
  const [error, setError] = useState(null);
  const [pending, setPending] = useState(false);

  const onChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
    if (error) setError(null);
    if (message) setMessage("");
  };

  const onSubmit = async (e) => {
    e.preventDefault();
    setPending(true);
    setError(null);
    setMessage("");
    const credentials = {
      username: form.usernameOrEmail, 
      password: form.password,
    };

    try {
      await loginUser(credentials); 
      setMessage("✅ Вход выполнен. Перенаправление…");
      setTimeout(() => navigate("/"), 800);
    } catch (err) {
      const apiMsg =
        err.response?.data?.message ||
        "Неверный логин/пароль или сервер недоступен.";
      setError(`❌ ${apiMsg}`);
      console.error("Ошибка логина:", err);
    } finally {
      setPending(false);
    }
  };

  return (
    <div style={styles.overlay}>
      <div style={styles.card}>
        <h1 style={styles.title}>ВХОД В ЛИЧНЫЙ КАБИНЕТ</h1>

        {message && <p style={{ ...styles.note, color: "lightgreen" }}>{message}</p>}
        {error && <p style={{ ...styles.note, color: "salmon" }}>{error}</p>}

        <form onSubmit={onSubmit} style={styles.form}>
          <input
            name="usernameOrEmail"
            type="text"
            placeholder="Имя пользователя или Email"
            style={styles.input}
            value={form.usernameOrEmail}
            onChange={onChange}
            required
          />
          <input
            name="password"
            type="password"
            placeholder="Пароль"
            style={styles.input}
            value={form.password}
            onChange={onChange}
            required
          />
          <button type="submit" style={styles.button} disabled={pending}>
            {pending ? "Входим…" : "ВОЙТИ"}
          </button>
        </form>

        <p style={styles.link} onClick={() => navigate("/register")}>
          Регистрация
        </p>
        <p style={styles.link} onClick={() => navigate("/")}>
          ← Назад к афише
        </p>
      </div>
    </div>
  );
}

const styles = {
  overlay: {
    position: "fixed",
    inset: 0,
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
  title: { marginBottom: 18, fontSize: 26, color: "#fff" },
  note: { margin: "6px 0 10px", fontWeight: 600, fontSize: 14 },
  form: { display: "flex", flexDirection: "column", gap: 12 },
  input: {
    height: 45,
    borderRadius: 8,
    border: "none",
    padding: "0 15px",
    fontSize: 16,
  },
  button: {
    marginTop: 6,
    height: 50,
    borderRadius: 10,
    border: "none",
    background: "rgba(255, 0, 0, 0.4)",
    color: "#fff",
    fontSize: 18,
    cursor: "pointer",
    boxShadow: "0 0 20px rgba(255, 0, 0, 0.8)",
  },
  link: {
    marginTop: 8,
    cursor: "pointer",
    color: "#fff",
    textDecoration: "underline",
  },
};

export default Login;
