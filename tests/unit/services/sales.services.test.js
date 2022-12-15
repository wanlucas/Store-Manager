const { expect } = require('chai');
const sinon = require('sinon');

const { salesModel, productsModel } = require('../../../src/models');
const { salesService } = require('../../../src/services');

const mocks = require('./mocks/sales.service.mock');

describe('Funcionamento do service sales', function () {
  afterEach(sinon.restore);

  describe('GET', function () {
    it('Requisição de vendas', async function () {
      sinon.stub(salesModel, 'findAll').resolves(mocks.sales);

      const result = await salesService.getSales();

      expect(result).to.deep.equal({ error: null, output: mocks.sales });
    });

    it('Tratamendo de erro na requisição de vendas', async function () {
      sinon.stub(salesModel, 'findAll').rejects(mocks.internalError);

      const { error } = await salesService.getSales();

      expect(error).to.deep.equal(mocks.internalError.message);
    });

    it('Requisição de vendas por id', async function () {
      sinon.stub(salesModel, 'findById').resolves([mocks.sales[0]]);

      const result = await salesService.getSaleById(1);

      expect(result).to.deep.equal({ error: null, output: [mocks.sales[0]] });
    });

    it('Falha ao buscar venda inexistente', async function () {
      sinon.stub(salesModel, 'findById').resolves([]);

      const result = await salesService.getSaleById(1);

      expect(result).to.deep.equal({ error: 'SALE_NOT_FOUND' });
    });

    it('Tratamendo de erro na requisição de vendas por id', async function () {
      sinon.stub(salesModel, 'findById').rejects(mocks.internalError);

      const { error } = await salesService.getSaleById();

      expect(error).to.deep.equal(mocks.internalError.message);
    });
  });

  describe('POST', function () {
    it('Criação de um nova venda', async function () {
      sinon.stub(productsModel, 'findById').resolves([]);
      sinon.stub(salesModel, 'insert').resolves(mocks.createdSale);

      const result = await salesService.createSale(mocks.newSales);

      expect(result).to.deep.equal({ error: null, output: mocks.createdSale });
    });

    it('Falha ao tentar criar venda com produto inexistente', async function () {
      sinon.stub(productsModel, 'findById').resolves();
  
      const result = await salesService.createSale(mocks.newSales);

      expect(result).to.deep.equal({ error: 'PRODUCT_NOT_FOUND' });
    });

    it('Tratamendo de erro na criação de venda', async function () {
      sinon.stub(productsModel, 'findById').resolves(['item']);
      sinon.stub(salesModel, 'insert').rejects(mocks.internalError);

      const { error } = await salesService.createSale(mocks.newSales);

      expect(error).to.deep.equal(mocks.internalError.message);
    });
  });

  describe('PUT', function () {
    it('Atualização de venda', async function () {
      sinon.stub(salesModel, 'findById').resolves(['item']);
      sinon.stub(productsModel, 'findById').resolves(['item']);
      sinon.stub(salesModel, 'update').resolves(mocks.updatedSale);

      const result = await salesService.updateSale(mocks.newSales);

      expect(result).to.deep.equal({ error: null, output: mocks.updatedSale });
    });

    it('Falha ao tentar atualizar venda inexistente', async function () {
      sinon.stub(salesModel, 'findById').returns([]);

      const result = await salesService.updateSale(mocks.newSales);

      expect(result).to.deep.equal({ error: 'SALE_NOT_FOUND' });
    });

    it('Falha ao tentar atualizar venda com produto inexistente', async function () {
      sinon.stub(salesModel, 'findById').resolves(['item']);
      sinon.stub(productsModel, 'findById').resolves();
      sinon.stub(salesModel, 'update').resolves();

      const result = await salesService.updateSale(1, mocks.newSales);

      expect(result).to.deep.equal({ error: 'PRODUCT_NOT_FOUND' });
    });

    it('Tratamendo de erro na atualização de venda', async function () {
      sinon.stub(salesModel, 'findById').resolves(['item']);
      sinon.stub(productsModel, 'findById').resolves(['item']);
      sinon.stub(salesModel, 'update').rejects(mocks.internalError);

      const { error } = await salesService.updateSale(mocks.newSales);

      expect(error).to.deep.equal(mocks.internalError.message);
    });
  });

  describe('DELETE', function () { 
    it('Exclusão de venda', async function () {
      sinon.stub(salesModel, 'findById').resolves(['item']);
      sinon.stub(salesModel, 'erase');

      const result = await salesService.deleteSale(1);

      expect(result).to.deep.equal({ error: null });
    });

    it('Falha ao tentar excluir venda inexistente', async function () {
      sinon.stub(salesModel, 'findById').resolves([]);

      const result = await salesService.deleteSale(mocks.newSales);

      expect(result).to.deep.equal({ error: 'SALE_NOT_FOUND' });
    });

    it('Tratamendo de erro na exclusão de venda', async function () {
      sinon.stub(salesModel, 'findById').resolves(['item']);
      sinon.stub(productsModel, 'findById').resolves(['item']);
      sinon.stub(salesModel, 'erase').rejects(mocks.internalError);

      const { error } = await salesService.deleteSale(mocks.newSales);

      expect(error).to.deep.equal(mocks.internalError.message);
    });
  });
});