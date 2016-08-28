module.exports = function (grunt) {
   grunt.initConfig({
      browserify: {
         dist: {
            options: {
               transform: [
                  ["babelify"]
               ],
               browserifyOptions: {
                  standalone: 'fabrico'
               }
            },
            files: {
               "./dist/fabrico.js": ["./modules/fabrico.js"]
            }
         },
         client: {
           src: ['./modules/fantasy.js'],
           dest: './dist/fantasy.js',
           options: {
             external: ['./fabrico'],
             transform: [
                  ["babelify"]
               ],
               browserifyOptions: {
                  standalone: 'fantasy'
               }
           }
         }
      },
      watch: {
         scripts: {
            files: ["./modules/*.js"],
            tasks: ["browserify"]
         }
      }
   });

   grunt.loadNpmTasks("grunt-browserify");
   grunt.loadNpmTasks("grunt-contrib-watch");

   grunt.registerTask("default", ["watch"]);
   grunt.registerTask("build", ["browserify"]);
};