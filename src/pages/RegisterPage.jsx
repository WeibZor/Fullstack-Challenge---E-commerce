import { useState } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import { toast } from 'sonner';
import Button from '../components/atoms/Button.jsx';
import Input from '../components/atoms/Input.jsx';
import { useAuthStore } from '../store/authStore.js';

const RegisterPage = () => {
  const navigate = useNavigate();
  const { register, loading, error, clearError } = useAuthStore();
  const [form, setForm] = useState({ name: '', email: '', password: '', confirmPassword: '' });
  const [formErrors, setFormErrors] = useState({});

  const validateForm = () => {
    const errors = {};
    if (!form.name.trim()) {
      errors.name = 'El nombre es obligatorio';
    } else if (form.name.trim().length < 2) {
      errors.name = 'El nombre debe tener al menos 2 caracteres';
    }
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
    if (!form.confirmPassword.trim()) {
      errors.confirmPassword = 'Confirma tu contraseña';
    } else if (form.password !== form.confirmPassword) {
      errors.confirmPassword = 'Las contraseñas no coinciden';
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
      await register({ name: form.name, email: form.email, password: form.password });
      toast.success('¡Cuenta creada exitosamente!');
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
          <h1 className="text-3xl font-bold text-slate-900 dark:text-slate-100">Crear cuenta</h1>
          <p className="mt-2 text-sm text-slate-600 dark:text-slate-400">
            Únete a nuestra tienda y comienza a comprar
          </p>
        </div>

        <div className="rounded-2xl border border-slate-200 bg-white p-8 shadow-lg dark:border-slate-800 dark:bg-slate-900">
          <form onSubmit={handleSubmit} className="space-y-6">
            <Input
              label="Nombre completo"
              type="text"
              value={form.name}
              onChange={handleInputChange('name')}
              error={formErrors.name}
              placeholder="Tu nombre completo"
              required
            />
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
            <Input
              label="Confirmar contraseña"
              type="password"
              value={form.confirmPassword}
              onChange={handleInputChange('confirmPassword')}
              error={formErrors.confirmPassword}
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
              {loading ? 'Creando cuenta...' : 'Crear cuenta'}
            </Button>
          </form>
        </div>

        <p className="text-center text-sm text-slate-600 dark:text-slate-400">
          ¿Ya tienes cuenta?{' '}
          <Link
            to="/login"
            className="font-semibold text-brand-600 hover:text-brand-700 dark:text-brand-400"
          >
            Inicia sesión
          </Link>
        </p>
      </div>
    </div>
  );
};

export default RegisterPage;
