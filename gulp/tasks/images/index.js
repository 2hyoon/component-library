const { src, dest } = require('gulp');

function buildImages() {
  return src('./app/assets/img/**/*').pipe(dest('./dist/assets/img/'));
}

module.exports = {
  buildImages,
};