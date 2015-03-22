module.exports = function(grunt) {
grunt.loadNpmTasks('grunt-karma');

grunt.initConfig({
    
    karma: {
      unit: {
        configFile: 'karma.conf.js',
        singleRun: true,
        reporters: ['dots'],
        browsers: ['PhantomJS']
      }
    }

  });

grunt.registerTask('default', ['karma:unit']);
};