const { expect } = require('chai');
const sinon = require('sinon');

const connection = require('../../../src/models/connection');
const { salesModel } = require('../../../src/models');

const mocks = require('./mocks/sales.model.mocks');

describe('Funcionamento do model sales', function () {
  afterEach(sinon.restore);

  describe('POST', function () {
    it('Criação de nova venda', async function () {
      sinon.stub(connection, 'execute')
        .onFirstCall().resolves([{ insertId: 5 }]);

      const result = await salesModel.insert(mocks.newSales);

      expect(result).to.deep.equal({ id: 5, itemsSold: mocks.newSales });
    });
  });
});