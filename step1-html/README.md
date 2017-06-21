# Step 1: Pure Javascript - Drop & Upload File Tutorial

The first step of the three step-by-step tutorials on Drop & Upload File app.
The official tutorial of this step is available at [here](https://www.mokuji.me/article/drop-upload-tutorial-1)

## Use

Clone the repository:
```bash
$ git clone https://github.com/zacfukuda/react-drop-upload-app.git
```

Open the `index.html` in `step1-html` directory, and then drag & drop a image file to the browser. The application read the data of file dropped and display the thumbnail of it. Multiple images can be dropped at the same time.

## Original

The code being used here is mostly based on [Reading files in JavaScript using the File APIs](https://www.html5rocks.com/en/tutorials/file/dndfiles/) from HTML5 Rocks. I put each of code into one file eliminating the unnecessary parts and add some modification for the next following two steps in order to minimize the editing when we make it be Ajax and React application.

> Because the code here is based on HTML5 Rocks, the application only accepts image files. Even if you drop a PDF, or txt file, nothing will happen.

The end purpose of this tutorial is to get you familiar with React. So I don't go through all codes and examine them here. Please check out the [HTML5 Rocks' post](https://www.html5rocks.com/en/tutorials/file/dndfiles/) if you want to know how FileReader works in detail. The post is written in 2010, however, I believe it is still valid.