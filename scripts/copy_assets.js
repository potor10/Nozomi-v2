const fse = require('fs-extra')
const path = require('path')

const start_dir_init = `priconne-cdn-extract/out/en`
const start_dir_end = `extract/latest`

const dest_dir = `client/public/images`

const sub_dir = ['banner', 'icon', 'unit']

sub_dir.forEach(dir => {
  fse.copySync(path.join(start_dir_init, dir, start_dir_end), path.join(dest_dir, dir), err => {
    if (err) console.error(err)
    else console.log('success')
  })
})