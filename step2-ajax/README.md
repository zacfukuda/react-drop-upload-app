# Step 2: Ajax with Express - Drop & Upload Files Tutorial

Codes and files for the second step of the three step-by-step tutorials on Drop & Upload Files app.

In step 1, I introduce the code based on [HTML5 Rocks' post on FileReader](https://www.html5rocks.com/en/tutorials/file/dndfiles/). It is a great post explaining File API. But, since it is a simple HTML and Javascript code, the file data disappears into the browser's memory once you read it. That's not what we want.

In this step, we create a super simple Express application to handle the ajax `POST` request that is sent by a client passing the data of images dropped into the browser.

## USE

Change your working directory to:
```bash
$ cd step2-ajax
```

Create a directory in which the images will be saved:
```bash
$ mkdir uploads
```

Next install the packages:

```bash
$ yarn
// Or if you use npm:
$ npm install
```

Run a server:
```bash
$ yarn start
```

Visit [http://localhost:3000](http://localhost:3000) and drop your images to “Drop files here to upload” zone. Your image will be uploaded to the `uploads` folder and you can see on the browser console the log message saying “[filename] uploaded”.

> This app is designed to accept only image files. But you can modify it to handle other types of file with FileReader.