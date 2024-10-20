import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

/**
 * Connects to the database and logs the status.
 * Throws an error if the connection fails.
 */
export const connectToDatabase = async (): Promise<void> => {
  try {
    await prisma.$connect();
    console.log('✅ Connected to the database successfully!');
  } catch (error) {
    console.error('❌ Error connecting to the database:', error);
    throw new Error('Database connection failed');
  }
};

/**
 * Returns the Prisma Client instance.
 * @returns {PrismaClient} The Prisma Client instance.
 */
export const getPrismaClient = (): PrismaClient => {
  return prisma;
};

/**
 * Disconnects from the database when the application is shutting down.
 */
export const disconnectDatabase = async (): Promise<void> => {
  try {
    await prisma.$disconnect();
    console.log('🚪 Disconnected from the database successfully!');
  } catch (error) {
    console.error('❌ Error disconnecting from the database:', error);
  }
};
