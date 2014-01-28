module.exports = function(grunt) {

    // Project configuration.
    grunt.initConfig({

        //Read the package.json (optional)
        pkg: grunt.file.readJSON('package.json'),       

        compass: {
            dist: {
                options: {
                    config: 'config.rb'
                }
            }
        },

        copy: {
            main: {
                expand: true,
                // flatten: true,
                src: 'shims/**',
                cwd: 'bower_components/webshim/js-webshim/minified/',
                dest: 'build'
                // {expand: true, cwd: 'path/', src: ['**'], dest: 'dest/'},

            }
        },

        watch: {
            css: {
                files: ['sass/*.scss'],
                tasks: ['compass']
            },
        },

        requirejs: {
            compile: {
                options: {
                    baseUrl: "javascript",
                    dir : 'build',
                    mainConfigFile: "javascript/config/require-config.js",
                    modules: [
                        {
                            name: "main-content"
                        },{
                            name: "main-home"
                        },{
                            name: "main-generic"                    
                        }
                    ],                                     
                    optimize: 'uglify'
                }
            }
        }        

    });

    grunt.loadNpmTasks('grunt-contrib-compass');
    grunt.loadNpmTasks('grunt-contrib-watch');
    grunt.loadNpmTasks('grunt-contrib-copy');
    grunt.loadNpmTasks('grunt-contrib-requirejs');

    // Default task.
    grunt.registerTask('default', ['compass', 'requirejs', 'copy']);

};
