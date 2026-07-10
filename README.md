# Real-Time Dashboard

A dashboard that shows live sensor data: temperature, humidity, and pressure.
The data comes from a mock API and updates every few seconds.

## What you need

- Node.js 20+ (22 is best)
- npm

## How to run

```bash
npm install
npm run dev
```

Then open the link from the terminal (usually http://localhost:5173).

## Scripts

- `npm run build` – build the app for production
- `npm run preview` – run the built app
- `npm run lint` – check the code
- `npm run format` – format the code

## Features

- Temperature: shows the latest value.
- Humidity: shows a line chart of the last minutes.
- Pressure: shows the min, max, and average.
- Combined chart: shows a few sensors together, with buttons to choose the types.
- Side panel: turn widgets on or off, set the update speed (1–5 seconds), and set the chart time range (1, 5, or 10 minutes).
- Error message: a small toast shows when the API fails. It hides by itself.

## Main choices

- **React + TypeScript + Vite** – fast start and strict types (no `any`).
- **Zustand** – a small and simple store. It is split into slices, and values
  are read with selector functions.
- **Recharts** – easy charts for the humidity graph.
- **CSS Modules** – each component has its own styles. Colors and spacing use
  CSS variables, with a light and dark theme.
- **Mock API** – fake data that changes smoothly, with a 10% chance of an error
  to test the error handling.

## Folders

```text
src/
  api/         mock API and data generator
  components/  UI parts (widgets, panel, toast)
  hooks/       data hooks (polling and computed data)
  store/       Zustand store (slices and selectors)
  types/       shared types
  utils/       helpers (stats, config, time)
```
