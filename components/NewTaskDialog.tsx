
'use client';
import { useState } from 'react';
import { createTask } from '@/lib/storage';
import { Task } from '@/types';

export default function NewTaskDialog({ onCreated }: { onCreated: (t: Task) => void }) {
  const [open, setOpen] = useState(false);
  const [title, setTitle] = useState('');
  const [description, setDescription] = useState('');
  const [assignee, setAssignee] = useState('');
  const [tags, setTags] = useState('');
  const [status, setStatus] = useState<'scheduled'|'in-progress'|'done'>('scheduled');
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);

  const reset = () => { setTitle(''); setDescription(''); setAssignee(''); setTags(''); setStatus('scheduled'); setError(''); };

  const submit = async () => {
    setLoading(true);
    try{
      const task = await createTask({
        title, description, assignee,
        tags: tags.split(',').map(s=>s.trim()).filter(Boolean),
        status, priority:'medium'
      } as any);
      onCreated(task);
      setOpen(false);
      reset();
    }catch(e:any){ setError(e?.message ?? 'Failed'); }
    setLoading(false);
  };

  return (
    <div>
      <button className="btn btn-primary" onClick={()=>setOpen(true)}>New Task</button>
      {open && (
        <div className="fixed inset-0 bg-black/40 flex items-center justify-center p-4 z-50">
          <div className="card w-full max-w-lg">
            <div className="flex items-center justify-between mb-2">
              <h3 className="font-semibold">Create Task</h3>
              <button className="btn" onClick={()=>setOpen(false)}>Close</button>
            </div>
            {error && <p className="text-sm text-red-600">{error}</p>}
            <div className="grid gap-3">
              <input className="border rounded-lg px-3 py-2" placeholder="Title" value={title} onChange={e=>setTitle(e.target.value)}/>
              <textarea className="border rounded-lg px-3 py-2" placeholder="Description" value={description} onChange={e=>setDescription(e.target.value)}/>
              <div className="grid grid-cols-2 gap-3">
                <input className="border rounded-lg px-3 py-2" placeholder="Assignee" value={assignee} onChange={e=>setAssignee(e.target.value)}/>
                <select className="border rounded-lg px-3 py-2" value={status} onChange={e=>setStatus(e.target.value as any)}>
                  <option value="scheduled">Scheduled</option>
                  <option value="in-progress">In Progress</option>
                  <option value="done">Done</option>
                </select>
              </div>
              <input className="border rounded-lg px-3 py-2" placeholder="Tags (comma separated)" value={tags} onChange={e=>setTags(e.target.value)}/>
            </div>
            <div className="mt-4 flex gap-2">
              <button className="btn" onClick={()=>setOpen(false)}>Cancel</button>
              <button className="btn btn-primary" onClick={submit} disabled={loading}>{loading? 'Saving...' : 'Create'}</button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
