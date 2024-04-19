
# MakeItMVP: Communiti Content

Welcome to Communiti's social media content generator! Communiti is a community management platform designed oto foster and streamline engagement. This feature is an AI-powered tool for community managers that generates text content for LinkedIn posts based on user input.

## Table of Contents

- [Getting Started](#getting-started)
- [Project Structure](#project-structure)
- [Technologies](#technologies)
- [Contributing](#contributing)
- [License](#license)

## Getting Started

To begin working on this project, follow these steps:

1. Clone this repository to your local machine:

   ```
   git clone https://github.com/MakeItMVP/LaunchAcademyStarter.git
   ```

2. Change your working directory to the cloned repository:

   ```
   cd Content
   ```

3. Install the project dependencies:

   ```
   npm install
   ```

4. Add your Firebase config values:

   ```
   1) Create a .env file in the root directory (do not just rename .env.sample)
   2) In Firebase, go to the project you want to connect to
   3) Go to "Project settings"
   4) Scroll down to "Your apps" and select the app you want to connect to
   5) Copy each value to your .env file
   ```

5. Start the development server:

   ```
   npm start
   ```

6. Open your web browser and navigate to `http://localhost:3000` to see the project running.


## Project Structure

The project structure is organized as follows:

```
├── src/
│   ├── components/
│   │   ├── Example
│   │   │   ├── Example.jsx
│   │   │   ├── Example.scss
│   ├── pages/
│   │   ├── ...
│   ├── styles/partials
│   │   ├── _global.scss
│   │   ├── _mixins.scss
│   │   ├── _typography.scss
│   │   ├── _variables.scss
│   ├── Firebase/
│   │   ├── firebase-config.jsx
│   │   ├── ...
│   ├── App.js
│   ├── index.js
├── public/
│   ├── index.html
│   ├── ...
├── .env
├── .gitignore
├── package.json
├── README.md
```

- `src/`: Contains the main source code for the project, including React components and styles.
- `public/`: Contains static assets and the project's HTML template.
- `package.json`: Defines project dependencies and scripts.


## Technologies

This repository uses the following technologies:

- React: A JavaScript library for building user interfaces.
- Sass: A CSS extension language that adds features like variables, nesting, and more.


## Contributing

We welcome contributions from the community. If you have suggestions or improvements for this repository, please open an issue or create a pull request. 

<!--- 
TODO: Add CONTRIBUTING file

For more information on how to contribute, stay tuned for our [CONTRIBUTING.md](CONTRIBUTING.md) file. 
--->

## License

This project is licensed under the MIT License.

<!--- 
TODO: Add LICENSE file
--->
