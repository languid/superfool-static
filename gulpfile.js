const gulp = require('gulp')
const fs = require('fs')
const ECT = require('ect')
const renderer = ECT({
  watch: true,
  root: './src/views',
  ext: '.html'
})
const views = ['index', 'detail', 'signin', 'upload']

gulp.task('html', () => {
  views.forEach(name => {
    renderer.render(name, {}, (err, html) => {
      if (!err) {
        fs.writeFile(`views/${name}.html`, html, err => {
          if (!err) {
            console.log(`${name} compiled`)
          }
        })
      }
    })
  })
})

gulp.task('default', () => {
  gulp.watch('src/views/*.html', ['html'])
})
