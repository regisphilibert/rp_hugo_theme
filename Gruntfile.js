// For performance reasons we're only matching one level down:
// 'test/spec/{,*/}*.js'
// If you want to recursively match all sub-folders, use:
// 'test/spec/**/*.js'

'use strict';

module.exports = function (grunt) {

  var autoprefixer = require('autoprefixer')({
      browsers: [
        'Chrome >= 35',
        'Firefox >= 31',
        'Edge >= 12',
        'Explorer >= 9',
        'iOS >= 8',
        'Safari >= 8',
        'Android 2.3',
        'Android >= 4',
        'Opera >= 12'
      ]
    }),
    cssnano = require('cssnano')();

  grunt.initConfig({

    //-----------------------------------------------------------------------------------------------IMPORT-package.json


    pkg: grunt.file.readJSON('package.json'),


    //-----------------------------------------------------------------------------------------------------CONFIG-OBJECT


    config: {
      src: {
        root: 'src',
        //fonts: '<%= config.src.root %>/fonts/{,*/}*.{woff,woff2,ttf,eot,svg}',
        //html: '<%= config.src.root %>/pug',
        images: '<%= config.src.root %>/images/',
        scripts: '<%= config.src.root %>/js/{,*/}*.js',
        styles: '<%= config.src.root %>/sass'
      },
      dist: {
        root: 'static',
        //fonts: '<%= config.dist.root %>/fonts',
        html: '../../production',
        //images: '<%= config.dist.root %>/img',
        scripts: '<%= config.dist.root %>/js',
        styles: '<%= config.dist.root %>/css',
        //assets: '<%= config.dist.root %>/assets'
      }
    },


    //--------------------------------------------------------------------------------------------------------CLEAN-DIST


    clean: {
      dist: ['<%= config.dist.root %>']
    },


    //---------------------------------------------------------------------------------------------------------SASS/SCSS

    // grunt-contrib-sass (need to be installed)
    sass: {
      dist: {
        options: {
          sourcemap: 'none',
          style: 'compact', // nested, compact, compressed, expanded
          quiet: true,
        },
        files: [{
          expand: true,
          cwd: '<%= config.src.styles %>',
          src: ['{,*!/}*.{scss,sass}'],
          dest: '<%= config.dist.styles %>',
          ext: '.css'
        }]
      }
    },

    concat: {
      basic: {
        cwd: '<%= config.src.root %>/js/',
        src: ['_plugins.js', '_rpFunctions.js', 'main.script.js'],
        dest: '<%= config.dist.scripts %>/main.script.js',
      }
    },
    //---------------------------------------------------------------------------------------------------------UGLIFY-JS


    uglify: {
      options: {
        sourceMap: true, 
        output : {
          comments: 'all'
        },
        hoist_funs:false
      },
      dist: {
        files: {
          '<%= config.dist.scripts %>/main.min.js': ['<%= config.src.root %>/js/_plugins.js', '<%= config.src.root %>/js/_rpFunctions.js', '<%= config.src.root %>/js/main.script.js'],
          '<%= config.dist.scripts %>/head.min.js' : ['<%= config.src.root %>/js/head.script.js']
        }
      }
    },

    //---------------------------------------------------------------------------------------------------------MODERNIZR


    modernizr: {
      dist: {
        crawl: false,
        customTests: [],
        // Avoid unnecessary builds
        cache: true,
        // Path to the build you're using for development.
        devFile: false,
        dest: '<%= config.dist.scripts %>/modernizr.js',
        options: [
          'domPrefixes',
          'prefixes',
          'prefixed',
          'testAllProps',
          'testProp',
          'testStyles',
          'html5shiv',
          'setClasses'
        ],
        uglify: true,
        tests: [
          'cssmask', 'flexbox', 'hashchange', 'history', 'touchevents'

          /*'applicationcache', 'audio', 'canvas', 'canvastext', 'geolocation', 'hashchange', 'history', 'indexeddb',
          'svg', 'touchevents', 'video', 'webgl', 'websockets', 'cssanimations', 'backgroundsize', 'bgsizecover',
          'boxshadow', 'csscolumns', 'ellipsis', 'cssfilters', 'flexbox', 'flexboxlegacy', 'flexboxtweener', 'flexwrap',
          'fontface', 'generatedcontent', 'cssgradients', 'hsla', 'multiplebgs', 'opacity', 'cssreflections',
          'cssremunit', 'rgba', 'textshadow', 'csstransforms', 'csstransforms3d', 'csstransitions', 'localstorage',
          'sessionstorage', 'websqldatabase', 'svgclippaths', 'svgfilters', 'inlinesvg', 'videoautoplay', 'webworkers'*/
        ]
      }
    },

    //--------------------------------------------------------------------------------------------------------------COPY

    copy: {
      main: {
        expand: true,
        cwd: '<%= config.src.root %>/assets',
        src: '**',
        dest: '<%= config.dist.root %>/',
      },
    },

    //-------------------------------------------------------------------------------------------------------------WATCH


    watch: {
      css: {
        files: '<%= config.src.styles %>/**/*.scss',
        tasks: ['sass:dist'],
        options: {
          spawn: false,
        },
      },
      js: {
        files: '<%= config.src.scripts %>',
        tasks: ['uglify'],
        options: {
          spawn: false,
        },
      },
    },

    //
    htmlmin: {                                     // Task 
      dist: {                                      // Target 
        options: {                                 // Target options 
          removeComments: true,
          collapseWhitespace: true
        },
        files: [{
          expand: true,
          cwd: '<%= config.dist.html %>',
          src: ['**/*.html', '*.html'],
          dest: '<%= config.dist.html %>'
        }]
      },
      stage: {                                      // Target 
        options: {                                 // Target options 
          removeComments: true,
          collapseWhitespace: true
        },
        files: [{
          expand: true,
          cwd: '../../staging',
          src: ['**/*.html', '*.html'],
          dest: '../../staging'
        }]
      }
    }
  });

  //------------------------------------------------------------------------------------------------------LOAD-NPM-TASKS


  // load npm tasks, these plugins provide necessary tasks.
  require('load-grunt-tasks')(grunt, {
    scope: 'devDependencies',
    pattern: ['grunt-*']
  });


  //------------------------------------------------------------------------------------------------------REGISTER-TASKS


  // Default taskg
  grunt.registerTask('default', [
    'sass:dist', 'uglify', 'modernizr', 'copy:main', 'watch'
  ]);
  // Stage task for stage environement
  grunt.registerTask('stage', [
    'sass:dist', 'uglify', 'modernizr', , 'copy:main'
  ]);
  grunt.registerTask('production', [
    'sass:dist', 'uglify', 'modernizr', , 'copy:main'
  ]);
  grunt.registerTask('html', [
    'htmlmin:dist'
  ]);
  grunt.registerTask('html_stage', [
    'htmlmin:stage'
  ]);
};