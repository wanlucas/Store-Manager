const express = require('express');

const app = express();

const routes = require('./routers');

app.use(express.json());

app.use('/products', routes.productsRouter);
app.use('/sales', routes.salesRouter);
    
// não remova esse endpoint, é para o avaliador funcionar
app.get('/', (_request, response) => {
  response.send();
});

// não remova essa exportação, é para o avaliador funcionar
// você pode registrar suas rotas normalmente, como o exemplo acima
// você deve usar o arquivo index.js para executar sua aplicação 
module.exports = app;