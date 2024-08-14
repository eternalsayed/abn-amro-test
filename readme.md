# TV Show Dashboard
<img width="382" alt="image" src="https://github.com/user-attachments/assets/f69105dc-e587-4724-96ab-c6f5a2cb0f36">
<img width="382" alt="image" src="https://github.com/user-attachments/assets/cc4f7a74-b728-41ea-be14-9a6c28ca9511">
<img width="383" alt="image" src="https://github.com/user-attachments/assets/1429fe93-face-4b56-bc2e-672fd4893337">
<img width="382" alt="image" src="https://github.com/user-attachments/assets/aef4667a-1fd8-43a1-9af0-39032bba4438">




## Overview
This is an assigment submission for position of Senior FE Dev at ABN Amro. It's a dummy Vue.js application that displays TV shows categorized by genres, with additional features like sorting by ratings and a search functionality. It comes with following features:

- Shows you list of TV shows by genre
- You can switch between grid and list view on the list page
- You can switch between genres by selecting from the list
- You can sort shows on ascending/descending ratings. Default sorting is on "relevance"
- You can view more details about the show by clicking an item in the list
- Clicking on genre badge shows you list of shows in that genre
- Scroll down for *infinite loading* of list (as long as content is available)

## Architecture
The app is build with [Ionic framework](https://ionicframework.com) using Vuejs (Vue 3). I prefer to use both composition and options API due to their separate benefits.

The framework uses vue-router in it's core for routing, with additional hooks (not used in the app), and I've used Axios for API calls. Because the app is fairly small, state management has not been used.

The choice of this framework was based on below parameters:

- Having worked with Ionic for years, I know it's a stable framework
- One of the best frameworks for developing cross platform apps, which means, it has inbuilt styling and device support for desktop, mobile and tablet. Emphasis is on mobile-first approach
- Sets up the basic minimal app to get started with
- Takes care of standard device ratios for breakpoints, so the developer doesn't have to reinvent the wheel
- Renders platform specific styles for devices, giving the app a look close to the native apps
- Supports light and dark modes for devices

## Structure
- `public` contains assets
- `src` contains source code (pages, components, tests, etc.)
- `dist` contains distributable, when built

## Running the Application
1. Clone the repository.
2. If `node_modules` is present (if you downloaded zip), remove `node_modules` with `rm -rf node_modules`
3. Install dependencies: `yarn install`
4. Run the development server: `yarn serve`
5. Visit `http://localhost:8080` in your browser.
6. To build the application, run `yarn build` in the repo. It will generate the distributate in `dist` folder.

Alternatively, you can see the application running at below netlify url:

[https://abnamro-sayed.netlify.app](https://abnamro-sayed.netlify.app)

## Tests
!!Tests are breaking due to usage of Vue v3.2.47.

Even downgrading the version (to 3.2.27) didn't help due to imcompatible packages. 
However, basic unit tests are implemented which can be run using below command:

`yarn test:unit`

## Node.js Version
- This application was developed with Node.js v14.x and NPM v6.x.
