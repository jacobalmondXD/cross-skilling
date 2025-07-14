# cross-skilling

This repository serves as a personal cross-skilling project dedicated to learning test automation using Cypress.io. It will house various examples and exercises as I explore Cypress's capabilities for web application testing. 🧪

## Getting Started

These instructions will get you a copy of the project up and running on your local machine for development and testing purposes.


### Cloning the Repository

1. **Open your terminal or command prompt.**

2. **Navigate to the directory where you want to clone the repository.** You can use the `cd` command for this. For example, to navigate to your Documents folder:

   ```
   cd Documents
   ```

3. **Use the git clone command followed by the repo url.** For this repo that would be:

    ```
    git clone https://github.com/jacobalmondXD/cross-skilling.git
    ```

4. **Following the succesful clone, ensure you are in the repo root folder.** You can use the `cd` command again, for this repo it would be:

    ```
    cd cross-skilling
    ```

5. **Checkout main and ensure it's up to date.**

    ```
    git checkout main
    ```

    followed by

    ```
    git pull
    ```

## Node Package Manager (npm)

npm is the default package manager for Node.js and is essential for developing with JavaScript. It installs, updates and removes your packages (code libraries, or sometimes called modules), handles the dependencies
between those packages and looks after versioning of said packages. You can even add to the existing registry to make your own reusable packages you can share with others.

For our purposes we'll be using npm to install playwright locally and use it in the repo.

**Installing Node.js**

First, check if you have node.js install already (there's a good chance you do). First open up a terminal window, or use the terminal in your chosen IDE.
On a mac you can press Command+SPacebar and then type `terminal` to quickly and easily open an instance. 

In terminal use the node version command to check if you have node install already:

```
node -v
```

If you have node installed this should tell you the version number ie. v21.1.0. If you do, congrats, you can skip the rest of this part of the readme!

However if you don't see a version number and instead see an error along the lines of `command not found: node` then onwards, to victory.

**How to set up npm on a Mac:**

Download Node.js: Go to the official Node.js website (https://nodejs.org/) and download the macOS installer. Choose the LTS (Long-Term Support) version for stability.

Run the installer: Once the download is complete, open the installer package and follow the on-screen instructions. This will install both Node.js and npm on your system.

Verify the installation: Open your terminal and run the following commands to check if Node.js and npm are installed correctly by using the same command as above, but you can also chack npm too now:

```
node -v
npm -v
```

**Alternative installation methods:**

Homebrew: If you have Homebrew installed, you can use it to install Node.js and npm:

```
brew install node
```

Then run the `node -v` commands as above to verify the install.


**Other handy tools:**

nvm (Node Version Manager): nvm is a tool that allows you to manage multiple versions of Node.js on your system. This is useful if you need to work with different Node.js versions for different projects. You can find instructions on how to install and use nvm on its GitHub page: https://github.com/nvm-sh/nvm

That's it! You've successfully set up npm on your Mac and can now start using it to manage packages for your JavaScript projects.


**Possible error at runtime:** 

If you have an issue where you recieve an error of `Error: Cannot find module 'dotenv'`, to resolve this simply run:

`npm install --save dotenv`

## Installing and executing the project

To get started please perform the following steps. These should be executed from the root of the folder which contains the `cross-skilling` repo which was checked out above.

**Install all dependencies**

```
npm i
```

**Executing Cypress**
```
npx cypress open
```
