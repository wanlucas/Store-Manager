const { expect } = require('chai');
const sinon = require('sinon');

const { salesModel } = require('../../../src/models');
const { salesService } = require('../../../src/services');

const mocks = require('./mocks/sales.service.mock');

describe('Funcionamento do service sales', function () {
  afterEach(sinon.restore);

  describe('GET', function () {
    it('Requisição de vendas', async function () {
      sinon.stub(salesModel, 'findAll').resolves(mocks.sales);

      const { output } = await salesService.getSales();

      expect(output).to.deep.equal(mocks.sales);
    });

    it('requisição de vendas por id', async function () {
      sinon.stub(salesModel, 'findById').resolves([mocks.sales[0]]);

      const { output } = await salesService.getSaleById(1);

      expect(output).to.deep.equal([mocks.sales[0]]);
    });
  });

  describe('POST', function () {
    it('Criação de um nova venda', async function () {
      sinon.stub(salesModel, 'insert').resolves({ affectedRows: 5, insertId: 3 });

      const { output } = await salesService.createSale(mocks.newSales);

      expect(output).to.deep.equal({ affectedRows: 5, insertId: 3 });
    });

    it('Tratamendo de erro na criação de venda', async function () {
      sinon.stub(salesModel, 'insert').rejects(mocks.saleCreationFailed);

      const { error } = await salesService.createSale(mocks.newSales);

      expect(error).to.deep.equal(mocks.saleCreationFailed.message);
    });
  });
});