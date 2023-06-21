const app = require('./app');
const cors = require('cors');
const port = process.env.PORT || 5000;

require('dotenv').config({
  path: process.env.NODE_ENV === "test" ? ".env.testing" : ".env"
})

app.use(cors());

const knex = require('knex')({
  client: 'mysql2',
  connection: '',
  pool: {
    min: 2,
    max: 10,
  }
});

// exemplo de transaction pratu
knex.transaction((trx) => {

  knex('tabela').transacting(trx).insert({ coluna1: 'valor1', coluna2: 'valor2' })
    .then(() => {
      
      return knex('outra_tabela').transacting(trx).update({ coluna3: 'valor3' });
    })
    .then(trx.commit) 
    .catch(trx.rollback); 
})
  .then(() => {
    console.log('Transação concluída com sucesso!');
    knex.destroy();
  })
  .catch((err) => {
    console.error('Erro ao executar a transação:', err);
    knex.destroy(); 
  });


const routes = require('./routes/index.routes')
app.use('/api', routes);



app.listen(port, () => {
  console.log(`Server is running on port http://localhost:${port}/`);
});

module.exports = knex;