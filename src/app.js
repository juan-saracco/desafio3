const express = require('express');
const ProductManager = require('./productManager'); // Importa la clase ProductManager 

const app = express();
const productManager = new ProductManager('./products.json');

// Endpoint para obtener todos los productos
app.get('/products', (req, res) => {
  const limit = req.query.limit; // Obtiene el valor del parámetro 'limit' si está presente

  if (limit) {
    const limitedProducts = productManager.getProducts().slice(0, limit);
    res.json(limitedProducts);
  } else {
    res.json(productManager.getProducts());
  }
});

// ...

// Endpoint para obtener un producto específico por su ID
// Endpoint para obtener un producto específico por su ID
app.get('/products/:id', (req, res) => {
    const productId = req.params.id;
    const product = productManager.getProductById(productId);
  
    if (product) {
      res.json(product);
    } else {
      res.status(404).json({ error: 'Producto no encontrado' });
    }
  });
  
  

// Inicia el servidor en el puerto 3000 (puedes cambiarlo si lo deseas)
app.listen(3000, () => {
  console.log('Servidor express en funcionamiento');
});

