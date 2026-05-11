import { mockUsers } from '../mockdata/users.js';

const STORAGE_KEY = 'ecommerce_registered_users';

const getStoredUsers = () => {
  try {
    const raw = window.localStorage.getItem(STORAGE_KEY);
    return raw ? JSON.parse(raw) : [...mockUsers];
  } catch {
    return [...mockUsers];
  }
};

const saveUsers = (users) => {
  window.localStorage.setItem(STORAGE_KEY, JSON.stringify(users));
};

export const loginUser = async ({ email, password }) => {
  const users = getStoredUsers();
  const user = users.find((entry) => entry.email === email && entry.password === password);
  if (!user) {
    throw new Error('Credenciales inválidas.');
  }
  return { id: user.id, name: user.name, email: user.email };
};

export const registerUser = async ({ name, email, password }) => {
  const users = getStoredUsers();
  const exists = users.some((entry) => entry.email === email);
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
  return { id: nextUser.id, name: nextUser.name, email: nextUser.email };
};
