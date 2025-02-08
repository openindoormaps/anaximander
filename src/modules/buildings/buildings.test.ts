// Project: Open Indoor Maps
// File: src/modules/buildings/buildings.test.ts

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

describe('Buildings API', () => {
  it('should get all buildings', async () => {
    const res = await request(app).get('/api/v1/buildings');
    expect(res.statusCode).toEqual(200);
    expect(Array.isArray(res.body)).toBe(true);
  });

  it('should create a building', async () => {
    const newBuilding = {
      name: 'Test Building',
      desc: 'Test Description',
      address: { street: 'Test Street' },
      attributes: { type: 'Office' },
      is_active: true,
    };

    const res = await request(app).post('/api/v1/buildings').send(newBuilding);
    expect(res.statusCode).toEqual(201);
    expect(res.body.name).toEqual(newBuilding.name);

    // Clean up the created building (optional)
    await prisma.buildings.delete({ where: { id: res.body.id } });
  });
});