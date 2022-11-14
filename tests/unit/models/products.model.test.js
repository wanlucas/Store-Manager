const { expect } = require('chai');
const sinon = require('sinon');

const connection = require('../../../src/models/connection');
const { productsModel } = require('../../../src/models');

const mocks = require('./mocks/products.model.mocks');

describe('Funcionamento do model products', function () {
  afterEach(sinon.restore);
   
  describe('GET', function () {
    it('Requisição de produtos', async function () {
      sinon.stub(connection, 'execute').resolves([mocks.products]);

      const result = await productsModel.findAll();

      expect(result).to.deep.equal(mocks.products);
    });

    it('Requisição de produto por id', async function () {
      sinon.stub(connection, 'execute').resolves([[mocks.products[0]]]);

      const result = await productsModel.findById(1);

      expect(result).to.deep.equal(mocks.products[0]);
    });
  });

  describe('POST', function () { 
    it('Criação de um novo produto', async function () {
      sinon.stub(connection, 'execute').resolves([{ insertId: 3 }]);      

      const result = await productsModel.insert(mocks.newProduct);

      expect(result).to.deep.equal({ ...mocks.newProduct, id: 3 });
    });
  });

  describe('PUT', function () {
    it('Atualização de um produto', async function () {
      sinon.stub(connection, 'execute').resolves();
      
      const result = await productsModel.update(1, { name: 'xulapa' });

      expect(result).to.deep.equal({ name: 'xulapa' });
    });
  });
});