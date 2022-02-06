<div id="top"></div>

<div align="center">
  <h3 style="text-align: center;"><a href="#" target="_blank" style="color: #000;">Component Library</a></h3>
</div>


<!-- TABLE OF CONTENTS -->
<details>
  <summary>Table of Contents</summary>
  <ol>
    <li>
      <a href="#about-the-project">About The Project</a>
      <ul>
        <li><a href="#built-with">Built With</a></li>
      </ul>
    </li>
    <li>
      <a href="#getting-started">Getting Started</a>
      <ul>
        <li><a href="#prerequisites">Prerequisites</a></li>
        <li><a href="#installation">Installation</a></li>
      </ul>
    </li>
    <li><a href="#usage">Usage</a></li>
    <li><a href="#folder-structure">Folder Structure</a></li>
    <li><a href="#contact">Contact</a></li>
  </ol>
</details>


<!-- ABOUT THE PROJECT -->
## About The Project
This repository contains the WorldQuant Brain's splash page web sources.

### Built With
* [Nunjucks](https://mozilla.github.io/nunjucks/)
* [Vanilla Javascript](https://developer.mozilla.org/en-US/docs/Web/JavaScript)
* [SCSS](https://sass-lang.com/)
<br><br>

<!-- GETTING STARTED -->
## Getting Started
### Prerequisites

1. Node
* Install [NVM](https://github.com/nvm-sh/nvm)(Node Version Manager) if you don't have one in your local.<br>
* Install node `v17.1.0` which is compatible version of this repository.<br><br>
  ```sh
  nvm install v17.1.0
  nvm use v17.1.0
  ```
<p align="right">(<a href="#top">back to top</a>)</p>

### Installation
1. Clone the repo in your local.

   ```sh
   git clone git@github.com:2hyoon/component-library.git
   ```
2. Install NPM packages by running `npm install` from within the project root directory.
<p align="right">(<a href="#top">back to top</a>)</p>


<!-- USAGE EXAMPLES -->
## Usage

1. To run local server<br>
* Local server will be run at `localhost:3000` by running `npm run dev` in your shell.<br>
* Any changes you make will appear on the `localhost:3000`<br>
2. To build production files<br>
* To build production ready files, run `npm run prod` in your shell.
* You can find all compiled files `/dist` folder.
* If you need to launch the site, upload all files from `/dist` to the desired server.
3. To edit the copy
* If you need to edit the copy of the web page, go to `/app/src/data` folder and edit your text in the corresponded file.
4. Branch: Develop
* This is your working branch.
5. Branch: Master
* When you are done working with `develop` branch, merge your `develop` branch into `master` branch.
* When you merge `develop` into `master`, it will automatically deploy files to the [staging server](http://google.com/).
<p align="right">(<a href="#top">back to top</a>)</p>



<!-- FOLDER STRUCTURE -->
## Folder Structure
```sh
.
├── README.md
├── app # all source files for this app
│   ├── assets # image assets
│   ├── scripts # javascript files
│   ├── src # Nunjuck and html files
│   │   ├── components
│   │   ├── data # all text contents live in this data folder.
│   │   ├── layouts
│   │   └── templates
│   │       └── index.html
│   └── styles # styles
├── dist # compiled files for the deployment
├── gulp # gulp task files for html, images, scripts, and styles
│   └── tasks
│       ├── html
│       ├── images
│       ├── scripts
│       └── styles
├── gulpfile.js # gulp task entry point
├── package-lock.json
└── package.json # npm package manager file
```
<p align="right">(<a href="#top">back to top</a>)</p>


<!-- CONTACT -->
## Contact
[Hailey Yoon](https://heyon.art/web/)<br>
Project Link:

<p align="right">(<a href="#top">back to top</a>)</p>

