import { Station as StationModel } from 'Models/Station';
import { AddSong, StationBrowser } from 'Modules/Station';
import {
  NowPlaying,
  PlaylistTabs,
  StationHeader,
} from 'Modules/Station';
import * as React from 'react';
import { Component } from 'react';
import { RouteComponentProps } from 'react-router-dom';
import { Col, Row } from 'reactstrap';
import './Station.scss';

interface IProps {} // tslint:disable-line

interface IState {
  muted: boolean;
  isPassive: boolean;
  station: StationModel;
}

export class Station extends Component<
  IProps & RouteComponentProps<any>,
  IState
> {
  constructor(props: IProps & RouteComponentProps<any>) {
    super(props);

    this.state = {
      muted: false,
      isPassive: false,
      station: null,
    };
  }

  public onVolumeClick = () => {
    this.setState({
      muted: !this.state.muted,
    });
  };

  public onLightClick = () => {
    this.setState({
      isPassive: !this.state.isPassive,
    });
  };

  public render() {
    const { muted, isPassive } = this.state;
    const stationId = this.parseStationId();

    return (
      <Row className="m-0 station-container">
        <Col xs={12} className="station-browser-container">
          <StationBrowser />
        </Col>
        <Col className="p-0 m-auto extra-large-container">
          <Row className="m-0">
            <Col xs={12} xl={8} className="mt-3 pr-xl-0 player-container">
              <StationHeader
                muted={muted}
                isPassive={isPassive}
                onVolumeClick={this.onVolumeClick}
                onLightClick={this.onLightClick}
                stationId={stationId}
              />
              <NowPlaying muted={muted} />
            </Col>
            <Col xs={12} xl={4} className="mt-3">
              <div className="playlist-tabs-container">
                <PlaylistTabs />
              </div>
            </Col>
            <Col xs={12}>
              <div className="add-song-container">
                <h1>Add Song</h1>
                <AddSong stationId={stationId} />
              </div>
            </Col>
            {/*<Col xs={12} >*/}
            {/*<div className="chat-box-container">*/}
            {/*<h1>Chat Box</h1>*/}
            {/*<ChatBox />*/}
            {/*</div>*/}
            {/*</Col>*/}
          </Row>
        </Col>
      </Row>
    );
  }

  private parseStationId() {
    const { match } = this.props;

    return match.params.stationId;
  }
}
