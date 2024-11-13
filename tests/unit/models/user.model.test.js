import * as chai from 'chai';
import { expect } from 'chai';
import chaiAsPromised from 'chai-as-promised';
import faker from 'faker';
import { User } from '../../../src/models/index.js';

chai.use(chaiAsPromised);

describe('User model', () => {
  describe('User validation', () => {
    let newUser;
    beforeEach(() => {
      newUser = {
        name: faker.name.findName(),
        email: faker.internet.email().toLowerCase(),
        password: 'password1',
        role: 'user',
      };
    });

    it('should correctly validate a valid user', async () => {
      await expect(new User(newUser).validate()).to.be.fulfilled;
    });

    it('should throw a validation error if email is invalid', async () => {
      newUser.email = 'invalidEmail';
      await expect(new User(newUser).validate()).to.be.rejected;
    });

    it('should throw a validation error if password length is less than 8 characters', async () => {
      newUser.password = 'passwo1';
      await expect(new User(newUser).validate()).to.be.rejected;
    });

    it('should throw a validation error if password does not contain numbers', async () => {
      newUser.password = 'password';
      await expect(new User(newUser).validate()).to.be.rejected;
    });

    it('should throw a validation error if password does not contain letters', async () => {
      newUser.password = '11111111';
      await expect(new User(newUser).validate()).to.be.rejected;
    });

    it('should throw a validation error if role is unknown', async () => {
      newUser.role = 'invalid';
      await expect(new User(newUser).validate()).to.be.rejected;
    });
  });

  describe('User toJSON()', () => {
    it('should not return user password when toJSON is called', () => {
      const newUser = {
        name: faker.name.findName(),
        email: faker.internet.email().toLowerCase(),
        password: 'password1',
        role: 'user',
      };
      expect(new User(newUser).toJSON()).to.not.have.property('password');
    });
  });
});