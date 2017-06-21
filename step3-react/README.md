# Step 3: React, Webpack, Express - Drop & Upload Files Tutorial

The last step of the three step-by-step tutorials on Drop & Upload File app.

## USE

Clone the repository:
```bash
$ git clone https://github.com/zacfukuda/react-drop-upload-app.git
```

Change your working directory to:
```bash
$ cd react-drop-upload-app/step3-react
```

Create directories in which the images and the bundled js files will be saved:
```bash
$ mkdir uploads build
```

Next install the packages:

```bash
$ yarn
// Or if you use npm:
$ npm install
```

Generate Javascript files from the source files:

```bash
$ yarn build
// Or if you use npm:
$ npm build
// Or if you have webpack globally installed:
$ webpack
```

Run a server:
```bash
$ yarn start
```

Visit [http://localhost:3000](http://localhost:3000) and drop your images to “Drop files here to upload” zone. Your image will be uploaded to the `uploads` folder and you can see on the browser console the log message saying “[filename] uploaded”.

### Keep watching file changes
The changes on js fils under `src` can be watched by webpack, and the browser will be automatically reloaded every time you make a change by [Browsersync](https://www.browsersync.io/).

Watch files and run a server:
```bash
$ yarn start-dev
```

Now visit [http://localhost:3100](http://localhost:3100), which is a proxy for `localhost:3000`.
Every time you make a change to the js files, the browser will be automatically reloaded. You still have to refresh the browser if you modify the `server.js`.

> This app is designed to accept only image files. Even if you drop a PDF, or a txt file, nothing will happen. But you can modify it to handle other types of file with FileReader.