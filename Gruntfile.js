module.exports = function(grunt) {

  // Project configuration.
  grunt.initConfig({
    pkg: grunt.file.readJSON('package.json'),
    uglify: {
      options: {
        banner: '/*! <%= pkg.name %> <%= grunt.template.today("yyyy-mm-dd") %> */\n'
      },
      build: {
        files: {
          'dist/<%= pkg.name %>.js': 'src/<%= pkg.name %>.js',
          'dist/<%= pkg.name %>.Cluster.js': ['src/<%= pkg.name %>.js', 'src/<%= pkg.name %>.Cluster.js'],
          'dist/<%= pkg.name %>.Fancybox.js': ['src/<%= pkg.name %>.js', 'src/<%= pkg.name %>.Fancybox.js'],
          'dist/<%= pkg.name %>.Fancybox.Cluster.js': ['src/<%= pkg.name %>.js', 'src/<%= pkg.name %>.Fancybox.js', 'src/<%= pkg.name %>.Cluster.js'],          
        }
      }
    }
  });

  // Load the plugin that provides the "uglify" task.
  grunt.loadNpmTasks('grunt-contrib-uglify');

  // Default task(s).
  grunt.registerTask('default', ['uglify']);

};

