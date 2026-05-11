import Input from '../atoms/Input.jsx';

const SearchForm = ({ value, onChange }) => (
  <div className="rounded-[28px] border border-slate-200 bg-white p-4 shadow-soft dark:border-slate-800 dark:bg-slate-900">
    <Input
      label="Buscar productos"
      placeholder="Escribe nombre, descripción o categoría"
      value={value}
      onChange={(event) => onChange(event.target.value)}
    />
  </div>
);

export default SearchForm;
