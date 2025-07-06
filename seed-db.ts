import { db } from '../src/lib/db';
import { users, projects } from '../src/lib/db/schema';
import { generateId, hashPassword, createDefaultCookieCategories } from '../src/lib/db/utils';

async function seedDatabase() {
  console.log('🌱 Seeding database...');

  try {
    // Crea utente di esempio
    const userId = generateId();
    const user = {
      id: userId,
      email: 'demo@cookieyes.com',
      passwordHash: await hashPassword('demo123'),
      name: 'Demo User',
    };

    await db.insert(users).values(user);
    console.log('✅ Created demo user:', user.email);

    // Crea progetto di esempio
    const projectId = generateId();
    const project = {
      id: projectId,
      userId: userId,
      name: 'Sito Demo',
      domain: 'demo.esempio.com',
      language: 'it',
      bannerTitle: 'Utilizziamo i cookie',
      bannerDescription: 'Questo sito utilizza cookie per migliorare la tua esperienza di navigazione. Puoi accettare tutti i cookie o personalizzare le tue preferenze.',
    };

    await db.insert(projects).values(project);
    console.log('✅ Created demo project:', project.name);

    // Crea categorie cookie di default
    await createDefaultCookieCategories(projectId);
    console.log('✅ Created default cookie categories');

    console.log('🎉 Database seeded successfully!');
    console.log('\n📋 Demo credentials:');
    console.log('Email: demo@cookieyes.com');
    console.log('Password: demo123');

  } catch (error) {
    console.error('❌ Error seeding database:', error);
  }
}

// Esegui il seeding se chiamato direttamente
if (require.main === module) {
  seedDatabase().then(() => process.exit(0));
}

export { seedDatabase };

