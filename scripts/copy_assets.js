import fse from 'fs-extra'
import path from 'path'

const start_dir_init = `priconne-cdn-extract/out/en`
const start_dir_end = `extract/latest/`

const dest_dir = `client/public/images`

const sub_dir = ['banner', 'icon', 'unit']

sub_dir.forEach(dir => {
  const old_path = path.join(path.resolve(), start_dir_init, dir, start_dir_end)
  const new_path = path.join(path.resolve(), dest_dir, dir, '/')
  fse.copySync(old_path, new_path)
})