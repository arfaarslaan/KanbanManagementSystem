
'use client';
import { useEffect, useState } from 'react';
import { Task } from '@/types';
import { listTasks, bootstrap } from '@/lib/storage';
import seed from '@/data/seed.json';

export type Filters = { q: string; assignee: string; tag: string };

export function useTasks() {
  const [tasks, setTasks] = useState<Task[] | null>(null);
  const [error, setError] = useState<string>('');

  useEffect(() => {
    bootstrap(seed as unknown as Task[]).then(async () => {
      try {
        const data = await listTasks();
        setTasks(data);
      } catch (e: any) {
        setError(e?.message ?? 'Failed to load tasks');
        setTasks([]);
      }
    });
  }, []);

  const refresh = async () => {
    try {
      const data = await listTasks();
      setTasks(data);
    } catch (e: any) {
      setError(e?.message ?? 'Failed to load tasks');
    }
  };

  return { tasks, setTasks, refresh, error };
}

export function applyFilters(tasks: Task[], f: Filters): Task[] {
  const norm = (s: string) => s.toLowerCase();
  return tasks.filter(t => {
    const text = [t.title, t.description, t.assignee, ...t.tags].join(' ').toLowerCase();
    const passQ = f.q ? text.includes(norm(f.q)) : true;
    const passAssignee = f.assignee ? norm(t.assignee) === norm(f.assignee) : true;
    const passTag = f.tag ? t.tags.some(tag => norm(tag) === norm(f.tag)) : true;
    return passQ && passAssignee && passTag;
  });
}
