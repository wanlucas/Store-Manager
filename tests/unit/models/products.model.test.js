const { expect } = require('chai');
const sinon = require('sinon');

const connection = require('../../../src/models/connection');
const { productsModel } = require('../../../src/models');

const mocks = require('./mocks/products.model.mocks');

describe('Funcionamento do model products', function () {
  afterEach(sinon.restore);

  it('Requisição de produtos', async function () {
    sinon.stub(connection, 'execute').resolves([mocks.products]);

    const result = await productsModel.findAll();

    expect(result).to.deep.equal(mocks.products);
  });
});