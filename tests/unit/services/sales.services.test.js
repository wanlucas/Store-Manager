const { expect } = require('chai');
const sinon = require('sinon');

const { salesModel } = require('../../../src/models');
const { salesService, productsService } = require('../../../src/services');

const mocks = require('./mocks/sales.service.mock');

describe('Funcionamento do service sales', function () {
  afterEach(sinon.restore);

  describe('GET', function () {
    it('Requisição de vendas', async function () {
      sinon.stub(salesModel, 'findAll').resolves(mocks.sales);

      const result = await salesService.getSales();

      expect(result).to.deep.equal({ error: null, output: mocks.sales });
    });

    it('requisição de vendas por id', async function () {
      sinon.stub(salesModel, 'findById').resolves([mocks.sales[0]]);

      const result = await salesService.getSaleById(1);

      expect(result).to.deep.equal({ error: null, output: [mocks.sales[0]] });
    });
  });

  describe('POST', function () {
    it('Criação de um nova venda', async function () {
      sinon.stub(productsService, 'doesProductsExist').resolves(true);
      sinon.stub(salesModel, 'insert').resolves(mocks.createdSale);

      const result = await salesService.createSale(mocks.newSales);

      expect(result).to.deep.equal({ error: null, output: mocks.createdSale });
    });

    it('Tratamendo de erro na criação de venda', async function () {
      sinon.stub(productsService, 'doesProductsExist').resolves(true);
      sinon.stub(salesModel, 'insert').rejects(mocks.saleCreationFailed);

      const { error } = await salesService.createSale(mocks.newSales);

      expect(error).to.deep.equal(mocks.saleCreationFailed.message);
    });
  });
});