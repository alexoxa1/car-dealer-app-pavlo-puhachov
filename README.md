# Car Dealer App

A Next.js application that allows users to filter and view vehicles by make and model year.

## Features

- Filter vehicles by make and model year
- Dynamic vehicle model listing
- Responsive design with Tailwind CSS
- Server-side rendering and static site generation
- TypeScript support
- Loading states with React Suspense

https://github.com/user-attachments/assets/46d04311-3188-4b9d-bfc9-c4946dc2d1be

## Prerequisites

- Node.js 16.8 or later
- npm or yarn package manager

## Getting Started

1. Clone this repository
2. Install dependencies:

```bash
npm install
# or
yarn install
```

3. Run the development server:

```bash
npm run dev
# or
yarn dev
```

4. Open [http://localhost:3000](http://localhost:3000) in your browser

## Building for Production

To create a production build:

```bash
npm run build
npm start
# or
yarn build
yarn start
```

## API Integration

The app integrates with the NHTSA Vehicle API to fetch:

- Vehicle makes for cars
- Vehicle models by make ID and year

## Technologies Used

- Next.js 15
- React
- TypeScript
- Tailwind CSS
