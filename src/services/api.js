import axios from 'axios';

const client = axios.create({
  baseURL: 'https://fakestoreapi.com',
  timeout: 12000,
});

// Translation mappings for categories and content
const categoryTranslations = {
  'electronics': 'Electrónicos',
  'jewelery': 'Joyería',
  'men\'s clothing': 'Ropa de Hombre',
  'women\'s clothing': 'Ropa de Mujer',
  'home & garden': 'Hogar y Jardín',
  'sports & outdoors': 'Deportes y Aire Libre',
  'books': 'Libros',
};

const translateToSpanish = (text) => {
  // Basic translations for common product terms
  const translations = {
    // Electronics
    'laptop': 'portátil',
    'computer': 'computadora',
    'phone': 'teléfono',
    'smartphone': 'teléfono inteligente',
    'headphones': 'auriculares',
    'earbuds': 'auriculares inalámbricos',
    'watch': 'reloj',
    'camera': 'cámara',
    'tablet': 'tableta',
    'charger': 'cargador',
    'cable': 'cable',
    'battery': 'batería',
    'screen': 'pantalla',
    'display': 'pantalla',
    'wireless': 'inalámbrico',
    'bluetooth': 'bluetooth',
    'usb': 'USB',

    // Clothing
    'shirt': 'camisa',
    't-shirt': 'camiseta',
    'jeans': 'jeans',
    'pants': 'pantalones',
    'jacket': 'chaqueta',
    'coat': 'abrigo',
    'dress': 'vestido',
    'skirt': 'falda',
    'shoes': 'zapatos',
    'sneakers': 'zapatillas',
    'boots': 'botas',
    'sandals': 'sandalias',
    'hat': 'sombrero',
    'bag': 'bolso',
    'backpack': 'mochila',

    // Jewelry
    'ring': 'anillo',
    'necklace': 'collar',
    'earrings': 'pendientes',
    'bracelet': 'pulsera',
    'watch': 'reloj',
    'gold': 'oro',
    'silver': 'plata',
    'diamond': 'diamante',
    'pearl': 'perla',

    // Home & Garden
    'lamp': 'lámpara',
    'chair': 'silla',
    'table': 'mesa',
    'bed': 'cama',
    'sofa': 'sofá',
    'plant': 'planta',
    'pot': 'maceta',
    'decoration': 'decoración',
    'furniture': 'muebles',
    'garden': 'jardín',
    'kitchen': 'cocina',
    'bathroom': 'baño',

    // Sports
    'bicycle': 'bicicleta',
    'ball': 'pelota',
    'equipment': 'equipo',
    'fitness': 'fitness',
    'training': 'entrenamiento',
    'sports': 'deportes',
    'outdoor': 'exterior',
    'camping': 'camping',
    'hiking': 'senderismo',

    // Books
    'book': 'libro',
    'novel': 'novela',
    'guide': 'guía',
    'manual': 'manual',
    'textbook': 'libro de texto',

    // General terms
    'premium': 'premium',
    'professional': 'profesional',
    'modern': 'moderno',
    'classic': 'clásico',
    'comfortable': 'cómodo',
    'stylish': 'elegante',
    'durable': 'duradero',
    'high quality': 'alta calidad',
    'new': 'nuevo',
    'original': 'original',
    'brand': 'marca',
    'design': 'diseño',
    'material': 'material',
    'size': 'talla',
    'color': 'color',
    'black': 'negro',
    'white': 'blanco',
    'red': 'rojo',
    'blue': 'azul',
    'green': 'verde',
    'yellow': 'amarillo',
    'pink': 'rosa',
    'purple': 'morado',
    'gray': 'gris',
    'brown': 'marrón',
  };

  let translatedText = text.toLowerCase();

  // Replace known terms
  Object.entries(translations).forEach(([english, spanish]) => {
    const regex = new RegExp(`\\b${english}\\b`, 'gi');
    translatedText = translatedText.replace(regex, spanish);
  });

  // Capitalize first letter and proper nouns
  return translatedText
    .split(' ')
    .map(word => word.charAt(0).toUpperCase() + word.slice(1))
    .join(' ');
};

// Generate enhanced products with Spanish translations
const generateEnhancedProducts = (baseProducts) => {
  const enhancedProducts = [...baseProducts];

  // Translate base products to Spanish
  const translatedBaseProducts = baseProducts.map(product => ({
    ...product,
    title: translateToSpanish(product.title),
    description: translateToSpanish(product.description),
    category: product.category,
    categoryLabel: categoryTranslations[product.category] || product.category,
  }));

  // Generate 60 more products based on existing ones with Spanish translations
  for (let i = 0; i < 60; i++) {
    const baseProduct = translatedBaseProducts[i % translatedBaseProducts.length];
    const newProduct = {
      ...baseProduct,
      id: baseProducts.length + i + 1,
      title: `${translateToSpanish(baseProduct.title)} - Edición ${i + 1}`,
      price: Math.round((baseProduct.price * (0.8 + Math.random() * 0.4)) * 100) / 100, // Better prices (80%-120% of original)
      rating: {
        rate: Math.min(5, Math.round((baseProduct.rating.rate + Math.random() * 0.5) * 10) / 10), // Better ratings
        count: Math.floor(baseProduct.rating.count * (1 + Math.random() * 2)), // More reviews
      },
      description: `${translateToSpanish(baseProduct.description)} Versión mejorada con características premium.`,
    };
    enhancedProducts.push(newProduct);
  }

  return enhancedProducts;
};

export const fetchProductsApi = async () => {
  const response = await client.get('/products');
  const baseProducts = response.data;
  return generateEnhancedProducts(baseProducts);
};

export const fetchProductByIdApi = async (id) => {
  const response = await client.get(`/products/${id}`);
  return response.data;
};

export const fetchCategoriesApi = async () => {
  const response = await client.get('/products/categories');
  return response.data;
};

export default client;
