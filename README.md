# [TechMinistry](http://www.techministry.gr/) - New website for Thessaloniki's Hackerspace

## What is the TechMinistry?

A **120m^2 space** dedicated to creative software and hardware hacking. Tech communities, meetups and individuals now have their own space in Thessaloniki.

TechMinistry provides a 3D printer, electronics, as well as a fully equipped lab that can help you prototype your idea.
Moreover, you can get in touch with the city's brightest minds; makers, coders, ninjas, engineers, and designers meet here.

The space is maintained thanks to the contributions of our (awesome) members and supporters.

## Website redesign

The TM website was redesigned in order to increase the visibilty of the hackerspace, as well as to more effectively promote the events and projects that take place on a daily basis at the hackerspace. 

We used [Creative](http://ironsummitmedia.github.io/startbootstrap-creative/), a template based on the [Bootstrap](http://getbootstrap.com/) front-end framework for modern and mobile responsive web projects.

We have also deployed our own instance of the open source discussion platfom Discource, available [here](http://discourse.techministry.gr/).

## How to contribute

Anyone is welcome to contribute to the development and enhancement of the TM website. 
In order to contribute, you are advised to follow these steps: 

**Requirements**: node.js, npm, grunt

### Preparing your development environment

Grunt is installed and managed via [npm](https://www.npmjs.com/), the [Node.js](https://nodejs.org/en/) package mananger. 
Before setting up Grunt make sure that your [npm](https://www.npmjs.com/) is up-to-date by running `npm update -g npm`.

Afterwards, install the Grunt command line interface (**CLI**) globally, by running `npm install -g grunt-cli`.
This will put the `grunt` command in your system path, allowing it to be run from any directory.

A typical Grunt project setup will involve adding two files to your project: `package.json` and the `Gruntfile`

**package.json**: The `package.json` file belongs in the root directory of your project, and should be commited with your project source. Running `$ npm install` in the same folder as a `package.json` file will install the correct version of each dependency listed therein.

**Gruntfile**: The `Gruntfile.js` file is a valid JS file that also belongs in the root directory of your project, next to your `package.json` file, and should be commited with your project source.

*For further info and detailed directions see the Grunt [Getting Started guide] (http://gruntjs.com/getting-started)*.

### Working with an existing Grunt project

This project is *already* configured with a `package.json` and a `Gruntfile`, so assuming that the Grunt CLI has been installed successfully:

* Open your terminal and navigate to the project's folder.
* Run `$ npm install` to install project dependencies.
 
**Before making any changes run `$ grunt` on your terminal**.


