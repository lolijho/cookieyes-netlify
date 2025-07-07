import type { NextApiRequest, NextApiResponse } from 'next';
import { db } from '../db';
import bcrypt from 'bcryptjs';

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  if (req.method !== 'POST') {
    return res.status(405).json({ message: 'Metodo non consentito' });
  }

  const { email, password } = req.body;
  if (!email || !password) {
    return res.status(400).json({ message: 'Email e password obbligatorie' });
  }

  try {
    const result = await db.execute({
      sql: 'SELECT * FROM users WHERE email = ?',
      args: [email],
    });
    const user = result.rows[0];
    if (!user) {
      return res.status(401).json({ message: 'Credenziali non valide' });
    }
    const isValid = await bcrypt.compare(password, user.password_hash);
    if (!isValid) {
      return res.status(401).json({ message: 'Credenziali non valide' });
    }
    // Qui puoi generare un token o una sessione custom se vuoi
    return res.status(200).json({ message: 'Login effettuato', user: { id: user.id, email: user.email } });
  } catch (error) {
    return res.status(500).json({ message: 'Errore server', error: String(error) });
  }
} 