const { expect } = require('chai');
const sinon = require('sinon');

const { productsModel } = require('../../../src/models');
const { productsService } = require('../../../src/services');

const mocks = require('./mocks/products.service.mock');

describe('Funcionamento do service products', function () {
  afterEach(sinon.restore);
  
  it('Requisição de produtos', async function () {
    sinon.stub(productsModel, 'findAll').resolves(mocks.products);

    const result = await productsService.getAllProducts();
    console.log(result);

    expect(result).to.deep.equal(mocks.products);
  });
});