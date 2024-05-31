import React from 'react';
import { PhotoProvider, PhotoView } from 'react-photo-view';

function importAll(r) {
  let images = {};
  r.keys().map(item => { images[item.replace('./', '')] = r(item); return r; });
  return images
}

class Gallery extends React.Component {



  componentDidMount() {
    console.log('Gallery - Success!');
  }

  

  render() {
    const images = importAll(require.context('../img/gallery-img', false));
    const thumbnails = importAll(require.context('../img/gallery-img/thumbnails', false));

    console.log(images);
    return (
      <div className="gallery-container">
        <div className="gallery-description">
          Here are some of my best photos or photos of some interesting species I've encountered over my time as a bird photographer. Click/tap on any image to load a higher quality version in which you can zoom in/out as desired.
        </div>
        <PhotoProvider>
          <div>
            {Object.entries(images).map(([item, index]) => (
                <PhotoView key={item} src={index} class="photo-view-object" bannerVisible={false} >
                  <img className="photo-view-item" src={thumbnails[item]} alt="" />
                </PhotoView>
            ))}
          </div>
        </PhotoProvider>
      </div>
    );
  }
}

export default Gallery
