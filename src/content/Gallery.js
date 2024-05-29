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
    const images = importAll(require.context('../img/gallery-img', false))

    console.log(images);
    return (
      <div className="gallery-container">
        <PhotoProvider>
          <div>
            {Object.entries(images).map(([item, index]) => (
                <PhotoView key={item} src={index} class="photo-view-object" bannerVisible={false} >
                  <img className="photo-view-item" src={index} alt="" />
                </PhotoView>
            ))}
          </div>
        </PhotoProvider>
      </div>
    );
  }
}

export default Gallery
