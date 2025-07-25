// Sistema di backup automatico su Turso
import { LocalProjectsManager, ProjectLocal } from './localStorage';

export class TursoBackup {
  private static isBackingUp = false;
  private static lastBackupTime = 0;
  private static backupInterval = 30000; // 30 secondi
  
  // Avvia il backup automatico periodico
  static startAutoBackup() {
    if (typeof window === 'undefined') return;
    
    console.log('🔄 Backup automatico Turso avviato');
    
    // Backup immediato al caricamento
    this.performBackup();
    
    // Backup periodico ogni 30 secondi
    setInterval(() => {
      this.performBackup();
    }, this.backupInterval);
  }
  
  // Esegue il backup
  static async performBackup() {
    if (this.isBackingUp) return;
    
    try {
      this.isBackingUp = true;
      const projects = LocalProjectsManager.getAll();
      
      if (projects.length === 0) {
        console.log('📦 Nessun progetto da backuppare');
        return;
      }
      
      const response = await fetch('/api/backup/sync', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          projects: projects,
          timestamp: new Date().toISOString()
        })
      });
      
      if (response.ok) {
        this.lastBackupTime = Date.now();
        console.log(`✅ Backup completato: ${projects.length} progetti salvati su Turso`);
      } else {
        console.log('⚠️ Backup fallito, progetti salvati solo localmente');
      }
    } catch (error) {
      console.log('⚠️ Errore backup:', error);
    } finally {
      this.isBackingUp = false;
    }
  }
  
  // Forza un backup immediato
  static async forceBackup(): Promise<boolean> {
    try {
      await this.performBackup();
      return true;
    } catch (error) {
      console.error('Errore nel backup forzato:', error);
      return false;
    }
  }
  
  // Ripristina i progetti da Turso
  static async restoreFromTurso(): Promise<boolean> {
    try {
      const response = await fetch('/api/backup/restore', {
        method: 'GET',
        headers: {
          'Content-Type': 'application/json',
        }
      });
      
      if (!response.ok) {
        throw new Error('Errore nel ripristino da Turso');
      }
      
      const data = await response.json();
      
      if (data.projects && data.projects.length > 0) {
        // Merge intelligente dei progetti (localStorage ha priorità)
        const localProjects = LocalProjectsManager.getAll();
        const localIds = new Set(localProjects.map(p => p.id));
        const localNameDomains = new Set(localProjects.map(p => `${p.name}|||${p.domain}`));
        
        // Filtra progetti che non esistono per ID o per nome+dominio
        const newProjects = data.projects.filter((p: ProjectLocal) => 
          !localIds.has(p.id) && !localNameDomains.has(`${p.name}|||${p.domain}`)
        );
        
        let restoredCount = 0;
        for (const project of newProjects) {
          try {
            // Usa createWithId per preservare l'ID originale e controllare duplicati
            LocalProjectsManager.createWithId(project);
            restoredCount++;
          } catch (error) {
            console.warn(`Saltato progetto duplicato: ${project.name} - ${project.domain}`);
          }
        }
        
        console.log(`✅ Ripristinati ${restoredCount} progetti da Turso (${newProjects.length - restoredCount} saltati per duplicati)`);
        return restoredCount > 0;
      }
      
      return false;
    } catch (error) {
      console.error('Errore nel ripristino:', error);
      return false;
    }
  }
  
  // Stato del backup
  static getBackupStatus() {
    return {
      isBackingUp: this.isBackingUp,
      lastBackupTime: this.lastBackupTime,
      timeSinceLastBackup: Date.now() - this.lastBackupTime
    };
  }
  
  // Sincronizza con Turso (merge intelligente)
  static async syncWithTurso(): Promise<{ imported: number, exported: number }> {
    try {
      // 1. Ripristina progetti mancanti da Turso
      const restoreResult = await this.restoreFromTurso();
      
      // 2. Backup dei progetti locali
      await this.performBackup();
      
      // 3. Conta i risultati
      const projects = LocalProjectsManager.getAll();
      
      return {
        imported: restoreResult ? 1 : 0,
        exported: projects.length
      };
    } catch (error) {
      console.error('Errore nella sincronizzazione:', error);
      return { imported: 0, exported: 0 };
    }
  }
} 