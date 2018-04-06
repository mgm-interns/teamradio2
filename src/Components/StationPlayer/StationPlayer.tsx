import * as React from 'react';
import { Component } from 'react';
import ReactPlayer from 'react-player';
import { Progress } from 'reactstrap';

import './StationPlayer.scss';

interface IProps {
  url: string;
  playing: boolean;
  seekTime?: number;
  receivedAt?: number;
  width?: string;
  height?: string;
  showProgressbar: boolean;
  muted: boolean;
  ref?: object;
}

interface IState {
  played: number;
  buffer: number;
  seekTime: number;
  receivedAt: number;
  isPaused: boolean;
}

export class StationPlayer extends Component<IProps, IState> {
  private playerRef: any;

  constructor(props: IProps) {
    super(props);

    this.state = {
      played: 0,
      buffer: 0,
      seekTime: props.seekTime,
      receivedAt: props.receivedAt,
      isPaused: false,
    };
  }

  public ref = (input: any) => {
    this.playerRef = input;
  };

  public render() {
    const { url, playing, showProgressbar, muted }: IProps = this.props;
    return [
      <ReactPlayer
        key={1}
        url={url}
        ref={this.ref}
        controls={false}
        playing={playing}
        youtubeConfig={{ playerVars: { disablekb: 1 } }}
        style={{ pointerEvents: 'none' }}
        volume={1}
        muted={muted}
        width="100%"
        height="80vh"
      />,
      showProgressbar &&
        url && <Progress key={2} className="progress" animated value={10.2} />,
    ];
  }
}
