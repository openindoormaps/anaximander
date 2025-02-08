// Project: Open Indoor Maps
// File: src/modules/buildings/buildings.service.ts

import { PrismaClient } from '@prisma/client';
import { ApiError } from '../../utils/apiError';

import { buildingNotFound } from './buildings.constants';


// Create a new instance of PrismaClient
const prisma = new PrismaClient();

// Get all buildings
export const getAllBuildings = async () => {
  return prisma.buildings.findMany();
};

// Get a building by ID
export const getBuildingById = async (id: number) => {
  const building = await prisma.buildings.findUnique({
    where: { id },
    include: { floors: true },
  });

  if (!building) {
    throw new ApiError(404, buildingNotFound);
  }
  return building;
};

// Create a new building
export const createBuilding = async (data: any) => {
  return prisma.buildings.create({ data });
};

// Update a building
export const updateBuilding = async (id: number, data: any) => {
  try {
    return await prisma.buildings.update({
      where: { id },
      data,
    });
  } catch (error: any) {
    if (error.code === 'P2025') {
      throw new ApiError(404, buildingNotFound);
    }
    throw error;
  }
};

// Delete a building
export const deleteBuilding = async (id: number) => {
  try {
    await prisma.buildings.delete({
      where: { id },
    });
  } catch (error: any) {
    if (error.code === 'P2025') {
      throw new ApiError(404, buildingNotFound);
    }
    throw error;
  }
};