module.exports = function(grunt) {
	grunt.initConfig({
		env: {
			dev: {
				NODE_ENV: 'development'
			},
			test: {
				NODE_ENV: 'test'
			}
		},
		nodemon: {
			dev: {
				script: 'server.js',
				options: {
					ext: 'js,html',
					watch: ['server.js', 'config/**/*.js', 'app/**/*.js']
				}
			}
		},
		jshint: {
			all: {
				src: ['server.js', 'config/**/*.js', 'app/**/*.js', 'public/**/*.js', '!public/lib/**/*.js']
			}
		},
		csslint: {
			all: {
				src: ['public/**/*.css', '!public/lib/**/*.css']
			}
		},
	watch: {
		js: {
			files: ['server.js', 'config/**/*.js', 'app/**/*.js'],
			tasks: ['jshint']
		},
		css: {
			files: ['public/**/*.css','!public/lib/*'],
			tasks: ['csslint']
		}
	},
	concurrent: {
		dev: {
			tasks: ['nodemon', 'watch'],
			options: {
				logConcurrentOutput: true}
			}
		}
	});

	grunt.loadNpmTasks('grunt-env');
	grunt.loadNpmTasks('grunt-nodemon');
	grunt.loadNpmTasks('grunt-contrib-jshint');
	grunt.loadNpmTasks('grunt-contrib-csslint');
	grunt.loadNpmTasks('grunt-contrib-watch');
	grunt.loadNpmTasks('grunt-concurrent');


	grunt.registerTask('default', ['env:dev','lint','concurrent']);
	grunt.registerTask('lint', ['jshint', 'csslint']);
};