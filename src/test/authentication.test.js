/* eslint-disable no-undef */
import chai from 'chai';
import chaiHttp from 'chai-http';
import app from '../index';

// Configure chai
chai.use(chaiHttp);
chai.should();

// eslint-disable-next-line no-unused-vars
const { expect, assert } = chai;

describe('authentications endpoints', () => {
  it('it should return 401 when JWT is missing', (done) => {
    chai
      .request(app)
      .post('/api/v1/petitions')
      .send({
        title: 'test title',
        description: 'test description',
      })
      .end((err, res) => {
        res.should.have.status(401);
        res.body.should.have.property('message').eql('Access denied, No token provided');
        done();
      });
  });
});
