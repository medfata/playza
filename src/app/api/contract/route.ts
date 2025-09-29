import { NextRequest, NextResponse } from 'next/server';

// In-memory storage for contract address
let contractAddress: string = '';

export async function GET() {
  try {
    return NextResponse.json({
      success: true,
      contractAddress: contractAddress || ''
    });
  } catch (error) {
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

    // Allow empty strings and update in-memory variable
    contractAddress = newAddress || '';

    return NextResponse.json({
      success: true,
      message: 'Contract address updated successfully',
      contractAddress: contractAddress
    });
  } catch (error) {
    return NextResponse.json(
      { success: false, error: 'Failed to update contract address' },
      { status: 500 }
    );
  }
}