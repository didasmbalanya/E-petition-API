/* eslint-disable no-undef */
import chai from 'chai';
import chatHttp from 'chai-http';
import 'chai/register-should';
import app from '../index';

chai.use(chatHttp);
const { expect } = chai;

describe('Testing Routes : Vote', () => {
  // test that a a user can create a petition
  let token = null;
  const user = {
    email: 'test@gmail.com',
    first_name: 'test',
    last_name: 'test',
    phone_number: '000000000',
    address: 'Kicukiro',
    password: '123456',
    confirm_password: '123456',
  };

  const petition = {
    title: 'title of the petition 2',
    description: 'describe the petition 2',
  };
  const vote = {
    vote: 'true',
  };
  const voteAgainst = {
    vote: 'false',
  };
  const blankVote = {
    vote: '',
  };
  before((done) => {
    chai.request(app)
      .post('/api/v1/users/signUp')
      .set('Accept', 'applicatio/json')
      .send(user)
      .end((err, res) => {
        token = res.body.token;
        done();
      });
  });
  before((done) => {
    chai.request(app)
      .post('/api/v1/petitions/')
      .set('Accept', 'application/json')
      .set('Authorization', `Bearer ${token}`)
      .send(petition)
      .end((err, res) => {
        done();
      });
  });


  describe('PATCH api/v1/votes', () => {
    it('Should create a vote when all required conditions are met', (done) => {
      chai.request(app)
        .patch('/api/v1/votes/2/vote')
        .set('Authorization', `Bearer ${token}`)
        .send(vote)
        .end((err, res) => {
          expect(res.status).to.equal(201);
          done();
        });
    });
    it('Should not create a vote when vote is not passed', (done) => {
      chai.request(app)
        .patch('/api/v1/votes/2/vote')
        .set('Authorization', `Bearer ${token}`)
        .send(blankVote)
        .end((err, res) => {
          expect(res.status).to.equal(400);
          done();
        });
    });
    it('Should not create a vote when petition does not exist', (done) => {
      chai.request(app)
        .patch('/api/v1/votes/100/vote')
        .set('Authorization', `Bearer ${token}`)
        .send(vote)
        .end((err, res) => {
          expect(res.status).to.equal(400);
          done();
        });
    });
    it('Should not update same vote twice', (done) => {
      chai.request(app)
        .patch('/api/v1/votes/2/vote')
        .set('Authorization', `Bearer ${token}`)
        .send(vote)
        .end((err, res) => {
          expect(res.status).to.equal(409);
          done();
        });
    });
    it('Should update a vote to false on request', (done) => {
      chai.request(app)
        .patch('/api/v1/votes/2/vote')
        .set('Authorization', `Bearer ${token}`)
        .send(voteAgainst)
        .end((err, res) => {
          expect(res.status).to.equal(200);
          done();
        });
    });
    it('Should not update same false vote twice', (done) => {
      chai.request(app)
        .patch('/api/v1/votes/2/vote')
        .set('Authorization', `Bearer ${token}`)
        .send(voteAgainst)
        .end((err, res) => {
          expect(res.status).to.equal(409);
          done();
        });
    });
    it('Should update a vote back to true on request', (done) => {
      chai.request(app)
        .patch('/api/v1/votes/2/vote')
        .set('Authorization', `Bearer ${token}`)
        .send(vote)
        .end((err, res) => {
          expect(res.status).to.equal(200);
          done();
        });
    });
  });
});
