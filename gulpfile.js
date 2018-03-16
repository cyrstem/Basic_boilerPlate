//------------------------------------
// Setup and Varibles
//------------------------------------
var gulp = require('gulp');
	browserSync = require('browser-sync');
	reload =  browserSync.reload;
	plumber = require('gulp-plumber');
	sass = require('gulp-sass');
	bourbon = require('node-bourbon').includePaths;
	neat = require('node-neat').includePaths;
	refills = require('node-refills').includePaths;
	minify = require('gulp-clean-css');
	uglify = require('gulp-uglify');
	rename = require('gulp-rename');
	concat = require('gulp-concat');
	header = require('gulp-header');

//------------------------------------
//  sass to css + bourbon + neat
//------------------------------------
gulp.task('sass', function(){
	gulp.src('sass/*.scss')
		.pipe(sass({
			includePaths: bourbon,
			includePaths: neat,
			includePaths: refills
		}))
		.pipe(gulp.dest('app/css/'))
		.pipe(plumber())
		.pipe(reload({stream:true}));
});

//------------------------------------
// THREEJS mio 
//------------------------------------
gulp.task('scripts',function(){
	gulp.src(['js/app.js'])
		.pipe(plumber())
		//.pipe(uglify())
		//.pipe(rename({suffix:'.min'}))
		.pipe(header('/*Author: -cyrstem@gmail.com, Author URI: -onesimpleidea.xyz*/\n'))
		.pipe(gulp.dest('./app/js'))
		.pipe(reload({stream:true}));
});

//------------------------------------
// Browser-Sync and html change reload
//------------------------------------
gulp.task('browser-sync', function(){
	browserSync({
		server:{
			baseDir:"./app"
		}
	});
	 gulp.watch("app/*.html").on("change", browserSync.reload);

});


//------------------------------------
// Watch task
//------------------------------------
gulp.task('watch', function(){
	gulp.watch('sass/*.scss',['sass']);
	gulp.watch('js/*.js',['scripts']);
	gulp.watch('app/*.html');
});


//------------------------------------
// Third party libs
//------------------------------------ 
gulp.task('build', function(){
	gulp.src([
		'third-party/three.js/*.js',
		'third-party/jquery/dist/jquery.min.js'
		])
	.pipe(plumber())
	// .pipe(concat('app.js'))
	.pipe(gulp.dest('./app/third-party'));

	// return gulp.src('third-party/bootstrap/dist/css/bootstrap.min.css')
	// .pipe(gulp.dest('./app/css'));

});



//------------------------------------
// Main task
//------------------------------------
gulp.task('default',['browser-sync','sass','scripts','watch']);















