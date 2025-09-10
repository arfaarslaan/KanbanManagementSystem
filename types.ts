
export type Status = 'scheduled' | 'in-progress' | 'done';

export interface Task {
  id: string;
  title: string;
  description: string;
  status: Status;
  assignee: string;
  tags: string[];
  createdAt: string; 
  priority?: 'low' | 'medium' | 'high';
  dueDate?: string; 
}

export const STATUSES: { key: Status; label: string }[] = [
  { key: 'scheduled', label: 'Scheduled' },
  { key: 'in-progress', label: 'In Progress' },
  { key: 'done', label: 'Done' },
];
