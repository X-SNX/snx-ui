'use strict';

module.exports = function (grunt) {
  // load all grunt tasksgrunt
  grunt.loadNpmTasks('grunt-contrib-less');
  grunt.loadNpmTasks('grunt-contrib-watch');
  grunt.loadNpmTasks('grunt-contrib-cssmin');
  grunt.loadNpmTasks('grunt-contrib-concat');
  grunt.loadNpmTasks('grunt-contrib-uglify');

  grunt.initConfig({
    watch: {
      // if any .less file changes in directory "public/css/" run the "less"-task.
      files: "less/*.less",
      tasks: ["less"]
    },
    // "less"-task configuration
    less: {
      // production config is also available
      development: {
        options: {
          // Specifies directories to scan for @import directives when parsing.
          // Default value is the directory of the source, which is probably what you want.
          paths: ["css/"]
        },
        files: {
          // compilation.css  :  source.less
          "dist/css/snxUI.css": [
            "less/*.less"
          ]
        }
      }
    },
    cssmin: {
      css: {
        src:"dist/css/snxUI.css",
        dest:"dist/css/snxUI.min.css"
      }
    },
    concat: {
      js: {
        src: [
          "javascript/*.js"
        ],
        // 运行任务后生成的目标文件
        dest: "dist/javascript/snxUI.js"
      }
    },
    uglify: {
      target: {
        files: {
          "dist/javascript/snxUI.min.js": [
            "dist/javascript/snxUI.js"
          ]
        }
      }
    }
  });
  // the default task (running "grunt" in console) is "watch"
  grunt.registerTask('default', ["less", "cssmin", "concat", "uglify", "watch"]);
};