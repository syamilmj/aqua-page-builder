/*!
 * Aqua Page Builder's Gruntfile
 * https://github.com/syamilmj/Aqua-Page-Builder
 */

module.exports = function (grunt) {

	'use strict';
  
	// Load all Grunt tasks
	require( 'load-grunt-tasks' )( grunt );

	// Project configuration.
	grunt.initConfig({

		pkg: grunt.file.readJSON('package.json'),

		makepot: {
			theme: {
				options: {
					cwd: '',
					potFilename: 'aqpb.pot',
					domainPath: '/languages',
					type: 'wp-plugin',
					exclude: [ 'node_modules/.*' ],
					processPot: function( pot, options ) {
						pot.headers['report-msgid-bugs-to'] = 'https://github.com/syamilmj/Aqua-Page-Builder/issues/new';
						pot.headers['plural-forms'] = 'nplurals=2; plural=n != 1;';
						pot.headers['last-translator'] = 'AQPB (https://github.com/syamilmj/Aqua-Page-Builder/)\n';
						pot.headers['language-team'] = 'AQPB (https://github.com/syamilmj/Aqua-Page-Builder/)\n';
						pot.headers['x-poedit-basepath'] = '..\n';
						pot.headers['x-poedit-language'] = 'English\n';
						pot.headers['x-poedit-country'] = 'UNITED STATES\n';
						pot.headers['x-poedit-sourcecharset'] = 'utf-8\n';
						pot.headers['x-poedit-searchpath-0'] = '.\n';
						pot.headers['x-poedit-keywordslist'] = '__;_e;__ngettext:1,2;_n:1,2;__ngettext_noop:1,2;_n_noop:1,2;_c;_nc:4c,1,2;_x:1,2c;_ex:1,2c;_nx:4c,1,2;_nx_noop:4c,1,2;\n';
						pot.headers['x-textdomain-support'] = 'yes\n';
						return pot;
					}
				}
			}
		},

		csscomb: {
	        style: {
				options: {
					config: 'csscomb.json'
				},
	            plugins: {
	                'assets/stylesheets/aqpb-view.css': ['assets/stylesheets/aqpb-view.css'],
	                'assets/stylesheets/aqpb.css': ['assets/stylesheets/aqpb.css'],
	                'assets/stylesheets/aqpb_blocks.css': ['assets/stylesheets/aqpb_blocks.css'],
	            },
	        }
		},

		cssmin: {

			style: {
				expand: true,
				cwd: 'assets/stylesheets/',
				src: ['*.css', '!*.min.css'],
				dest: 'assets/stylesheets/',
				ext: '.min.css'
			},

		},

		uglify: {

			options: {
				banner: '/*! <%= pkg.name %> <%= grunt.template.today("dd-mm-yyyy") %> */\n'
			},

			plugin: {
				files: {
					'assets/javascripts/aqpb-fields.min.js': 'assets/javascripts/aqpb-fields.js',
					'assets/javascripts/aqpb-view.min.js': 'assets/javascripts/aqpb-view.js',
					'assets/javascripts/aqpb.min.js': 'assets/javascripts/aqpb.js',
				}
			},
			
		},

		watch: {
			css: {
				files: [ 'assets/stylesheets/*.css', 'assets/javascripts/*.js' ],
				tasks: [ 'csscomb', 'cssmin', 'uglify' ]
			}
		},

		// Clean up build directory
		clean: {
			main: ['build/<%= pkg.name %>']
		},

		// Copy the theme into the build directory
		copy: {
			main: {
				src:  [
					'**',
					'!*.log',
					'!csscomb.json',
					'!node_modules/**',
					'!build/**',
					'!.git/**',
					'!Gruntfile.js',
					'!package.json',
					'!.gitignore',
					'!.gitmodules',
					'!.tx/**',
					'!**/Gruntfile.js',
					'!**/package.json',
					'!**/*~'
				],
				dest: 'build/<%= pkg.name %>/'
			}
		},

		// Replace text
		replace: {
			Version: {
				src: ['aqua-page-builder.php'],
				overwrite: true,
				replacements: [ {
					from: /^.*Version:.*$/m,
					to: ' * Version: <%= pkg.version %>'
				} ]
			}
		},

		// Compress build directory into <name>.zip and <name>.<version>.zip
		compress: {
			main: {
				options: {
					mode: 'zip',
					archive: './build/<%= pkg.name %>.v<%= pkg.version %>.zip'
				},
				expand: true,
				cwd: 'build/<%= pkg.name %>/',
				src: ['**/*'],
				dest: '<%= pkg.name %>/'
			}
		},

	});



	grunt.registerTask( 'grunt-contrib-clean' );
	grunt.registerTask( 'grunt-contrib-compress' );
	grunt.registerTask( 'grunt-contrib-copy' );
	grunt.loadNpmTasks( 'grunt-contrib-cssmin' );
	grunt.registerTask( 'grunt-contrib-uglify' );
	grunt.registerTask( 'grunt-contrib-watch' );
	grunt.registerTask( 'grunt-csscomb' );
	grunt.registerTask( 'grunt-text-replace' );
	grunt.registerTask( 'grunt-wp-i18n' );
	grunt.registerTask( 'load-grunt-tasks' );

	grunt.registerTask( 'css', [ 'csscomb', 'cssmin' ] );

	grunt.registerTask( 'build', [ 'clean', 'replace', 'copy', 'compress' ] );

};