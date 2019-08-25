const mongoose = require('mongoose');

mongoose.connect('url', { useMongoClient: true }).then(() => {
    console.log('Database Connected');
}).catch(err => {
    console.log('Erro ao se conectar :( ' + err);
});

