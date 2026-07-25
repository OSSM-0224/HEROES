import request from 'supertest';
import { getApp } from './setup.js';

const app = getApp();

describe('Leads Module — Core Flows & Authorization', () => {
  let adminToken;
  let memberToken;
  let leadId;

  beforeAll(async () => {
    const adminRes = await request(app)
      .post('/api/v1/auth/register')
      .send({ name: 'Admin User', email: 'admin@test.com', password: 'password123' });
    adminToken = adminRes.body.data.token;

    const memberRes = await request(app)
      .post('/api/v1/auth/register')
      .send({ name: 'Member User', email: 'member@test.com', password: 'password123' });
    memberToken = memberRes.body.data.token;
  });

  describe('POST /api/v1/leads/public — Public Lead Capture (no auth)', () => {
    it('should accept public lead submission', async () => {
      const res = await request(app)
        .post('/api/v1/leads/public')
        .send({
          name: 'John Public',
          email: 'john@example.com',
          phone: '555-0100',
          company: 'Public Corp',
        })
        .expect(201);

      expect(res.body.success).toBe(true);
      expect(res.body.data.lead.name).toBe('John Public');
      expect(res.body.data.lead.source).toBe('Public Form');
    });

    it('should reject public lead without name', async () => {
      const res = await request(app)
        .post('/api/v1/leads/public')
        .send({ email: 'john@example.com' })
        .expect(400);

      expect(res.body.success).toBe(false);
    });
  });

  describe('POST /api/v1/leads — Create Lead (authenticated)', () => {
    it('should create lead as admin', async () => {
      const res = await request(app)
        .post('/api/v1/leads')
        .set('Authorization', `Bearer ${adminToken}`)
        .send({
          name: 'Jane Doe',
          email: 'jane@acme.com',
          company: 'Acme Inc',
          value: 25000,
          priority: 'High',
        })
        .expect(201);

      expect(res.body.success).toBe(true);
      expect(res.body.data.lead.name).toBe('Jane Doe');
      expect(res.body.data.lead.status).toBe('New');
      leadId = res.body.data.lead._id || res.body.data.lead.id;
    });

    it('should reject lead creation without auth', async () => {
      const res = await request(app)
        .post('/api/v1/leads')
        .send({ name: 'No Auth', email: 'noauth@test.com' })
        .expect(401);

      expect(res.body.success).toBe(false);
    });
  });

  describe('GET /api/v1/leads — List Leads', () => {
    beforeEach(async () => {
      await request(app)
        .post('/api/v1/leads')
        .set('Authorization', `Bearer ${adminToken}`)
        .send({ name: 'Filter Test', email: 'filter@test.com' });
    });

    it('should list leads with pagination', async () => {
      const res = await request(app)
        .get('/api/v1/leads')
        .set('Authorization', `Bearer ${adminToken}`)
        .expect(200);

      expect(res.body.success).toBe(true);
      expect(Array.isArray(res.body.data)).toBe(true);
      expect(res.body.meta).toBeDefined();
      expect(res.body.meta.page).toBe(1);
    });

    it('should filter leads by status', async () => {
      const res = await request(app)
        .get('/api/v1/leads?status=New')
        .set('Authorization', `Bearer ${adminToken}`)
        .expect(200);

      expect(res.body.success).toBe(true);
    });
  });

  describe('PUT /api/v1/leads/:id — Update Lead', () => {
    beforeEach(async () => {
      const res = await request(app)
        .post('/api/v1/leads')
        .set('Authorization', `Bearer ${adminToken}`)
        .send({ name: 'Update Test', email: 'update@test.com' });
      leadId = res.body.data.lead._id || res.body.data.lead.id;
    });

    it('should update lead status', async () => {
      const res = await request(app)
        .put(`/api/v1/leads/${leadId}`)
        .set('Authorization', `Bearer ${adminToken}`)
        .send({ status: 'Contacted' })
        .expect(200);

      expect(res.body.success).toBe(true);
      expect(res.body.data.lead.status).toBe('Contacted');
    });
  });

  describe('DELETE /api/v1/leads/:id — Authorization Rules', () => {
    beforeEach(async () => {
      const res = await request(app)
        .post('/api/v1/leads')
        .set('Authorization', `Bearer ${adminToken}`)
        .send({ name: 'Delete Test', email: 'delete@test.com' });
      leadId = res.body.data.lead._id || res.body.data.lead.id;
    });

    it('should allow ADMIN to delete lead', async () => {
      const res = await request(app)
        .delete(`/api/v1/leads/${leadId}`)
        .set('Authorization', `Bearer ${adminToken}`)
        .expect(200);

      expect(res.body.success).toBe(true);
    });

    it('should reject MEMBER from deleting lead (403)', async () => {
      const res = await request(app)
        .delete(`/api/v1/leads/${leadId}`)
        .set('Authorization', `Bearer ${memberToken}`)
        .expect(403);

      expect(res.body.success).toBe(false);
    });

    it('should reject unauthenticated deletion (401)', async () => {
      const res = await request(app)
        .delete(`/api/v1/leads/${leadId}`)
        .expect(401);

      expect(res.body.success).toBe(false);
    });
  });

  describe('POST /api/v1/leads/:id/notes — Activity Notes', () => {
    beforeEach(async () => {
      const res = await request(app)
        .post('/api/v1/leads')
        .set('Authorization', `Bearer ${adminToken}`)
        .send({ name: 'Notes Test', email: 'notes@test.com' });
      leadId = res.body.data.lead._id || res.body.data.lead.id;
    });

    it('should add a note to a lead', async () => {
      const res = await request(app)
        .post(`/api/v1/leads/${leadId}/notes`)
        .set('Authorization', `Bearer ${adminToken}`)
        .send({ text: 'Called client, interested in demo' })
        .expect(200);

      expect(res.body.success).toBe(true);
      expect(res.body.data.lead.notes.length).toBeGreaterThan(0);
      expect(res.body.data.lead.notes[0].text).toBe('Called client, interested in demo');
    });
  });
});
