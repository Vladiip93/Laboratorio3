const express = require('express');
const cors = require('cors');
const app = express();
const port = 3001;

// Middleware para parsear JSON
app.use(express.json());

// Configurar CORS para permitir solicitudes 
app.use(cors({
  origin: 'http://localhost:3000',
  optionsSuccessStatus: 200
}));

// Datos de productos
let products = [
  { id: 1, nombre: 'Smartphone Galaxy S22', precio: 700.0, stock: 25, categoryName: 'Electrónica' },
  { id: 2, nombre: 'Laptop Dell XPS 13', precio: 200.0, stock: 15, categoryName: 'Electrónica' },
  { id: 3, nombre: 'Tablet Honor Pad X9', precio: 200.0, stock: 30, categoryName: 'Computación' },
  { id: 4, nombre: 'Apple AirPods Max', precio: 350.0, stock: 40, categoryName: 'Electrónica' },
  { id: 5, nombre: 'Smart TV LG OLED55CX', precio: 149999.0, stock: 10, categoryName: 'Computación' }
];

// Datos de categorías
let categories = [
  { id: 1, nombre: 'Electrónica' },
  { id: 2, nombre: 'Hogar' },
  { id: 3, nombre: 'Computación' }
];

app.get('/', (req, res) => {
  res.send('Node JS api');
});

// Rutas para productos

// GET: Obtener todos los productos
app.get('/api/products', (req, res) => {
  // Mapea los productos y asegura que la categoría se encuentra correctamente
  res.json(products.map(product => ({
    ...product,
    categoryName: categories.find(cat => cat.nombre === product.categoryName)?.nombre || 'Desconocida'
  })));
});




// GET: Obtener un producto por ID
app.get('/api/products/:id', (req, res) => {
  const product = products.find(p => p.id === parseInt(req.params.id));
  if (!product) return res.status(404).send('Producto no encontrado');
  res.json(product);
});

// POST: Crear un nuevo producto
app.post('/api/products', (req, res) => {
  const { nombre, precio, stock, categoryName } = req.body;
  const newProduct = {
    id: products.length + 1,
    nombre,
    precio,
    stock,
    categoryName
  };
  products.push(newProduct);
  res.status(201).json(newProduct);
});

// PUT: Actualizar un producto por ID
app.put('/api/products/:id', (req, res) => {
  const product = products.find(p => p.id === parseInt(req.params.id));
  if (!product) return res.status(404).send('Producto no encontrado');

  const { nombre, precio, stock, categoryName } = req.body;
  product.nombre = nombre;
  product.precio = precio;
  product.stock = stock;
  product.categoryName = categoryName;

  res.json(product);
});

// DELETE: Eliminar un producto por ID
app.delete('/api/products/:id', (req, res) => {
  const productIndex = products.findIndex(p => p.id === parseInt(req.params.id));
  if (productIndex === -1) return res.status(404).send('Producto no encontrado');

  const deletedProduct = products.splice(productIndex, 1);
  res.json(deletedProduct);
});

// Rutas para categorías

// GET: Obtener todas las categorías
app.get('/api/categories', (req, res) => {
  res.json(categories);
});

// GET: Obtener una categoría por nombre
app.get('/api/categories/name/:name', (req, res) => {
  const category = categories.find(c => c.nombre === req.params.name);
  if (!category) return res.status(404).send('Categoría no encontrada');
  res.json(category);
});

// POST: Crear una nueva categoría
app.post('/api/categories', (req, res) => {
  const { nombre } = req.body;
  const existingCategory = categories.find(c => c.nombre === nombre);
  if (existingCategory) return res.status(400).send('Categoría ya existe');

  const newCategory = {
    id: categories.length + 1,
    nombre
  };
  categories.push(newCategory);
  res.status(201).json(newCategory);
});

// PUT: Actualizar una categoría por nombre
app.put('/api/categories/name/:name', (req, res) => {
  const category = categories.find(c => c.nombre === req.params.name);
  if (!category) return res.status(404).send('Categoría no encontrada');

  const { nombre } = req.body;
  if (categories.find(c => c.nombre === nombre)) return res.status(400).send('Nombre de categoría ya existe');

  // Actualizar el nombre de la categoría
  category.nombre = nombre;

  // Actualizar el nombre de la categoría en los productos
  products.forEach(product => {
    if (product.categoryName === req.params.name) {
      product.categoryName = nombre;
    }
  });

  res.json(category);
});


// DELETE: Eliminar una categoría por nombre
app.delete('/api/categories/name/:name', (req, res) => {
  const categoryIndex = categories.findIndex(c => c.nombre === req.params.name);
  if (categoryIndex === -1) return res.status(404).send('Categoría no encontrada');

  const deletedCategory = categories.splice(categoryIndex, 1);
  res.json(deletedCategory);
});

// Iniciar el servidor
app.listen(port, () => {
  console.log(`API REST corriendo en http://localhost:${port}`);
});
