const chai = require('chai');
const sinon = require('sinon');
const sinonChai = require('sinon-chai');

const { expect } = chai;
chai.use(sinonChai);

const { productsService } = require('../../../src/services');
const { productsController } = require('../../../src/controllers');

const errorMap = require('../../../src/utils/errorMap');
const mocks = require('./mocks/products.service.mock');
const mockController = require('./utils/mockController');

describe('Funcionamento do controller products', function () {
  afterEach(sinon.restore);

  describe('GET', function () {
    it('Requisição de produtos', async function () {
      sinon.stub(productsService, 'getAllProducts').resolves(
        { error: null, output: mocks.products },
      );

      const { req, res } = mockController();
  
      await productsController.getAllProducts(req, res);

      expect(res.status).to.have.been.calledWith(200);
      expect(res.json).to.have.been.calledWith(mocks.products);
    });

    it('Tratamendo de erro na requisição de produtos', async function () {
      sinon.stub(productsService, 'getAllProducts').resolves({ error: 'error' });

      const { req, res } = mockController();

      await productsController.getAllProducts(req, res);

      expect(res.status).to.have.been.calledWith(500);
      expect(res.json).to.have.been.calledWith(mocks.internalError);
    });

    it('Busca de produto', async function () {
      sinon.stub(productsService, 'searchProducts').resolves(mocks.newProduct);

      const { req, res } = mockController({ query: { q: 'M' } });

      await productsController.searchProducts(req, res);

      expect(res.status).to.have.been.calledWith(200);
      expect(res.json).to.have.been.calledWith(mocks.newProduct.output);
    });

    it('Tratamendo de erro na busca de produto', async function () {
      sinon.stub(productsService, 'searchProducts').resolves({ error: 'error' });

      const { req, res } = mockController({ query: { q: 'M' } });

      await productsController.searchProducts(req, res);

      expect(res.status).to.have.been.calledWith(500);
      expect(res.json).to.have.been.calledWith(mocks.internalError);
    });

    it('Requisição de produto por id', async function () {
      sinon.stub(productsService, 'getProduct').resolves(mocks.products[0]);

      const { req, res } = mockController({ params: { id: 1 } });

      await productsController.getProduct(req, res);

      expect(res.status).to.have.been.calledWith(200);
      expect(res.json).to.have.been.calledWith();
    });

    it('Tratamendo de erro na requisição de produto por id', async function () {
      sinon.stub(productsService, 'getProduct').resolves({ error: 'error' });

      const { req, res } = mockController({ params: { id: 1 } });

      await productsController.getProduct(req, res);

      expect(res.status).to.have.been.calledWith(500);
      expect(res.json).to.have.been.calledWith(mocks.internalError);
    });

    it('Falha ao buscar id inexistente', async function () {
      const error = 'PRODUCT_NOT_FOUND';
      const { status, message } = errorMap(error);
  
      sinon.stub(productsService, 'getProduct').resolves( 
        { error, output: message },
      );

      const { req, res } = mockController({ params: { id: 1 } });

      await productsController.getProduct(req, res);

      expect(res.status).to.have.been.calledWith(status);
      expect(res.json).to.have.been.calledWith({ message });
    });
  });

  describe('POST', function () { 
    it('Criação de um novo produto', async function () {
      sinon.stub(productsService, 'createProduct').resolves(mocks.newProduct);

      const { req, res } = mockController({ body: { name: mocks.newProduct.name } });

      await productsController.createProduct(req, res);

      expect(res.status).to.have.been.calledWith(201);
      expect(res.json).to.have.been.calledWith(mocks.newProduct.output);
    });

    it('Tratamendo de erro na criação de produto', async function () {
      sinon.stub(productsService, 'createProduct').resolves({ error: 'INTERNAL_ERROR' });

      const { req, res } = mockController({ body: { name: 'BOLINHA DE GORFE' } });

      await productsController.createProduct(req, res);

      expect(res.status).to.have.been.calledWith(500);
      expect(res.json).to.have.been.calledWith({ message: 'Something went wrong' });
    });
  });

  describe('PUT', function () {
    it('Atualização de produto', async function () {
      sinon.stub(productsService, 'updateProduct').resolves(mocks.updatedProduct);

      const { req, res } = mockController({
          body: { name: 'Caneta azul' },
          params: { id: 1 },
       });

      await productsController.updateProduct(req, res);

      expect(res.status).to.have.been.calledWith(200);
      expect(res.json).to.have.been.calledWith({ name: 'Caneta azul' });
    });

    it('Tratamendo de erro na atualização de produto', async function () {
      sinon.stub(productsService, 'updateProduct').resolves({ error: 'error' });

      const { req, res } = mockController({ 
        params: { id: 1 },
        body: mocks.newProduct,
      });

      await productsController.updateProduct(req, res);

      expect(res.status).to.have.been.calledWith(500);
      expect(res.json).to.have.been.calledWith(mocks.internalError);
    });
  });

  describe('DELETE', function () {
    it('Exclusão de produto', async function () {
      sinon.stub(productsService, 'deleteProduct').resolves(mocks.updatedProduct);

      const { req, res } = mockController({ params: { id: 1 } });

      res.end = sinon.stub().returns();

      await productsController.deleteProduct(req, res);

      expect(res.status).to.have.been.calledWith(204);
      expect(res.end).to.have.been.calledWith();
    });

    it('Tratamendo de erro na exclusão de produto', async function () {
      sinon.stub(productsService, 'deleteProduct').resolves({ error: 'error' });

      const { req, res } = mockController({ params: { id: 1 } });

      await productsController.deleteProduct(req, res);

      expect(res.status).to.have.been.calledWith(500);
      expect(res.json).to.have.been.calledWith(mocks.internalError);
    });
  });
});