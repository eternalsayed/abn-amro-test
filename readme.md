# TV Show Dashboard

## Overview
This is an assigment submission for position of Senior FE Dev at ABN Amro. It's a dummy Vue.js application that displays TV shows categorized by genres, with additional features like sorting by ratings and a search functionality. It comes with following features:

- Shows you list of TV shows by genre
- You can switch between grid and list view on the list page
- You can switch between genres by selectin from the list
- You can sort shows on ascending/descending ratings
- You can view more details about the show by clicking an item in the list

## Architecture
The application is structured to separate concerns using Vue Router for routing, and Axios for API calls. Because the app is fairly small, state management has not been used.

The app is build over [Ionic framework](https://ionicframework.com) with vuejs. The choice of this framework was based on below parameters:
- Having worked with Ionic for years, I know it's a stable framework
- One of the best frameworks for developing cross platform apps, which means, it has inbuild styling and device support for desktop, mobile and table. Emphasis is on mobile-first approach
- Sets up the basic minimal setup to get started with
- Takes care of standard device ratios for styling, so the developer doesn't have to reinvent the wheel
- Renders platform specific styles for devices, giving the app a look close to native app

## Running the Application
1. Clone the repository.
2. Install dependencies: `yarn install`
3. Run the development server: `yarn serve`
4. Visit `http://localhost:8080` in your browser.

Alternatively, you can see the application running at below netlify url:
[https://abnamro-sayed.netlify.app](https://abnamro-sayed.netlify.app)

## Tests
!!Tests are breaking due to usage of Vue v3.2.47.
Even downgrading the version (to 3.2.27) didn't help due to imcompatible packages. However, basic tests are implemented which can be run using below command:
`yarn test`

## Node.js Version
- This application was developed with Node.js v14.x and NPM v6.x.
