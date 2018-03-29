import * as React from 'react';
import { Component } from 'react';
import * as classNames from 'classnames';
import { Row, Col, Container, Button } from 'reactstrap';
import './Station.scss';

import { NowPlaying, StationSharing } from '../../Modules/Station/Components';

const buttonActions = {
  muted: {
    iconOn: 'fa fa-volume-up',
    iconOff: 'fa fa-volume-off',
  },
  passive: {
    iconOn: 'fa fa-lightbulb-o',
    iconOff: 'fa fa-lightbulb-o',
  },
};

interface Props {}

interface State {
  muted: boolean;
  isPassive: boolean;
}

export class Station extends Component<Props, State> {
  constructor(props: Props) {
    super(props);

    this.state = {
      muted: false,
      isPassive: false,
    };
  }

  _onVolumeClick = () => {
    this.setState({
      muted: !this.state.muted,
    });
  };

  _onLightClick = () => {
    this.setState({
      isPassive: !this.state.isPassive,
    });
  };

  _renderButton = (
    flag: boolean,
    { iconOn, iconOff }: any,
    handleClick: any,
  ) => {
    const classes = {
      icon: classNames(flag ? iconOn : iconOff),
    };
    const activeButton = flag ? 'color: red' : null;

    return (
      <div className="icon-wrapper" onClick={handleClick}>
        <i className={classNames([classes.icon, activeButton, 'icon'])} />
      </div>
    );
  };

  _renderHeaderStation = (muted: boolean, isPassive: boolean) => {
    return (
      <Row className="header-container">
        <div>
          <h1>Station name</h1>
        </div>
        <div className="buttons-wrapper">
          {this._renderButton(!muted, buttonActions.muted, this._onVolumeClick)}
          {this._renderButton(
            isPassive,
            buttonActions.passive,
            this._onLightClick,
          )}
          <StationSharing />
        </div>
      </Row>
    );
  };

  render() {
    const muted = this.state.muted;
    const isPassive = this.state.isPassive;

    return (
      <Container>
        <Row className="u-margin-top-medium">
          <Col xs={12} lg={8}>
            {this._renderHeaderStation(muted, isPassive)}
            <NowPlaying muted={muted} />
          </Col>
          <Col xs={12} lg={4}>
            <div>
              <span>this is playlist</span>
            </div>
          </Col>
        </Row>
      </Container>
    );
  }
}