import { mockUsers } from '../mockdata/users.js';

const USER_KEY = 'users';
const CURRENT_USER_KEY = 'currentUser';

const getStoredUsers = () => {
  try {
    const raw = window.localStorage.getItem(USER_KEY);
    return raw ? JSON.parse(raw) : [...mockUsers];
  } catch {
    return [...mockUsers];
  }
};

const saveUsers = (users) => {
  window.localStorage.setItem(USER_KEY, JSON.stringify(users));
};

export const getCurrentUser = () => {
  try {
    const raw = window.localStorage.getItem(CURRENT_USER_KEY);
    return raw ? JSON.parse(raw) : null;
  } catch {
    return null;
  }
};

export const setCurrentUser = (user) => {
  window.localStorage.setItem(CURRENT_USER_KEY, JSON.stringify(user));
};

export const clearCurrentUser = () => {
  window.localStorage.removeItem(CURRENT_USER_KEY);
};

export const loginUser = async ({ email, password }) => {
  await new Promise((resolve) => setTimeout(resolve, 500));
  const users = getStoredUsers();
  const user = users.find((entry) => entry.email.toLowerCase() === email.toLowerCase() && entry.password === password);

  if (!user) {
    throw new Error('Credenciales inválidas. Verifica tu email y contraseña.');
  }

  const currentUser = { id: user.id, name: user.name, email: user.email };
  setCurrentUser(currentUser);
  return currentUser;
};

export const registerUser = async ({ name, email, password }) => {
  await new Promise((resolve) => setTimeout(resolve, 500));
  const users = getStoredUsers();
  const exists = users.some((entry) => entry.email.toLowerCase() === email.toLowerCase());
  if (exists) {
    throw new Error('Ya existe un usuario con este correo.');
  }

  const nextUser = {
    id: users.length + 1,
    name,
    email,
    password,
  };

  const updatedUsers = [...users, nextUser];
  saveUsers(updatedUsers);

  const currentUser = { id: nextUser.id, name: nextUser.name, email: nextUser.email };
  setCurrentUser(currentUser);
  return currentUser;
};

export const updateUserProfile = async ({ id, name, email }) => {
  await new Promise((resolve) => setTimeout(resolve, 400));
  if (!name.trim() || !email.trim()) {
    throw new Error('Nombre y correo son obligatorios.');
  }

  const users = getStoredUsers();
  const existing = users.find((entry) => entry.id === id);
  if (!existing) {
    throw new Error('Usuario no encontrado.');
  }

  const duplicated = users.find((entry) => entry.email.toLowerCase() === email.toLowerCase() && entry.id !== id);
  if (duplicated) {
    throw new Error('Este correo ya está registrado en otra cuenta.');
  }

  const updatedUsers = users.map((entry) =>
    entry.id === id ? { ...entry, name, email } : entry
  );

  saveUsers(updatedUsers);
  const updatedUser = { id, name, email };
  setCurrentUser(updatedUser);
  return updatedUser;
};
