import request from 'supertest';
import { getApp } from './setup.js';
import { Organization } from '../src/modules/organization/organization.model.js';
import { User } from '../src/modules/auth/auth.model.js';

const app = getApp();

const login = async (email) => {
  const res = await request(app)
    .post('/api/v1/auth/login')
    .send({ email, password: 'password123' })
    .expect(200);
  return res.body.data.token;
};

const seedOrgUsers = async () => {
  const org = await Organization.create({ name: 'Acme Corp', slug: `acme-${Date.now()}` });
  await User.create([
    { name: 'Admin User', email: 'admin@test.com', password: 'password123', role: 'ADMIN', status: 'ACTIVE', organizationId: org._id },
    { name: 'Member User', email: 'member@test.com', password: 'password123', role: 'MEMBER', status: 'ACTIVE', organizationId: org._id },
  ]);
  return {
    admin: await login('admin@test.com'),
    member: await login('member@test.com'),
    orgId: org._id.toString(),
  };
};

describe('Leads Module — Core Flows & Authorization', () => {
  let adminToken;
  let memberToken;
  let leadId;

  beforeEach(async () => {
    const tokens = await seedOrgUsers();
    adminToken = tokens.admin;
    memberToken = tokens.member;
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
      expect(res.body.data.lead.organizationId).toBeDefined();
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

    it('should reject assigning a representative from another organization', async () => {
      const foreignOrg = await Organization.create({ name: 'Foreign Org', slug: `foreign-${Date.now()}` });
      const foreignUser = await User.create({
        name: 'Foreign Rep',
        email: 'foreign@test.com',
        password: 'password123',
        role: 'MEMBER',
        status: 'ACTIVE',
        organizationId: foreignOrg._id,
      });

      const res = await request(app)
        .post('/api/v1/leads')
        .set('Authorization', `Bearer ${adminToken}`)
        .send({ name: 'Bad Assign', email: 'bad@test.com', assignedTo: foreignUser._id.toString() })
        .expect(400);

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

  describe('Multi-Tenant Data Isolation', () => {
    let orgAAdminToken;
    let orgBAdminToken;
    let orgALeadId;

    beforeEach(async () => {
      const orgA = await Organization.create({ name: 'Org A', slug: `org-a-${Date.now()}` });
      const orgB = await Organization.create({ name: 'Org B', slug: `org-b-${Date.now()}` });
      await User.create({ name: 'Org A Admin', email: 'a@test.com', password: 'password123', role: 'ADMIN', status: 'ACTIVE', organizationId: orgA._id });
      await User.create({ name: 'Org B Admin', email: 'b@test.com', password: 'password123', role: 'ADMIN', status: 'ACTIVE', organizationId: orgB._id });
      orgAAdminToken = await login('a@test.com');
      orgBAdminToken = await login('b@test.com');

      const createRes = await request(app)
        .post('/api/v1/leads')
        .set('Authorization', `Bearer ${orgAAdminToken}`)
        .send({ name: 'Secret Lead A', email: 'secret@a.com', value: 99999 });
      orgALeadId = createRes.body.data.lead._id || createRes.body.data.lead.id;
    });

    it('should not expose org A leads to org B via list', async () => {
      const res = await request(app)
        .get('/api/v1/leads')
        .set('Authorization', `Bearer ${orgBAdminToken}`)
        .expect(200);

      const names = res.body.data.map((l) => l.name);
      expect(names).not.toContain('Secret Lead A');
    });

    it('should return 404 when org B fetches org A lead by id', async () => {
      const res = await request(app)
        .get(`/api/v1/leads/${orgALeadId}`)
        .set('Authorization', `Bearer ${orgBAdminToken}`)
        .expect(404);

      expect(res.body.success).toBe(false);
    });

    it('should return 404 when org B updates org A lead', async () => {
      await request(app)
        .put(`/api/v1/leads/${orgALeadId}`)
        .set('Authorization', `Bearer ${orgBAdminToken}`)
        .send({ status: 'Contacted' })
        .expect(404);
    });

    it('should return 404 when org B adds a note to org A lead', async () => {
      await request(app)
        .post(`/api/v1/leads/${orgALeadId}/notes`)
        .set('Authorization', `Bearer ${orgBAdminToken}`)
        .send({ text: 'pwned' })
        .expect(404);
    });

    it('should scope metrics per organization', async () => {
      const res = await request(app)
        .get('/api/v1/leads/metrics')
        .set('Authorization', `Bearer ${orgBAdminToken}`)
        .expect(200);

      expect(res.body.data.metrics.totalLeads).toBe(0);
    });

    it('should scope the user list per organization', async () => {
      const res = await request(app)
        .get('/api/v1/users')
        .set('Authorization', `Bearer ${orgAAdminToken}`)
        .expect(200);

      const emails = res.body.data.users.map((u) => u.email);
      expect(emails).toContain('a@test.com');
      expect(emails).not.toContain('b@test.com');
    });

    it('should scope report overview per organization', async () => {
      const res = await request(app)
        .get('/api/v1/reports/overview')
        .set('Authorization', `Bearer ${orgBAdminToken}`)
        .expect(200);

      expect(res.body.data.totalLeads).toBe(0);
    });

    it('should not allow org A admin to change org B user role', async () => {
      const orgBUser = await User.findOne({ email: 'b@test.com' });

      const res = await request(app)
        .patch(`/api/v1/users/${orgBUser._id}/role`)
        .set('Authorization', `Bearer ${orgAAdminToken}`)
        .send({ role: 'MEMBER' })
        .expect(404);

      expect(res.body.success).toBe(false);
    });
  });
});
