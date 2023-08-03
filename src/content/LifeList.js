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

class SpeciesInfo extends React.Component {

  render() {
    let info;

    if (this.props.show) {
      info = <div className='species-info'>
              Species: {this.props.id} <br></br>
             </div>;
    } else {
      info = <></>;
    }

    return (
      <>{info}</>
    );}
}

class LifeList extends React.Component {
  state = {
    data: {},
    errors: "",
    meta: "",
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
    if (this.state.infoID !== id) {
      this.setState({infoID: id})
    } else {
      this.setState({infoID: "0"})
    }
  }

  render() {
    return (
      <div className='life-list-container'>
          {Object.entries(this.state.data).map((species) => {
            return (
              <>
              <table className='life-list-table' id={species[0].toString()} onClick={() => this.showSpeciesInfo(species[0].toString())}><tbody>
              <tr className='life-list-entry' id={species[0].toString()}>
                {/*<td>{species[0]}</td>*/}
                <td className='row-number'>{species[1][1][0]}</td>
                <td className='common-name'>{species[1][1][3]}</td>
                <td className='scientific-name' id={species[0].toString()}>{species[1][1][4]}</td>
                <td className='state-seen'>{species[1][1][7]}</td>
                <td className='date-seen'>{species[1][1][8]}</td>
              </tr>
              </tbody></table>
              <SpeciesInfo show={(species[0].toString() === this.state.infoID && this.state.infoID !== '0')} id={species[1][1][3]} />
              </>
          )})}
      </div>
    );
  }
}

export default LifeList;
