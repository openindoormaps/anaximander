// Project: Open Indoor Maps
//File: src/modules/user_roles/user_roles.test.ts

import request from 'supertest';
import app from '../../app';
import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

beforeAll(async () => {
  await prisma.$connect();
});

afterAll(async () => {
  await prisma.$disconnect();
});

describe('User Roles API', () => {
  it('should create a user role', async () => {
    const newRole = {
      name: 'TestRole',
      desc: 'Test Description',
      is_active: true,
    };

    const res = await request(app).post('/api/v1/user_roles').send(newRole);
    expect(res.statusCode).toEqual(201);
    expect(res.body.name).toEqual(newRole.name);

    // Clean up the created role
    await prisma.userRole.delete({ where: { id: res.body.id } });
  });

  // Add other test cases later
});