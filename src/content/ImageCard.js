import React from 'react';


class ImageCard extends React.Component {

  componentDidMount() {
    console.log('ImageCard - Success!');
  }

  render() {    

    return (
      <div> 
        <img className="image-card" style={{ width:this.props.scale, height:this.props.scale }} src={require('../img/gallery-img/BCTI.jpg')} alt="" />
      </div>
    );
  }
}

export default ImageCard;
