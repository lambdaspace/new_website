# [LambdaSpace](http://www.lambdaspace.gr/) - New website for Thessaloniki's Hackerspace

## What is the LambdaSpace?

A **120m^2 space** dedicated to creative software and hardware hacking. Tech communities, meetups and individuals now have their own space in Thessaloniki.

LambdaSpace provides a 3D printer, electronics, as well as a fully equipped lab that can help you prototype your idea.
Moreover, you can get in touch with the city's brightest minds; makers, coders, ninjas, engineers, and designers meet here.

The space is maintained thanks to the contributions of our (awesome) members and supporters.

## Website redesign

The LambdaSpace website was redesigned in order to increase the visibilty of the hackerspace, as well as to more effectively promote the events and projects that take place on a daily basis at the hackerspace.

We used [Creative](http://ironsummitmedia.github.io/startbootstrap-creative/), a template based on the [Bootstrap](http://getbootstrap.com/) front-end framework for modern and mobile responsive web projects.

We have also deployed our own instance of the open source discussion platfom Discource, available [here](http://discourse.lambdaspace.gr/).

## How to contribute

Anyone is welcome to contribute to the development and enhancement of the TM website.

Keep in mind that in order to make changes in the website's CSS, js, and images, you will need to install **Gulp** first. If that is the case, you are advised to follow these steps:

**Prerequisites**: Node.js, npm, Gulp

### Preparing your development environment

[![Code Climate](https://codeclimate.com/github/techministry/new_website/badges/gpa.svg)](https://codeclimate.com/github/lambdaspace/new_website)

Gulp is installed and managed via [npm](https://www.npmjs.com/), the [Node.js](https://nodejs.org/en/) package mananger.
Before setting up Gulp make sure that your [npm](https://www.npmjs.com/) is up-to-date by running `npm update -g npm`. Τhis might require `sudo` on certain systems.

Afterwards, install the Gulp command line interface (**CLI**) globally, by running `npm install -g gulp`.
This will put the `gulp` command in your system path, allowing it to be run from any directory.

A typical Gulp project setup will involve adding two files to your project: `package.json` and the `Gulpfile`

**package.json**: The `package.json` file belongs in the root directory of your project, and should be commited with your project source. Running `npm install` in the same folder as a `package.json` file will install the correct version of each dependency listed therein.

**Gulpfile**: The `Gulpfile.js` file is a valid JS file that also belongs in the root directory of your project, next to your `package.json` file, and should be commited with your project source.

*For further info and detailed directions see the Gulp [Getting Started guide] (https://github.com/gulpjs/gulp/blob/master/docs/getting-started.md)*.

### Working with an existing Gulp project

This project is *already* configured with a `package.json` and a `Gulpfile`, so assuming that the Gulp has been installed successfully:

* Open your terminal and navigate to the project's folder.
* Run `npm install` to install project dependencies.
* Run `bower install` to install front-end dependencies.

**Before making any changes run `gulp` on your terminal**.
