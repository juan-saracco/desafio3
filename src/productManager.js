const fs = require('fs');


class ProductManager {
  constructor(filePath) {
    this.filePath = filePath; // Ruta del archivo de productos
    this.products = this.loadProducts(); // Carga los productos desde el archivo
  }

  loadProducts() {
    try {
      const data = fs.readFileSync(this.filePath, 'utf8');
      return JSON.parse(data);
    } catch (error) {
      console.error('Error al cargar los productos:', error);
      return [];
    }
  }
  

  saveProducts() {
    try {
      const data = JSON.stringify(this.products);
      fs.writeFileSync(this.filePath, data, 'utf8');
    } catch (error) {
      console.error('Error al guardar los productos:', error);
    }
  }

  getProducts() {
    return this.products;
  }

  getProductById(id) {
  console.log('Products:', this.products);
  console.log('Searching for ID:', id);
  const numericId = parseInt(id, 10);
  const product = this.products.find(product => {
    console.log('Product ID:', product.id); // Agrega este console.log para imprimir el ID de cada producto
    return product.id === numericId;
  });

  if (product) {
    return product;
  } else {
    console.log('Product not found');
    return null;
  }
}
  

  addProduct(product) {
    this.products.push(product);
    this.saveProducts();
  }

  updateProduct(id, updatedProduct) {
    const index = this.products.findIndex(product => product.id === id);
    if (index !== -1) {
      this.products[index] = updatedProduct;
      this.saveProducts();
      return true;
    }
    return false;
  }

  deleteProduct(id) {
    const index = this.products.findIndex(product => product.id === id);
    if (index !== -1) {
      this.products.splice(index, 1);
      this.saveProducts();
      return true;
    }
    return false;
  }
}

module.exports = ProductManager;
