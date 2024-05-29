import React from 'react';
import './App.css';

import 'react-photo-view/dist/react-photo-view.css';

import Header from './Header.js';
import Content from './Content.js';

class ContentContainer extends React.Component {
  state = { content: 'home' }
  updateContent = (contentKey) => {
    this.setState({content:contentKey})
  }

  render() {
    return(
      <>
        <Header contentCallback={this.updateContent} currentContent={this.state.content} />
        <Content contentType={this.state.content} />
      </>
    );
  }
}

function App() {

  return (
    <><div className="App">
      <ContentContainer />
    </div></>
  );
}

export default App;
