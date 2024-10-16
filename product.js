const express = require('express');
const mysql = require('mysql2');
const cors = require('cors');
const app = express();
const PORT = 3000;

// Middleware
app.use(cors());
app.use(express.json());

// Configuración de la base de datos
const db = mysql.createConnection({
  host: 'localhost',
  user: 'root',  
  password: '123456',  
  database: 'dbnode'   
});

// Conectar a la base de datos
db.connect((err) => {
  if (err) throw err;
  console.log('Conectado a la base de datos MySQL');
});

// Rutas CRUD

// Obtener todos los productos
app.get('/api/products', (req, res) => {
  const sql = 'SELECT * FROM productos';
  db.query(sql, (err, result) => {
    if (err) throw err;
    res.send(result);
  });
});

// Crear un nuevo producto
app.post('/api/products', (req, res) => {
  const { nombre, precio, fecha, stock } = req.body;
  const sql = 'INSERT INTO productos (nombre, precio, fecha, stock) VALUES (?, ?, ?, ?)';
  db.query(sql, [nombre, precio, fecha, stock], (err, result) => {
    if (err) throw err;
    res.send({ idproducto: result.insertId, nombre, precio, fecha, stock });
  });
});

// Actualizar un producto
app.put('/api/products/:id', (req, res) => {
  const { nombre, precio, fecha, stock } = req.body;
  const { id } = req.params;  // Obteniendo el ID desde la URL
  const sql = 'UPDATE productos SET nombre = ?, precio = ?, fecha = ?, stock = ? WHERE idproducto = ?';
  db.query(sql, [nombre, precio, fecha, stock, id], (err, result) => {
    if (err) throw err;
    res.send({ id, nombre, precio, fecha, stock });
  });
});
// Eliminar un producto
app.delete('/api/products/:id', (req, res) => {
  const { id } = req.params;
  const sql = 'DELETE FROM productos WHERE idproducto = ?';
  db.query(sql, [id], (err, result) => {
    if (err) throw err;
    res.send({ message: 'Producto eliminado', id });
  });
});

// Iniciar el servidor
app.listen(PORT, () => {
  console.log(`Servidor corriendo en http://localhost:${PORT}`);
});


/** CREACION DE LA TABLA PRODUCTOOOO 
 
  
 
 CREATE TABLE productos (
    idproducto INT AUTO_INCREMENT PRIMARY KEY,
    nombre VARCHAR(255) NOT NULL,
    precio DECIMAL(10, 2) NOT NULL,
    fecha DATE NOT NULL,
    stock INT NOT NULL
);



**/