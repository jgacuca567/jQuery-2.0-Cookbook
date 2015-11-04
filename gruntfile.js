/*jslint node: true */
module.exports = function(grunt) {
    grunt.initConfig({
        pkg: grunt.file.readJSON('package.json'),

        sass: {
            dist: {
                options: {
                    outputStyle: 'expanded',
                    sourceMap: false
                },
                files: {
                    'css/main.css': 'scss/main.scss'
                }
            }
        }, // sass

        compass: {
            dev: {
                options: {
                    config: 'config.rb'
                }
            } // dev
        }, //compass

        watch: {
            options: {
                livereload: true,
                dateFormat: function(time) {
                        grunt.log.writeln('The watch finished in ' + time + 'ms at ' + (new Date()).toString());
                        grunt.log.writeln('Waiting for more changes...');
                    } //date format function
            }, //options
            scripts: {
                files: ['*.js', 'js/*.js']
            }, // scripts
            //Live Reload of SASS
            sass: {
                files: 'scss/**/*.scss',
                tasks: ['sass']
            }, //sass
            css: {
                files: ['scss/*.scss'],
                tasks: ['compass']
            },
            html: {
                files: ['*.html', 'Chapter3/*.html']
            }, //html
            all: {
                files: '{,**/}*.js',
                tasks: ['jshint']
            } //all
        }, //watch

        postcss: {
            options: {
                processors: [
                    require('autoprefixer')({
                        browsers: 'last 2 versions'
                    })
                ]
            }
        }, //post css

        jshint: {
            options: {
                reporter: require('jshint-stylish')
            },
            target: ['*.js', 'js/*.js'], 
            all: ['*.js', 'js/*.js']
        } //jshint
    });

    grunt.loadNpmTasks('grunt-sass');
    grunt.loadNpmTasks('grunt-contrib-watch');
    grunt.loadNpmTasks('grunt-contrib-compass');
    grunt.loadNpmTasks('grunt-postcss');
    grunt.loadNpmTasks('grunt-contrib-jshint');
    grunt.loadNpmTasks('grunt-force-task');

    grunt.registerTask('build', ['sass']);
    grunt.registerTask('default', ['build', 'watch', 'compass', 'force:jshint']);
};