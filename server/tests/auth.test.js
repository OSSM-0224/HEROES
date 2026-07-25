import request from 'supertest';
import { getApp } from './setup.js';

const app = getApp();

describe('Auth Module — Authentication & Authorization Rules', () => {
  const testUser = {
    name: 'Test User',
    email: 'test@example.com',
    password: 'password123',
  };

  let userToken;
  let adminToken;

  describe('POST /api/v1/auth/register', () => {
    it('should register first user as ADMIN', async () => {
      const res = await request(app)
        .post('/api/v1/auth/register')
        .send(testUser)
        .expect(201);

      expect(res.body.success).toBe(true);
      expect(res.body.data.user.role).toBe('ADMIN');
      expect(res.body.data.user.email).toBe(testUser.email);
      expect(res.body.data.token).toBeDefined();

      adminToken = res.body.data.token;
    });

    it('should register second user as MEMBER', async () => {
      await request(app).post('/api/v1/auth/register').send(testUser);
      const res = await request(app)
        .post('/api/v1/auth/register')
        .send({ ...testUser, email: 'member@example.com', name: 'Member User' })
        .expect(201);

      expect(res.body.data.user.role).toBe('MEMBER');
      userToken = res.body.data.token;
    });

    it('should reject duplicate email', async () => {
      await request(app).post('/api/v1/auth/register').send(testUser);
      const res = await request(app)
        .post('/api/v1/auth/register')
        .send(testUser)
        .expect(400);

      expect(res.body.success).toBe(false);
    });

    it('should reject invalid email format', async () => {
      const res = await request(app)
        .post('/api/v1/auth/register')
        .send({ ...testUser, email: 'not-an-email' })
        .expect(400);
      expect(res.body.success).toBe(false);
    });

    it('should reject short password', async () => {
      const res = await request(app)
        .post('/api/v1/auth/register')
        .send({ ...testUser, password: '123' })
        .expect(400);
      expect(res.body.success).toBe(false);
    });
  });

  describe('POST /api/v1/auth/login', () => {
    beforeEach(async () => {
      await request(app).post('/api/v1/auth/register').send(testUser);
    });

    it('should login with valid credentials', async () => {
      const res = await request(app)
        .post('/api/v1/auth/login')
        .send({ email: testUser.email, password: testUser.password })
        .expect(200);

      expect(res.body.success).toBe(true);
      expect(res.body.data.token).toBeDefined();
      expect(res.body.data.user.email).toBe(testUser.email);
    });

    it('should reject wrong password', async () => {
      const res = await request(app)
        .post('/api/v1/auth/login')
        .send({ email: testUser.email, password: 'wrongpassword' })
        .expect(401);

      expect(res.body.success).toBe(false);
    });

    it('should reject non-existent email', async () => {
      const res = await request(app)
        .post('/api/v1/auth/login')
        .send({ email: 'noone@example.com', password: 'password123' })
        .expect(401);

      expect(res.body.success).toBe(false);
    });
  });

  describe('GET /api/v1/auth/me', () => {
    it('should return user profile with valid token', async () => {
      const regRes = await request(app).post('/api/v1/auth/register').send(testUser);
      const token = regRes.body.data.token;

      const res = await request(app)
        .get('/api/v1/auth/me')
        .set('Authorization', `Bearer ${token}`)
        .expect(200);

      expect(res.body.success).toBe(true);
      expect(res.body.data.user.email).toBe(testUser.email);
    });

    it('should reject request without token', async () => {
      const res = await request(app)
        .get('/api/v1/auth/me')
        .expect(401);

      expect(res.body.success).toBe(false);
    });

    it('should reject request with invalid token', async () => {
      const res = await request(app)
        .get('/api/v1/auth/me')
        .set('Authorization', 'Bearer invalid-token')
        .expect(401);

      expect(res.body.success).toBe(false);
    });
  });
});
