A React + Vite + Tailwind CSS photo gallery app 

## Tech Stack

- **React 18** with functional components and hooks
- **Vite** — build tool and dev server
- **Tailwind CSS** — all styling, no component libraries

## Features

| Requirement | Implementation |
|---|---|
| Fetch from Picsum API | `useFetchPhotos` custom hook, loading + error states |
| Responsive grid | 1 col mobile → 2 col tablet → 4 col desktop |
| Search filter | Real-time, client-side, filters by author name |
| Favourites | `useReducer` + `localStorage` persistence |
| Custom hook | `useFetchPhotos` returns `{ photos, loading, error }` |
| useCallback | `handleSearchChange`, `handleToggleFavourite` — stable references |
| useMemo | `filteredPhotos` — recomputed only when deps change |

## Getting Started

```bash
npm install
npm run dev
```

Open [http://localhost:5173](http://localhost:5173)

## Project Structure

```
src/
├── hooks/
│   ├── useFetchPhotos.js      # Custom hook: fetch + loading + error
│   └── favouritesReducer.js   # Reducer + localStorage persist + init
├── components/
│   ├── Gallery.jsx            # Main component: useReducer, useMemo, useCallback
│   ├── PhotoCard.jsx          # Individual photo card with heart toggle
│   ├── SearchBar.jsx          # Controlled search input
│   ├── LoadingSpinner.jsx     # Loading state UI
│   └── ErrorMessage.jsx       # Error state UI
├── App.jsx
├── main.jsx
└── index.css
```

## Key Technical Decisions

### `useReducer` over `useState` for Favourites
The favourites state has two actions (TOGGLE, CLEAR) and needs side effects (localStorage sync). `useReducer` centralises this logic in one place and makes it easier to add new actions later — `useState` with a setter would scatter the logic across the component.

### `useCallback` on handlers
`handleSearchChange` and `handleToggleFavourite` are passed as props to child components. `useCallback` gives them stable references so if those children are ever wrapped in `React.memo`, they won't re-render on every Gallery render.

### `useMemo` on `filteredPhotos`
Filtering 30 photos on every render is cheap now, but `useMemo` ensures the computation only runs when `photos`, `searchQuery`, `showFavouritesOnly`, or `favourites` actually change — not on unrelated re-renders.

### Cleanup in `useFetchPhotos`
The effect uses a `cancelled` flag to prevent `setState` after unmount — a common source of memory leak warnings.

