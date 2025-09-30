import { NextRequest, NextResponse } from 'next/server';
import { createClient } from 'redis';

const REDIS_KEY = 'playza:contract_address';

// Create Redis client
let redisClient: ReturnType<typeof createClient> | null = null;

async function getRedisClient() {
  if (!redisClient) {
    const redisUrl = process.env.REDIS_URL;

    if (!redisUrl) {
      throw new Error('REDIS_URL environment variable is not set');
    }

    redisClient = createClient({
      url: redisUrl
    });

    redisClient.on('error', (err) => console.error('Redis Client Error', err));

    await redisClient.connect();
  }

  return redisClient;
}

// Helper to read contract address from Redis
async function readContractAddress(): Promise<string> {
  try {
    const client = await getRedisClient();
    const address = await client.get(REDIS_KEY);
    return address || '';
  } catch (error) {
    console.error('Error reading from Redis:', error);
    return '';
  }
}

// Helper to write contract address to Redis
async function writeContractAddress(address: string): Promise<void> {
  const client = await getRedisClient();
  await client.set(REDIS_KEY, address);
}

export async function GET() {
  try {
    const contractAddress = await readContractAddress();
    return NextResponse.json({
      success: true,
      contractAddress: contractAddress
    });
  } catch (error) {
    console.error('GET error:', error);
    return NextResponse.json(
      { success: false, error: 'Failed to read contract address' },
      { status: 500 }
    );
  }
}

export async function POST(request: NextRequest) {
  try {
    const body = await request.json();
    const { contractAddress: newAddress } = body;

    // Allow empty strings and update Redis
    await writeContractAddress(newAddress || '');

    return NextResponse.json({
      success: true,
      message: 'Contract address updated successfully',
      contractAddress: newAddress || ''
    });
  } catch (error) {
    console.error('POST error:', error);
    return NextResponse.json(
      { success: false, error: 'Failed to update contract address' },
      { status: 500 }
    );
  }
}