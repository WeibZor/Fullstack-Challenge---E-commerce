import { useState } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import Button from '../components/atoms/Button.jsx';
import Input from '../components/atoms/Input.jsx';
import { loginUser } from '../services/authService.js';
import { useAuthStore } from '../store/authStore.js';

const LoginPage = () => {
  const navigate = useNavigate();
  const login = useAuthStore((state) => state.login);
  const [form, setForm] = useState({ email: '', password: '' });
  const [error, setError] = useState('');

  const handleSubmit = async (event) => {
    event.preventDefault();
    try {
      const user = await loginUser(form);
      login(user);
      navigate('/');
    } catch (err) {
      setError(err.message);
    }
  };

  return (
    <div className="mx-auto max-w-2xl rounded-[32px] border border-slate-200 bg-white p-8 shadow-soft dark:border-slate-800 dark:bg-slate-900">
      <h1 className="text-3xl font-semibold text-slate-900 dark:text-slate-100">Iniciar sesión</h1>
      <p className="mt-2 text-sm text-slate-600 dark:text-slate-400">Accede a tu cuenta y administra tu carrito con persistencia.</p>
      <form onSubmit={handleSubmit} className="mt-8 space-y-6">
        <Input
          label="Correo electrónico"
          type="email"
          value={form.email}
          onChange={(event) => setForm({ ...form, email: event.target.value })}
          required
        />
        <Input
          label="Contraseña"
          type="password"
          value={form.password}
          onChange={(event) => setForm({ ...form, password: event.target.value })}
          required
        />
        {error && <p className="text-sm text-rose-500">{error}</p>}
        <Button className="w-full">Entrar</Button>
      </form>
      <p className="mt-4 text-sm text-slate-500 dark:text-slate-400">
        ¿No tienes cuenta?{' '}
        <Link to="/register" className="font-semibold text-brand-600 hover:text-brand-700">
          Regístrate aquí
        </Link>
      </p>
    </div>
  );
};

export default LoginPage;
