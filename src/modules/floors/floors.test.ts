// Project: Open Indoor Maps
// File: src/modules/floors/floors.test.ts

// Floor Unit Tests

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

describe('Floors API', () => {
  let buildingId: number;

  beforeEach(async () => {
    // Create a building to associate the floor with
    const newBuilding = await prisma.buildings.create({
      data: {
        name: 'Test Building for Floors',
        desc: 'Test Description',
        address: { street: 'Test Street' },
        attributes: { type: 'Office' },
        is_active: true,
      },
    });
    buildingId = newBuilding.id;
  });

  afterEach(async () => {
    // Clean up the test building
    await prisma.buildings.delete({ where: { id: buildingId } });
  });

  it('should create a floor', async () => {
    const newFloor = {
      building_id: buildingId,
      name: 'Test Floor',
      desc: 'Test Description',
      elevation: 10,
      floor_map: 'test_map.png',
      attributes: { type: 'Lobby' },
      is_active: true,
    };

    const res = await request(app).post('/api/v1/floors').send(newFloor);
    expect(res.statusCode).toEqual(201);
    expect(res.body.name).toEqual(newFloor.name);
    expect(res.body.building_id).toEqual(buildingId);

    // Clean up the created floor
    await prisma.floors.delete({ where: { id: res.body.id } });
  });
});