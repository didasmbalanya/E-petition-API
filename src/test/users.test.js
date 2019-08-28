/* eslint-disable no-undef */
import chai from 'chai';
import chaiHttp from 'chai-http';
import app from '../index';

// Configure chai
chai.use(chaiHttp);
chai.should();

// eslint-disable-next-line no-unused-vars
const { expect, assert } = chai;

describe('users endpoints', () => {
  describe('POST api/v1/users/', () => {
    it('it should create a user', (done) => {
      chai
        .request(app)
        .post('/api/v1/auth/signup')
        .send({
          first_name: 'mucyo',
          last_name: 'mucyo',
          email: 'mucyomiller@gmail.com',
          address: 'KK 1ST',
          phone_number: '0722222222',
          password: '123456',
          confirm_password: '123456',
        })
        .end((err, res) => {
          res.should.have.status(201);
          res.body.should.have.property('data').be.a('object');
          res.body.should.have.property('token').be.a('string');
          done();
        });
    });

    it('it should return error if user already exists', (done) => {
      chai
        .request(app)
        .post('/api/v1/auth/signup')
        .send({
          first_name: 'mucyo',
          last_name: 'mucyo',
          email: 'mucyomiller@gmail.com',
          address: 'KK 1ST',
          phone_number: '0722222222',
          password: '123456',
          confirm_password: '123456',
        })
        .end((err, res) => {
          res.should.have.status(409);
          res.body.should.have.property('error').eql('User with email mucyomiller@gmail.com already exists');
          done();
        });
    });

    it('it should sign in user', (done) => {
      chai
        .request(app)
        .post('/api/v1/auth/signin')
        .send({
          email: 'mucyomiller@gmail.com',
          password: '123456',
        })
        .end((err, res) => {
          res.should.have.status(200);
          res.body.should.have.property('data').be.a('object');
          res.body.should.have.property('token').be.a('string');
          done();
        });
    });

    it('it should return error when sign in validation fails', (done) => {
      chai
        .request(app)
        .post('/api/v1/auth/signin')
        .send({
          email: 'mucyomiller@gmail.com',
          password: '',
        })
        .end((err, res) => {
          res.should.have.status(400);
          res.body.should.have.property('status').eql(400);
          res.body.should.have.property('errors').be.a('array');
          done();
        });
    });
  });
});
