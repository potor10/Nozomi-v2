import styles from './star_level.module.css'

const StarLevel = ({ rarity, max_rarity, large=true }) => {
  let star_array = []
  let style = (large) ? styles.star_icon_large : styles.star_icon_small
  for (let i = 0; i < rarity; i++ ) {
    if (i === 6) {
      star_array.push((
        <img key={i} className={style} src='/images/assets/star_6.png'/>
      ))
    } else {
      star_array.push((
        <img key={i} className={style} src='/images/assets/star_on.png'/>
      ))
    }
  }
  for (let i = rarity; i < max_rarity; i++) {
    star_array.push((
      <img key={i} className={style} src='/images/assets/star_off.png'/>
    ))
  }
  return star_array
}

export default StarLevel