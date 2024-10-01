# NY Times

### Description

This project is a web application that fetches and displays articles from the New York Times Most Popular API. Users can view popular articles and see detailed information about each article.

The following routes/pages are included in this application:

**Articles Listing Page** - This page will retrieve the most popular articles from the New York Times API and display them using a grid layout.
**Description Page** - This page will show the details of the chosen article.

### Screenshot of the pages

![Landing Page](public/landingpage.png)

![Details Page](public/detailsPage.png)


### Installation

1. Clone the repository:
   ```
   git clone <repository-url>
   ```
2. Navigate to the project directory:
   ```
   cd ny-times
   ```
3. Install dependencies:
   ```
   npm install
   ```

## Usage

### To start the development server, run:

```
npm run start
```

This will start the application and open it in your default web browser.

### To build the project
 **Run:**

```
npm run build
```

 **Verify the build:**
 
After the build process is completed, you should see a build folder in your project directory. You can serve the production build locally using any static server, or upload it to your hosting platform.

### Technology stack

- React v18.3
- React Router v6
- SWR
- ESlint for linting
- Prettier for code formatting
- SonarQube for code anaylsis
- Material UI v5
- React testing library
- Jest
- Cypress

## Project Dependencies

To run the project, you need to install the following dependencies. These are already listed in the package.json file under the dependencies section. After cloning the project, run npm install or yarn install to install these dependencies automatically.

### Dependencies
- **@emotion/react: ^11.11.3**
A library designed for writing CSS styles with JavaScript in a performant and flexible way.

- **@emotion/styled: ^11.11.0**
Styled component library built for Emotion, providing an easier way to style components.

- **@mui/icons-material: ^5.15.9**
Provides Material Design icons as React components for Material UI.

- **@mui/material: ^5.15.9**
Core Material-UI components to build modern and responsive web applications.

- **@testing-library/jest-dom: ^5.17.0**
Custom Jest matchers to test the state of the DOM.

- **@testing-library/react: ^13.4.0**
Helps to write tests for React components by simulating user interactions.

- **@testing-library/user-event: ^13.5.0**
Library to simulate user events for testing purposes.

- **@types/jest: ^27.5.2**
TypeScript definitions for Jest, a JavaScript testing framework.

- **@types/node: ^16.18.79**
TypeScript definitions for Node.js to write type-safe Node.js code.

- **@types/react: ^18.2.55**
TypeScript definitions for React.

- **@types/react-dom: ^18.2.19**
TypeScript definitions for ReactDOM, the renderer for React.

- **history: ^5.3.0**
A JavaScript library for managing session history in browsers, primarily used with React Router.

- **react: ^18.2.0**
The core React library to build user interfaces.

- **react-dom: ^18.2.0**
Package that provides DOM-specific methods for React.

- **react-router-dom: ^6.22.0**
Declarative routing for React applications, managing navigation and URL history.

- **react-scripts: 5.0.1**
A set of scripts to bootstrap React applications created with Create React App.

- **swr: ^2.2.4**
React Hooks library for data fetching with built-in caching and revalidation.

- **typescript: ^4.9.5**
TypeScript is a typed superset of JavaScript that compiles to plain JavaScript.

- **web-vitals: ^2.1.4**
A library for measuring important web performance metrics like page load and interaction speed.

### Scripts

- `start`: Starts the development server.
- `build`: Builds the application for production.
- `test`: Runs tests using Jest.
- `eject`: Ejects the application from Create React App.
- `coverage`: Runs tests with coverage report.
- `lint:js`: Lints JavaScript and TypeScript files.
- `lint`: Runs JavaScript and TypeScript linting.
- `sonarqube`: Runs linting, tests with coverage, and sends results to SonarQube for analysis.
- `cypress`: Runs Cypress tests.



## Generate SonarQube Test Coverage Report

1.  Run Jest Tests with Coverage
    
    ```
    npm run test -- --coverage
    ```
       **OR**
    ```
    npm run test & npm run coverage
    ```
2. Push your changes on the repo, once pushed there is a action created for running the sonar scanner,      which will scan the code and generate the sonar report for us.

3. Verify Results in SonarQube Dashboard
    
    Once the analysis completes:
    - Visit your SonarQube Dashboard to view the results.
    - You should see code coverage percentages under the "Coverage" section.
    - Test execution and other test-related metrics will be displayed on the dashboard as well.
   

### Sonar Report

![Sonar report](public/sonar.png)

[Sonar Link](https://sonarcloud.io/summary/overall?id=nagarro-vivek_ny-times2)

## Architecture Design

**Component-based Design**
The application follows a component-based architecture using React, enabling reusability, maintainability, and separation of concerns. Key components are organized to ensure modularity and scalability, allowing future changes and additions without affecting the overall structure.

**API Data Flow**
The app relies on the New York Times Most Popular API to fetch and display articles. Here's a high-level breakdown of the data flow:

**SWR for API fetching**: The SWR library is used to fetch data, manage caching, and ensure fast revalidation of the article list.

**usePopularArticles Hook**: A custom hook (usePopularArticles) is created to abstract the API interaction, improving the separation of concerns and reuse across components.

**Data Fetching on Pages**:
The Articles Listing Page fetches data from the API and displays it in a grid layout.
The Details Page uses the data passed from the Listing Page or fetches it again using the cached data when a user directly navigates to a specific article.

**Routing and Navigation**
React Router: The application uses react-router-dom for navigation between different pages (Articles Listing and Details Page). It supports:

- **Home Page (/)**: Displays a list of popular articles.
- **Details Page (/article/:id)**: Displays detailed information about the article selected from the home page.