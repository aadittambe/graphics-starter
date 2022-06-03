module.exports = function (grunt) {
    const sass = require('node-sass')
    require('matchdep').filterDev('grunt-*').forEach(grunt.loadNpmTasks);
    let template = grunt.option('template');
    let slug = grunt.option('slug');

    grunt.initConfig({
        copy: {
            create: {
                files: [
                    {
                        expand: true,
                        cwd: 'templates/_base',
                        src: '**',
                        dest: 'projects/' + slug
                    },
                    {
                        expand: true,
                        cwd: 'templates/' + template,
                        src: '**',
                        dest: 'projects/' + slug
                    }
                ]
            },
            deploy: {
                files: [{
                    expand: true,
                    cwd: 'projects/' + slug + '/data',
                    src: '**',
                    dest: 'production/' + slug + '/data'
                }]
            }
        },
        file_append: {
            default_options: {
                files: [
                    {
                        append: "$(document).ready(function () {var pymChild = new pym.Child({ id: '" + slug + "' });});",
                        // prepend: "text to prepend",
                        input: 'templates/' + template + '/graphic.js',
                        output: 'projects/' + slug + '/graphic.js'
                    }
                ]
            }
        },
        sass: {
            build: {
                files: [{
                    src: 'projects/' + slug + '/style.scss',
                    dest: 'projects/' + slug + '/style.css',
                }]
            },
            options: {
                implementation: sass,
                sourceMap: true,
            }
        },
        uglify: {
            target: {
                files: [
                    {
                        src: 'projects/' + slug + '/*.js',
                        dest: 'production/' + slug + '/script.min.js'
                    }
                ]
            }
        },
        cssmin: {
            target: {
                files: [
                    {
                        src: 'projects/' + slug + '/*.css',
                        dest: 'production/' + slug + '/style.min.css'
                    }
                ]
            }
        },
        htmlmin: {
            options: {
                removeComments: true,
                collapseWhiteSpace: true,
            },
            target: {
                files: [
                    {
                        src: 'projects/' + slug + '/index.html',
                        dest: 'production/' + slug + '/index.html'
                    }
                ]
            },
        },
        dom_munger: {
            main: {
                options: {
                    remove: ['script[data-remove="true"]', 'link[data-remove="true"]'],
                    append: [
                        { selector: 'head', html: '<link href="style.min.css" rel="stylesheet">' },
                        { selector: 'body', html: '<script src="script.min.js"></script>' }
                    ]
                },
                src: 'projects/' + slug + '/index.html',
                dest: 'production/' + slug + '/index.html'
            }
        },
        watch: {
            sass: {
                files: ['projects/' + slug + '/*.scss'],
                tasks: ['sass'],
            },
            livereload: {
                options: { livereload: true },
                files: ['projects/' + slug + '/*'],
            },
        },
        connect: {
            server: {
                options: {
                    port: 8000,
                    livereload: true,
                    base: {
                        path: 'projects/' + slug + '/',
                        options: {
                            index: 'index.html'
                        }
                    }
                }
            }
        },
    });

    grunt.registerTask('create', [
        'copy:create',
        'file_append',
        'sass'
    ]);

    grunt.registerTask('serve', ['connect', 'watch']);
    grunt.registerTask('build', ['uglify', 'cssmin', 'htmlmin', 'copy:deploy', 'dom_munger']);
};