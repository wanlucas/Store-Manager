const chai = require('chai');
const sinon = require('sinon');
const sinonChai = require('sinon-chai');

const { expect } = chai;
chai.use(sinonChai);

const { productsModel } = require('../../../src/models');
const { productsController } = require('../../../src/controllers');

const errorMap = require('../../../src/utils/errorMap');
const mocks = require('./mocks/products.service.mock');

describe('Funcionamento do controller products', function () {
  afterEach(sinon.restore);

  it('Requisição de produtos', async function () {
    sinon.stub(productsModel, 'findAll').resolves(mocks.products);

    const res = {};

    res.status = sinon.stub().returns(res);
    res.json = sinon.stub().returns();

    await productsController.getAllProducts({}, res);

    expect(res.status).to.have.been.calledWith(200);
    expect(res.json).to.have.been.calledWith(mocks.products);
  });

  it('Requisição de produto por id', async function () { 
    sinon.stub(productsModel, 'findById').resolves(mocks.products[0]);

    const res = {};
    const req = {
      params: {
        id: 1,
      },
    };

    res.status = sinon.stub().returns(res);
    res.json = sinon.stub().returns();

    await productsController.getProduct(req, res);

    expect(res.status).to.have.been.calledWith(200);
    expect(res.json).to.have.been.calledWith(mocks.products[0]);
  });

  it('Falha ao buscar id inexistente', async function () { 
    sinon.stub(productsModel, 'findById').resolves();

    const { status, message } = errorMap('PRODUCT_NOT_FOUND');
    const res = {};
    const req = {
      params: {
        id: 1,
      },
    };

    res.status = sinon.stub().returns(res);
    res.json = sinon.stub().returns();

    await productsController.getProduct(req, res);

    expect(res.status).to.have.been.calledWith(status);
    expect(res.json).to.have.been.calledWith({ message });
  });
});