module.exports = function(grunt) {

    // Project configuration.
    grunt.initConfig({

        includeSource: {
            options: {
                basePath: '',
                baseUrl: '/js/admin/'
            },
            myTarget: {
                files: {
                    'build/index_dev.html': 'app/index_dev.html.tpl',
                    'build/index.html': 'app/index.html.tpl'
                }
            }
        },

        concat: {
            angular: {
                src: [
                    'build/tmp/templates.js',
                    'libs/*.js',
                    'app/**/*.js'
                ],

                dest: 'build/tmp/admin.js'
            },

        },

        uglify: {
            options: {
                report: 'min',
                mangle: false
            },
            desc: {
                files: {
                    'build/admin.min.js': ['build/tmp/admin.js']
                }
            }
        },

        watch: {
            options: {
                livereload: true
            },

            scripts: {
                files: ['app/**/*.js', '**/*.tpl.html', 'app/**/*.html', 'app/**/*.html.tpl'],
                tasks: ['clean', 'html2js', 'includeSource', 'concat', 'uglify', 'cacheBust', 'htmlmin']
            },
        },

        cacheBust: {
            options: {
                encoding: 'utf8',
                algorithm: 'md5',
                length: 16,
                baseDir: '../../',
                deleteOriginals: false
            },
            assets: {
                files: [{
                    src: ['build/index.html']
                }]
            }
        },

        clean: ["build"],

        html2js: {
            options: {
                htmlmin: {
                    collapseBooleanAttributes: true,
                    collapseWhitespace: true,
                    removeAttributeQuotes: true,
                    removeComments: true,
                    removeEmptyAttributes: true,
                    removeRedundantAttributes: true,
                    removeScriptTypeAttributes: true,
                    removeStyleLinkTypeAttributes: true
                }
            },
            main: {
                src: ['app/**/*.html'],
                dest: 'build/tmp/templates.js'
            },
        },

        htmlmin: {                                     //
            dist: {                                      // Target
                options: {                                 // Target options
                    removeComments: true,
                    collapseWhitespace: true
                },
                files: {                                   // Dictionary of files
                    'build/index.html': 'build/index.html'
                }
            }
        }

    });


    grunt.loadNpmTasks('grunt-html2js');
    grunt.loadNpmTasks('grunt-contrib-watch');
    grunt.loadNpmTasks('grunt-include-source');
    grunt.loadNpmTasks('grunt-cache-bust');
    grunt.loadNpmTasks('grunt-contrib-concat');
    grunt.loadNpmTasks('grunt-contrib-uglify');
    grunt.loadNpmTasks('grunt-contrib-clean');
    grunt.loadNpmTasks('grunt-contrib-htmlmin');

    // Default task(s).
    grunt.registerTask('default', ['clean', 'html2js', 'includeSource', 'concat', 'uglify', 'cacheBust', 'htmlmin']);
    grunt.registerTask('run_watch', ['watch']);


};