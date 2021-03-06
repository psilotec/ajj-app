import React, { Component } from 'react';
import { createContainer } from 'meteor/react-meteor-data';
import { Techniques } from '../../../imports/collections/techniques';
import { Link } from 'react-router';

class TechniqueList extends Component {

  // Method for rendering list of Techniques
  // Filters the techniques from the techniques collection against the state
  //  from BeltList and maps them
  renderTechniqueList() {
    let visibleBeltColor = this.props.visibleBelt;

    return this.props.techniques.filter(function(obj){
      return obj.techBelt === visibleBeltColor;
    }).map(technique => {
      const url = `/technique/${technique.techId}`;

      return (
        <div className="item" key={technique._id}>
          <Link to={url}>
            <div className="ui button large" key={technique._id}>
             {technique.techName}
            </div>
          </Link>
        </div>
      )
    })
  }

  render() {
    return (
      <div className="ui list techniquelist-flex">
          {this.renderTechniqueList()}
      </div>
    );
  }
}


// Techniques subscription to create list of techniques
export default createContainer(() => {
  Meteor.subscribe('techniques');

  return { techniques: Techniques.find({}).fetch() };
}, TechniqueList);
