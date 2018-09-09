module.exports = function(grunt) {
    grunt.initConfig({
        watch: {
            jade: {
                files: ['views/**'],
                options: {
                    livereload: true
                }
            },
            js: {
                files: ['publish/js/**', 'models/**/*.js', 'schemas/**/*.js'],
                // tasks:['jshint'],
                option: {
                    livereload: true
                }
            }
        },
        nodemon: {
            dev: {
                options: {
                    file: 'app.js',
                    args: [],
                    ingnoredFiles: ['README.md', 'node_modules/**'],
                    watchedExtensions: ['js'],
                    watchedFolders: ['./'],
                    debug: true,
                    delayTime: 1,
                    env: {
                        PORT: 3000
                    },
                    cwd: __dirname

                }
            }
        },
        concurrent: {
            tasks: ['nodemon', 'watch'],
            options: {
                logConcurrentOutput: true
            }
        }
    })
    //
    grunt.loadNpmTasks('grunt-contrib-watch');
    // 监听app.js,自动重启
    grunt.loadNpmTasks('grunt-nodemon');
    //
    grunt.loadNpmTasks('grunt-concurrent');
    grunt.option('force', true)
    grunt.registerTask('default', ['concurrent'])
}