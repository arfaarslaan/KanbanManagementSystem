'use client';
import { Task, Status } from '@/types';

const KEY = 'kanban_tasks_v1';

function delay(ms: number) {
  return new Promise(res => setTimeout(res, ms));
}

function getStore(): Task[] {
  if (typeof window === 'undefined') return [];
  const raw = localStorage.getItem(KEY);
  if (!raw) return [];
  try { return JSON.parse(raw) as Task[]; } catch { return []; }
}

function setStore(data: Task[]) {
  if (typeof window === 'undefined') return;
  localStorage.setItem(KEY, JSON.stringify(data));
}

export async function bootstrap(seed: Task[]) {
  if (typeof window === 'undefined') return;
  const existing = localStorage.getItem(KEY);
  if (!existing) {
    setStore(seed);
  }
}

export async function listTasks(): Promise<Task[]> {
  await delay(200);
  return getStore();
}

export async function getTask(id: string): Promise<Task | null> {
  await delay(150);
  return getStore().find(t => t.id === id) ?? null;
}

export async function createTask(input: Omit<Task,'id'|'createdAt'>): Promise<Task> {
  await delay(250);
  if (!input.title?.trim()) throw new Error('Title is required');
  const t: Task = { ...input, id: crypto.randomUUID(), createdAt: new Date().toISOString() };
  const all = getStore();
  all.unshift(t);
  setStore(all);
  return t;
}

export async function updateTask(id: string, patch: Partial<Task>): Promise<Task> {
  await delay(250);
  const all = getStore();
  const idx = all.findIndex(t => t.id === id);
  if (idx === -1) throw new Error('Task not found');
  all[idx] = { ...all[idx], ...patch };
  setStore(all);
  return all[idx];
}

export async function deleteTask(id: string): Promise<void> {
  await delay(200);
  const all = getStore().filter(t => t.id !== id);
  setStore(all);
}

export async function moveTask(id: string, status: Status): Promise<Task> {
  return updateTask(id, { status });
}
