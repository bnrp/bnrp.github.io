import React from 'react';
import About from './content/About.js';
import Contact from './content/Contact.js';
import Home from './content/Home.js';
import LifeList from './content/LifeList.js';

class Content extends React.Component {
  state = { contentType: this.props.contentType };

  whatContent = () => {

    if (this.state.contentType === 'Home') {
      this.content = <Home />;
    } else if (this.state.contentType === 'About') {
      this.content = <About />;
    } else if (this.state.contentType === 'Life List') {
      this.content = <LifeList />;
    } else if (this.state.contentType === 'Contact') {
      this.content = <Contact />;
    } else {
      console.log(this.state.contentType);
      this.content = <Home />;
    }

    return (
      <div>{this.content}</div>
    );
  }

  static getDerivedStateFromProps(props, state) {
    if (props.contentType !== state.contentType){
      return{
        contentType: props.contentType
      };
    }
    return null;
  }

  componentDidMount() {
    this.setState({contentType: this.props.contentType})
  }

  render() {
    return (
      <div className='content-container'>
        {this.whatContent()}
      </div>
    );
  }
}

export default Content;
