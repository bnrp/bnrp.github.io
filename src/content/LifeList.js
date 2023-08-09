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
    let info = <></>;

    if (this.props.show) {
      info = <div className='species-info'>
              Species: {this.props.id} <br></br>
             </div>;
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
      <div className='life-list-description'>
      I have a life-long interest in birds and flight which has now manifested in birding (but
      previously in folding paper airplanes, RC planes, building quadcopters and tricopters, and flight simulators).
      Here is a complete and exhaustive list of every first encounter with a unique bird
      species since I started keeping track in June 2023.
      If you are interested
      in seeing more, you can visit my <a href='https://ebird.org/profile/NDA0MTAwOA'>eBird</a> profile, which I update regularly.
      </div>

      <div className='life-list-list-container'>

          <table className='life-list-table' id="0" onClick={() => this.showSpeciesInfo("0")}><tbody>
          <tr className='life-list-entry' id="0">
            <td className='row-number'>#</td>
            <td className='common-name'>Common Name</td>
            <td className='scientific-name' id="0">Scientific Name</td>
            <td className='state-seen'>Location</td>
            <td className='date-seen'>Date Seen</td>
          </tr>
          </tbody></table>

          {Object.entries(this.state.data).map((species) => {
            let containerObject =
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
            </>;

            if (species[1][1][2] === "slash" || species[0] === "0") {
              containerObject = <></>;
            }

            return (
              <>{containerObject}</>
          )})}
      </div>
      </div>
    );
  }
}

export default LifeList;
