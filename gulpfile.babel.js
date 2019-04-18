import fs from 'fs';
import path from 'path';

import gulp from 'gulp';
// import gulpsass from 'gulp-sass';
// import sourcemaps from 'gulp-sourcemaps';
// Load all gulp plugins automatically
// and attach them to the `plugins` object
import plugins from 'gulp-load-plugins';
import browserSync from 'browser-sync';

// Temporary solution until gulp 4
// https://github.com/gulpjs/gulp/issues/355
import runSequence from 'run-sequence';

import archiver from 'archiver';
import glob from 'glob';
import del from 'del';
import ssri from 'ssri';
import modernizr from 'modernizr';

import pkg from './package.json';
import modernizrConfig from './modernizr-config.json';


const dirs = pkg['h5bp-configs'].directories;

// ---------------------------------------------------------------------
// | Helper tasks                                                      |
// ---------------------------------------------------------------------

gulp.task('archive:create_archive_dir', () => {
  fs.mkdirSync(path.resolve(dirs.archive), '0755');
});

gulp.task('archive:zip', (done) => {

  const archiveName = path.resolve(dirs.archive, `${pkg.name}_v${pkg.version}.zip`);
  const zip = archiver('zip');
  const files = glob.sync('**/*.*', {
    'cwd': dirs.dist,
    'dot': true // include hidden files
  });
  const output = fs.createWriteStream(archiveName);

  zip.on('error', (error) => {
    done();
    throw error;
  });

  output.on('close', done);

  files.forEach((file) => {

    const filePath = path.resolve(dirs.dist, file);

    // `zip.bulk` does not maintain the file
    // permissions, so we need to add files individually
    zip.append(fs.createReadStream(filePath), {
      'name': file,
      'mode': fs.statSync(filePath).mode
    });

  });

  zip.pipe(output);
  zip.finalize();

});

gulp.task('clean', (done) => {
  del([
    dirs.archive,
    dirs.dist
  ]).then(() => {
    done();
  });
});


// gulp.task('copy:.htaccess', () =>
//   gulp.src('node_modules/apache-server-configs/dist/.htaccess')
//     .pipe(plugins().replace(/# ErrorDocument/g, 'ErrorDocument'))
//     .pipe(gulp.dest(dirs.dist))
// );

gulp.task('sass', () =>
  gulp.src('src/css/layout.scss')
    .pipe(plugins().sourcemaps.init())
    .pipe(plugins().sass().on('error', plugins().sass.logError))
    // .pipe(plugins().cleanCss())
    // .pipe(plugins().sass().on('error', plugins().sass().logError))
    // .pipe( plugins().sourcemaps.write( 'maps'))
    .pipe(gulp.dest('src/css/'))
);

gulp.task('minijs', () =>
  gulp.src('src/js/main.js')
    .pipe(plugins().sourcemaps.init())
    // .pipe(plugins().sass().on('error', plugins().sass.logError))
    // .pipe(plugins().uglify())
    // .pipe(plugins().sass().on('error', plugins().sass().logError))
    // .pipe( plugins().sourcemaps.write( 'maps'))
    .pipe(gulp.dest('dist/js/'))
);

// html 整合
gulp.task('include', function () {
  // gulp.src('src/index.ejs')
  //   .pipe(plugins().fileInclude())
  //   .pipe(plugins().rename(function(path){
  //     path.basename ='index1';
  //     path.extname = '.html';
  //
  //   }))
  //   .pipe(gulp.dest('src/'));

  // gulp.src('src/admin/kechengbianji.ejs')
  //   .pipe(plugins().fileInclude())
  //   .pipe(plugins().rename(function(path){
  //     path.basename ='kechengbianji';
  //     path.extname = '.html';
  //
  //   }))
  //   .pipe(gulp.dest('src/admin/'));


  gulp.src('./src/admin/*.ejs')
    .pipe(plugins().fileInclude())
    .pipe(plugins().rename(function(path){
      path.extname = '.html';

    }))
    .pipe(gulp.dest('./src/admin/'));



  return gulp.src('./src/*.ejs')
    .pipe(plugins().fileInclude())
    .pipe(plugins().rename(function(path){
      path.extname = '.html';

    }))
    .pipe(gulp.dest('./src/'));

  //
  // gulp.src('src/kechengliebiao.ejs')
  //   .pipe(plugins().fileInclude())
  //   .pipe(plugins().rename(function(path){
  //     path.basename ='kechengliebiao';
  //     path.extname = '.html';
  //
  //   }))
  //   .pipe(gulp.dest('src/'));
  //
  // gulp.src('src/kechengxiangqing.ejs')
  //   .pipe(plugins().fileInclude())
  //   .pipe(plugins().rename(function(path){
  //     path.basename ='kechengxiangqing';
  //     path.extname = '.html';
  //
  //   }))
  //   .pipe(gulp.dest('src/'));
  //
  // gulp.src('src/huodongxiangqing.ejs')
  //   .pipe(plugins().fileInclude())
  //   .pipe(plugins().rename(function(path){
  //     path.basename ='huodongxiangqing';
  //     path.extname = '.html';
  //
  //   }))
  //   .pipe(gulp.dest('src/'));
  // gulp.src('src/kechengshouye.ejs')
  //   .pipe(plugins().fileInclude())
  //   .pipe(plugins().rename(function(path){
  //     path.basename ='kechengshouye';
  //     path.extname = '.html';
  //
  //   }))
  //   .pipe(gulp.dest('src/'));
  //
  // gulp.src('src/admin/kechengguanli.ejs')
  //   .pipe(plugins().fileInclude())
  //   .pipe(plugins().rename(function(path){
  //     path.basename ='kechengguanli';
  //     path.extname = '.html';
  //
  //   }))
  //   .pipe(gulp.dest('src/admin/'));
  //
  // gulp.src('src/admin/kechengbianji.ejs')
  //   .pipe(plugins().fileInclude())
  //   .pipe(plugins().rename(function(path){
  //     path.basename ='kechengbianji';
  //     path.extname = '.html';
  //
  //   }))
  //   .pipe(gulp.dest('src/admin/'));
  //
  // gulp.src('src/admin/yuangongxiangqing.ejs')
  //   .pipe(plugins().fileInclude())
  //   .pipe(plugins().rename(function(path){
  //     path.basename ='yuangongxiangqing';
  //     path.extname = '.html';
  //
  //   }))
  //   .pipe(gulp.dest('src/admin/'));
  //
  // gulp.src('src/admin/xinjianqiandao.ejs')
  //   .pipe(plugins().fileInclude())
  //   .pipe(plugins().rename(function(path){
  //     path.basename ='xinjianqiandao';
  //     path.extname = '.html';
  //
  //   }))
  //   .pipe(gulp.dest('src/admin/'));
  //
  // gulp.src('src/admin/qiandaoguanli.ejs')
  //   .pipe(plugins().fileInclude())
  //   .pipe(plugins().rename(function(path){
  //     path.basename ='qiandaoguanli';
  //     path.extname = '.html';
  //
  //   }))
  //   .pipe(gulp.dest('src/admin/'));
  //
  // gulp.src('src/admin/qiandaojilu.ejs')
  //   .pipe(plugins().fileInclude())
  //   .pipe(plugins().rename(function(path){
  //     path.basename ='qiandaojilu';
  //     path.extname = '.html';
  //
  //   }))
  //   .pipe(gulp.dest('src/admin/'));
  //
  // gulp.src('src/admin/yuangongguanli.ejs')
  //   .pipe(plugins().fileInclude())
  //   .pipe(plugins().rename(function(path){
  //     path.basename ='yuangongguanli';
  //     path.extname = '.html';
  //
  //   }))
  //   .pipe(gulp.dest('src/admin/'));
  //
  //
  // gulp.src('src/admin/dianbojilu.ejs')
  //   .pipe(plugins().fileInclude())
  //   .pipe(plugins().rename(function(path){
  //     path.basename ='dianbojilu';
  //     path.extname = '.html';
  //
  //   }))
  //   .pipe(gulp.dest('src/admin/'));
  //
  // return gulp.src('src/admin/zhibojilu.ejs')
  //   .pipe(plugins().fileInclude())
  //   .pipe(plugins().rename(function(path){
  //     path.basename ='zhibojilu';
  //     path.extname = '.html';
  //
  //   }))
  //   .pipe(gulp.dest('src/admin/'));
  //


});

gulp.task('delhtml', function () {

  // del('src/kechengguanli.html');
  // del('src/kechengbianji.html');
  // del('src/yuangongxiangqing.html');
  // del('src/xinjianqiandao.html');
  // del('src/qiandaoguanli.html');
  // del('src/zhibojilu.html');

});


// gulp.task('sass', function () {
//   return gulp.src('src/css/layout.scss')
//     .pipe(sourcemaps.init())
//     // .pipe(gulpsass().on('error', gulpsass.logError))
//     // .pipe(sourcemaps.write())
//     .pipe(plugins().sass().on('error', plugins().sass().logError))
//     // .pipe( gulpsass({outputStyle: 'compressed'}) )
//     .pipe( sourcemaps.write( 'maps' ) ) //生成sourcemap文件，路径为./maps
//     .pipe(gulp.dest('dist/css/'));
// });

gulp.task('test', [
  'include',
  'copy:html'

]);

gulp.task('copy', [
  // 'copy:.htaccess',
  'copy:html',
  'copy:jquery',
  // 'copy:license',
  'copy:main.css',
  'copy:misc',
  'copy:normalize'
]);

gulp.task('copy:.htaccess', () =>
  gulp.src('node_modules/apache-server-configs/dist/.htaccess')
    .pipe(plugins().replace(/# ErrorDocument/g, 'ErrorDocument'))
    .pipe(gulp.dest(dirs.dist))
);

gulp.task('copy:html',['include'], () => {
  const hash = ssri.fromData(
    fs.readFileSync('node_modules/jquery/dist/jquery.min.js'),
    {algorithms: ['sha256']}
  );
  let version = pkg.devDependencies.jquery;
  let modernizrVersion = pkg.devDependencies.modernizr;

  return gulp.src([`${dirs.src}/**/*.html`,`!${dirs.src}/**/header.html`,`!${dirs.src}/**/footer.html`])
    .pipe(plugins().replace(/{{JQUERY_VERSION}}/g, version))
    .pipe(plugins().replace(/{{MODERNIZR_VERSION}}/g, modernizrVersion))
    .pipe(plugins().replace(/{{JQUERY_SRI_HASH}}/g, hash.toString()))
    .pipe(gulp.dest(`${dirs.src}/`));

});

gulp.task('copy:jquery', () =>
  gulp.src(['node_modules/jquery/dist/jquery.min.js'])
    .pipe(plugins().rename(`jquery-${pkg.devDependencies.jquery}.min.js`))
    .pipe(gulp.dest(`${dirs.src}/js/vendor`))
);

gulp.task('copy:license', () =>
  gulp.src('LICENSE.txt')
    .pipe(gulp.dest(dirs.dist))
);

gulp.task('copy:main.css', () => {

  const banner = `/*! HTML5 Boilerplate v${pkg.version} | ${pkg.license} License | ${pkg.homepage} */\n\n`;

  gulp.src(`${dirs.src}/css/main.css`)
    .pipe(plugins().header(banner))
    .pipe(plugins().autoprefixer({
      browsers: ['last 2 versions', 'ie >= 9', '> 1%'],
      cascade: false
    }))
    .pipe(gulp.dest(`${dirs.src}/css`));
});

gulp.task('copy:misc', ['copy:html'],function () {
  gulp.src([
    // Copy all files
    // `${dirs.src}/**/*`,
    // Exclude the following files
    // (other tasks will handle the copying of these files)
    // `${dirs.src}/css/maps/*.*`,
    `${dirs.src}/css/*.css`
  ], {
    // Include hidden files by default
    dot: true
  }).pipe(gulp.dest(`${dirs.dist}/css`));

  gulp.src([
    // Copy all files
    // `${dirs.src}/**/*`,
    // Exclude the following files
    // (other tasks will handle the copying of these files)
    `${dirs.src}/css/maps/*`
    // `${dirs.src}/css/*.css`
  ], {
    // Include hidden files by default
    dot: true
  }).pipe(gulp.dest(`${dirs.dist}/css/maps`));

  gulp.src([
    // Copy all files
    // `${dirs.src}/**/*`,
    // Exclude the following files
    // (other tasks will handle the copying of these files)
    // `!${dirs.src}/css/main.css`,
    // `${dirs.src}/js/*.js`,
    `${dirs.src}/js/**/*.js`
    // `${dirs.src}/js/**/*.js`
  ], {
    // Include hidden files by default
    dot: true
  }).pipe(gulp.dest(`${dirs.dist}/js`));



  gulp.src([
    // Copy all files
    // `${dirs.src}/**/*`,
    // Exclude the following files
    // (other tasks will handle the copying of these files)
    // `!${dirs.src}/css/main.css`,
    `${dirs.src}/img/*`
  ], {
    // Include hidden files by default
    dot: true
  }).pipe(gulp.dest(`${dirs.dist}/img`));

  gulp.src([`${dirs.src}/*.html`,`!${dirs.src}/header.html`,`!${dirs.src}/footer.html`])
    .pipe(gulp.dest(dirs.dist));

  gulp.src([`${dirs.src}/admin/*.html`,`!${dirs.src}/admin/header.html`,`!${dirs.src}/admin/footer.html`])
    .pipe(gulp.dest(`${dirs.dist}/admin/`));

});

gulp.task('copy:normalize', () =>
  gulp.src('node_modules/normalize.css/normalize.css')
    .pipe(gulp.dest(`${dirs.dist}/css`))
);

gulp.task('modernizr', (done) =>{

  modernizr.build(modernizrConfig, (code) => {
    fs.writeFile(`${dirs.dist}/js/vendor/modernizr-${pkg.devDependencies.modernizr}.min.js`, code, done);
  });

});

gulp.task('lint:js', () =>
  gulp.src([
    'gulpfile.js',
    `${dirs.src}/js/*.js`,
    `${dirs.test}/*.js`
  ]).pipe(plugins().jscs())
    .pipe(plugins().eslint())
    .pipe(plugins().eslint.failOnError())
);


// ---------------------------------------------------------------------
// | Main tasks                                                        |
// ---------------------------------------------------------------------

gulp.task('archive', (done) => {
  runSequence(
    'build',
    'archive:create_archive_dir',
    'archive:zip',
    done);
});

gulp.task('build', (done) => {
  runSequence(
    ['clean', 'lint:js'],'copy','sass','minijs', 'modernizr',
    done);
});

gulp.task('default', ['build']);

// gulp.task('watch',function(){
//   gulp.watch('./src/**/*.scss',['sass']);
//   gulp.watch('./src/**/*.ejs',['include']);
//   gulp.watch('./src/*.html').on('change', browserSync.reload);
// })


// 测试执行
gulp.task('run', () => {
  browserSync.init({      // 启动Browsersync服务
    server: {
      baseDir: './src',   // 启动服务的目录 默认 index.html
      index: 'list.html' // 自定义启动文件名
    },
    open: 'external',   // 决定Browsersync启动时自动打开的网址 external 表示 可外部打开 url, 可以在同一 wifi 下不同终端测试
    injectChanges: true // 注入CSS改变
  });

  // 监听文件变化，执行相应任务

  gulp.watch('./src/**/*.scss',['sass']);
  gulp.watch('./src/**/*.ejs',['include']);

  // gulp.watch('./app/styles/**/*.scss', ['sass']);
  // gulp.watch('./app/scripts/**/*.js', ['babel-js']);
  // gulp.watch('./app/imgs/**/*.{png,jpg,gif,ico}', ['move-img']);
  // gulp.watch('./app/_data/*.json', ['move-json']);
  gulp.watch('./src/**/*.html').on('change', browserSync.reload);
});
