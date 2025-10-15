// tests/app.test.js
const request = require('supertest');
const app = require('../app');

describe('Basic API tests', () => {
  beforeAll(async () => {
    if (app.dbReady) await app.dbReady;
  });

  test('GET /health returns status ok', async () => {
    const res = await request(app).get('/health');
    expect(res.statusCode).toBe(200);
    expect(res.body).toHaveProperty('status', 'ok');
  });

  test('GET /api/hello returns greeting', async () => {
    const res = await request(app).get('/api/hello');
    expect(res.statusCode).toBe(200);
    expect(res.body).toEqual({ message: 'Hello from API' });
  });

  test('POST /api/echo returns posted payload', async () => {
    const payload = { name: 'Sarath', value: 42 };
    const res = await request(app).post('/api/echo').send(payload);
    expect(res.statusCode).toBe(201);
    expect(res.body).toHaveProperty('data');
    expect(res.body.data).toEqual(payload);
  });

  test('POST /api/notes creates a note and GET /api/notes returns it', async () => {
    // create
    const create = await request(app).post('/api/notes').send({ title: 'Test', body: 'body' });
    expect(create.statusCode).toBe(201);
    expect(create.body).toHaveProperty('note');
    expect(create.body.note).toHaveProperty('id');

    // list
    const list = await request(app).get('/api/notes');
    expect(list.statusCode).toBe(200);
    expect(list.body).toHaveProperty('notes');
    expect(Array.isArray(list.body.notes)).toBe(true);
    expect(list.body.notes.length).toBeGreaterThanOrEqual(1);
    expect(list.body.notes[0]).toHaveProperty('title', 'Test');
  });
});
