
'use client';
import { useEffect, useState } from 'react';
import { getTask, updateTask, deleteTask } from '@/lib/storage';
import { Task, STATUSES } from '@/types';
import Link from 'next/link';
import { useParams, useRouter } from 'next/navigation';

export default function TaskDetail() {
  const params = useParams<{ id: string }>();
  const router = useRouter();
  const [task, setTask] = useState<Task | null>(null);
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (!params?.id) return;
    getTask(params.id).then(t => {
      setTask(t);
      setLoading(false);
    });
  }, [params?.id]);

  const save = async () => {
    if (!task) return;
    try {
      await updateTask(task.id, task);
      alert('Updated');
      router.push('/');
    } catch (e:any) { setError(e?.message ?? 'Failed to update'); }
  };
  const remove = async () => {
    if (!task) return;
    if (!confirm('Delete task?')) return;
    await deleteTask(task.id);
    router.push('/');
  };

  if (loading) return <div className="card">Loading…</div>;
  if (!task) return <div className="card">Task not found. <Link className="underline" href="/">Back</Link></div>;

  return (
    <div className="space-y-4">
      <Link className="underline" href="/">&larr; Back to board</Link>
      <div className="card">
        <div className="flex items-center justify-between">
          <h1 className="text-xl font-semibold">Task Detail</h1>
          <button className="btn" onClick={remove}>Delete</button>
        </div>
        {error && <p className="text-red-600 text-sm">{error}</p>}
        <div className="grid gap-3 mt-3">
          <input className="border rounded-lg px-3 py-2" value={task.title} onChange={e=>setTask({...task!, title:e.target.value})}/>
          <textarea className="border rounded-lg px-3 py-2 min-h-[120px]" value={task.description} onChange={e=>setTask({...task!, description:e.target.value})}/>
          <div className="grid grid-cols-3 gap-3">
            <input className="border rounded-lg px-3 py-2" value={task.assignee} onChange={e=>setTask({...task!, assignee:e.target.value})}/>
            <select className="border rounded-lg px-3 py-2" value={task.status} onChange={e=>setTask({...task!, status: e.target.value as any})}>
              {STATUSES.map(s => <option key={s.key} value={s.key}>{s.label}</option>)}
            </select>
            <input className="border rounded-lg px-3 py-2" value={task.tags.join(', ')} onChange={e=>setTask({...task!, tags: e.target.value.split(',').map(s=>s.trim()).filter(Boolean)})}/>
          </div>
          <div className="flex gap-2">
            <button className="btn btn-primary" onClick={save}>Save</button>
            <button className="btn" onClick={()=>location.reload()}>Reset</button>
          </div>
        </div>
      </div>
    </div>
  );
}
