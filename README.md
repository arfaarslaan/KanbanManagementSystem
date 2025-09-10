
# Kanban Task Management – Next.js (App Router)

## SETUP INSTRUCTIONS
```bash
npm i
npm run dev
# open http://localhost:3000
```

## ARCHITECTURE OVERVIEW
- Next.js 14 (App Router) 
- TypeScript for type safety
- Tailwind CSS  for styling
- LocalStorage for persistence
- Routing `/` for Kanban board + `/task/[id]` task detail view (Dynamic Routing)
- State Management using React Hooks (Client side) and filters using local storage

## KEY DECISIONS AND TRADEOFFS
- Choosed LocalStorage over API Integration to keep setup minimal (Tradeoff: No multi user persistance)
- Implemented buttons as well as Drag and Drop for tasks status update (Tradeoff: Simplier UX)
- Mobile Responsive 

## ACCESSIBILITY
- **Columns**: Scheduled / In Progress / Done
- **CRUD**: Create, Read, Update, Delete tasks
- **Move** tasks between columns (buttons on each card)
- **Filters**: by text
- **Routes**: `/` board + `/task/[id]` detail (dynamic)
- **Persistence**: LocalStorage with bootstrap seed (`data/seed.json`)
- **UX**: Mobile‑responsive grid; loading / empty / error states
- **Modals**: Basic modal dialog for create, persisted filters via in‑memory state
- **ALERTS**: Alerts once task is updated or deleted


## TESTING APPROACH
- **ADDED SCAFFOLDING FOR VITEST UNIT TESTING**
- Task creation and deletion flow
- Column Status Update
- Filter Application

## TIME SPENT
Estimated: 4 - 5 hours

## IF I HAD MORE TIME
- Add User authentication
- Server Side Rendering with real database
- UI Enhancement by implementing themes
- Real-time collaboration of users by Websockets
- CI/CD Pipeline for automated testing and deployment
