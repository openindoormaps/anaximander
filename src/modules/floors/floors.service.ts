// Project: Open Indoor Maps
// File: src/modules/floors/floors.service.ts
import { PrismaClient } from '@prisma/client';
import { ApiError } from '../../utils/apiError';
import { floorNotFound,  } from './floors.constants';
import { buildingNotFound } from '../buildings/buildings.constants'

// Create a new Prisma client
const prisma = new PrismaClient();

// Get all floors
export const getAllFloors = async () => {
  return prisma.floors.findMany();
};


// Get floor by ID
export const getFloorById = async (id: number) => {
  const floor = await prisma.floors.findUnique({
    where: { id },
  });

  if (!floor) {
    throw new ApiError(404, floorNotFound);
  }
  return floor;
};

// Create a floor

export const createFloor = async (data: any) => {
  // Check if building exists
  const buildingExists = await prisma.buildings.findUnique({
    where: { id: data.building_id },
  });

  if (!buildingExists) {
    throw new ApiError(400, buildingNotFound);
  }

  return prisma.floors.create({ data });
};

// Update a floor
export const updateFloor = async (id: number, data: any) => {
  try {
    return await prisma.floors.update({
      where: { id },
      data,
    });
  } catch (error: any) {
    if (error.code === 'P2025') {
      throw new ApiError(404, floorNotFound);
    }
    throw error; 
  }
};

// Delete a floor
export const deleteFloor = async (id: number) => {
  try {
    await prisma.floors.delete({
      where: { id },
    });
  } catch (error: any) {
    if (error.code === 'P2025') {
      throw new ApiError(404, floorNotFound);
    }
    throw error; 
  }
};

// Get floors by building ID
export const getFloorsByBuildingId = async (buildingId: number) => {
  return prisma.floors.findMany({
    where: { building_id: buildingId },
  });
};