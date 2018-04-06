import * as React from 'react';
import { Component } from 'react';
import { connect } from 'react-redux';
import { Nav, NavItem, NavLink, TabContent, TabPane } from 'reactstrap';
import { Favourite } from './Favourite';
import { favouriteList, historyList } from './fixture';
import { History } from './History';
import { Playlist } from './Playlist';
import './PlaylistTabs.scss';

const PLAYLIST_TAB_ID = '1';
const HISTORY_TAB_ID = '2';
const FAVOURITE_TAB_ID = '3';

export class PlaylistTabsComponent extends Component<any, any> {
  constructor(props: any) {
    super(props);

    this.state = {
      activeTab: PLAYLIST_TAB_ID,
    };
  }

  public openTab(tabId: any) {
    if (this.state.activeTab === tabId) {
      return;
    }

    this.setState({
      activeTab: tabId,
    });
  }

  public render() {
    const { playlist } = this.props;
    return (
      <div className="tabs-container">
        <Nav tabs>
          <NavItem>
            <NavLink
              className={
                this.state.activeTab === PLAYLIST_TAB_ID ? 'active' : ''
              }
              onClick={() => this.openTab(PLAYLIST_TAB_ID)}>
              Playlist
            </NavLink>
          </NavItem>
          <NavItem>
            <NavLink
              className={
                this.state.activeTab === HISTORY_TAB_ID ? 'active' : ''
              }
              onClick={() => this.openTab(HISTORY_TAB_ID)}>
              History
            </NavLink>
          </NavItem>
          <NavItem>
            <NavLink
              className={
                this.state.activeTab === FAVOURITE_TAB_ID ? 'active' : ''
              }
              onClick={() => this.openTab(FAVOURITE_TAB_ID)}>
              Favourite
            </NavLink>
          </NavItem>
        </Nav>
        <TabContent activeTab={this.state.activeTab}>
          <TabPane tabId={PLAYLIST_TAB_ID}>
            <Playlist playlist={playlist} />
          </TabPane>
          <TabPane tabId={HISTORY_TAB_ID}>
            <History historyList={historyList} />
          </TabPane>
          <TabPane tabId={FAVOURITE_TAB_ID}>
            <Favourite favouriteList={favouriteList} />
          </TabPane>
        </TabContent>
      </div>
    );
  }
}

const mapStateToProps = (state: any) => ({
  playlist: state.playlist.data,
});

export const PlaylistTabs = connect(mapStateToProps, null)(
  PlaylistTabsComponent,
);
