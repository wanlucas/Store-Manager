const { expect } = require('chai');
const sinon = require('sinon');

const { productsModel } = require('../../../src/models');
const { productsService } = require('../../../src/services');

const mocks = require('./mocks/products.service.mock');

describe('Funcionamento do service products', function () {
  afterEach(sinon.restore);

  describe('GET', function () {
    it('Requisição de produtos', async function () {
      sinon.stub(productsModel, 'findAll').returns(mocks.products);

      const result = await productsService.getAllProducts();

      expect(result).to.deep.equal({ error: null, output: mocks.products });
    });

    it('Reauisição de produto por id', async function () {
      sinon.stub(productsModel, 'findById').returns(mocks.products[0]);

      const result = await productsService.getProduct(1);

      expect(result).to.deep.equal({ error: null, output: mocks.products[0] });
    });
  });

  describe('POST', function () {
    it('Criação de um novo produto', async function () {
      sinon.stub(productsModel, 'insert').returns(mocks.newProduct);

      const result = await productsService.createProduct();

      expect(result).to.deep.equal({ error: null, output: mocks.newProduct });
    });
  });

  describe('PUT', function () {
    it('Atualização de um produto', async function () {
      sinon.stub(productsModel, 'findById').resolves({ name: 'xulapa' });
      sinon.stub(productsModel, 'update').resolves({ name: 'xulapa' });

      const result = await productsService.updateProduct(1, { name: 'xulapa' });

      expect(result).to.deep.equal({ error: null, output: { name: 'xulapa' } });
    });
  });

  describe('DELETE', function () { 
    it('Exclusão de um produto', async function () {
      sinon.stub(productsModel, 'findById').resolves({ name: 'xulapa' });
      sinon.stub(productsModel, 'erase').resolves({ affectedRows: 2 });

      const result = await productsService.deleteProduct(1);

      expect(result).to.deep.equal({ error: null, output: { affectedRows: 2 } });
    });
  });
});