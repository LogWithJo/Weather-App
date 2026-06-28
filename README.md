# Weather App

A modern browser-based weather application built with **React**, **TypeScript**, and modern UI libraries.

[🌤️ Live Demo →](https://logwithjo.github.io/Weather-App)

![App screenshot](./preview.svg)

![React](https://img.shields.io/badge/React-19.2-blue)
![HTML](https://img.shields.io/badge/HTML-5-orange)
![CSS](https://img.shields.io/badge/CSS-3-blue)
![TailwindCSS](https://img.shields.io/badge/TailwindCSS-4-blue)
![JavaScript](https://img.shields.io/badge/JavaScript-ES6-yellow)
![TypeScript](https://img.shields.io/badge/TypeScript-5-blue)

---

## About

This is my **third project** in my React learning roadmap.

Before writing any code, I tried to plan the entire application from start to finish. I wasn't able to plan everything perfectly because I haven't practiced software planning enough yet, but it taught me how important planning is before coding.

Because of that experience, I decided to spend more time improving my problem-solving skills by studying algorithms and data structures through **CS50** and solving programming problems. I also decided to move beyond simple CRUD-style projects and start building games, since they require much stronger frontend logic and algorithmic thinking.

This project was also the first time I built an application primarily by following a plan instead of writing everything from intuition. I was surprised by how much cleaner the final code became. There is still some duplicated code that I plan to refactor in future updates.

During this project I also experimented with several libraries including:

* React Icons
* shadcn/ui
* Fuse.js for fuzzy searching

---

## Features

* Detect the user's current location using browser geolocation
* Reverse geocoding to determine the current city and country
* Weather data powered by Open-Meteo
* Hourly and daily forecasts
* Weather views:

  * Today
  * Tomorrow
  * Next 7 Days
* Detailed weather cards including:

  * Temperature
  * Feels like
  * Humidity
  * Wind speed
  * Visibility
  * Weather icon based on Open-Meteo weather codes
* Responsive 7-day forecast

  * Desktop: horizontal day selector
  * Mobile: swipe-friendly daily cards
* Search for any location using Open-Meteo Geocoding
* Fuzzy search with Fuse.js
* Reload the latest detected location
* Display weather for predefined cities
* Loading skeletons while fetching data
* Light/Dark theme support using shadcn/ui and Tailwind CSS

---

## Built With

* HTML5
* CSS3
* Tailwind CSS
* TypeScript
* React
* JavaScript
* Vite
* shadcn/ui
* Fuse.js
* Open-Meteo API

---

## Getting Started

Visit the live application:

**https://logwithjo.github.io/Weather-App**

Or run locally:

```bash
git clone https://github.com/your-username/weather-app.git

cd weather-app

npm install

npm run dev
```

---

## Project Structure

```text
weatherApp/
├── public/
├── src/
│   ├── assets/
│   ├── components/
│   ├── context/
│   ├── hooks/
│   ├── lib/
│   ├── types/
│   ├── App.tsx
│   ├── main.tsx
│   └── index.css
├── package.json
├── vite.config.ts
└── index.html
```

---

## What I Learned

* Planning a project before writing code
* Using Fuse.js for fuzzy searching
* Designing UIs inspired by existing websites
* Improving API error handling
* Reducing unnecessary React state
* Building a cleaner React component structure
* Writing more maintainable and reusable code

---

## Future Improvements

* Remove duplicated logic
* Add weather charts
* Cache API responses
* Add favorite locations
* Add weather alerts
* Improve accessibility
* Increase test coverage

---

> Every project teaches something new. The next one will be even better.
