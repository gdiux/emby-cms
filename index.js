//Env
require('dotenv').config();
const path = require('path');

const express = require('express');
const cors = require('cors');
const bodyParser = require('body-parser');

//Conection DB
const { dbConection } = require('./database/config');
const { validateDate } = require('./middlewares/validar-subscriber');

// Crear el servidor express
const app = express();

// CORS
app.use(cors());

//app.use(express.bodyParser({ limit: '50mb' }));
// READ BODY
app.use(express.json({ limit: '50mb' }));
app.use(express.urlencoded({ limit: '50mb', extended: true, parameterLimit: 50000 }));

// DataBase
dbConection();

// DIRECTORIO PUBLICO
app.use(express.static('public'));

// RUTAS
app.use('/api/login', require('./routes/auth.route'));
app.use('/api/payments', require('./routes/payments.route'));
app.use('/api/servers', require('./routes/servers.route'));
app.use('/api/subscriptions', require('./routes/subscription.route'));
app.use('/api/uploads', require('./routes/uploads.route'));
app.use('/api/users', require('./routes/users.route'));


// SPA
app.get('*', (req, res) => {
    res.sendFile(path.resolve(__dirname, 'public/index.html'));
});

app.listen(process.env.PORT, () => {
    console.log('Servidor Corriendo en el Puerto', process.env.PORT);
});

// COMPROBAR FECHA DE LOS SUBSCRITORES
setInterval(() => {
    validateDate();
}, 3600000);