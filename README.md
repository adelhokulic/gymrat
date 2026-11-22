# GymRat

A training journal with user login. Each user logs workouts with exercises, edits them directly in the list, filters them by type and sees statistics for the current week.

Built as an assignment in the ITMentorstva frontend program.

## Features

- **Login** with credentials checked against a JSON file (fake database). The logged-in user stays logged in after a page refresh.
- **Guests see only the login page.**
- **New workout form**: date, type (strength, cardio, stretching), duration in minutes, and a dynamic list of exercises (name, sets, reps, weight), with validation.
- **Inline editing**: clicking **Edit** turns a workout card into a pre-filled form. **Save** updates the workout and **Cancel** discards the changes.
- **Deleting** a whole workout or a single exercise. The last exercise in a workout can't be removed.
- **Filter by type**: All, Strength, Cardio, Stretching.
- **Weekly statistics** for the current week (from Monday): number of workouts, total minutes and heaviest lift.
- **Per-user data**: each user sees only their own workouts.
- **Persistence**: user and workouts are saved in `localStorage`.
- Responsive layout: form and list side by side on wide screens, stacked on phones.

## Tech stack

- React 19 + TypeScript 6
- Create React App
- React Hook Form (`useForm`, `useFieldArray`)
- Context API + `useReducer` for global state
- Plain CSS with CSS custom properties

## Getting started

```bash
npm install
npm start
```

The app runs at http://localhost:3000.

### Test users

| Username | Password | Name |
|---|---|---|
| `adel` | `123456` | Adel Hokulic |
| `merima` | `123456` | Merima Mulic |

Log in as both to see that each user only has access to their own workouts.

## State management

The assignment suggests **Recoil** (atoms + an atom effect for `localStorage`). This project uses **Context + `useReducer`** instead, because Recoil is no longer maintained and doesn't support React 19. The same ideas map one to one:

| Recoil (assignment) | This project |
|---|---|
| atom for the logged-in user | `AuthContext` + `authReducer` |
| atom for workouts | `WorkoutContext` + `workoutReducer` |
| one atom effect that saves several atoms to `localStorage` | one shared helper, `loadFromStorage` / `saveToStorage` (`src/utils/storage.ts`), used by both contexts: lazy init in `useReducer` for reading, `useEffect` for writing |
| `useRecoilValue` / `useSetRecoilState` | custom hooks `useAuth()` and `useWorkout()` |

**Global vs. local state**

- **Global** (context): the logged-in user and all workouts, because many components need them.
- **Local** (`useState` in a component): whether a card is in edit mode (`WorkoutCard`), the active filter (`WorkoutList`) and the login error message (`Login`), because only one component needs each of them.
- **Derived** (calculated on every render, never stored): the current user's workouts, filtered workouts and the weekly statistics.

## Project structure

```
src/
├── components/   Login, Navbar, WorkoutForm, WorkoutList, WorkoutCard, WeeklyStats
├── context/      AuthContext, WorkoutContext (providers + useAuth / useWorkout hooks)
├── reducer/      authReducer, workoutReducer
├── types/        userTypes, workoutTypes (workout types are defined once and the TS type is derived from them)
├── utils/        storage (localStorage helper), date (start of the current week)
└── data/         users.json (fake user database)
```

## Notes

- **Login is not secure, by design.** Passwords live in a JSON file and are checked in the browser, as the assignment requires a fake database. A real app would check credentials on a server.
- **TypeScript 6, not 7.** TypeScript 7 no longer ships the JavaScript API that `react-scripts` needs, so CRA can't use it. The `overrides` field in `package.json` lets TypeScript 6 install alongside `react-scripts`, which officially asks for TypeScript 4.

## Possible improvements

- Personal records per exercise
- Reusable workout templates
- Weekly goal (e.g. 4 workouts) with a progress bar
