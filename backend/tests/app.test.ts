import request from 'supertest';
import app from '../src/app.js';

describe('GET /', () => {
    it('should return 200 and a welcome message', async () => {
        const res = await request(app).get('/');
        expect(res.status).toBe(200);
        expect(res.body.message).toBe('Interview Ready Backend');
    });
});
