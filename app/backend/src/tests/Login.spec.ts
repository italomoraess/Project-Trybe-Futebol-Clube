import * as sinon from 'sinon';
import * as chai from 'chai';
// @ts-ignore
import chaiHttp = require('chai-http');
import { app } from '../app';
import User from '../database/models/User';
import { Response } from 'superagent';
const { expect } = chai;

chai.use(chaiHttp);

const user = {
  id: 1,
  username: 'Admin',
  role: 'admin',
  email: 'admin@admin.com',
  password: '$2a$08$xi.Hxk1czAO0nZR..B393u10aED0RQ1N3PAEXQ7HxtLjKPEZBu.PW',
};

describe('Rota post/login', () => {

  let chaiHttpResponse: Response;

  beforeEach(async () => {
    sinon
      .stub(User, 'findOne')
      .resolves({ ...user } as User);
  });

  afterEach(()=>{
    (User.findOne as sinon.SinonStub).restore();
  })

  it('Retorna o status 200', async () => {
    chaiHttpResponse = await chai.request(app).post('/login')
    .send({email: 'user@user.com', password: 'secret_admin'});
    expect(chaiHttpResponse.status).to.be.eq(200);
  });
});



