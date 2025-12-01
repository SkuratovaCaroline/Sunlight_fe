// src/api/auth.js
import axios from 'axios';

const SERVER_IP = '26.70.131.160';
const SERVER_PORT = '8080';
const API_BASE_URL = `http://${SERVER_IP}:${SERVER_PORT}/api/auth`;
const GENERAL_BASE_URL = `http://${SERVER_IP}:${SERVER_PORT}/api`; 

const apiClient = axios.create({
  baseURL: API_BASE_URL,
  headers: {
    'Content-Type': 'application/json',
  },
});

/**
 * Функция для РЕГИСТРАЦИИ НОВОГО ПОЛЬЗОВАТЕЛЯ.
 * @param {object} userData - Объект с данными регистрации.
 * @returns {Promise<any>}
 */
export const registerUser = async (userData) => {
  try {
    const response = await apiClient.post('/register', userData);
    return response.data;
  } catch (error) {
    throw error;
  }
};

/**
 * 2. Функция для ВХОДА в систему и получения JWT-токена.
 * @param {object} credentials - Объект с логином и паролем.
 * @returns {Promise<{token: string}>}
 */
export const loginUser = async (credentials) => {
  try {
    const response = await apiClient.post('/login', credentials);
    
   
    const { token } = response.data; 
    
    localStorage.setItem('authToken', token);
    
    return response.data;
  } catch (error) {
    throw error;
  }
};

/**
 * 3. Функция для выполнения ЗАЩИЩЕННЫХ запросов (с JWT).
 * @param {string} endpoint 
 * @param {string} method 
 * @param {object} [data=null]
 * @returns {Promise<any>}
 */
export const protectedApiCall = async (endpoint, method = 'GET', data = null) => {
  const token = localStorage.getItem('authToken');
  
  if (!token) {
    throw new Error("Неавторизованный доступ. Токен не найден.");
  }
  
  const authConfig = {
    method,
    data, 
    headers: {
      'Content-Type': 'application/json',
      Authorization: `Bearer ${token}`, 
    },
    baseURL: GENERAL_BASE_URL, 
    url: endpoint,
  };
  
  try {
    const response = await axios(authConfig);
    return response.data;
  } catch(error) {
    throw error;
  }
};
