
'use client';
import { Task, Status } from '@/types';
import Link from 'next/link';
import { moveTask } from '@/lib/storage';
import { useState } from 'react';

export default function StatusColumn({ title, status, items, onMoved }: { title: string; status: Status; items: Task[]; onMoved: () => void }) {
  const [busyId, setBusyId] = useState<string>('');
  const [isOver, setIsOver] = useState(false);

  const move = async (id: string, s: Status) => {
    setBusyId(id);
    await moveTask(id, s).catch(()=>{});
    setBusyId('');
    onMoved();
  };

  const onDrop = async (e: React.DragEvent) => {
    e.preventDefault();
    setIsOver(false);
    const id = e.dataTransfer.getData('text/task-id');
    if (!id) return;
    await move(id, status);
  };

  const badge = (s: string) => {
    const map: Record<string,string> = { scheduled:'bg-yellow-100', 'in-progress':'bg-blue-100', done:'bg-green-100' };
    return map[s] ?? 'bg-gray-100';
  };

  return (
    <div
      className={`card h-full flex flex-col transition-colors ${isOver ? 'ring-2 ring-black/30' : ''}`}
      onDragOver={(e)=>{ e.preventDefault(); setIsOver(true);}}
      onDragLeave={()=>setIsOver(false)}
      onDrop={onDrop}
    >
      <div className="flex items-center justify-between mb-2">
        <h3 className="font-semibold">{title} <span className="text-xs text-gray-500">({items.length})</span></h3>
      </div>
      <div className="space-y-3 overflow-auto min-h-20">
        {items.length === 0 && <p className="text-sm text-gray-500">No tasks here. Drag & drop items onto this column.</p>}
        {items.map(t => (
          <div
            key={t.id}
            className="border rounded-xl p-3 bg-white hover:bg-gray-50 cursor-grab active:cursor-grabbing"
            draggable
            onDragStart={(e)=>{
              e.dataTransfer.setData('text/task-id', t.id);
              e.dataTransfer.effectAllowed = 'move';
            }}
          >
            <div className="flex items-center justify-between">
              <Link className="font-medium hover:underline" href={`/task/${t.id}`}>{t.title}</Link>
              <span className={`chip ${badge(t.status)}`}>{t.status}</span>
            </div>
            <p className="text-xs mt-1 text-gray-600 line-clamp-2">{t.description}</p>
            <div className="flex gap-2 mt-2 flex-wrap">
              <span className="chip">{t.assignee}</span>
              {t.tags.map(tag => <span key={tag} className="chip">#{tag}</span>)}
            </div>
            <div className="flex gap-2 mt-3">
              {t.status !== 'scheduled' && <button className="btn" disabled={busyId===t.id} onClick={()=>move(t.id,'scheduled')}>To Scheduled</button>}
              {t.status !== 'in-progress' && <button className="btn" disabled={busyId===t.id} onClick={()=>move(t.id,'in-progress')}>To In Progress</button>}
              {t.status !== 'done' && <button className="btn" disabled={busyId===t.id} onClick={()=>move(t.id,'done')}>To Done</button>}
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
