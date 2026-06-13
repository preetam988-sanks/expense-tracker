Expense Tracker ("PennyWise")
A React + TypeScript build task. It's a real, useful tool and covers every topic on its own:

React setup · useState · useEffect · useCallback · useMemo · useRef · useContext · React Router · data fetching (fetch + async/await) · reusable components · localStorage · meaningful TypeScript

Broken into ordered steps so it can be done (or graded) incrementally. A coverage checklist at the end confirms every topic is exercised.

Suggested time: 7–10 hours.

Ground rules (this is the "React setup" topic):

npm create vite@latest my-app -- --template react-ts
cd my-app
npm install
npm install react-router-dom
npm install tailwindcss @tailwindcss/vite
npm run dev
Then add the Tailwind plugin to vite.config.ts and @import "tailwindcss"; at the top of your CSS entry (Tailwind v4 setup).

Tailwind is fine and encouraged for styling. No component/UI kits (e.g. MUI, shadcn) and no state-management libraries (no Redux/Zustand/Jotai) — state must be plain React (useState/useContext). For the API step, a small HTTP client like axios is allowed if you prefer it, but it's not required or expected — the built-in fetch is perfectly fine. No any. The point is the fundamentals.

How to work and submit
Create your own repository on Bitbucket and push your work there.
Add this question file to the repo (commit it at the root, e.g. TASK.md) so the requirements live alongside your code.
Commit at the end of every step. Each step should be its own commit with a clear message (e.g. Step 4: add ExpensesContext). We look at the commit history to see how you worked, not just the final result — small, meaningful commits matter.
You are done at Step 9. When Step 9 is committed and pushed, the task is complete. Share the Bitbucket repo link to submit.
What you're building
The simple version: people spend money every day — on food, bus tickets, bills, fun — and then forget where it all went. You're building a little app that lets someone jot down each thing they spent money on, so at any moment they can answer the question "where did my money go this month?"

A user can type in a purchase (how much, what it was for, what kind of thing it was, and the date), see a running list of everything they've spent, remove a mistake, tap any item to fix its details, and look at a simple summary that adds it all up — for example, "you spent $124 on food and $40 on transport." When they close the app and come back later, their list is still there.

Why it's worth building: it's the most ordinary kind of app there is — write things down, list them, total them up, save them. Almost every real app you'll ever work on is some version of that, so getting it right here is exactly the muscle you'll use at work every day.

Under the hood it's a few pages — a dashboard (list + summary), an add page, a detail/edit page, and a stats page — with the expense list shared across all of them via context and saved to localStorage so it survives a refresh.

Step 0 — Project setup
Scaffold with the Vite react-ts template above and install react-router-dom. Confirm strict mode is on in tsconfig ("strict": true).

Covers: React setup

Step 1 — Model the data in TypeScript
type Category = 'Food' | 'Transport' | 'Bills' | 'Entertainment' | 'Other'
An Expense interface: id: string, amount: number, description: string, category: Category, date: string (ISO).
A typed CATEGORIES: Category[] you'll reuse in dropdowns.
Covers: TypeScript (unions, interfaces)

Step 2 — Build reusable UI primitives
Create typed, reusable components: Button, TextField (label + input + error message), and Select. Each takes typed props. You'll use these across multiple pages.

Covers: Reusable components, TypeScript (typed props, event types like React.ChangeEvent<HTMLInputElement>)

Step 3 — Persist with a generic hook
Write a generic custom hook used to store the expense list:

function useLocalStorage<T>(key: string, initialValue: T): [T, (value: T) => void]
It reads the initial value from storage (falling back to initialValue), and writes back whenever the value changes — the write happens inside a useEffect.
Handle the "nothing stored yet" and "corrupt JSON" cases without crashing.
Covers: useEffect, localStorage, TypeScript (generics)

Step 4 — Share state with Context
Because expenses are read and written from several pages, lift them into context instead of prop-drilling. - Create an ExpensesContext and an ExpensesProvider that holds the list (backed by useLocalStorage from Step 3) and exposes addExpense, deleteExpense, and updateExpense — each wrapped in useCallback so consumers don't re-render needlessly. - Type the context value precisely. The default context value should be undefined, and you should write a typed useExpenses() hook (using useContext) that throws a clear error if used outside the provider — a common real-world pattern.

Covers: useContext, useState, useCallback, TypeScript (typed context, the "throw if no provider" pattern)

Step 5 — Routing and app shell
Set up React Router with a shared layout (nav bar + <Outlet />) wrapped by the ExpensesProvider. Routes: - / — Dashboard (list + filter) - /add — Add expense - /expense/:id — Detail / edit - /stats — Breakdown - * — a NotFound page Use <Link>/<NavLink> for nav and useNavigate to redirect after adding.

Covers: React Router (routes, nested layout/Outlet, params, programmatic navigation)

Step 6 — Add-expense page (state + ref)
Hold the four form fields in useState (controlled inputs).
Validate amount is a positive number and description isn't empty.
Use useRef on the amount input to focus it on mount.
On submit, call addExpense from context, then useNavigate back to /.
Covers: useState, useRef

Step 7 — Dashboard: list, delete, filter, derived totals
Render expenses newest-first, each row as a reusable ExpenseItem linking to /expense/:id, with a delete button calling deleteExpense from context.
A category filter ('All' + each category) held in useState.
Use useMemo to compute the filtered list, the total of the filtered view, and a per-category breakdown (e.g. Food: $124.50). These derive from state, so they belong in useMemo — not their own useState.
Show a friendly empty state when there are none.
Covers: useMemo, more reusable components

Step 8 — Detail / edit page
Read the :id route param (useParams), look the expense up from context, and show an editable form pre-filled with its values.
Save calls updateExpense; if the id doesn't exist, render the NotFound state.
Covers: more React Router (useParams), reuse of context + reusable components

Step 9 — Live currency conversion (calling an API)
On the stats page, let the user pick a currency (USD, EUR, GBP, …) and show the total converted into it using live exchange rates from a real API. - Use a free, no-key endpoint such as the Frankfurter API: https://api.frankfurter.dev/v1/latest?base=USD&symbols=EUR returns { "rates": { "EUR": 0.92 } }. - Write a small reusable async hook — useFetch<T>(url) returning { data, loading, error } — typed with a generic so the caller gets a typed result. Type the API response shape explicitly (no any). - Handle every state, because this is the real lesson: show a spinner while loading, an error message with a retry button if the request fails, and the converted total on success. Convert the total with useMemo once the rate arrives. - Fetch inside a useEffect and clean up correctly: when the selected currency changes (or the component unmounts) before the request finishes, cancel the in-flight request with an AbortController so you never set state on an unmounted component or show a stale rate.

Covers: data fetching (fetch, async/await, loading/error/success handling, AbortController cleanup), TypeScript (generic fetch hook, typed response), more useEffect / useMemo

[ ] React setup
[ ] useState
[ ] useEffect
[ ] useCallback
[ ] useMemo
[ ] useRef
[ ] useContext
[ ] React Router
[ ] data fetching (fetch, loading/error/success, AbortController)
[ ] reusable components
[ ] localStorage
[ ] TypeScript (unions, interfaces, generics, typed context, typed props/events, no any)
Stretch goals
Persist the active filter in the URL query string · "this month vs last month" · sort by amount/date · a confirm dialog before delete.

Rule
No any. Type everything properly — props, event handlers, hooks, route params, the context value, and the custom hook's generics. Use of any (or as any) is not acceptable.