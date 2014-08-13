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

    var _this = this;

    // Utils
    Array.prototype.diff = function(a) {
      return this.filter(function(i) {return a.indexOf(i) < 0;});
    };

    Array.prototype.unique = function () {
      return this.reduce(function(a,b){if(a.indexOf(b)<0)a.push(b);return a;},[]);
    }

    // Merge task-specific and/or target-specific options with these defaults.
    var options = this.options({
      writeReport: false
    });

    console.log ("bootstrap", this);

    // Iterate over all specified file groups.

    var reportContent   = "";
    var cssRules        = [];

    // Find defined rules
    this.files.forEach(function (filePaths) {

      filePaths.src.forEach(function (filepath) {
        var content = grunt.file.read(filepath);

        cssRules = cssRules.concat (content.match(/\.[\w-_\d]+/gi));

      });
      cssRules = cssRules.unique();
      reportContent += "==> "+_this.target+"\r"+filePaths.src+"\n\rFound " + cssRules.length + " css rules in " + filePaths.src.length + " files";

    });

    // Search code for usage
    var sources = [];
    var rulesUsed = [];
    grunt.file.recurse("./", function (abspath, rootdir, subdir, filename) {
      if(filename.split(".")[1] == "html") {

        var content = grunt.file.read(abspath);

        cssRules.forEach(function (rule) {
          if (rule !== null) {
            if (content.indexOf(rule.split(".")[1]) > -1 && rulesUsed.indexOf(rule) == -1) {
              rulesUsed.push(rule);
            }
          }
        });
        sources.push(abspath);
      }
    });

    console.log ("Classes not used: ", cssRules.diff(rulesUsed));

    reportContent += "\r\n" + sources.length + " sources found";
    reportContent += "\r\n\n** USED CLASSES ("+rulesUsed.length+")\r" + rulesUsed.join(", ");
    reportContent += "\r\n\n** JUNK CLASSES ("+cssRules.diff(rulesUsed).length+")\r" + cssRules.diff(rulesUsed).join(", ");
//
//
//    for (var usageType in this.data.templates) {
//      this.data.templates[usageType].forEach(function (template) {
//        console.log ("template", template);
//      });
//    }


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


    console.log(reportContent);

    if (options.writeReport !== false)
      grunt.file.write(options.writeReport, reportContent);

  });

};
