import React from 'react';
import avatar from './img/headshot.png';
import logo from './img/logo_brown.svg';
import './App.css';
class Header extends React.Component {

  contentChange = (contentKey) => {
    this.props.contentCallback(contentKey);
  }

  componentDidMount() {
    console.log("Mounted");
  }

  render() {
    return (
      <div className="header">
        <div className="header-img-container">
          <img className="avatar" src={avatar} alt="avatar" onClick={() => this.contentChange('Home')} />
          <img className="logo" src={logo} alt="logo" onClick={() => this.contentChange('Home')} />
        </div>
        <div className="header-text-container">
          <p className="header-text-item" onClick={() => this.contentChange('About')}>about</p>
          <p className="header-text-item" onClick={() => this.contentChange('Life List')}>life list</p>
          <p className="header-text-item" onClick={() => this.contentChange('Gallery')}>gallery</p>
          {/* <p className="header-text-item" onClick={() => this.contentChange('Resume')}>résumé</p>
          <p className="header-text-item" onClick={() => this.contentChange('Contact')}>contact</p> */}
        </div>
      </div>
    );
  }
}

export default Header;
