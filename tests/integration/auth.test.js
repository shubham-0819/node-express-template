// import chai, { expect } from 'chai';
// import chaiHttp from 'chai-http';
// import httpMocks from 'node-mocks-http';
// import moment from 'moment';
// import app from '../../src/app';
// import auth from '../../src/middlewares/auth';
// import ApiError from '../../src/utils/ApiError';
// import { tokenService } from '../../src/services';
// import { tokenTypes } from '../../src/config/tokens';
// import { insertUsers, userOne, admin, userOneAccessToken, adminAccessToken } from '../fixtures/user.fixture';
// import { Token } from '../../src/models';

// chai.use(chaiHttp);

// describe('Auth routes', () => {
// //   describe('POST /v1/auth/reset-password', () => {
// //     it('should return 400 if password is missing or invalid', async () => {
// //       // Add your test implementation here
// //     });
// //   });

//   describe('POST /v1/auth/send-verification-email', () => {
//     beforeEach(() => {
//       // Add your setup code here
//     });

//     it('should return 204 and send verification email to the user', async () => {
//       // Add your test implementation here
//     });

//     it('should return 401 error if access token is missing', async () => {
//       // Add your test implementation here
//     });
//   });

//   describe('POST /v1/auth/verify-email', () => {
//     it('should return 204 and verify the email', async () => {
//       // Add your test implementation here
//       expect(dbUser.isEmailVerified).to.be.true;

//       const dbVerifyEmailToken = await Token.countDocuments({
//         user: userOne._id,
//         type: tokenTypes.VERIFY_EMAIL,
//       });
//       expect(dbVerifyEmailToken).to.equal(0);
//     });

//     it('should return 400 if verify email token is missing', async () => {
//       await insertUsers([userOne]);

//       await chai.request(app).post('/v1/auth/verify-email').send().expect(400);
//     });

//     it('should return 401 if verify email token is blacklisted', async () => {
//       await insertUsers([userOne]);
//       const expires = moment().add(config.jwt.verifyEmailExpirationMinutes, 'minutes');
//       const verifyEmailToken = tokenService.generateToken(userOne._id, expires);
//       await tokenService.saveToken(verifyEmailToken, userOne._id, expires, tokenTypes.VERIFY_EMAIL, true);

//       await chai.request(app).post('/v1/auth/verify-email').query({ token: verifyEmailToken }).send().expect(401);
//     });

//     it('should return 401 if verify email token is expired', async () => {
//       await insertUsers([userOne]);
//       const expires = moment().subtract(1, 'minutes');
//       const verifyEmailToken = tokenService.generateToken(userOne._id, expires);
//       await tokenService.saveToken(verifyEmailToken, userOne._id, expires, tokenTypes.VERIFY_EMAIL);

//       await chai.request(app).post('/v1/auth/verify-email').query({ token: verifyEmailToken }).send().expect(401);
//     });

//     it('should return 401 if user is not found', async () => {
//       const expires = moment().add(config.jwt.verifyEmailExpirationMinutes, 'minutes');
//       const verifyEmailToken = tokenService.generateToken(userOne._id, expires);
//       await tokenService.saveToken(verifyEmailToken, userOne._id, expires, tokenTypes.VERIFY_EMAIL);

//       await chai.request(app).post('/v1/auth/verify-email').query({ token: verifyEmailToken }).send().expect(401);
//     });
//   });
// });

// describe('Auth middleware', () => {
//   it('should call next with no errors if access token is valid', async () => {
//     await insertUsers([userOne]);
//     const req = httpMocks.createRequest({ headers: { Authorization: `Bearer ${userOneAccessToken}` } });
//     const next = chai.spy();

//     await auth()(req, httpMocks.createResponse(), next);

//     expect(next).to.have.been.called.with();
//     expect(req.user._id).to.equal(userOne._id);
//   });

//   it('should call next with unauthorized error if access token is not found in header', async () => {
//     await insertUsers([userOne]);
//     const req = httpMocks.createRequest();
//     const next = chai.spy();

//     await auth()(req, httpMocks.createResponse(), next);

//     expect(next).to.have.been.called.with(chai.expect.any(ApiError));
//     expect(next).to.have.been.called.with(chai.expect.objectContaining({ statusCode: 401, message: 'Please authenticate' }));
//   });

//   it('should call next with unauthorized error if access token is not a valid jwt token', async () => {
//     await insertUsers([userOne]);
//     const req = httpMocks.createRequest({ headers: { Authorization: 'Bearer randomToken' } });
//     const next = chai.spy();

//     await auth()(req, httpMocks.createResponse(), next);

//     expect(next).to.have.been.called.with(chai.expect.any(ApiError));
//     expect(next).to.have.been.called.with(chai.expect.objectContaining({ statusCode: 401, message: 'Please authenticate' }));
//   });

//   it('should call next with unauthorized error if the token is not an access token', async () => {
//     await insertUsers([userOne]);
//     const expires = moment().add(config.jwt.accessExpirationMinutes, 'minutes');
//     const refreshToken = tokenService.generateToken(userOne._id, expires, tokenTypes.REFRESH);
//     const req = httpMocks.createRequest({ headers: { Authorization: `Bearer ${refreshToken}` } });
//     const next = chai.spy();

//     await auth()(req, httpMocks.createResponse(), next);

//     expect(next).to.have.been.called.with(chai.expect.any(ApiError));
//     expect(next).to.have.been.called.with(chai.expect.objectContaining({ statusCode: 401, message: 'Please authenticate' }));
//   });

//   it('should call next with unauthorized error if access token is generated with an invalid secret', async () => {
//     await insertUsers([userOne]);
//     const expires = moment().add(config.jwt.accessExpirationMinutes, 'minutes');
//     const accessToken = tokenService.generateToken(userOne._id, expires, tokenTypes.ACCESS, 'invalidSecret');
//     const req = httpMocks.createRequest({ headers: { Authorization: `Bearer ${accessToken}` } });
//     const next = chai.spy();

//     await auth()(req, httpMocks.createResponse(), next);

//     expect(next).to.have.been.called.with(chai.expect.any(ApiError));
//     expect(next).to.have.been.called.with(chai.expect.objectContaining({ statusCode: 401, message: 'Please authenticate' }));
//   });

//   it('should call next with unauthorized error if access token is expired', async () => {
//     await insertUsers([userOne]);
//     const expires = moment().subtract(1, 'minutes');
//     const accessToken = tokenService.generateToken(userOne._id, expires, tokenTypes.ACCESS);
//     const req = httpMocks.createRequest({ headers: { Authorization: `Bearer ${accessToken}` } });
//     const next = chai.spy();

//     await auth()(req, httpMocks.createResponse(), next);

//     expect(next).to.have.been.called.with(chai.expect.any(ApiError));
//     expect(next).to.have.been.called.with(chai.expect.objectContaining({ statusCode: 401, message: 'Please authenticate' }));
//   });

//   it('should call next with unauthorized error if user is not found', async () => {
//     const req = httpMocks.createRequest({ headers: { Authorization: `Bearer ${userOneAccessToken}` } });
//     const next = chai.spy();

//     await auth()(req, httpMocks.createResponse(), next);

//     expect(next).to.have.been.called.with(chai.expect.any(ApiError));
//     expect(next).to.have.been.called.with(chai.expect.objectContaining({ statusCode: 401, message: 'Please authenticate' }));
//   });

//   it('should call next with forbidden error if user does not have required rights and userId is not in params', async () => {
//     await insertUsers([userOne]);
//     const req = httpMocks.createRequest({ headers: { Authorization: `Bearer ${userOneAccessToken}` } });
//     const next = chai.spy();

//     await auth('anyRight')(req, httpMocks.createResponse(), next);

//     expect(next).to.have.been.called.with(chai.expect.any(ApiError));
//     expect(next).to.have.been.called.with(chai.expect.objectContaining({ statusCode: 403, message: 'Forbidden' }));
//   });

//   it('should call next with no errors if user does not have required rights but userId is in params', async () => {
//     await insertUsers([userOne]);
//     const req = httpMocks.createRequest({
//       headers: { Authorization: `Bearer ${userOneAccessToken}` },
//       params: { userId: userOne._id.toHexString() },
//     });
//     const next = chai.spy();

//     await auth('anyRight')(req, httpMocks.createResponse(), next);

//     expect(next).to.have.been.called.with();
//   });

//   it('should call next with no errors if user has required rights', async () => {
//     await insertUsers([admin]);
//     const req = httpMocks.createRequest({
//       headers: { Authorization: `Bearer ${adminAccessToken}` },
//       params: { userId: userOne._id.toHexString() },
//     });
//     const next = chai.spy();

//     await auth(...roleRights.get('admin'))(req, httpMocks.createResponse(), next);

//     expect(next).to.have.been.called.with();
//   });
// });
