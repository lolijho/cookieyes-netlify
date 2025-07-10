// Gestione progetti con localStorage - Soluzione gratuita
export interface ProjectLocal {
  id: string
  user_id: string
  name: string
  domain: string
  language: string
  banner_config: any
  created_at: string
  updated_at: string
}

const STORAGE_KEY = 'cookie_projects'

export class LocalProjectsManager {
  // Ottieni tutti i progetti
  static getAll(): ProjectLocal[] {
    if (typeof window === 'undefined') return []
    
    try {
      const stored = localStorage.getItem(STORAGE_KEY)
      return stored ? JSON.parse(stored) : []
    } catch (error) {
      console.error('Errore nel leggere i progetti:', error)
      return []
    }
  }

  // Salva tutti i progetti
  static saveAll(projects: ProjectLocal[]): void {
    if (typeof window === 'undefined') return
    
    try {
      localStorage.setItem(STORAGE_KEY, JSON.stringify(projects))
    } catch (error) {
      console.error('Errore nel salvare i progetti:', error)
    }
  }

  // Crea un nuovo progetto
  static create(projectData: Omit<ProjectLocal, 'id' | 'created_at' | 'updated_at'>): ProjectLocal {
    const projects = this.getAll()
    const now = new Date().toISOString()
    
    const newProject: ProjectLocal = {
      ...projectData,
      id: this.generateId(),
      created_at: now,
      updated_at: now
    }
    
    projects.push(newProject)
    this.saveAll(projects)
    
    return newProject
  }

  // Ottieni progetti di un utente
  static getByUser(userId: string): ProjectLocal[] {
    return this.getAll().filter(project => project.user_id === userId)
  }

  // Ottieni un progetto per ID
  static getById(id: string): ProjectLocal | null {
    return this.getAll().find(project => project.id === id) || null
  }

  // Aggiorna un progetto
  static update(id: string, updates: Partial<ProjectLocal>): ProjectLocal | null {
    const projects = this.getAll()
    const index = projects.findIndex(project => project.id === id)
    
    if (index === -1) return null
    
    projects[index] = {
      ...projects[index],
      ...updates,
      updated_at: new Date().toISOString()
    }
    
    this.saveAll(projects)
    return projects[index]
  }

  // Elimina un progetto
  static delete(id: string): boolean {
    const projects = this.getAll()
    const filteredProjects = projects.filter(project => project.id !== id)
    
    if (filteredProjects.length === projects.length) return false
    
    this.saveAll(filteredProjects)
    return true
  }

  // Genera un ID unico
  static generateId(): string {
    return 'project_' + Date.now() + '_' + Math.random().toString(36).substr(2, 9)
  }

  // Esporta tutti i progetti come JSON (per backup)
  static exportToJSON(): string {
    return JSON.stringify(this.getAll(), null, 2)
  }

  // Importa progetti da JSON (per restore)
  static importFromJSON(jsonString: string): boolean {
    try {
      const projects = JSON.parse(jsonString)
      if (Array.isArray(projects)) {
        this.saveAll(projects)
        return true
      }
      return false
    } catch (error) {
      console.error('Errore nell\'importare i progetti:', error)
      return false
    }
  }

  // Pulisci tutti i progetti (per debug)
  static clear(): void {
    if (typeof window === 'undefined') return
    localStorage.removeItem(STORAGE_KEY)
  }

  // Ottieni statistiche
  static getStats(): { total: number, byUser: Record<string, number> } {
    const projects = this.getAll()
    const byUser: Record<string, number> = {}
    
    projects.forEach(project => {
      byUser[project.user_id] = (byUser[project.user_id] || 0) + 1
    })
    
    return {
      total: projects.length,
      byUser
    }
  }
} 