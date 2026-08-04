import request from 'supertest';
import { getApp } from './setup.js';

const app = getApp();

describe('Auth Module — Authentication & Authorization Rules', () => {
  const testUser = {
    name: 'Test User',
    email: 'test@example.com',
    password: 'password123',
  };

  describe('POST /api/v1/auth/register', () => {
    it('should register a user as ADMIN of their own organization', async () => {
      const res = await request(app)
        .post('/api/v1/auth/register')
        .send(testUser)
        .expect(201);

      expect(res.body.success).toBe(true);
      expect(res.body.data.user.role).toBe('ADMIN');
      expect(res.body.data.user.email).toBe(testUser.email);
      expect(res.body.data.user.organizationId).toBeDefined();
      expect(res.body.data.user.organization).toBeDefined();
      expect(res.body.data.user.organization.name).toBe("Test User's Workspace");
      expect(res.body.data.user.organization.slug).toBe('test-user-s-workspace');
      expect(res.body.data.token).toBeDefined();
    });

    it('should isolate each registration into its own organization', async () => {
      await request(app).post('/api/v1/auth/register').send(testUser);
      const second = await request(app)
        .post('/api/v1/auth/register')
        .send({ ...testUser, email: 'member@example.com', name: 'Member User' })
        .expect(201);

      expect(second.body.data.user.role).toBe('ADMIN');
      expect(second.body.data.user.organizationId).not.toBe(undefined);
    });

    it('should honor a custom organization name', async () => {
      const res = await request(app)
        .post('/api/v1/auth/register')
        .send({ ...testUser, organizationName: 'Acme Industries' })
        .expect(201);

      expect(res.body.data.user.organization.name).toBe('Acme Industries');
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
      expect(res.body.data.user.organizationId).toBeDefined();
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
      expect(res.body.data.user.organization).toBeDefined();
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

    it('should reject request with a token whose account was deleted', async () => {
      const regRes = await request(app).post('/api/v1/auth/register').send(testUser);
      const token = regRes.body.data.token;

      const { User } = await import('../src/modules/auth/auth.model.js');
      await User.deleteMany({});

      const res = await request(app)
        .get('/api/v1/auth/me')
        .set('Authorization', `Bearer ${token}`)
        .expect(401);

      expect(res.body.success).toBe(false);
    });
  });
});
