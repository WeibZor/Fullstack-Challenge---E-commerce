import { useState } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import Button from '../components/atoms/Button.jsx';
import Input from '../components/atoms/Input.jsx';
import { registerUser } from '../services/authService.js';
import { useAuthStore } from '../store/authStore.js';

const RegisterPage = () => {
  const navigate = useNavigate();
  const register = useAuthStore((state) => state.register);
  const [form, setForm] = useState({ name: '', email: '', password: '' });
  const [error, setError] = useState('');

  const handleSubmit = async (event) => {
    event.preventDefault();
    try {
      const user = await registerUser(form);
      register(user);
      navigate('/');
    } catch (err) {
      setError(err.message);
    }
  };

  return (
    <div className="mx-auto max-w-2xl rounded-[32px] border border-slate-200 bg-white p-8 shadow-soft dark:border-slate-800 dark:bg-slate-900">
      <h1 className="text-3xl font-semibold text-slate-900 dark:text-slate-100">Registro</h1>
      <p className="mt-2 text-sm text-slate-600 dark:text-slate-400">Crea tu cuenta para guardar pedidos y compras futuras.</p>
      <form onSubmit={handleSubmit} className="mt-8 space-y-6">
        <Input
          label="Nombre completo"
          type="text"
          value={form.name}
          onChange={(event) => setForm({ ...form, name: event.target.value })}
          required
        />
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
        <Button className="w-full">Crear cuenta</Button>
      </form>
      <p className="mt-4 text-sm text-slate-500 dark:text-slate-400">
        ¿Ya tienes cuenta?{' '}
        <Link to="/login" className="font-semibold text-brand-600 hover:text-brand-700">
          Inicia sesión
        </Link>
      </p>
    </div>
  );
};

export default RegisterPage;
