
'use client';
import { STATUSES } from '@/types';
import StatusColumn from '@/components/StatusColumn';
import NewTaskDialog from '@/components/NewTaskDialog';
import Filters from '@/components/Filters';
import { useTasks } from '@/lib/useTasks';
import { useMemo, useState } from 'react';

export default function Page() {
  const { tasks, refresh, error } = useTasks();
  const [filters, setFilters] = useState({ q:'', assignee:'', tag:'' });

  const filtered = useMemo(() => {
    if (!tasks) return [];
    const norm = (s:string) => s.toLowerCase();
    return tasks.filter(t => {
      const text = [t.title, t.description, t.assignee, ...t.tags].join(' ').toLowerCase();
      const passQ = filters.q ? text.includes(norm(filters.q)) : true;
      const passAssignee = filters.assignee ? norm(t.assignee) === norm(filters.assignee) : true;
      const passTag = filters.tag ? t.tags.some(tag => norm(tag) === norm(filters.tag)) : true;
      return passQ && passAssignee && passTag;
    });
  }, [tasks, filters]);

  if (error) return <div className="card text-red-600">Error: {error}</div>;
  if (tasks === null) return <div className="card">Loading tasks…</div>;

  return (
    <div className="space-y-4">
      <div className="flex items-center justify-between">
        <h1 className="text-2xl font-semibold">Task List</h1>
        <NewTaskDialog onCreated={()=>refresh()}/>
      </div>
      <Filters onChange={setFilters} />

      <div className="grid md:grid-cols-3 gap-4">
        {STATUSES.map(s => {
          const items = filtered.filter(t => t.status === s.key);
          return <StatusColumn key={s.key} title={s.label} status={s.key} items={items} onMoved={refresh} />;
        })}
      </div>
    </div>
  );
}
