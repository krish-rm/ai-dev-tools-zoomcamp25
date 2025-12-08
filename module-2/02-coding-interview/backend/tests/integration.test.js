import request from 'supertest';
import { app } from '../server.js';

describe('Integration Tests', () => {
  describe('Session API', () => {
    test('POST /api/sessions should create a new session', async () => {
      const response = await request(app)
        .post('/api/sessions')
        .send({
          code: 'console.log("Hello");',
          language: 'javascript'
        })
        .expect(200);

      expect(response.body).toHaveProperty('sessionId');
      expect(response.body).toHaveProperty('url');
      expect(typeof response.body.sessionId).toBe('string');
    });

    test('GET /api/sessions/:sessionId should retrieve a session', async () => {
      // First create a session
      const createResponse = await request(app)
        .post('/api/sessions')
        .send({
          code: 'const x = 42;',
          language: 'javascript'
        });

      const sessionId = createResponse.body.sessionId;

      // Then retrieve it
      const getResponse = await request(app)
        .get(`/api/sessions/${sessionId}`)
        .expect(200);

      expect(getResponse.body).toHaveProperty('sessionId', sessionId);
      expect(getResponse.body).toHaveProperty('code', 'const x = 42;');
      expect(getResponse.body).toHaveProperty('language', 'javascript');
    });

    test('GET /api/sessions/:sessionId should return 404 for non-existent session', async () => {
      await request(app)
        .get('/api/sessions/non-existent-id')
        .expect(404);
    });
  });
});

