import { Component } from "react";
import { Table } from "react-bootstrap";

import { STAT_NAMES, STAT_DISPLAY_NAMES } from '../../../../constants'

class InfoDisplay extends Component {
  constructor(props) {
    super(props)
  }

  createStatTable() {
    let stat_table = []

    for(let i = 0; i < STAT_NAMES.length; i += 2) {
      stat_table.push((
        <tr 
          key={i}>
          <td>
            {STAT_DISPLAY_NAMES[STAT_NAMES[i]]}
          </td>
          <td>
            {this.props.unit[STAT_NAMES[i]]}
          </td>
          {(i < STAT_NAMES.length) ? (
            <>
              <td>{STAT_DISPLAY_NAMES[STAT_NAMES[i+1]]}</td>
              <td>{this.props.unit[STAT_NAMES[i+1]]}</td>
            </>
          ) : ('')}
        </tr>
      ))
    }
    
    return stat_table
  }

  render() {
    return (
      <>
        <Table striped bordered hover variant="dark" className="text-center">
          <tbody>
            {this.createStatTable()}
          </tbody>
        </Table>
        <Table striped bordered hover variant="dark" className="text-center">
          <tbody>
            <tr>
              <td>
                Total Power
              </td>
              <td>
                {this.props.unit.total_power}
              </td>
            </tr>
          </tbody>
        </Table>
        <Table striped bordered hover variant="dark" className="text-center">
          <tbody>
            <tr>
              <td>Name</td>
              <td>{this.props.unit_profile_data.unit_name}</td>
              <td>Age</td>
              <td>{this.props.unit_profile_data.age}</td>
            </tr>
            <tr>
              <td>Guild</td>
              <td>{this.props.unit_profile_data.guild}</td>
              <td>Race</td>
              <td>{this.props.unit_profile_data.race}</td>
            </tr>
            <tr>
              <td>Height</td>
              <td>{this.props.unit_profile_data.height}</td>
              <td>Weight</td>
              <td>{this.props.unit_profile_data.weight}</td>
            </tr>
            <tr>
              <td>Birthday</td>
              <td>{this.props.unit_profile_data.birth_month}/{this.props.unit_profile_data.birth_day}</td>
              <td>Blood Type</td>
              <td>{this.props.unit_profile_data.blood_type}</td>
            </tr>
            <tr>
              <td>Hobby</td>
              <td>{this.props.unit_profile_data.favorite}</td>
              <td>Voice</td>
              <td>{this.props.unit_profile_data.voice}</td>
            </tr>
            <tr>
              <td colSpan={4}>{this.props.unit_profile_data.catch_copy}</td>
            </tr>
          </tbody>
        </Table>
      </>
    )
  }
}

export default InfoDisplay