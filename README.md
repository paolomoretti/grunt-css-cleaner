# grunt-css-cleaner

> Clean your unused css classes from your app

This plugin is not actually removing your css classes from your files (less, sass, css, ...) but it's (at the moment) creating a safe report with all your "unused" classes.

**Grunt-css-cleaner** it's not running your app and attempt to navigate all pages to see used css rules, it's looping through your local files grabbing all css definitions (classes) and trying to find a reference in your template files.
If there is no reference, then it's marked as JUNK.


## Getting Started
This plugin requires Grunt.

If you haven't used [Grunt](http://gruntjs.com/) before, be sure to check out the [Getting Started](http://gruntjs.com/getting-started) guide, as it explains how to create a [Gruntfile](http://gruntjs.com/sample-gruntfile) as well as install and use Grunt plugins. Once you're familiar with that process, you may install this plugin with this command:

```shell
npm install grunt-css-cleaner --save-dev
```

Once the plugin has been installed, it may be enabled inside your Gruntfile with this line of JavaScript:

```js
grunt.loadNpmTasks('grunt-css-cleaner');
```

## The "css_cleaner" task

### Overview
In your project's Gruntfile, add a section named `css_cleaner` to the data object passed into `grunt.initConfig()`.

```js
grunt.initConfig({
  css_cleaner: {
    taskname: {
      options: {
        // Task-specific options go here.
      },
      your_target: {
        // Target-specific file lists and/or options go here.
      }
    }
  },
})
```




### Options

#### options.appRoot
Type: `String`
Default value: `'./'`

A reference to the root directory where to start the scan for templates/pages for CSS usage

#### options.writeReport
Type: `Boolean|String`
Default value: `false`

If the report has to be created, an absolute url and file name must be given. I.e. ./tmp/report.txt

#### options.templatesPath
Type: `Array`
Default value: `['./']`

Specify a list of folders to look for app templates

#### options.templatesType
Type: `Array`
Default value: `['html']`

Specify all the extensions used for template files. i.e. ['html', 'jade']

#### options.ignore
Type: `Array`
Default value: `[]`

List of files/directories to ignore while scanning for css usage




#### Default Options

```js
grunt.initConfig({
  css_cleaner: {
    options: {
      appRoot       : "./app/",
      writeReport   : "tmp/junk-css-report.txt",
      templatesPath : ["./app/templates", "./website/templates"],
      templatesType : ["jade", "slim"],
      ignore        : ["./app/images/"]
    },
    files: {
      'app_ui': ['./app/assets/css'],
    },
  },
})
```

## License
Copyright (c) 2014 Paolo Moretti. Licensed under the MIT license.
