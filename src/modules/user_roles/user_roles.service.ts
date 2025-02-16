// Project: Open Indoor Maps
//File: src/modules/user_roles/user_roles.service.ts
import { PrismaClient } from '@prisma/client';
import { ApiError } from '../../utils/apiError';
import { userRoleNotFound, roleNameTaken } from './user_roles.constants';

const prisma = new PrismaClient();

export const getAllUserRoles = async (page: number, limit: number) => {
    const skip = (page - 1) * limit;
    const [userRoles, totalItems] = await Promise.all([
        prisma.userRole.findMany({
            skip,
            take: limit,
            select: {
                id: true,
                name: true,
                desc: true,
                is_active: true,
                created_at: true,
                updated_at: true,
            }
        }),
        prisma.userRole.count()
    ]);
    return { userRoles, totalItems };
};

export const getUserRoleById = async (id: number) => {
  const userRole = await prisma.userRole.findUnique({
    where: { id },
      select: {
                id: true,
                name: true,
                desc: true,
                is_active: true,
                created_at: true,
                updated_at: true,
            }
  });
  if (!userRole) {
    throw new ApiError(404, userRoleNotFound);
  }
  return userRole;
};

export const createUserRole = async (data: any) => {

      const existingRole = await prisma.userRole.findFirst({
            where: { name: data.name },
        });

        if (existingRole) {
            throw new ApiError(400, roleNameTaken);
        }
    return prisma.userRole.create({ data });
};

export const updateUserRole = async (id: number, data: any) => {
  try {
    return await prisma.userRole.update({
      where: { id },
      data,
    });
  } catch (error: any) {
    if (error.code === 'P2025') {
      throw new ApiError(404, userRoleNotFound);
    }
    throw error;
  }
};

export const deleteUserRole = async (id: number) => {
  try {
    await prisma.userRole.delete({
      where: { id },
    });
  } catch (error: any) {
    if (error.code === 'P2025') {
      throw new ApiError(404, userRoleNotFound);
    }
    throw error;
  }
};