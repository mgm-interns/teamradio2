import { BaseComponent } from 'BaseComponent';
import { StationBrowserSlider } from 'Components';
import { Station } from 'Models';
import * as React from 'react';
import { Row } from 'reactstrap';
import { StationServices } from 'Services/Http';
import './StationBrowser.scss';
import { IStationBrowserItem, StationBrowserItem } from './StationBrowserItem';

interface IStationBrowserStates {
  listStation: IStationBrowserItem[];
  stationBrowser: string;
  stationItemContainer: string;
}

export class StationBrowser extends BaseComponent<{}, IStationBrowserStates> {
  private stationServices: StationServices;
  constructor(props: {}) {
    super(props);
    this.stationServices = new StationServices();
    this.state = {
      stationBrowser: 'station-browser',
      stationItemContainer: 'station-item-container',
      listStation: [],
    };
  }

  public componentWillMount() {
    this.getListStation();
  }

  public convertStationToIStationBrowserItem(
    item: Station,
  ): IStationBrowserItem {
    return {
      stationId: item.id,
      friendlyId: item.id,
      stationName: item.name,
      numberOfOnlineUsers: 0,
      picture: '',
    };
  }
  public getListStation() {
    this.stationServices.getListStation().subscribe(
      (res: Station[]) => {
        const listStation: IStationBrowserItem[] = res.map(
          this.convertStationToIStationBrowserItem,
        );
        this.setState({
          listStation,
        });
      },
      (err: string) => {
        this.showError(err);
      },
    );
  }

  public render() {
    if (this.state.listStation.length === 0) {
      return null;
    }
    return (
      <Row className="m-0 justify-content-center justify-content-center">
        <div className="col-xl-12 browser">
          <div className="cover-div">
            <StationBrowserSlider
              stationBrowser={this.state.stationBrowser}
              stationItemContainer={this.state.stationItemContainer}
            />
            <div
              className="m-auto extra-large-container list-station"
              id={this.state.stationBrowser}>
              <div
                className="station-item-container"
                id={this.state.stationItemContainer}>
                {this.state.listStation.map(
                  (item: IStationBrowserItem, index: number) => {
                    return <StationBrowserItem key={index} {...item} />;
                  },
                )}
              </div>
            </div>
          </div>
        </div>
      </Row>
    );
  }
}
