const supertest = require('supertest');
const app = require('../app');

describe('GET /:int', () => {
  test('Out of range input', async () => {
    const res = await supertest(app).get('/10000000000000000000');
    expect(res.status).toBe(422);
    expect(res.text).toContain('Out of range');
  });
  test('NaN input', async () => {
    const res = await supertest(app).get('/1x2');
    expect(res.status).toBe(422);
    expect(res.text).toContain('NaN');
  });
  test('Valid input', async () => {
    const res = await supertest(app).get('/1');
    expect(res.status).toBe(200);
    expect(res.text).toBe('one');
  });
  test('Unspecified route', async () => {
    const res = await supertest(app).get('/1/1');
    expect(res.status).toBe(404);
  });
});
