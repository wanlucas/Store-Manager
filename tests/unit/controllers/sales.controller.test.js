const chai = require('chai');
const sinon = require('sinon');
const sinonChai = require('sinon-chai');

const { expect } = chai;
chai.use(sinonChai);

const { salesService } = require('../../../src/services');
const { salesController } = require('../../../src/controllers');

const mocks = require('./mocks/sales.service.mock');
const mockController = require('./utils/mockController');

describe('Funcionamento do controller sales', function () {
  afterEach(sinon.restore);

  describe('GET', function () {
    it('Requisição de vendas', async function () {
      sinon.stub(salesService, 'getSales').resolves(
        { error: null, output: mocks.sales },
      );

      const { req, res } = mockController();

      await salesController.getSales(req, res);

      expect(res.status).to.have.been.calledWith(200);
      expect(res.json).to.have.been.calledWith(mocks.sales);
    });

    it('Tratamento de erro na requisição de vendas', async function () {
      sinon.stub(salesService, 'getSales').resolves({ error: 'error' });

      const { req, res } = mockController();

      await salesController.getSales(req, res);

      expect(res.status).to.have.been.calledWith(500);
      expect(res.json).to.have.been.calledWith(mocks.internalError);
    });

    it('Requisição de vendas por id', async function () {
      sinon.stub(salesService, 'getSaleById').resolves(
        { error: null, output: mocks.sales[0] },
      );

      const { req, res } = mockController({ params: { id: 1 } });

      await salesController.getSaleById(req, res);

      expect(res.status).to.have.been.calledWith(200);
      expect(res.json).to.have.been.calledWith(mocks.sales[0]);
    });

    it('Tratamento de erro na requisição de venda por id', async function () {
      sinon.stub(salesService, 'getSaleById').resolves({ error: 'error' });

      const { req, res } = mockController({ params: { id: 1 } });

      await salesController.getSaleById(req, res);

      expect(res.status).to.have.been.calledWith(500);
      expect(res.json).to.have.been.calledWith(mocks.internalError);
    });
  });

  describe('POST', function () {
    it('Criação de um nova venda', async function () { 
      sinon.stub(salesService, 'createSale').resolves(mocks.saleCreatedSuccessfully);

      const { req, res } = mockController({ body: mocks.newSale });

      await salesController.createSale(req, res);

      expect(res.status).to.have.been.calledWith(201);
      expect(res.json).to.have.been.calledWith(mocks.saleCreatedSuccessfully.output);
    });

    it('Tratamendo de erro na criação de venda', async function () {
      sinon.stub(salesService, 'createSale').resolves({ error: 'error' });

      const { req, res } = mockController();

      await salesController.createSale(req, res);

      expect(res.status).to.have.been.calledWith(500);
      expect(res.json).to.have.been.calledWith(mocks.internalError);
    });
  });

  describe('PUT', function () {
    it('Atualização de uma venda', async function () {
      sinon.stub(salesService, 'updateSale').resolves(mocks.successfulSaleUpdate);

      const { req, res } = mockController({ params: { id: 1 } });

      await salesController.updateSale(req, res);

      expect(res.status).to.have.been.calledWith(200);
      expect(res.json).to.have.been.calledWith(mocks.successfulSaleUpdate.output);
    });

    it('Tratamendo de erro na atualização de venda', async function () {
      sinon.stub(salesService, 'updateSale').resolves({ error: 'error' });

      const { req, res } = mockController({
        params: { id: 1 },
        body: mocks.newSale,
      });

      await salesController.updateSale(req, res);

      expect(res.status).to.have.been.calledWith(500);
      expect(res.json).to.have.been.calledWith(mocks.internalError);
    });
  });

  describe('DELETE', function () {
    it('Exclusão de venda', async function () {
      sinon.stub(salesService, 'deleteSale').resolves('1');

      const { req, res } = mockController({ params: { id: 1 } });

      res.end = sinon.stub().returns();

      await salesController.deleteSale(req, res);

      expect(res.status).to.have.been.calledWith(204);
      expect(res.end).to.have.been.calledWith();
    });

    it('Tratamendo de erro na exclusão de venda', async function () {
      sinon.stub(salesService, 'deleteSale').resolves({ error: 'error' });

      const { req, res } = mockController({ params: { id: 1 } });

      await salesController.deleteSale(req, res);

      expect(res.status).to.have.been.calledWith(500);
      expect(res.json).to.have.been.calledWith(mocks.internalError);
    });
  });
});