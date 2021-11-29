// import { clearDB, closeDB, connectDB } from "./db";
// import ProfileServices from '../services/ProfileServices';

// // Connect to a new in-memory database before running any tests.
// beforeAll(async () => await connectDB());

// // Clear all test data after every test.
// afterEach(async () => await clearDB());

// // Remove and close the db and server.
// afterAll(async () => await closeDB());

// describe('Get profile', () => {
//   it('First get', async () => {
//     const profile = await ProfileServices.getProfile('617f52b4bf20e2ca5e61f4d6')
//     expect(profile?._id).toEqual('617f52b4bf20e2ca5e61f4d6')
//     // done()
//   })
// })