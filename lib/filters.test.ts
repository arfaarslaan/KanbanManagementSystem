
import { describe, it, expect } from 'vitest';
import type { Task } from '../types';

const tasks: Task[] = [
  { id:'1', title:'Fix bug', description:'UI bug', status:'scheduled', assignee:'Ava', tags:['frontend'], createdAt:new Date().toISOString() },
  { id:'2', title:'API work', description:'backend logic', status:'in-progress', assignee:'Ben', tags:['backend'], createdAt:new Date().toISOString() },
];

function filter(tasks: Task[], q: string, assignee: string, tag: string) {
  const norm = (s:string)=>s.toLowerCase();
  return tasks.filter(t=>{
    const text = [t.title,t.description,t.assignee,...t.tags].join(' ').toLowerCase();
    const passQ = q ? text.includes(norm(q)) : true;
    const passA = assignee ? norm(t.assignee)===norm(assignee) : true;
    const passT = tag ? t.tags.some(tt=>norm(tt)===norm(tag)) : true;
    return passQ && passA && passT;
  });
}

describe('filter', () => {
  it('matches text', () => {
    expect(filter(tasks, 'api', '', '').length).toBe(1);
  });
  it('matches assignee', () => {
    expect(filter(tasks, '', 'ava', '').length).toBe(1);
  });
  it('matches tag', () => {
    expect(filter(tasks, '', '', 'backend').length).toBe(1);
  });
});
