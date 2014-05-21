'use strict';

module.exports = function (grunt) {
  // Load grunt tasks automatically
  require('load-grunt-tasks')(grunt);

  // Time how long tasks take. Can help when optimizing build times
  require('time-grunt')(grunt);

  // Define the configuration for all the tasks
  grunt.initConfig({
    pkg: grunt.file.readJSON('package.json'),
    banner: '/*! <%= pkg.title || pkg.name %> - v<%= pkg.version %> - ' +
        '<%= grunt.template.today("yyyy/mm/dd") %> \n' +
        '<%= pkg.homepage ? "* " + pkg.homepage + "\\n" : "" %>' +
        '* Copyright (c) <%= grunt.template.today("yyyy") %> <%= pkg.author.name %> <%= pkg.author.url %>\n' +
        '*/\n\n',
    path: {
      assets: './assets',
      components: './assets/components',
      dist: './lib/public'
    },
    jade: {
      dev: {
        options: {
          data: {
            environment: 'development'
          },
          pretty: true
        },
        files: [
          {
            expand: true,
            cwd: '<%= path.assets %>/views',
            src: ['**/*.jade'],
            dest: '<%= path.dist %>',
            ext: '.html'
          }
        ]
      },
      prod: {
        options: {
          data: {
            environment: 'production'
          },
          pretty: false
        },
        files: [
          {
            expand: true,
            cwd: '<%= path.assets %>/views',
            src: ['**/*.jade'],
            dest: '<%= path.dist %>',
            ext: '.html'
          }
        ]
      }
    },
    stylus: {
      dev: {
        options: {
          paths: ['<%= path.components %>'],
          define: {
            DEBUG: true
          },
          use: [
            function () {
              return require('autoprefixer-stylus')('last 2 versions', 'ie 8', 'ie 9');
            }
          ],
          'include css': true
        },
        files: {
          '<%= path.dist %>/css/styles.css': '<%= path.assets %>/stylesheets/styles.styl'
        }
      },
      prod: {
        options: {
          compress: true,
          banner: '<%= banner %>',
          paths: ['<%= path.components %>'],
          use: [
            function () {
              return require('autoprefixer-stylus')('last 2 versions', 'ie 8', 'ie 9');
            },
            require('csso-stylus')
          ],
          'include css': true
        },
        files: {
          '<%= path.dist %>/css/styles.css': '<%= path.assets %>/stylesheets/styles.styl'
        }
      }
    },
    ngmin: {
      dist: {
        src: '<%= path.dist %>/js/scripts.js',
        dest: '<%= path.dist %>/js/scripts.js'
      }
    },
    concat: {
      scripts: {
        src: [
          '<%= path.components %>/underscore/underscore.js',

          // Angular
          '<%= path.components %>/angular/angular.js',
          '<%= path.components %>/angular-route/angular-route.js',
          '<%= path.components %>/restangular/dist/restangular.js',
          '<%= path.components %>/angular-local-storage/angular-local-storage.js',
          '<%= path.components %>/ngprogress-lite/ngprogress-lite.js',

          // App
          '<%= path.assets %>/javascripts/**/*.js'
        ],
        dest: '<%= path.dist %>/js/scripts.js'
      }
    },
    uglify: {
      options: {
        compress: {
          drop_console: true
        },
        mangle: false,
        preserveComments: false,
        banner: '<%= banner %>'
      },
      js: {
        src: '<%= path.dist %>/js/scripts.js',
        dest: '<%= path.dist %>/js/scripts.js'
      }
    },
    clean: {
      dist: '<%= path.dist %>/'
    },
    copy: {
      images: {
        expand: true,
        cwd: '<%= path.assets %>/images/',
        src: [
          '**/*.{ico,png,jpg,gif}',
          '!**/icons/*/*'
        ],
        dest: '<%= path.dist %>/img/'
      },
      fonts: {
        expand: true,
        cwd: '<%= path.components %>/entypo/font',
        src: '**/*.{eot,svg,ttf,woff}',
        dest: '<%= path.dist %>/fonts/'
      }
    },
    watch: {
      options: {
        livereload: true
      },
      gruntfile: {
        files: ['Gruntfile.js'],
        tasks: ['build:dev', 'default']
      },
      js: {
        files: '<%= path.assets %>/javascripts/{,**/}*.js',
        tasks: 'concat'
      },
      stylus: {
        files: '<%= path.assets %>/stylesheets/{,**/}*.styl',
        tasks: ['stylus:dev']
      },
      jade: {
        files: '<%= path.assets %>/views/{,**/}*.jade',
        tasks: ['jade:dev']
      }
    }
  });

  grunt.registerTask('default', [ 'build:prod' ]);

  grunt.registerTask('heroku', [ 'build:prod' ]);

  grunt.registerTask('build:dev', [
    'clean',
    'copy',
    'concat',
    'jade:dev',
    'stylus:dev'
  ]);

  grunt.registerTask('build:prod', [
    'clean',
    'copy',
    'concat',
    'ngmin',
    'uglify',
    'jade:prod',
    'stylus:prod'
  ]);
};