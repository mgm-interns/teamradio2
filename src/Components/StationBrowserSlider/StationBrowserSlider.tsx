import * as React from 'react';
import { Component } from 'react';
import './StationBrowserSlider.scss';

interface IStationBrowserSliderProps {
  stationItemContainer: HTMLElement;
}

interface IStationBrowserSliderStates {}

export class StationBrowserSlider extends Component<
  IStationBrowserSliderProps,
  IStationBrowserSliderStates
> {
  constructor(props: IStationBrowserSliderProps) {
    super(props);
  }

  public scrollRight = () => {
    this.scroll(this.getCurrentScrollValue() + this.getNextScrollingValue());
  };

  public scrollLeft = () => {
    this.scroll(this.getCurrentScrollValue() - this.getNextScrollingValue());
  };

  public render() {
    return (
      <div className="station-browser-slider">
        <nav className="nav-circle">
          <a className="prev" onClick={this.scrollLeft}>
            <span className="icon-wrap" />
          </a>
          <a className="next" onClick={this.scrollRight}>
            <span className="icon-wrap" />
          </a>
        </nav>
      </div>
    );
  }
  private scroll = (to: number) => {
    const { stationItemContainer } = this.props;

    stationItemContainer.scroll({
      left: to,
    });
  };

  private getCurrentScrollValue = () => {
    return this.props.stationItemContainer.scrollLeft;
  };

  private getNextScrollingValue = () => {
    return this.props.stationItemContainer.clientWidth;
  };
}
