import React from 'react';

class About extends React.Component {


  componentDidMount() {
    console.log('About - Success!');
  }

  render() {
    return (
      <div className="about-container">
        recent biomedical engineering and mathematics graduate from The
        University of Texas at Austin. incoming student at Georgia Tech's OMSCS program.
        i enjoy using and solving problems with computers.

        in my free time, i enjoy playing guitar, birding, bird photography, cooking, and playing
        video games.
      </div>
    );
  }
}

export default About;
