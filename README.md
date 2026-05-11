# Fullstack Challenge - E-commerce

Aplicación de comercio electrónico construida con un enfoque moderno y profesional, utilizando React, Vite, Tailwind CSS, Zustand, React Router DOM y Axios.

## Descripción

Este proyecto entrega una tienda en línea con navegación SPA, gestión de carrito y autenticación básica. La implementación prioriza una arquitectura escalable y componentes reutilizables bajo la metodología Atomic Design.

## Tecnologías principales

- React 18
- Vite
- Tailwind CSS
- Zustand
- Axios
- React Router DOM
- FakeStore API

## Principios de diseño

- Código modular y fácil de escalar
- Separación de responsabilidades por capas
- Componentes reutilizables y desacoplados
- Interfaz responsive para mobile, tablet y desktop
- Persistencia de estado en `localStorage`
- Optimización de rendimiento con lazy loading

## Funcionalidades

### Home
- Lista de productos en grid responsive
- Búsqueda en tiempo real
- Filtrado por categoría
- Paginación para navegación eficiente

### Producto
- Página de detalle con imagen, precio, descripción y categoría
- Botón para agregar productos al carrito

### Carrito
- Agregar y eliminar productos
- Ajustar cantidades de forma dinámica
- Cálculo automático de subtotal y total
- Persistencia del carrito en `localStorage`

### Checkout
- Resumen de la compra
- Total final de pedido
- Confirmación de compra simulada

### Autenticación
- Registro de nuevo usuario
- Login con persistencia de sesión
- Protección de ruta de checkout

### Extras
- Skeleton loaders para mejor UX
- Toast notifications básico
- Dark mode
- Fallback a mockdata local cuando la API no responde

## Estructura del proyecto

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

## Uso

Clona el repositorio, instala dependencias y ejecuta el servidor de desarrollo:

```bash
npm install
npm run dev
```

Abre `http://localhost:5173` en tu navegador.

## Scripts disponibles

- `npm run dev`: Inicia el servidor de desarrollo
- `npm run build`: Genera la versión de producción
- `npm run preview`: Previsualiza la versión de producción

## Historia de commits por bloques

### BLOQUE 1 — Inicialización
- Commit 1: Inicialización del proyecto con Vite y React
- Commit 2: Instalación de Tailwind CSS y configuración inicial
- Commit 3: Instalación de Zustand, Axios y React Router
- Commit 4: Creación de estructura base del proyecto

### BLOQUE 2 — Atomic Design
- Commit 5: Creación de componentes atoms `Button` e `Input`
- Commit 6: Creación de componente `Badge` reusable
- Commit 7: Creación de `ProductCard` en molecules
- Commit 8: Creación de `SearchForm`
- Commit 9: Creación de `Header` y `Navbar`
- Commit 10: Creación de `Footer` reusable

### BLOQUE 3 — Routing
- Commit 11: Configuración de React Router DOM
- Commit 12: Creación de rutas `Home` y `ProductDetail`
- Commit 13: Creación de rutas `Cart` y `Checkout`

### BLOQUE 4 — Mockdata
- Commit 14: Creación de mockdata de productos
- Commit 15: Creación de mockdata de usuarios
- Commit 16: Creación de mockdata de categorías

### BLOQUE 5 — Zustand
- Commit 17: Configuración de `productStore`
- Commit 18: Configuración de `cartStore` con persistencia
- Commit 19: Configuración de `authStore`

### BLOQUE 6 — Productos
- Commit 20: Implementación de `ProductGallery` responsive
- Commit 21: Integración de búsqueda en tiempo real
- Commit 22: Implementación de filtros por categoría
- Commit 23: Implementación de paginación

### BLOQUE 7 — Carrito
- Commit 24: Implementación funcional del carrito
- Commit 25: Cálculo automático de subtotal y total
- Commit 26: Manejo de cantidades

### BLOQUE 8 — Auth
- Commit 27: Login con `localStorage`
- Commit 28: Registro de usuarios
- Commit 29: Persistencia de sesión

### BLOQUE 9 — Checkout
- Commit 30: Implementación de checkout y resumen de compra

### BLOQUE 10 — Extras
- Commit 31: Optimización responsive para mobile y tablet
- Commit 32: Loaders y manejo de errores
- Commit 33: Optimización de performance
- Commit 34: Preparación para deploy
- Commit 35: Deploy final del proyecto

## Notas finales

- El proyecto utiliza FakeStore API como fuente principal de datos.
- En caso de fallo en la API, el sistema usa datos de respaldo locales.
- La solución está preparada para crecer con nuevas páginas, integraciones y mejoras de UI.

## Información del autor

- Proyecto creado por **Ivan Molina**.
- Desarrollo académico con enfoque educativo.

## Licencia

Este proyecto se publica bajo una licencia educativa para uso académico y demostrativo. Se permite la revisión, el aprendizaje y la adaptación en entornos de enseñanza y práctica profesional.
