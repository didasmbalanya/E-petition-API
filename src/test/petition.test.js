/* eslint-disable no-undef */
import chai from 'chai';
import chatHttp from 'chai-http';
import 'chai/register-should';
import app from '../index';

chai.use(chatHttp);
const { expect } = chai;

describe('Testing Routes : Petition', () => {
  // test that a a user can create a petition
  let token = null;
  const user = {
    email: 'tito1@gmail.com',
    first_name: 'tito',
    last_name: 'gikandi',
    phone_number: '123456789',
    address: '123 krt',
    password: 'wewewe',
    confirm_password: 'wewewe',
  };

  before((done) => {
    chai.request(app)
      .post('/api/v1/auth/signup')
      .set('Accept', 'applicatio/json')
      .send(user)
      .end((err, res) => {
        token = res.body.token;
        done();
      });
  });

  const petition = {
    title: 'title of the petition',
    description: 'describe the petition',
  };

  const invalidPetiton = {
    title: '',
    description: '',
  };

  describe('POST api/v1/petitions', () => {
    const invalidToken = 'token which is invalid';
    it('Should ensure a user is authorised', (done) => {
      chai.request(app)
        .post('/api/v1/petitions/')
        .set('Accept', 'application/json')
        .set('Authorization', `Bearer ${invalidToken}`)
        .send(petition)
        .end((err, res) => {
          expect(res.status).to.equal(401);
          done();
        });
    });

    it('Should create a petition for an authorised user', (done) => {
      chai.request(app)
        .post('/api/v1/petitions/')
        .set('Accept', 'application/json')
        .set('Authorization', `Bearer ${token}`)
        .send(petition)
        .end((err, res) => {
          expect(res.status).to.equal(201);
          expect(res.body.message).to.equal('Petition successifully created');
          done();
        });
    });

    it('Should not create a petition wiht invalid parameters', (done) => {
      chai.request(app)
        .post('/api/v1/petitions/')
        .set('Accept', 'application/json')
        .set('Authorization', `Bearer ${token}`)
        .send(invalidPetiton)
        .end((err, res) => {
          expect(res.status).to.equal(400);
          done();
        });
    });

    it('Should not create a petition which already exist', (done) => {
      chai.request(app)
        .post('/api/v1/petitions/')
        .set('Accept', 'application/json')
        .set('Authorization', `Bearer ${token}`)
        .send(petition)
        .end((err, res) => {
          expect(res.status).to.equal(409);
          done();
        });
    });

    it('Should return a specific petition', (done) => {
      chai.request(app)
        .get('/api/v1/petitions/1')
        .set('Accept', 'application/json')
        .end((err, res) => {
          expect(res.status).to.equal(200);
          done();
        });
    });
    it('Should not return a specific petition in case parameter is not integer', (done) => {
      chai.request(app)
        .get('/api/v1/petitions/1a')
        .set('Accept', 'application/json')
        .end((err, res) => {
          expect(res.status).to.equal(400);
          done();
        });
    });
    it('Should  not return anything in case petition does not exist', (done) => {
      chai.request(app)
        .get('/api/v1/petitions/100')
        .set('Accept', 'application/json')
        .end((err, res) => {
          expect(res.status).to.equal(400);
          done();
        });
    });

    it('Should return all petitions if they are found', async () => {
      const res = await chai.request(app).get('/api/v1/petitions');

      expect(res.status).to.equal(200);
    });

    it('Should 404 if no petition found', async () => {
      await chai.request(app)
        .delete('/api/v1/petitions/1')
        .set('Accept', 'application/json')
        .set('Authorization', `Bearer ${token}`);

      const res = await chai.request(app).get('/api/v1/petitions');

      expect(res.body.status).to.equal(404);
    });

    it('Should delete a petition', (done) => {
      chai.request(app)
        .delete('/api/v1/petitions/1')
        .set('Accept', 'application/json')
        .set('Authorization', `Bearer ${token}`)
        .send(petition)
        .end((err, res) => {
          expect(res.status).to.equal(200);
          done();
        });
    });
  });
});
