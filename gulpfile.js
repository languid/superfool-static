const gulp = require('gulp')
const fs = require('fs')
const ECT = require('ect')
const renderer = ECT({
  watch: true,
  root: './src/views',
  ext: '.html'
})
const views = ['index', 'detail', 'signin']

gulp.task('html', () => {
  views.forEach(name => {
    renderer.render(name, {}, (err, html) => {
      if (!err) {
        fs.writeFile(`${name}.html`, html, err => {
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
