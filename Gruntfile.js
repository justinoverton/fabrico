module.exports = function (grunt) {
   
   require('load-grunt-tasks')(grunt);
   
   grunt.initConfig({
      babel: {
        options: {
            sourceMap: true,
            presets: ['es2015']
        },
        dist: {
            files: [{
                expand: true,
                cwd: 'modules',
                src: ['**/*.js'],
                dest: 'dist',
                ext: '.js'
            }]
        }
      },
      watch: {
         scripts: {
            files: ["./modules/**/*.js"],
            tasks: ["babel"]
         }
      }
   });
   
   grunt.loadNpmTasks("grunt-contrib-watch");
   grunt.registerTask("default", ["watch"]);
   grunt.registerTask("build", ["babel"]);
};