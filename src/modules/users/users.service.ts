// Project: Open Indoor Maps
// File: src/modules/users/users.service.ts
import { PrismaClient } from '@prisma/client';
import { ApiError } from '../../utils/apiError';
import { userNotFound, usernameTaken, emailTaken } from './users.constants';
import * as bcrypt from 'bcrypt';

const prisma = new PrismaClient();

export const getAllUsers = async (page: number, limit: number) => {
    const skip = (page - 1) * limit;
    const [users, totalItems] = await Promise.all([
        prisma.user.findMany({
            skip,
            take: limit,
            select: {
                id: true,
                user_name: true,
                first_name: true,
                last_name: true,
                email: true,
                is_active: true,
                role_id: true,
                created_at: true,
                updated_at: true,
            }
        }),
        prisma.user.count()
    ]);
    return { users, totalItems };
};

export const getUserById = async (id: number) => {
  const user = await prisma.user.findUnique({
    where: { id },
  });
  if (!user) {
    throw new ApiError(404, userNotFound);
  }
  return user;
};

export const createUser = async (data: any) => {
    // Check if username or email is already taken
    const existingUser = await prisma.user.findFirst({
        where: {
            OR: [
                { user_name: data.user_name },
                { email: data.email },
            ],
        },
    });

    if (existingUser) {
        if (existingUser.user_name === data.user_name) {
            throw new ApiError(400, usernameTaken);
        } else {
            throw new ApiError(400, emailTaken);
        }
    }

  // Hash the password
  const hashedPassword = await bcrypt.hash(data.hashed_password, 10);

  return prisma.user.create({
    data: {
      ...data,
      hashed_password: hashedPassword,
    },
  });
};

export const updateUser = async (id: number, data: any) => {
  try {
    // Hash the password if it's being updated
    if (data.hashed_password) {
      data.hashed_password = await bcrypt.hash(data.hashed_password, 10);
    }

    return await prisma.user.update({
      where: { id },
      data,
    });
  } catch (error: any) {
    if (error.code === 'P2025') {
      throw new ApiError(404, userNotFound);
    }
    throw error;
  }
};

export const deleteUser = async (id: number) => {
  try {
    await prisma.user.delete({
      where: { id },
    });
  } catch (error: any) {
    if (error.code === 'P2025') {
      throw new ApiError(404, userNotFound);
    }
    throw error;
  }
};