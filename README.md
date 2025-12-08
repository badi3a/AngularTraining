# 🛠️ Workshop 5 – Manipulating Modules & Lazy Loading

This branch corresponds to **Workshop n°4: Manipulating Modules & Lazy Loading** of the module *Application côté client 1* at **ESPRIT School of Engineering**.

---

## 🎯 Objectives
- Create and organize **feature modules**.  
- Generate and structure **components** inside a module.  
- Understand the relationship between **declarations / imports / exports** in an NgModule.  
- Set up **internal routing with lazy loading**.  
- Implement a **parameterized route** with an `EventDetailComponent`.  

---

## 📦 Steps / Instructions

1. **Create feature modules with lazy loading**  
   ```bash
   ng g module features/events --route events --module app.module
   ng g module features/tickets --route tickets --module app.module
   ng g module features/feedback --route feedback --module app.module
   ng g module features/users --route users --module app.module
   ```
   👉 These commands create `*.module.ts` + `*-routing.module.ts` files and register lazy routes in `app-routing.module.ts`.

---

2. **Create components under the Events module**  
   Organize the module into two folders:  
   - `pages/` → for “page-level” components (full views).  
   - `components/` → for reusable components.  

   ```bash
   ng g c features/events/pages/event-list --skip-tests
   ng g c features/events/pages/event-detail --skip-tests
   ng g c features/events/components/event-card --skip-tests
   ng g c features/events/components/search-bar --skip-tests
   ```

   - **EventListComponent** → displays a list of events.  
   - **EventDetailComponent** → displays event details.  
   - **EventCardComponent** → reusable card for an event.  
   - **SearchBarComponent** → reusable search bar (filter by address, price, date, etc.).  

---

3. **Internal routing of the Events module**  
   In `events-routing.module.ts` configure routes:  
   ```ts
   const routes: Routes = [
     { path: '', component: EventListComponent },
     { path: ':id', component: EventDetailComponent }
   ];
   ```

   👉 In `events.component.html`, add the router outlet:  
   ```html
   <router-outlet></router-outlet>
   ```
   The `EventsComponent` will act as the root shell for the Events module.

---

4. **Configure a parameterized route**  
   - In `event-list.component.html`, add a dynamic link:  
     ```html
     <a [routerLink]="['/events', e.id]">View details</a>
     ```
   - In `EventDetailComponent`, fetch the `id` from the route:  
     ```ts
     constructor(private route: ActivatedRoute) {}

     ngOnInit(): void {
       const id = Number(this.route.snapshot.paramMap.get('id'));
       console.log('Event ID:', id);
     }
     ```

---

5. **Share event data through a service**  
   Create a data-access service for events under `src/app/data-access/`:  
   ```bash
   ng g s data-access/events --skip-tests
   ```

   Example:  
   ```ts
   @Injectable({ providedIn: 'root' })
   export class EventsService {
     private events: Event[] = [...]; // static data for now

     getAll() { return this.events; }
     getById(id: number) { return this.events.find(e => e.id === id); }
   }
   ```

---

## 🚀 Implementation
After completing this workshop, you will have:  
- **Four feature modules** (Events, Tickets, Feedback, Users) with lazy loading.  
- A structured **Events module** with `pages/` and `components/`.  
- Internal routing with **parameterized routes** (`/events/:id`).  
- An event service to provide and share data across components.  

---

## 📊 Key Concepts
- Feature modules and **lazy loading** to optimize large Angular apps.  
- Module-level **routing** with children.  
- **Parameterized routes** for detail views.  
- Services for **data access** and sharing across components.  
- Proper organization of `pages/` vs `components/`.  

---

## 📝 Summary of Commands

| Command                                                     | Purpose                                    |
|-------------------------------------------------------------|--------------------------------------------|
| `ng g module features/events --route events --module app.module`   | Create the Events module with lazy loading |
| `ng g module features/tickets --route tickets --module app.module` | Create the Tickets module with lazy loading|
| `ng g module features/feedback --route feedback --module app.module` | Create the Feedback module with lazy loading |
| `ng g module features/users --route users --module app.module` | Create the Users module with lazy loading |
| `ng g c features/events/pages/event-list --skip-tests`       | Create EventList component                 |
| `ng g c features/events/pages/event-detail --skip-tests`     | Create EventDetail component               |
| `ng g c features/events/components/event-card --skip-tests`  | Create reusable EventCard component        |
| `ng g c features/events/components/search-bar --skip-tests`  | Create reusable SearchBar component        |
| `ng g s data-access/events --skip-tests`                     | Create EventsService under data-access     |

---
### 👨‍🏫 Instructor
- **[Badia Bouhdid](https://www.linkedin.com/in/badiabouhdid)**

---

🏫 This workshop is part of the **Application côté client 1** module at:  

<p align="center">  
  <img src="https://cdio.esprit.tn/images/cdio/esprit.png" alt="Esprit School of Engineering" width="250"/>  
</p>
