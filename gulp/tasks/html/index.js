const { src, dest } = require('gulp');
const nunjucksRender = require('gulp-nunjucks-render');

const buildHtml = () => {
  return src('./app/src/templates/*.html')
    .pipe(nunjucksRender({
      path: ['./app/src/']
    }))
    .pipe(dest('./dist/'));
};

module.exports = {
  buildHtml,
};