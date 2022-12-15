const { expect } = require('chai');
const sinon = require('sinon');

const connection = require('../../../src/models/connection');
const { salesModel } = require('../../../src/models');

const mocks = require('./mocks/sales.model.mocks');

describe('Funcionamento do model sales', function () {
  afterEach(sinon.restore);

  describe('GET', function () { 
    it('requisição de vendas', async function () {
      sinon.stub(connection, 'execute').resolves([mocks.sales]);

      const result = await salesModel.findAll();

      expect(result).to.deep.equal(mocks.sales);
    });

    it('requisição de vendas por id', async function () {
      sinon.stub(connection, 'execute').resolves([mocks.sales[0]]);

      const result = await salesModel.findById(1);

      expect(result).to.deep.equal(mocks.sales[0]);
    });
  });

  describe('POST', function () {
    it('Criação de nova venda', async function () {
      sinon.stub(connection, 'execute')
        .onFirstCall().resolves([{ insertId: 5 }]);

      const result = await salesModel.insert(mocks.newSales);

      expect(result).to.deep.equal({ id: 5, itemsSold: mocks.newSales });
    });
  });

  describe('PUT', function () {
    it('Atualização de venda', async function () {
      sinon.stub(connection, 'execute');

      const result = await salesModel.update(1, mocks.newSales);

      expect(result).to.deep.equal({ saleId: 1, itemsUpdated: mocks.newSales });
    });
  });

  describe('DELETE', function () {
    it('Exclusão de venda', async function () {
      sinon.stub(connection, 'execute');

      const result = await salesModel.erase(1);

      expect(result).to.deep.equal();
    });
  });
});