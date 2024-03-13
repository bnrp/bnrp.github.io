import React from 'react';

class About extends React.Component {


  componentDidMount() {
    console.log('About - Success!');
  }

  render() {
    return (
      <div className="about-container">
        Current student at Georgia Tech's OMSCS program with a specialization in machine learning. Recent biomedical engineering and mathematics graduate from The
        University of Texas at Austin.
        <br />
        i enjoy using computers to solve problems.
        <br />
        in my free time, i enjoy playing guitar, birding, bird photography, cooking, and playing
        video games.
      </div>
    );
  }
}

export default About;
