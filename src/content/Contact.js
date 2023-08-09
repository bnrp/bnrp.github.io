import React from 'react';

class Contact extends React.Component {

  componentDidMount() {
    console.log('Contact - Success!');
  }

  render() {
    return (
      <div className="contact-container">
        you can find me here:
        <dl>
          <dt>GitHub:</dt>
          <dd><a href='http://github.com/bnrp'>bnrp</a></dd>
          <dt>LinkedIn:</dt>
          <dd><a href='https://www.linkedin.com/in/benjamin-r-b85375119'>Ben Rippley</a></dd>
        </dl>
      </div>
    );
  }
}

export default Contact;
