module.exports = function(grunt) {
    grunt.loadNpmTasks('grunt-karma');
    grunt.loadNpmTasks('grunt-contrib-jshint');
    grunt.loadNpmTasks("grunt-jsbeautifier");
    grunt.loadNpmTasks('grunt-contrib-uglify');

    grunt.initConfig({
        jshint: {
            all: [
                '*.js', 'src/*.js', 'test/*.js'
            ],
            options: {
                jshintrc: '.jshintrc'
            }
        },

        jsbeautifier: {
            files: [
                '*.js', 'src/*.js', 'test/*.js'
            ],
            options: {
                'indent_size': 4,
                'indent_char': ' ',
                'indent_level': 0,
                'indent_with_tabs': false,
                'preserve_newlines': true,
                'max_preserve_newlines': 10,
                'jslint_happy': false,
                'brace_style': 'collapse',
                'keep_array_indentation': false,
                'keep_function_indentation': false,
                'space_before_conditional': true,
                'eval_code': false,
                'indent_case': false,
                'unescape_strings': false
            }
        },
        uglify: {
            dist: {
                files: {
                    'dist/angular-combo-box.min.js': ['src/angular-combo-box.js']
                }
            }
        },
        karma: {
            unit: {
                configFile: 'karma.conf.js',
                files: [{
                    src: [
                        'bower_components/angularjs/angular.js',
                        'bower_components/angular-mocks/angular-mocks.js',
                        'src/*.js',
                        'test/*.js'
                    ]
                }],
                singleRun: true,
                reporters: ['dots'],
                browsers: ['PhantomJS']
            }
        }

    });

    grunt.registerTask('default', ['jshint', 'jsbeautifier', 'uglify:dist', 'karma:unit']);
};
