import React from 'react';
import Papa from 'papaparse';
import parse from 'html-react-parser';
import csvData from './data/lifelist.csv'
import csvDataLinks from './data/lifelistlinks.csv'

function csvGrabber(getCsvData) {
  fetch( csvData )
    .then(response => response.text())
    .then(responseText => {
      Papa.parse(responseText, {
          complete: function (results) {
              csvLinkGrabber(getCsvData, Object.entries(Array.from(results.data)));
          },
      })
    })
}

function csvLinkGrabber(getCsvData, data) {
  fetch( csvDataLinks )
    .then(response => response.text())
    .then(responseText => {
      Papa.parse(responseText, {
          complete: function (results) {
              getCsvData(data, Object.entries(Array.from(results.data)));
          },
      })
    })
}

class SpeciesInfo extends React.Component {

  render() {
    let info = <></>;

    if (this.props.show) {
      if (this.props.content !== "n") {
        info = <div className='species-info'>
                {parse(this.props.content)} <br></br>
               </div>;
      } else {
        info = <div className='species-info'>
                No photos... yet... <br></br>
               </div>;
      }

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
    infoID: "0",
    orderType: 0,
    dataReturn: {}
  }

  getCsvData = (data, link_data) => {
    const sort_data = data.sort(function(a,b) { return a[1][0] - b[1][0]; });
    const sort_link_data = link_data.sort(function(a,b) { return a[1][0] - b[1][0]; });
    var correct_data = [];
    var offset = 1;

    for (let i = 0; i < data.length; i++) {
      if (sort_data[i][1][2] === "slash" || sort_data[i][0] === "0" || sort_data[i][1][2] === "spuh" || sort_data[i][1][0] === "NaN" || i === 0 || sort_data[i][1][0] === "") {
        if (sort_data[i][0] !== 0 && i !== 0) {
          offset -= 1;
        }
      } else {
        const new_life_list_number = (parseInt(sort_data[i][1][0]) + offset).toString();
        sort_data[i][1][0] = new_life_list_number;
        sort_data[i][1].push(sort_link_data[i][1][1]);
        correct_data.push(sort_data[i]);
      }
    }

    //correct_data[0][1][0] = "";
    //correct_data.push(correct_data[0]);
    console.log(correct_data[0]);
    const total = correct_data.length;
    this.setState({totalCount: total});
    this.setState({data: correct_data.reverse()})
  }


  componentDidMount() {
    console.log('LifeList - Success!');
    csvGrabber(this.getCsvData);
  }

  showSpeciesInfo = (id) => {
    console.log(id);
    if (this.state.infoID !== id) {
      this.setState({infoID: id})
    } else {
      this.setState({infoID: "0"})
    }
  }

  reverseNumberOrder = () => {
    if (this.state.orderType === 0) {
      this.setState({orderType: 1});
      const reversed_data = this.state.data.reverse();
      this.setState({data: reversed_data});
    } else {
      this.setState({orderType: 0});
      const sorted_data = this.state.data.sort(function(a,b) { return a[1][0] - b[1][0]; });
      this.setState({data: sorted_data});
    }
  }

  reverseCommonOrder = () => {
    if (this.state.orderType === 2) {
      this.setState({orderType: 3});
      const reversed_data = this.state.data.reverse();
      this.setState({data: reversed_data});
    } else {
      this.setState({orderType: 2});
      const sorted_data = this.state.data.sort(function(a,b) {
        if (a[1][3] > b[1][3]) {
          return 1;
        }
        if  (a[1][3] < b[1][3]) {
          return -1;
        }
        return 0;
        });
      this.setState({data: sorted_data});
    }
  }

  reverseScientificOrder = () => {
    if (this.state.orderType === 4) {
      this.setState({orderType: 5});
      const reversed_data = this.state.data.reverse();
      this.setState({data: reversed_data});
    } else {
      this.setState({orderType: 4});
      const sorted_data = this.state.data.sort(function(a,b) {
        if (a[1][4] > b[1][4]) {
          return 1;
        }
        if  (a[1][4] < b[1][4]) {
          return -1;
        }
        return 0;
        });
      this.setState({data: sorted_data});
    }
  }

  reverseLocationOrder = () => {
    if (this.state.orderType === 6) {
      this.setState({orderType: 7});
      const reversed_data = this.state.data.reverse();
      this.setState({data: reversed_data});
    } else {
      this.setState({orderType: 6});
      const sorted_data = this.state.data.sort(function(a,b) {
        if (a[1][7] > b[1][7]) {
          return 1;
        }
        if  (a[1][7] < b[1][7]) {
          return -1;
        }
        return 0;
        });
      this.setState({data: sorted_data});
    }
  }

  render() {
    return (
      <div className='life-list-container'>
      <div className='life-list-description'>
      Here is a complete and exhaustive list of every first encounter with a unique bird
      species since I started keeping track in June 2023.
      If you are interested
      in seeing more, you can visit my <a href='https://ebird.org/profile/NDA0MTAwOA'>eBird</a> profile, which I update regularly.
      </div>

      <div className='life-list-total-count'>
        Total Count: {this.state.totalCount}
      </div>

      <br />
      <br />

      <div className='life-list-list-container'>

          <table className='life-list-table-header' id="0" onClick={() => this.showSpeciesInfo("0")}><tbody>
          <tr className='life-list-entry' id="0">
            <td className='row-number' onClick={() => this.reverseNumberOrder()}>#</td>
            <td className='common-name' onClick={() => this.reverseCommonOrder()}>Common Name</td>
            <td className='scientific-name' id="0" onClick={() => this.reverseScientificOrder()}>Scientific Name</td>
            <td className='state-seen' onClick={() => this.reverseLocationOrder()}>Location</td>
            <td className='date-seen' onClick={() => this.reverseNumberOrder()}>Date Seen</td>
          </tr>
          </tbody></table>

          {Object.entries(this.state.data).map((species) => {
            let containerObject =
            <>
            <table className='life-list-table' id={species[1][1][0].toString()} onClick={() => this.showSpeciesInfo(species[1][1][0].toString())}><tbody>
            <tr className='life-list-entry' id={species[1][1][0].toString()} >
              {/*<td>{species[0]}</td>*/}
              <td className='row-number'>{species[1][1][0]}</td>
              <td className='common-name'>{species[1][1][3]}</td>
              <td className='scientific-name' id={species[1][0].toString()}>{species[1][1][4]}</td>
              <td className='state-seen'>{species[1][1][7]}</td>
              <td className='date-seen'>{species[1][1][8]}</td>
            </tr>
            </tbody></table>
            <SpeciesInfo show={((species[1][1][0] - 1).toString() === (parseInt(this.state.infoID) - 1).toString() && this.state.infoID !== '0')} id={species[1][1][3]} content={species[1][1][13]} />
            </>;

            return (
              <>{containerObject}</>
          )})}
      </div>
      </div>
    );
  }
}

export default LifeList;
