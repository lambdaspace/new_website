module.exports = function(grunt) {
    grunt.initConfig({
        pkg: grunt.file.readJSON('package.json'),
        watch: {
            scss: {
                files: ['src/scss/*.scss'],
                tasks: ['sass'],
                options: {
                    spawn: false,
                },
            },
            css: {
                files: ['src/css/*'],
                tasks: ['cssmin'],
                options: {
                    spawn: false,
                },
            },
            img: {
                files: ['src/**/*.{png,jpg,gif}'],
                tasks: ['imagemin'],
                options: {
                    spawn: false,
                },
            },
        },
        sass: {
            dist: {
                files: [{
                    expand: true,
                    cwd: 'src/scss/',
                    src: ['*.scss'],
                    dest: 'src/css/',
                    ext: '.css'
                }]
            }
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
                    dest: 'dist/img'
                }]
            }
        },
        concurrent: {
            dev: {
                tasks: ['watch:scss','watch:css', 'watch:img'],
                options: {
                    logConcurrentOutput: true
                }
            }
        }
    });

    grunt.loadNpmTasks('grunt-contrib-sass');
    grunt.loadNpmTasks('grunt-contrib-watch');
    grunt.loadNpmTasks('grunt-contrib-cssmin');
    grunt.loadNpmTasks('grunt-contrib-imagemin');
    grunt.loadNpmTasks('grunt-concurrent');
    grunt.registerTask('default', ['concurrent:dev']);
    grunt.registerTask('dist', ['sass:dist','cssmin:dist', 'imagemin:dist']);
};
