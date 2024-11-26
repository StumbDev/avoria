import gulp from 'gulp';
import sass from 'gulp-sass';
import cleanCSS from 'gulp-clean-css';
import uglify from 'gulp-uglify';
import concat from 'gulp-concat';
import rename from 'gulp-rename';
import sourcemaps from 'gulp-sourcemaps';
import ts from 'gulp-typescript';
import imagemin from 'gulp-imagemin';

// Paths
const paths = {
  scss: {
    src: './styles/**/*.scss',
    dest: './dist/css',
  },
  ts: {
    src: './src/**/*.ts',
    dest: './dist/js',
  },
  images: {
    src: './assets/images/**/*',
    dest: './dist/images',
  },
};

// Compile SCSS to CSS
function compileSCSS() {
  return gulp
    .src(paths.scss.src)
    .pipe(sourcemaps.init())
    .pipe(sass().on('error', sass.logError))
    .pipe(cleanCSS())
    .pipe(rename({ suffix: '.min' }))
    .pipe(sourcemaps.write('.'))
    .pipe(gulp.dest(paths.scss.dest));
}

// Compile and Bundle TypeScript
function compileTS() {
  const tsProject = ts.createProject('tsconfig.json');
  return gulp
    .src(paths.ts.src)
    .pipe(sourcemaps.init())
    .pipe(tsProject())
    .pipe(uglify())
    .pipe(rename({ suffix: '.min' }))
    .pipe(sourcemaps.write('.'))
    .pipe(gulp.dest(paths.ts.dest));
}

// Optimize Images
function optimizeImages() {
  return gulp
    .src(paths.images.src)
    .pipe(imagemin())
    .pipe(gulp.dest(paths.images.dest));
}

// Watch Files
function watchFiles() {
  gulp.watch(paths.scss.src, compileSCSS);
  gulp.watch(paths.ts.src, compileTS);
  gulp.watch(paths.images.src, optimizeImages);
}

// Define Tasks
const build = gulp.series(compileSCSS, compileTS, optimizeImages);
const watch = gulp.parallel(watchFiles);

// Export Tasks
export { compileSCSS, compileTS, optimizeImages, watch };
export default build;
