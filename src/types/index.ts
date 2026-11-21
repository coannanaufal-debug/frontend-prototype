// src/types/index.ts

export type Source = 'Scopus' | 'Sinta' | 'DOAJ' | 'Google Scholar'

export interface Paper {
  id: string
  title: string
  authors: string[]
  year: number
  journal: string
  doi: string
  category: Category
  sources: Source[]
  openAccess: boolean
  abstract: string
  citations: number
  publisher: string
}

export type Category = 'all' | 'teknik-ti' | 'manajemen' | 'sosial-hi' | 'kesehatan'

export interface CategoryMeta {
  id: Category
  label: string
  count: number
}

export interface SourceMeta {
  id: Source | 'all'
  label: string
  count: number
}

export interface ReadingFolder {
  id: string
  name: string
  paperIds: string[]
  createdAt: string
}

export interface AISummary {
  background: string
  method: string
  results: string
  keywords: string[]
}
