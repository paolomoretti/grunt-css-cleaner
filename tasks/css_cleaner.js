/*
 * grunt-css-cleaner
 * http://www.bitterbrown.com/grunt-css-cleaner
 *
 * Copyright (c) 2014 Paolo Moretti
 * Licensed under the MIT license.
 */

'use strict';

module.exports = function (grunt) {

  // Please see the Grunt documentation for more information regarding task
  // creation: http://gruntjs.com/creating-tasks

  grunt.registerMultiTask('css_cleaner', 'Clean your unused css classes from your app', function () {

    // Merge task-specific and/or target-specific options with these defaults.
//    var options = this.options();

//    console.log ("bootstrap", this);

    // Iterate over all specified file groups.
    this.files.forEach(function (filePaths) {

      var cssRules = [];

      filePaths.src.forEach(function (filepath) {
        var content = grunt.file.read(filepath);

        cssRules = cssRules.concat (content.match(/\.[\w-_\d]+/gi));


      });
      console.log ("Found " + cssRules.length + " css rules in " + filePaths.src.length + " files");




//
//      // Concat specified files.
//      var src = file.src.filter(function (filepath) {
//        // Warn on and remove invalid source files (if nonull was set).
//        if (!grunt.file.exists(filepath)) {
//          grunt.log.warn('Source file "' + filepath + '" not found.');
//          return false;
//        } else {
//          return true;
//        }
//      }).map(function (filepath) {
//        // Read file source.
//        return grunt.file.read(filepath);
//      }).join(grunt.util.normalizelf(options.separator));
//
//      // Handle options.
//      src += options.punctuation;
//
//      // Write the destination file.
//      grunt.file.write(file.dest, src);
//
//      // Print a success message.
//      grunt.log.writeln('File "' + file.dest + '" created.');
    });
  });

};
