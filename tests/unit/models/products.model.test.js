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

  it('Requisição de produto por id', async function () {
    sinon.stub(connection, 'execute').resolves([mocks.products[0]]);

    const result = await productsModel.findById(1);

    expect(result).to.deep.equal(mocks.products[0]);
  });
});