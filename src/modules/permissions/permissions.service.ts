// Project: Open Indoor Maps
// File: src/modules/permissions/permissions.service.ts

import { PrismaClient } from '@prisma/client';
import { ApiError } from '../../utils/apiError';
import { permissionNotFound } from "./permissions.constants";

const prisma = new PrismaClient();

export const getAllPermissions = async (page: number, limit: number) => {
    const skip = (page - 1) * limit;
    const [permissions, totalItems] = await Promise.all([
        prisma.permission.findMany({
            skip,
            take: limit,
            select: {
                id: true,
                role_id: true,
                permission: true,
                created_at: true,
                updated_at: true,
            }
        }),
        prisma.permission.count()
    ]);
    return { permissions, totalItems };
};

export const getPermissionById = async (id: number) => {
  const permission = await prisma.permission.findUnique({
    where: { id },
  });
  if (!permission) {
    throw new ApiError(404, permissionNotFound);
  }
  return permission;
};

export const createPermission = async (data: any) => {
  return prisma.permission.create({ data });
};

export const updatePermission = async (id: number, data: any) => {
  try {
    return await prisma.permission.update({
      where: { id },
      data,
    });
  } catch (error: any) {
    if (error.code === 'P2025') {
      throw new ApiError(404, permissionNotFound);
    }
    throw error;
  }
};

export const deletePermission = async (id: number) => {
  try {
    await prisma.permission.delete({
      where: { id },
    });
  } catch (error: any) {
    if (error.code === 'P2025') {
      throw new ApiError(404, permissionNotFound);
    }
    throw error;
  }
};