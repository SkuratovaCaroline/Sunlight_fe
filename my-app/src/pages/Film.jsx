import React from "react";
import { useNavigate } from "react-router-dom";

export default function Film() { // <-- ПРОВЕРЬТЕ НАЛИЧИЕ 'export default'
  const navigate = useNavigate();
  return (
    <div style={page}>
      <h1>Страница фильма</h1>
      <p>Тут позже появится информация по выбранному фильму.</p>
      <p style={link} onClick={() => navigate("/")}>← Назад к афише</p>
    </div>
  );
}

const page = { minHeight:"100vh", background:"radial-gradient(ellipse at bottom,#0d1b2a,#000)", display:"flex", flexDirection:"column", alignItems:"center", justifyContent:"center", color:"#fff", fontFamily:"Montserrat, sans-serif", textAlign:"center", padding:24 };
const link = { marginTop:16, textDecoration:"underline", cursor:"pointer" };