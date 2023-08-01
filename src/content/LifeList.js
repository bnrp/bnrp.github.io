import React from 'react';
import Papa from 'papaparse';
import csvData from './data/lifelist.csv'

function csvGrabber(getCsvData) {
  fetch( csvData )
    .then(response => response.text())
    .then(responseText => {
      Papa.parse(responseText, {
          complete: function (results) {
              const csvData = Array.from(results.data);
              const dataReturn = Object.entries(csvData);
              getCsvData(dataReturn, results.errors, results.meta);
          },
      })
    })
}

class SpeciesInfo extends React.componenet {

  render() {
    return (
      <div>
        {this.props.species}
      </div>
    );}
}

class LifeList extends React.Component {
  state = {
    data: {},
    errors: "",
    meta: "",
    showSpeciesInfo: false,
    infoID: "0"
  }

  getCsvData = (data, errors, meta) => {
    this.setState({data: data, errors: errors, meta: meta})
  }

  componentDidMount() {
    console.log('LifeList - Success!');
    csvGrabber(this.getCsvData);
  }

  showSpeciesInfo = (id) => {
    this.setState({infoID: id})
  }

  render() {
    return (
      <div>
        <table className='life-list-table'><tbody>
          {Object.entries(this.state.data).map((species) => {
            return (
              <tr className='life-list-entry' id={species[0].toString()} onClick={this.showSpeciesInfo(species[0].toString)}>
                <td>{species[0]}</td>
                <td className='row-number'>{species[1][1][0]}</td>
                <td className='common-name'>{species[1][1][3]}</td>
                <td className='scientific-name' id={species[0].toString()}>{species[1][1][4]}</td>
                <td className='state-seen'>{species[1][1][7]}</td>
                <td className='date-seen'>{species[1][1][8]}</td>
              </tr>
          )})}
        </tbody></table>
      </div>
    );
  }
}

export default LifeList;
