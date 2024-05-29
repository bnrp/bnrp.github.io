import React from 'react';
import ImageCard from './ImageCard.js';

class Home extends React.Component {


  componentDidMount() {
    console.log('Home - Success!');
  }

  render() {
    return (
      <div>
        <ImageCard scale={"50%"} />
      </div>
    );
  }
}

export default Home;
