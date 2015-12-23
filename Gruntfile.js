module.exports = function(grunt) {

  // Project configuration.
  grunt.initConfig({
    pkg: grunt.file.readJSON('package.json'),
    markdown: {
      all: {
        files: [
          {
            expand: true,
            flatten: true,
            src: 'md/*.md',
            dest: 'html/',
            ext: '.html'
          }
        ],
        options: {
          template: "index.html",
          markdownOptions: {
            highlight: 'none'
          }
        }
      }
    },
    jade: {
      compile: {
        options: {
          pretty: true,
          data: function(dest, src) {
            return require('./includes/locals.json');
          }
        },
        files: {
          "index.html": ["index.jade"]
        }
      }
    },
    uglify: {
      build: {
        src: ['js/libs/*.js', 'js/global.js'],
        dest: 'js/build/global.min.js'
      }
    },
    sass: {                              // Task
      dist: {                            // Target
        options: {                       // Target options
          style: 'expanded'
        },
        files: {                                      // Dictionary of files
          'css/global-unprefixed.css': 'scss/global.scss',       // 'destination': 'source'
        }
      }
    },
    postcss: {
      options: {
        map: true,
        processors: [
          require('autoprefixer')({browsers: ['last 1 version']})
        ]
      },
      dist: {
        src: "css/global-unprefixed.css",
        dest: "css/global.css"
      }
    },
    watch: {
      options: {
        livereload: true,
      },
      scripts: {
        files: ['js/*.js'],
        tasks: ['uglify'],
        options: {
          spawn: false,
        }
      },
      css: {
        files: ['scss/**/*.scss'],
        tasks: ['sass', 'postcss'],
        options: {
          spawn: false,
        }
      },
      jade: {
        files: ['index.jade', 'includes/**/*.jade', 'includes/**/*.json'],
        tasks: ['jade'],
        options: {
          span: false,
        }
      },
      files: {
        files: ['*.php','*.html'],
        options: {
          span: false,
        }
      }
    },
    serve: {
      options: {
        port: 9000
      }
    }
  });

  // Load the plugin that provides the "uglify" task.
  grunt.loadNpmTasks('grunt-contrib-uglify');
  grunt.loadNpmTasks('grunt-contrib-watch');
  grunt.loadNpmTasks('grunt-postcss');
  grunt.loadNpmTasks('grunt-contrib-sass');
  grunt.loadNpmTasks('grunt-serve');
  grunt.loadNpmTasks('grunt-markdown');
  grunt.loadNpmTasks('grunt-includes');
  grunt.loadNpmTasks('grunt-contrib-jade');


  // Default task(s).
  grunt.registerTask('default', ['jade', 'uglify', 'sass', 'postcss:dist', 'watch']);

};