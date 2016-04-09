'use stric';

var React = require('react');

var Cell = React.createClass({
  onClick: function(e) {
    this.props.toggleCell(e.target.id);
  },
  render: function() {
    var classes = 'cell ' + (this.props.isDead ? 'dead' : 'alive');

    var style = {
      left: this.props.x,
      top: this.props.y      
    };
    return (
      <div id={this.props.id} className={classes} style={style} onClick={this.onClick}>
      </div>
    );
  }
});

module.exports = {
  Cell: Cell
};
