import express from 'express';
import bodyParser from 'body-parser';
import fs from 'fs';
import cors from 'cors'; // Importa CORS

const app = express();
const PORT = 3000;

// Habilitar CORS para solicitudes desde un origen específico
app.use(cors({
  origin: 'http://localhost:5173', // Permitir solicitudes solo desde el cliente
}));

app.use(bodyParser.json());

// Ruta para leer el JSON
app.get('/api/data', (req, res) => {
  fs.readFile('./src/jsons/Empresas.json', 'utf8', (err, data) => {
    if (err) {
      return res.status(500).send('Error al leer el archivo JSON');
    }
    try {
      const jsonData = JSON.parse(data);
      res.json(jsonData);
    } catch (parseError) {
      res.status(500).send('Error al procesar el archivo JSON');
    }
  });
});

// Ruta para agregar datos al JSON
app.post('/api/data', (req, res) => {
    const newData = req.body; // Los datos enviados en la solicitud
    console.log('Datos recibidos para guardar:', newData);
  
    // Asegurarse de que los datos son un array
    if (!Array.isArray(newData)) {
      return res.status(400).send('Los datos enviados deben ser un array.');
    }
  
    // Sobrescribir el archivo JSON con los nuevos datos
    fs.writeFile('./src/jsons/Empresas.json', JSON.stringify(newData, null, 2), (err) => {
      if (err) {
        console.error('Error al escribir en el archivo JSON:', err);
        return res.status(500).send('Error al guardar los datos en el archivo JSON.');
      }
  
      console.log('Archivo JSON sobrescrito con éxito.');
      res.send('Datos guardados correctamente.');
    });
  });
  

// Iniciar el servidor
app.listen(PORT, () => {
  console.log(`Servidor corriendo en http://localhost:${PORT}`);
});
