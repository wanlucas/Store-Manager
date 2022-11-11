const chai = require('chai');
const sinon = require('sinon');
const sinonChai = require('sinon-chai');

const { expect } = chai;
chai.use(sinonChai);

const { productsService } = require('../../../src/services');
const { productsController } = require('../../../src/controllers');

const errorMap = require('../../../src/utils/errorMap');
const mocks = require('./mocks/products.service.mock');

describe('Funcionamento do controller products', function () {
  afterEach(sinon.restore);

  describe('GET', function () {
    it('Requisição de produtos', async function () {
      sinon.stub(productsService, 'getAllProducts').resolves(
        { error: null, output: mocks.products },
      );

      const res = {};

      res.status = sinon.stub().returns(res);
      res.json = sinon.stub().returns();

      await productsController.getAllProducts({}, res);

      expect(res.status).to.have.been.calledWith(200);
      expect(res.json).to.have.been.calledWith(mocks.products);
    });

    it('Requisição de produto por id', async function () {
      sinon.stub(productsService, 'getProduct').resolves(mocks.products[0]);

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
      expect(res.json).to.have.been.calledWith();
    });

    it('Falha ao buscar id inexistente', async function () {
      const error = 'PRODUCT_NOT_FOUND';
      const { status, message } = errorMap(error);
  
      sinon.stub(productsService, 'getProduct').resolves( 
        { error, output: message },
      );

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

  describe('POST', function () { 
    it('Criação de um novo produto', async function () {
      sinon.stub(productsService, 'createProduct').resolves(mocks.newProduct);

      const res = {};
      const req = {
        body: {
          name: mocks.newProduct.name,
        },
      };

      res.status = sinon.stub().returns(res);
      res.json = sinon.stub().returns();

      await productsController.createProduct(req, res);

      expect(res.status).to.have.been.calledWith(201);
      expect(res.json).to.have.been.calledWith(mocks.newProduct.output);
    });
  });
});