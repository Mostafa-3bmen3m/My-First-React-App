# React + Vite

This template provides a minimal setup to get React working in Vite with HMR and some ESLint rules.

Currently, two official plugins are available:

- [@vitejs/plugin-react](https://github.com/vitejs/vite-plugin-react/blob/main/packages/plugin-react) uses [Babel](https://babeljs.io/) for Fast Refresh
- [@vitejs/plugin-react-swc](https://github.com/vitejs/vite-plugin-react/blob/main/packages/plugin-react-swc) uses [SWC](https://swc.rs/) for Fast Refresh

## Expanding the ESLint configuration

If you are developing a production application, we recommend using TypeScript with type-aware lint rules enabled. Check out the [TS template](https://github.com/vitejs/vite/tree/main/packages/create-vite/template-react-ts) for information on how to integrate TypeScript and [`typescript-eslint`](https://typescript-eslint.io) in your project.

# Movies App

A React-based movie application that allows users to browse movies, like them, and set watching preferences. The app uses local storage to persist user preferences across browser sessions.

## Features

- **Movie Browsing**: Browse popular movies from TMDB API
- **Like Movies**: Like/unlike movies with persistent storage
- **Watching Options**: Set watching status for movies (Watching, On-Hold, Plan To Watch, Completed, Remove)
- **Dark Mode**: Toggle between light and dark themes with persistent preference
- **Responsive Design**: Works on desktop and mobile devices
- **Local Storage**: All user preferences are saved locally and persist across browser sessions

## Local Storage Features

The app uses local storage to persist the following user preferences:

- **Liked Movies**: List of movies the user has liked
- **Selected Movies**: Movies with watching options set
- **Dark Mode**: User's theme preference

## Getting Started

1. Clone the repository
2. Install dependencies: `npm install`
3. Set up your TMDB API key in a `.env` file:
   ```
   VITE_TDMB_API_KEY=your_api_key_here
   ```
4. Start the development server: `npm run dev`

## Technologies Used

- React 19
- React Router DOM
- Tailwind CSS
- TMDB API
- Local Storage for persistence

## Project Structure

```
src/
├── components/
│   ├── FetchMovies.jsx
│   ├── Hero.jsx
│   ├── LikeButton.jsx
│   ├── MovieOptionsBtn.jsx
│   ├── Movies.jsx
│   └── ToggleDarkMode.jsx
├── hooks/
│   └── useLocalStorage.js
├── pages/
│   └── CardPage.jsx
├── App.jsx
└── main.jsx
```

## Local Storage Keys

- `likedMovies`: Array of liked movie objects
- `selectedMovies`: Array of movies with watching options
- `darkMode`: Boolean for dark mode preference