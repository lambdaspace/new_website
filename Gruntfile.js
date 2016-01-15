module.exports = function(grunt) {
  grunt.initConfig({
    pkg: grunt.file.readJSON('package.json'),
    watch: {
      css: {
        files: ['**/*.css'],
        tasks: ['cssmin'],
        options: {
          spawn: false,
        },
      },
    },
    cssmin: {
      dist: {
        files: {
          'dist/css/style.min.css': ['src/css/**/*.css']
        }
      }
    },
    imagemin: {
      dist: {
        options: {
          optimizationLevel: 5
        },
        files: [{
          expand: true,
          cwd: 'src/img',
          src: ['**/*.{png,jpg,gif}'],
          dest: 'dist/images'
        }]
      }
    },
  });

  grunt.loadNpmTasks('grunt-contrib-watch');
  grunt.loadNpmTasks('grunt-contrib-cssmin');
  grunt.loadNpmTasks('grunt-contrib-imagemin');
  grunt.registerTask('default', ['cssmin:dist', 'watch']);
  grunt.registerTask('dist', ['cssmin:dist', 'imagemin:dist']);
};
