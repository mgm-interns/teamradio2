import { BaseComponent } from 'BaseComponent';
import { Song } from 'Models';
import * as React from 'react';
import { Subscription } from 'rxjs/Subscription';
import { SongServices } from 'Services/Http';
import '../PlaylistTabs.scss';
import { HistoryItem } from './HistoryItem';

interface IHistoryProps {
  stationId: string;
  isActive: boolean;
}

interface IHistoryState {
  history: Song[];
}

export class History extends BaseComponent<IHistoryProps, IHistoryState> {
  private songServices: SongServices;
  private subscription: Subscription;

  constructor(props: any) {
    super(props);
    this.songServices = new SongServices();
    this.state = {
      history: [],
    };
    this.updateHistory = this.updateHistory.bind(this);
    this.replaySong = this.replaySong.bind(this);
  }

  public componentDidMount() {
    this.updateHistory();
  }

  public replaySong(youtubeVideoId: string, message: string) {
    const { stationId } = this.props;
    this.songServices.addSong(stationId, youtubeVideoId, message).subscribe(
      (songResponse: Song) => {},
      (err: string) => {
        this.showError(`Replay song error: ${err}`);
      },
    );
  }

  public updateHistory() {
    const { stationId } = this.props;
    this.subscription = this.songServices
      .getListPlayedSong(stationId)
      .subscribe(
        (history: Song[]) => {
          this.setState({
            history,
          });
        },
        (err: string) => {
          this.showError(`Get history error: ${err}`);
        },
      );
  }

  public UNSAFE_componentWillReceiveProps(nextProps: IHistoryProps) {
    if (nextProps.isActive) {
      this.updateHistory();
    }
  }

  public componentWillUnmount() {
    this.subscription.unsubscribe();
  }

  public render() {
    const { history } = this.state;
    if (history.length === 0) {
      return (
        <div className="playlist-none">
          <i className="fa fa-warning" />
          <h5>
            There is no song in the history.
            <br />
            Add a new song to the playlist tab then return to here.
          </h5>
        </div>
      );
    }
    return (
      <div className="list-container">
        {history.map((song, index) => (
          <HistoryItem key={index} song={song} replaySong={this.replaySong} />
        ))}
      </div>
    );
  }
}
