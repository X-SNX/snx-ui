'use strict';

module.exports = function (grunt) {
    // load all grunt tasksgrunt
    grunt.loadNpmTasks('grunt-contrib-less');
    grunt.loadNpmTasks('grunt-contrib-watch');
    grunt.loadNpmTasks('grunt-contrib-uglify');
    grunt.loadNpmTasks('grunt-contrib-cssmin');

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
                    "css/snxUI.css": ["less/alerts.less",
                        "less/badges.less",
                        "less/buttongroups.less",
                        "less/buttons.less",
                        "less/snx-grids.less",
                        "less/dropdowns.less",
                        "less/forms.less",
                        "less/helper.less",
                        "less/images.less",
                        "less/img-scroll.less",
                        "less/labels.less",
                        "less/list-groups.less",
                        "less/modals.less",
                        "less/navs.less",
                        "less/other-forms.less",
                        "less/pagination.less",
                        "less/plugins.less",
                        "less/popups.less",
                        "less/progressbars.less",
                        "less/tables.less",
                        "less/tabs.less",
                        "less/tooltips.less"
                    ]
                }
            }
        },
        cssmin: {
            //options: {
            //    banner: '/*! <%= pkg.name %> <%= grunt.template.today("yyyy-mm-dd") %> */\n',
            //    //美化代码
            //    beautify: {
            //        //中文ascii化，非常有用！防止中文乱码的神配置
            //        ascii_only: true
            //    }
            //},
            css: {
                src:'css/snxUI.css',
                dest:'css/snxUI.min.css'
            }
            //my_target: {
            //    files: [
            //        {
            //            expand: true,
            //            //相对路径
            //            cwd: 'css/',
            //            src: 'css/snxUI.css',
            //            dest: 'css/snxUI.min.css'
            //        }
            //    ]
            //}
        }
    });
    // the default task (running "grunt" in console) is "watch"
    grunt.registerTask('default', ['less','cssmin','watch']);
};