const { expect } = require('chai');
const sinon = require('sinon');

const validateNewProductFields = require('../../../src/middlewares/validateNewProductFields');

describe('Funcionamento dos middlewares de products', function () {
  afterEach(sinon.restore);

  describe('validateNewProductFields', function () {
    it('Falha ao não incluir o name', function () {
      const res = {};
      const req = {
        body: {},
      };

      res.status = sinon.stub().returns(res);
      res.json = sinon.stub().returns();

      validateNewProductFields(req, res);

      expect(res.status).to.have.been.calledWith(400);
      expect(res.json).to.have.been.calledWith({ message: '"name" is required' });
    });
  });
});