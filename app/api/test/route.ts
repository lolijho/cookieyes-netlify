import { NextResponse } from 'next/server';

export async function GET() {
  return NextResponse.json({
    message: 'Test endpoint funziona correttamente',
    timestamp: new Date().toISOString()
  });
}

export async function POST() {
  return NextResponse.json({
    message: 'Test POST endpoint funziona correttamente',
    timestamp: new Date().toISOString()
  });
} 