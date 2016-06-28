var React = require('react');

var Footer = React.createClass({

  render : function () {

    return (
      <ul className="footer">
        <li>
          <a href="http://www.davidmcilroy.io">Portfolio</a>
        </li>
        <li>
          <a href="https://www.linkedin.com/in/mcilroydavid">LinkedIn</a>
        </li>
        <li>
          <a href="https://www.github.com/dmm9999">Github</a>
        </li>
      </ul>
    );

  }

});

module.exports = Footer;
