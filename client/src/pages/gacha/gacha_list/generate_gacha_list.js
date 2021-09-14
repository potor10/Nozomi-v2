import { Nav } from 'react-bootstrap'

const generateGachaList = (component) => {
  let gachas = []
  let first_active = component.props.current_gachas[Object.keys(component.props.current_gachas)[0]].gacha_id

  for(const gacha_id in component.props.current_gachas) {
    // render the tab
    gachas.push((
      <Nav.Item>
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