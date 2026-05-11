import { useState } from 'react';
import { useAuthStore } from '../store/authStore.js';
import Button from '../components/atoms/Button.jsx';
import Input from '../components/atoms/Input.jsx';
import { toast } from 'sonner';

const ProfilePage = () => {
  const { user, updateProfile } = useAuthStore();
  const [form, setForm] = useState({ name: user?.name || '', email: user?.email || '' });
  const [saving, setSaving] = useState(false);
  const [error, setError] = useState('');

  const handleChange = (field, value) => {
    setForm((prev) => ({ ...prev, [field]: value }));
    setError('');
  };

  const handleSubmit = async (event) => {
    event.preventDefault();
    if (!form.name.trim() || !form.email.trim()) {
      setError('Completa todos los campos antes de guardar.');
      return;
    }
    setSaving(true);
    try {
      await updateProfile(form);
      toast.success('Perfil actualizado con éxito.');
    } catch (err) {
      setError(err?.message || 'No se pudo actualizar el perfil.');
    } finally {
      setSaving(false);
    }
  };

  return (
    <div className="mx-auto max-w-4xl space-y-8">
      <section className="rounded-[32px] border border-slate-200 bg-white p-8 shadow-soft dark:border-slate-800 dark:bg-slate-900">
        <div className="flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between">
          <div>
            <p className="text-sm uppercase tracking-[0.3em] text-brand-600 dark:text-brand-300">Perfil</p>
            <h1 className="mt-2 text-3xl font-semibold text-slate-900 dark:text-slate-100">Cuenta de usuario</h1>
          </div>
          <p className="text-sm text-slate-600 dark:text-slate-400">Administra tu información y mantén tu sesión activa en el e-commerce.</p>
        </div>
        <form onSubmit={handleSubmit} className="mt-8 grid gap-6">
          <div className="grid gap-6 sm:grid-cols-2">
            <Input label="Nombre" value={form.name} onChange={(event) => handleChange('name', event.target.value)} />
            <Input label="Correo electrónico" type="email" value={form.email} onChange={(event) => handleChange('email', event.target.value)} />
          </div>
          {error && <p className="text-sm text-rose-500">{error}</p>}
          <div className="flex flex-wrap items-center gap-4">
            <Button type="submit" disabled={saving} className="min-w-[180px]">
              {saving ? 'Guardando...' : 'Actualizar perfil'}
            </Button>
            <span className="text-sm text-slate-500 dark:text-slate-400">Último guardado: {user?.email}</span>
          </div>
        </form>
      </section>
      <section className="rounded-[32px] border border-slate-200 bg-slate-50 p-8 shadow-soft dark:border-slate-800 dark:bg-slate-950">
        <h2 className="text-xl font-semibold text-slate-900 dark:text-slate-100">Seguridad y preferencias</h2>
        <p className="mt-3 text-sm leading-7 text-slate-600 dark:text-slate-300">
          Tu información se almacena de forma segura en el navegador. Usa la opción de logout cuando termines la sesión.
        </p>
      </section>
    </div>
  );
};

export default ProfilePage;
