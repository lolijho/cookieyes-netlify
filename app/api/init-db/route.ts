import { NextRequest, NextResponse } from 'next/server';
import { initDatabase } from '../../../db';

export async function GET(request: NextRequest) {
  try {
    console.log('🚀 Inizializzazione database PostgreSQL...');
    
    await initDatabase();

    return NextResponse.json({
      message: 'Database PostgreSQL inizializzato con successo',
      status: 'success'
    });

  } catch (error) {
    console.error('❌ Errore durante l\'inizializzazione:', error);
    return NextResponse.json(
      { message: 'Errore durante l\'inizializzazione del database', error: error.message },
      { status: 500 }
    );
  }
}

export async function POST(request: NextRequest) {
  return GET(request);
} 