module.exports = function(grunt) {
  grunt.initConfig({
    pkg: grunt.file.readJSON('package.json')
  , stylus: {
      compile: {
        options: {
          paths: ['bower_components/']
        , "include css": true
        },
        files: {
          "./dist/css/app.css": "./css/app.styl"
        }
      }
    }

  , ozma: {
      app: {
        src: "./js/setup.js"
      , saveConfig: false
      , config: {
          baseUrl: "./bower_components/"
        , distUrl: "./dist/js/"
        , loader: "../bower_components/ozjs/oz.js"
        , disableAutoSuffix: true
        }
      , slient: false
      , jam: false
      }
    },

    watch: {
      grunt: { files: ['Gruntfile.js'] }

    , ozma: {
        files: ["./js/**/*.js"]
      , tasks: ["ozma:app"]
      }

    , stylus: {
        files: ['./css/**/*.styl']
      , tasks: ['stylus']
      }
    }
  })

  grunt.loadNpmTasks('grunt-ozjs')
  grunt.loadNpmTasks('grunt-contrib-stylus')
  grunt.loadNpmTasks('grunt-contrib-watch')

  grunt.registerTask('build', ['stylus', 'ozma:app'])
  grunt.registerTask('default', ['build', 'watch'])
}
