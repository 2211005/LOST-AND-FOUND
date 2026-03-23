const request = require('supertest');
const app = require('../../src/app');

describe('GET /api/health', () => {
  test('debe responder con status 200', async () => {
    const res = await request(app).get('/api/health');
    expect(res.statusCode).toBe(200);
  });

  test('debe responder en formato JSON', async () => {
    const res = await request(app).get('/api/health');
    expect(res.headers['content-type']).toMatch(/json/);
  });

  test('debe responder con ok: true', async () => {
    const res = await request(app).get('/api/health');
    expect(res.body.ok).toBe(true);
  });

  test('debe responder con el mensaje esperado', async () => {
    const res = await request(app).get('/api/health');
    expect(res.body.message).toBe('LF 2.0 backend is running 🚀');
  });

  test('debe responder con las propiedades ok y message', async () => {
    const res = await request(app).get('/api/health');
    expect(res.body).toHaveProperty('ok');
    expect(res.body).toHaveProperty('message');
  });
});