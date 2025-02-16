// Project: Open Indoor Maps
//File: src/modules/permissions/permissions.test.ts

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

describe('Permissions API', () => {
  let roleId: number;

  beforeEach(async () => {
    // Create a role for associating permissions to
    const newRole = await prisma.userRole.create({
      data: {
        name: 'TestRole',
        desc: 'Test Description',
        is_active: true,
      },
    });
    roleId = newRole.id;
  });

  afterEach(async () => {
    // Clean up test data (including permissions and roles)
    await prisma.permission.deleteMany({ where: { role_id: roleId } });
    await prisma.userRole.delete({ where: { id: roleId } });
  });

  it('should create a permission', async () => {
    const newPermission = {
      role_id: roleId,
      permission: { read: true, write: false },
    };

    const res = await request(app).post('/api/v1/permissions').send(newPermission);
    expect(res.statusCode).toEqual(201);
    expect(res.body.role_id).toEqual(roleId);
    expect(res.body.permission).toEqual(newPermission.permission);

    // Clean up the created permission
    await prisma.permission.delete({ where: { id: res.body.id } });
  });

  //Add test cases later.
});