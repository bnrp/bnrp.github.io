import React from 'react';

class About extends React.Component {


  componentDidMount() {
    console.log('About - Success!');
  }

  render() {
    return (
      <div>
        recent biomedical engineering and mathematics graduate from The
        University of Texas at Austin. incoming student at Georgia Tech's OMSCS program.
        I enjoy using and solving problems with computers.

        In my free time, i enjoy playing guitar, birding, cooking, and playing
        video games.
      </div>
    );
  }
}

export default About;
