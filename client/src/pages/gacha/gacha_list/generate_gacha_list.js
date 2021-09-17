import { Nav } from 'react-bootstrap'

const generateGachaList = (component) => {
  let gachas = []
  let first_active = component.props.current_gachas[Object.keys(component.props.current_gachas)[0]].gacha_id

  for(const gacha_id in component.props.current_gachas) {
    // Hide 1 Time Gacha Pull If Already Obtained
    if (component.props.current_gachas[gacha_id].type_id === 6 && 
      component.props.current_gachas[gacha_id].pull_available === false) {
      break
    }

    gachas.push((
      <Nav.Item key={"gacha"+gacha_id}>
        <Nav.Link onClick={() => { component.setState({ displayed_gacha_id: gacha_id }) }}
          eventKey={gacha_id}>{component.props.current_gachas[gacha_id].gacha_name}</Nav.Link>
      </Nav.Item>
    ))
  }

  return (
    <Nav variant="tabs" defaultActiveKey={first_active}>
      {gachas}
    </Nav>
  )
}

export default generateGachaList