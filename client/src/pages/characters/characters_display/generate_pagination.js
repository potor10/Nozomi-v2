import { Pagination } from "react-bootstrap"

const generatePagination = (page, total_pages, change_page) => {
  let pages = []

  if (page > 3) {
    pages.push((<Pagination.Item key={'start'} onClick={() => change_page(1)}>1</Pagination.Item>))
    pages.push((<Pagination.Item key={'seperator-1'} >...</Pagination.Item>))
  }

  let start = 0
  let end = 0
  if (page < 3) {
    start = 1
    end = Math.min(total_pages, 5)
  } else if (page > (total_pages - 2)) {
    start = Math.max(total_pages - 4, 1)
    end = total_pages
  } else {
    start = page-2
    end = page+2
  }

  for(let i = start; i <= end; i++) {
    pages.push((
      (page === i) ? 
        (<Pagination.Item key={i} activeLabel={''} active>{i}</Pagination.Item>) :
        (<Pagination.Item key={i} onClick={() => change_page(i)}>{i}</Pagination.Item>)
    ))
  }

  if (page < total_pages - 2) {
    pages.push((<Pagination.Item key={'seperator-2'}>...</Pagination.Item>))
    pages.push((
      <Pagination.Item key={'end'} onClick={() => change_page(total_pages)}>
        {total_pages}
      </Pagination.Item>
    ))
  }

  return pages
}

export default generatePagination