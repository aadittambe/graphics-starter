# 🎒 Graphics starter
> A starter kit for building responsive D3 charts

This is a framework for creating and deploying responsive D3 graphics, built using Grunt. 

Key features:
- 🍪 Produce quick-turn cookie-cutter D3 charts from templates.
- 🎨 Includes support for compiling SASS.
- 📱 Embed charts in IFrames responsively, with Pym.js.

## Installation

First, install Node:

```
brew install node
```

Clone this repository, and install `npm` dependencies:

```
npm install
```

Next, install Grunt to create, test and build graphics:

```
sudo npm install -g grunt-cli
```

## Create a project

To create a new project, run:

```
grunt create --slug=name_of_project --template=template_here
```

This generator, currently accepts the following chart templates: 
- [simple-bar](https://aadittambe.github.io/graphics-starter/production/testBar/)
- [stacked-bar](https://aadittambe.github.io/graphics-starter/production/testStackedBar/)
- [compare-bar](https://aadittambe.github.io/graphics-starter/production/testCompareBars/)
- [line](https://aadittambe.github.io/graphics-starter/production/testLine/)

The `grunt-create` command creates a new directory inside the `projects` folder, with the name of the project. For instance, running `grunt create --slug=gas-prices --template=line` will create a directory named `projects/gas-prices` directory, with a line chart template.

## Test a project

To run a live server to develop a graphic, run:

```
grunt serve --slug=name_of_project
```

Once the server is started, visit <a href="http://localhost:8000/">`http://localhost:8000/`</a> to preview the graphic.

## Build a project

To build out a graphic, run:

```
grunt build --slug=name_of_project
```

This will create a new directory with the name of the project within in `production` directory with all the necessary (minified and uglified) files.

## Push and deploy a project

Push the build to GitHub, where the build will be deployed to GitHub pages. 

Add the changes: 

```
git add --all
```

Commit the changes:

```
git commit -m "message_here"
```

Push the changes:

```
git push origin main
```

Wait a minute or two, and the project will be published at a URL in the format:

```
<username>.github.io/graphics-starter/production/<name_of_the_project>
```

## Adding a project as an IFrame:
This generator uses [Pym.js](http://blog.apps.npr.org/pym.js/) from the NPR visuals team to resize IFrames responsively.

To embed a project, add the following code to an HTML file:
```
<div id="_name_of_the_project_"></div>
<script type="text/javascript" src="https://pym.nprapps.org/pym.v1.min.js"></script>
<script type="text/javascript">var pymParent = new pym.Parent('_name_of_the_project_','https://<username>.github.io/graphics-starter/production/<name_of_the_project>', {});</script>
</div>
```

Thank you to the following resources:
- [dailygraphics](https://github.com/nprapps/dailygraphics) from NPR Visuals
- [newsapp-template](https://github.com/seattletimes/newsapp-template) from The Seattle Times
- [generator-politico-graphics](https://github.com/The-Politico/generator-politico-graphics) from Politico
- [data-visuals-create](https://github.com/texastribune/data-visuals-create) from The Texas Tribune
- [D3 charts](https://github.com/thegazettedata/d3charts) from The Gazette
- [Pym.js](http://blog.apps.npr.org/pym.js/) from NPR Visuals
- [D3 graph gallery](https://d3-graph-gallery.com/about.html) by Yan Holtz, for help with D3 code