# Fullstack Challenge - E-commerce

Proyecto E-commerce moderno construido con React, Vite, Tailwind CSS, Zustand, React Router DOM y Axios.

## 🚀 Características principales

- SPA con navegación fluida y lazy loading
- Diseño responsive para mobile, tablet y desktop
- Persistencia de carrito y sesión con `localStorage`
- Consumo de datos desde FakeStore API con Axios
- Arquitectura basada en Atomic Design
- Componentes reutilizables y código modular
- Manejo de errores y loaders
- Dark mode y optimización de rendimiento

## 📁 Estructura del proyecto

```
src/
├── components/
│   ├── atoms/
│   ├── molecules/
│   ├── organisms/
│   └── templates/
├── hooks/
├── mockdata/
├── pages/
├── services/
├── store/
├── styles/
├── utils/
└── index.css
```

## 🧩 Funcionalidades implementadas

1. **Home Page**
   - Listado de productos
   - Grid responsive
   - Buscador en tiempo real
   - Paginación
   - Filtros por categoría

2. **Product Detail**
   - Imagen, precio, descripción y categoría
   - Agregar al carrito desde la vista del producto

3. **Carrito de compras**
   - Agregar productos
   - Eliminar productos
   - Cambiar cantidades
   - Cálculo automático de subtotal y total

4. **Checkout**
   - Vista previa de compra
   - Resumen de productos
   - Total final

5. **Autenticación**
   - Login y registro
   - Persistencia de sesión en `localStorage`

6. **Zustand**
   - Stores para `authStore`, `cartStore` y `productStore`

7. **Extras**
   - Skeleton loaders
   - Dark mode
   - Persistencia del carrito

## 🛠️ Instalación

```bash
npm install
npm run dev
```

## ✅ Commit plan y historias de usuario

### BLOQUE 1 — Inicialización
- **Commit 1**: Inicialización del proyecto con Vite y React
- **Commit 2**: Instalación de Tailwind CSS y configuración inicial
- **Commit 3**: Instalación de Zustand, Axios y React Router
- **Commit 4**: Creación de estructura base del proyecto

### BLOQUE 2 — Atomic Design
- **Commit 5**: Creación de componentes atoms `Button` e `Input`
- **Commit 6**: Creación de componente `Badge` reutilizable
- **Commit 7**: Creación de `ProductCard` en molecules
- **Commit 8**: Creación de `SearchForm` component
- **Commit 9**: Creación de `Header` y `Navbar`
- **Commit 10**: Creación de `Footer` reusable

### BLOQUE 3 — Routing
- **Commit 11**: Configuración de React Router DOM
- **Commit 12**: Creación de rutas `Home` y `ProductDetail`
- **Commit 13**: Creación de rutas `Cart` y `Checkout`

### BLOQUE 4 — Mockdata
- **Commit 14**: Creación de mockdata de productos
- **Commit 15**: Creación de mockdata de usuarios
- **Commit 16**: Creación de mockdata de categorías

### BLOQUE 5 — Zustand
- **Commit 17**: Configuración de `productStore` con Zustand
- **Commit 18**: Configuración de `cartStore` con persistencia
- **Commit 19**: Configuración de `authStore`

### BLOQUE 6 — Productos
- **Commit 20**: Implementación de `ProductGallery` responsive
- **Commit 21**: Integración de búsqueda en tiempo real
- **Commit 22**: Implementación de filtros por categoría
- **Commit 23**: Implementación de paginación de productos

### BLOQUE 7 — Carrito
- **Commit 24**: Implementación funcional del carrito de compras
- **Commit 25**: Cálculo automático de subtotal y total
- **Commit 26**: Implementación de cambio de cantidades

### BLOQUE 8 — Auth
- **Commit 27**: Implementación de login con `localStorage`
- **Commit 28**: Implementación de registro de usuarios
- **Commit 29**: Persistencia de sesión de usuario

### BLOQUE 9 — Checkout
- **Commit 30**: Implementación de checkout y resumen de compra

### BLOQUE 10 — Extras
- **Commit 31**: Optimización responsive para mobile y tablet
- **Commit 32**: Implementación de loaders y manejo de errores
- **Commit 33**: Optimización de performance y renders
- **Commit 34**: Preparación de deploy para GitHub Pages
- **Commit 35**: Deploy final del proyecto ecommerce

## 📌 Notas

- Los datos se consumen de la FakeStore API con Axios.
- La aplicación cuenta con fallback de mockdata local cuando la API no responde.
- El diseño sigue principios de separación de responsabilidades y Atomic Design.
