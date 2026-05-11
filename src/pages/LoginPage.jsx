import { useState } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import { toast } from 'sonner';
import Button from '../components/atoms/Button.jsx';
import Input from '../components/atoms/Input.jsx';
import { useAuthStore } from '../store/authStore.js';

const DEMO_USER = {
  email: 'demo@ecommerce.com',
  password: '123456',
};

const LoginPage = () => {
  const navigate = useNavigate();
  const { login, loading, error, clearError } = useAuthStore();
  const [form, setForm] = useState({ email: '', password: '' });
  const [formErrors, setFormErrors] = useState({});

  const validateForm = () => {
    const errors = {};
    if (!form.email.trim()) {
      errors.email = 'El correo es obligatorio';
    } else if (!/\S+@\S+\.\S+/.test(form.email)) {
      errors.email = 'Ingresa un correo válido';
    }
    if (!form.password.trim()) {
      errors.password = 'La contraseña es obligatoria';
    } else if (form.password.length < 6) {
      errors.password = 'La contraseña debe tener al menos 6 caracteres';
    }
    return errors;
  };

  const handleSubmit = async (event) => {
    event.preventDefault();
    clearError();

    const errors = validateForm();
    if (Object.keys(errors).length > 0) {
      setFormErrors(errors);
      return;
    }

    setFormErrors({});
    try {
      await login(form);
      toast.success('¡Bienvenido de vuelta!');
      navigate('/');
    } catch (err) {
      toast.error(err.message);
    }
  };

  const handleDemoLogin = async () => {
    setForm(DEMO_USER);
    try {
      await login(DEMO_USER);
      toast.success('¡Sesión demo iniciada!');
      navigate('/');
    } catch (err) {
      toast.error(err.message);
    }
  };

  const handleInputChange = (field) => (event) => {
    setForm({ ...form, [field]: event.target.value });
    if (formErrors[field]) {
      setFormErrors({ ...formErrors, [field]: '' });
    }
  };

  return (
    <div className="flex min-h-screen items-center justify-center bg-slate-50 px-4 py-12 dark:bg-slate-950">
      <div className="w-full max-w-md space-y-8">
        <div className="text-center">
          <h1 className="text-3xl font-bold text-slate-900 dark:text-slate-100">Iniciar sesión</h1>
          <p className="mt-2 text-sm text-slate-600 dark:text-slate-400">
            Accede a tu cuenta y comienza a comprar
          </p>
        </div>

        <div className="rounded-2xl border border-slate-200 bg-white p-8 shadow-lg dark:border-slate-800 dark:bg-slate-900">
          <form onSubmit={handleSubmit} className="space-y-6">
            <Input
              label="Correo electrónico"
              type="email"
              value={form.email}
              onChange={handleInputChange('email')}
              error={formErrors.email}
              placeholder="tu@email.com"
              required
            />
            <Input
              label="Contraseña"
              type="password"
              value={form.password}
              onChange={handleInputChange('password')}
              error={formErrors.password}
              placeholder="••••••••"
              required
            />

            {error && (
              <div className="rounded-lg border border-red-200 bg-red-50 p-4 dark:border-red-800 dark:bg-red-950">
                <p className="text-sm text-red-600 dark:text-red-400">{error}</p>
              </div>
            )}

            <Button
              type="submit"
              className="w-full"
              disabled={loading}
              loading={loading}
            >
              {loading ? 'Iniciando sesión...' : 'Iniciar sesión'}
            </Button>
          </form>

          <div className="mt-6">
            <div className="relative">
              <div className="absolute inset-0 flex items-center">
                <div className="w-full border-t border-slate-200 dark:border-slate-700" />
              </div>
              <div className="relative flex justify-center text-sm">
                <span className="bg-white px-2 text-slate-500 dark:bg-slate-900 dark:text-slate-400">
                  O prueba la demo
                </span>
              </div>
            </div>

            <div className="mt-6">
              <Button
                type="button"
                variant="outline"
                className="w-full"
                onClick={handleDemoLogin}
                disabled={loading}
              >
                Usar cuenta demo
              </Button>
              <p className="mt-2 text-center text-xs text-slate-500 dark:text-slate-400">
                Email: demo@ecommerce.com<br />
                Contraseña: 123456
              </p>
            </div>
          </div>
        </div>

        <p className="text-center text-sm text-slate-600 dark:text-slate-400">
          ¿No tienes cuenta?{' '}
          <Link
            to="/register"
            className="font-semibold text-brand-600 hover:text-brand-700 dark:text-brand-400"
          >
            Regístrate aquí
          </Link>
        </p>
      </div>
    </div>
  );
};

export default LoginPage;
