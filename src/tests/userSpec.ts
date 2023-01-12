import supertest from "supertest";

import {app} from '../index';
import { User, LoginUser, UserRepo } from "../models/user";

const request = supertest(app);
const Repo = new UserRepo();

describe("user Model", () => {

    it('createUser method should add a user', async () => {
      const theUser:User = {
        firstName:"eslam",
        lastName:"mostafa",
        userName:"eslamMostafa",
        password:"eslam123"
      }
      const result = await Repo.createUser(theUser);    
      expect(result).toEqual("user created");
    });

    it('indexUsers method should return a list of users', async () => {
      const result = await Repo.indexUsers();    
      expect(result).toEqual([Object(
        {
        id: 1,
        first_name: 'eslam',
        last_name: 'mostafa',
        user_name: 'eslamMostafa',
        password_digest: '$2b$10$RX1KfvB4sucHBhC5eZZM6ebK8aIi8yfwq7n9XLU1wDalOkznOXbn2'})]);
    });

    it('showUsers method should return the correct user', async () => {
      const result = await Repo.showUsers(1);    
      expect(result).toEqual(Object(
        {
        id: 1,
        first_name: 'eslam',
        last_name: 'mostafa',
        user_name: 'eslamMostafa',
        password_digest: '$2b$10$RX1KfvB4sucHBhC5eZZM6ebK8aIi8yfwq7n9XLU1wDalOkznOXbn2'
      }));
    });
});


describe('User endpoints response test', () => {

  it('/users shoud return not autherized error', async () => {
      const response = await request.get('/users');
      expect(response.status).toEqual(500);
  });

  it('/profile shoud return not autherized error', async () => {
    const response = await request.get('/profile');
    expect(response.status).toEqual(500);
  });

  it('/user shoud return user created', async () => {
    const response =  await request.post('/user').send({
      firstName:"mohamed",
      lastName:"mostafa",
      userName:"mohamedMostafa",
      password:"mohamed123"
    });
    expect(response.body).toEqual("user created");
  });

  it('/login shoud to pass if user exists and the password is correct', async () => {
    const response = await request.post('/login').send({
      userName:"eslamMostafa",
      password:"eslam123"
    });
    expect(response.status).toEqual(200);
  });

});