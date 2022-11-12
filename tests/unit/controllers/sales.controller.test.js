const chai = require('chai');
const sinon = require('sinon');
const sinonChai = require('sinon-chai');

const { expect } = chai;
chai.use(sinonChai);

const { salesService } = require('../../../src/services');
const { salesController } = require('../../../src/controllers');

const mocks = require('./mocks/sales.service.mock');

describe('Funcionamento do controller sales', function () {
  afterEach(sinon.restore);

  describe('POST', function () {
    it('Criação de um nova venda', async function () { 
      sinon.stub(salesService, 'createSale').resolves({
        error: null,
        output: mocks.saleCreatedSuccessfully,
      });

      const res = {};
      const req = {
        body: mocks.newSale,
      };

      res.status = sinon.stub().returns(res);
      res.json = sinon.stub().returns();

      await salesController.createSale(req, res);

      expect(res.status).to.have.been.calledWith(201);
      expect(res.json).to.have.been.calledWith(mocks.saleCreatedSuccessfully);
    });

    it('Tratamendo de erro na criação de venda', async function () {
      sinon.stub(salesService, 'createSale').resolves({ error: 'error' });

      const res = {};
      const req = {};

      res.status = sinon.stub().returns(res);
      res.json = sinon.stub().returns();

      await salesController.createSale(req, res);

      expect(res.status).to.have.been.calledWith(500);
      expect(res.json).to.have.been.calledWith(mocks.saleCreationFailed);
    });
  });
});