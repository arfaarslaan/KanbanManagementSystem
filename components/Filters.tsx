
'use client';
import { useEffect, useState } from 'react';
export interface FilterState { q: string; assignee: string; tag: string; }
const KEY = 'kanban_filters_v1';
export default function Filters({ onChange }: { onChange: (f: FilterState)=>void }) {
  const [f, setF] = useState<FilterState>({ q:'', assignee:'', tag:'' });

  useEffect(() => {
    try {
      const raw = localStorage.getItem(KEY);
      if (raw) {
        const parsed = JSON.parse(raw) as FilterState;
        setF(parsed);
        onChange(parsed);
      }
    } catch {}
  }, [onChange]);

  const change = (patch: Partial<FilterState>) => {
    const next = { ...f, ...patch };
    setF(next);
    try { localStorage.setItem(KEY, JSON.stringify(next)); } catch {}
    onChange(next);
  };

  const clear = () => change({ q:'', assignee:'', tag:'' });

  return (
    <div className="card">
      <div className="flex flex-wrap gap-3 items-center">
        <input className="border rounded-lg px-3 py-2 w-56" placeholder="Search text..." value={f.q} onChange={e=>change({q:e.target.value})}/>
        <input className="border rounded-lg px-3 py-2 w-48" placeholder="Assignee" value={f.assignee} onChange={e=>change({assignee:e.target.value})}/>
        <input className="border rounded-lg px-3 py-2 w-48" placeholder="Tag" value={f.tag} onChange={e=>change({tag:e.target.value})}/>
        <button className="btn" onClick={clear}>Clear</button>
      </div>
    </div>
  );
}
