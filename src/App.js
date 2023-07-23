import React from 'react';
import './App.css';
import Header from './Header.js';

class ContentContainer extends React.Component {
  state = { content: "home" }
  updateContent = (contentKey) => {
    this.setState({content:contentKey})
  }

  render() {
    return(
      <div>
        <Header contentCallback={this.updateContent} currentContent={this.state.content} />
        <p>{this.state.content}</p>
      </div>
    );
  }
}

function App() {


  return (
    <div className="App">
      <ContentContainer />
    </div>
  );
}

export default App;
