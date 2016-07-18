import React, { Component, PropTypes } from 'react';
import { connect } from 'react-redux';

import { deviceFormats, deviceFormatQueries, setupFormatListeners } from '../deviceFormat/utilities';
import { setDeviceFormat } from '../actions/index';


class Application extends Component {

  constructor(props) {
    super(props);
    // Store match media query listeners
    this.matchMediaQueries = setupFormatListeners(deviceFormatQueries, this.props.dispatch, setDeviceFormat);
  }


  renderComponents() {
    switch (this.props.deviceFormat) {
      case deviceFormats.xsmall:
        return (<p>{deviceFormats.xsmall}</p>);
      case deviceFormats.small:
        return (<p>{deviceFormats.small}</p>);
      case deviceFormats.medium:
        return (<p>{deviceFormats.medium}</p>);
      case deviceFormats.large:
        return (<p>{deviceFormats.large}</p>);
      case deviceFormats.xlarge:
        return (<p>{deviceFormats.xlarge}</p>);
      default:
        return (<p>No matching device formats</p>);
    }
  }

  render() {
    return (
      <section>
        <h1>Responsive Rendering of React Components</h1>
        {this.renderComponents()}
      </section>
    );
  }
}

if (__DEV__) {
  const propTypes = {
    deviceFormat: PropTypes.string,
  };
  Application.propTypes = propTypes;
}


function configureState(state) {
  return {
    deviceFormat: state.deviceFormat,
  };
}


export const Hello = connect(configureState)(Application);
