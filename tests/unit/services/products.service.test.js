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

    it('Tratamendo de erro na requisição de produtos', async function () {
      sinon.stub(productsModel, 'findAll').rejects(mocks.internalError);

      const { error } = await productsService.getAllProducts(mocks.newSales);

      expect(error).to.deep.equal(mocks.internalError.message);
    });

    it('Busca de produto', async function () {
      sinon.stub(productsModel, 'query').returns(mocks.products[0]);

      const result = await productsService.searchProducts('M');

      expect(result).to.deep.equal({ error: null, output: mocks.products[0] });
    });

    it('Tratamendo de erro na busca de produto', async function () {
      sinon.stub(productsModel, 'query').rejects(mocks.internalError);

      const { error } = await productsService.searchProducts();

      expect(error).to.deep.equal(mocks.internalError.message);
    });

    it('Requisição de produto por id', async function () {
      sinon.stub(productsModel, 'findById').returns(mocks.products[0]);

      const result = await productsService.getProduct(1);

      expect(result).to.deep.equal({ error: null, output: mocks.products[0] });
    });

    it('Falha ao buscar id inexistente', async function () {
      sinon.stub(productsModel, 'findById').returns();

      const result = await productsService.getProduct(1);

      expect(result).to.deep.equal({ error: 'PRODUCT_NOT_FOUND' });
    });

    it('Tratamendo de erro na requisição de produto por id', async function () {
      sinon.stub(productsModel, 'findById').rejects(mocks.internalError);

      const { error } = await productsService.getProduct(1);

      expect(error).to.deep.equal(mocks.internalError.message);
    });
  });

  describe('POST', function () {
    it('Criação de um novo produto', async function () {
      sinon.stub(productsModel, 'insert').returns(mocks.newProduct);

      const result = await productsService.createProduct();

      expect(result).to.deep.equal({ error: null, output: mocks.newProduct });
    });

    it('Tratamendo de erro na criação de produto', async function () {
      sinon.stub(productsModel, 'insert').rejects(mocks.internalError);

      const { error } = await productsService.createProduct();

      expect(error).to.deep.equal(mocks.internalError.message);
    });
  });

  describe('PUT', function () {
    it('Atualização de um produto', async function () {
      sinon.stub(productsModel, 'findById').resolves({ name: 'xulapa' });
      sinon.stub(productsModel, 'update').resolves({ name: 'xulapa' });

      const result = await productsService.updateProduct(1, { name: 'xulapa' });

      expect(result).to.deep.equal({ error: null, output: { name: 'xulapa' } });
    });
    
    it('Falha ao tentar atualizar produto inexistente', async function () {
      sinon.stub(productsModel, 'findById').returns();

      const result = await productsService.updateProduct('1', { name: 'xulapa' });

      expect(result).to.deep.equal({ error: 'PRODUCT_NOT_FOUND' });
    });

    it('Tratamendo de erro na atualização de produto', async function () {
      sinon.stub(productsModel, 'update').rejects(mocks.internalError);

      const { error } = await productsService.updateProduct();

      expect(error).to.deep.equal(mocks.internalError.message);
    });
  });

  describe('DELETE', function () { 
    it('Exclusão de um produto', async function () {
      sinon.stub(productsModel, 'findById').resolves({ name: 'xulapa' });
      sinon.stub(productsModel, 'erase').resolves({ affectedRows: 2 });

      const result = await productsService.deleteProduct(1);

      expect(result).to.deep.equal({ error: null });
    });

    it('Falha ao tentar deletar produto inexistente', async function () {
      sinon.stub(productsModel, 'findById').returns();

      const result = await productsService.deleteProduct('1', { name: 'xulapa' });

      expect(result).to.deep.equal({ error: 'PRODUCT_NOT_FOUND' });
    });

    it('Tratamendo de erro na exclusão de produto', async function () {
      sinon.stub(productsModel, 'erase').rejects(mocks.internalError);

      const { error } = await productsService.deleteProduct(1);

      expect(error).to.deep.equal(mocks.internalError.message);
    });
  });
});