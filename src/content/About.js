import React from 'react';

class About extends React.Component {


  componentDidMount() {
    console.log('About - Success!');
  }

  render() {
    return (
      <div className="about-container">
        I am currently a student at Georgia Tech's OMSCS program with a specialization in machine learning. I also graduated with biomedical engineering and mathematics degrees from The
        University of Texas at Austin in December 2022. I enjoy using computers to solve problems and I hope to one day make a career out of that enjoyment. 
        <br />
        <br />
        In my free time, I enjoy playing guitar, birding, bird photography, cooking, and playing
        video games. My primary hobby however, is bird photography. My life list and gallery have some of my favorite images in them.
      </div>
    );
  }
}

export default About;
