// Project: Open Indoor Maps
//File: src/modules/users/users.test.ts
import request from 'supertest';
import app from '../../app';
import { PrismaClient } from '@prisma/client';
import * as bcrypt from 'bcrypt';

const prisma = new PrismaClient();

beforeAll(async () => {
  await prisma.$connect();
});

afterAll(async () => {
  await prisma.$disconnect();
});

describe('Users API', () => {
  let roleId: number;

  beforeEach(async () => {
    // Create a role for associating users to
    const newRole = await prisma.userRole.create({
      data: {
        name: 'Test Role',
        desc: 'Test Role Description',
        is_active: true,
      },
    });
    roleId = newRole.id;
  });

  afterEach(async () => {
    // Clean up test data (including users and the role)
    await prisma.user.deleteMany({ where: { role_id: roleId } });
    await prisma.userRole.delete({ where: { id: roleId } });
  });

  it('should create a user', async () => {
    const hashedPassword = await bcrypt.hash('password123', 10); // Hash the password before sending
    const newUser = {
      user_name: 'testuser',
      first_name: 'Test',
      last_name: 'User',
      email: 'test@example.com',
      hashed_password: hashedPassword,
      role_id: roleId,
      is_active: true,
    };

    const res = await request(app).post('/api/v1/users').send(newUser);
    expect(res.statusCode).toEqual(201);
    expect(res.body.user_name).toEqual(newUser.user_name);
    expect(res.body.email).toEqual(newUser.email);

    // Clean up
    await prisma.user.delete({ where: { id: res.body.id } });
  });

  //Add test cases later.
});