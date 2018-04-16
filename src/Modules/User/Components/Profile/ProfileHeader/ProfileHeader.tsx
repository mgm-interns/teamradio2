import { ImageUploader } from 'Components/index';
import { IApplicationState } from 'Configuration/Redux';
import { RegisteredUser } from 'Models';
import * as React from 'react';
import { Component } from 'react';
import { connect } from 'react-redux';
import { Container, Row } from 'reactstrap';
import { UserServices } from 'Services/Http';
import './ProfileHeader.scss';

interface IProps {
  userInfo: RegisteredUser;
}

interface IStates {
  name: string;
  username: string;
  avatarUrl: string;
  coverUrl: string;
  aspectRatio: number;
  isUpdateAvatar: boolean;
  isUpdateCover: boolean;
  isLoadingUserInfo: boolean;
}

export class ProfileHeaders extends Component<
  IProps,
  IStates
> {
  private imageUploader: any;
  private readonly userServices: UserServices;

  constructor(props: any) {
    super(props);
    this.state = {
      name: null,
      username: null,
      avatarUrl: null,
      coverUrl: null,
      isUpdateAvatar: false,
      isUpdateCover: false,
      isLoadingUserInfo: false,
      aspectRatio: 1,
    };
    this.userServices = new UserServices();
    this.uploadAvatar = this.uploadAvatar.bind(this);
    this.uploadCover = this.uploadCover.bind(this);
    this.setImageUploadUrl = this.setImageUploadUrl.bind(this);
  }

  public async componentWillMount() {
    this.setState({
      isLoadingUserInfo: true,
    });
    await this.getUserProfile().then((userInfo: RegisteredUser) => {
      this.setState({
        name: userInfo.name || '',
        username: userInfo.username || '',
        avatarUrl: userInfo.avatarUrl || './img/female-01.png',
        coverUrl: userInfo.coverUrl || './img/profile-cover.jpg',
        isLoadingUserInfo: false,
      });
    });
  }

  public componentWillReceiveProps(nextProps: any) {
    const newUserInfo = nextProps.userInfo.userInfoUpdated;
    this.setState({
      name: newUserInfo.name || '',
      username: newUserInfo.username || '',
    });
  }

  public getUserProfile() {
    return new Promise(async resolve => {
      this.userServices.getCurrentUserProfile().subscribe(
        (userInfo: RegisteredUser) => {
          resolve(userInfo);
        },
        (err: any) => {
          // Notify error
        },
      );
    });
  }

  public uploadAvatar() {
    this.setState({
      isUpdateAvatar: true,
      isUpdateCover: false,
      aspectRatio: 1,
    });
    this.imageUploader.openChooseImageModal();
  }

  public uploadCover() {
    this.setState({
      isUpdateAvatar: false,
      isUpdateCover: true,
      aspectRatio: 16 / 9,
    });
    this.imageUploader.openChooseImageModal();
  }

  public setImageUploadUrl(imageUploadUrl: string) {
    if (this.state.isUpdateAvatar) {
      this.setState({
        avatarUrl: imageUploadUrl,
      });
    } else {
      this.setState({
        coverUrl: imageUploadUrl,
      });
    }
  }

  public render() {
    if (!this.state.isLoadingUserInfo) {
      return (
        <div className="profile-header-container">
          {/*Background image cover*/}
          <div className="background-wrapper">
            <img src={this.state.coverUrl} />
            <div className="background-cover" />
          </div>
          {/*User information container*/}
          <Container className="user-info-container">
            <Row>
              <div className="col-sm-12 col-md-8 col-lg-8">
                <div className="row">
                  {/* User's avatar and name */}
                  <div className="col-sm-12 col-md-12 col-lg-6">
                    <div className="user-avatar">
                      <div className="avatar" onClick={this.uploadAvatar}>
                        <img
                          src={this.state.avatarUrl}
                          className="rounded-circle"
                          alt="User Avatar"
                        />
                        <div className="avatar-hover">
                          <span>camera_alt</span>
                          <span>Upload Profile Photo</span>
                        </div>
                      </div>
                      <div className="name">
                        <h3 className="display-name">{this.state.name}</h3>
                        <span className="user-name">{this.state.username}</span>
                      </div>
                    </div>
                  </div>
                  {/* User's summarize(song,vote,reputation) */}
                  <div className="col-sm-12 col-md-12 col-lg-6">
                    <div className="summarize">
                      <div className="summarize-item">
                        <span className="summarize-item-header">Songs</span>
                        <span className="summarize-item-score">0</span>
                      </div>
                      <div className="summarize-item">
                        <span className="summarize-item-header">Voted</span>
                        <span className="summarize-item-score">0</span>
                      </div>
                      <div className="summarize-item">
                        <span className="summarize-item-header">
                          Reputation
                        </span>
                        <span className="summarize-item-score">0</span>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
              {/* Button update cover photo */}
              <div className="col-sm-12 col-md-4 col-lg-4">
                <div className="update-cover">
                  <button
                    type="button"
                    onClick={() => {
                      this.uploadCover();
                    }}
                    className="btn btn-update-cover">
                    <i className="fa fa-camera" /> Update Cover Photo
                  </button>
                </div>
              </div>
            </Row>
          </Container>
          <ImageUploader
            ref={instance => {
              this.imageUploader = instance;
            }}
            aspectRatio={this.state.aspectRatio}
            isUpdateAvatar={this.state.isUpdateAvatar}
            isUpdateCover={this.state.isUpdateCover}
            imageUploadUrl={this.setImageUploadUrl}
          />
        </div>
      );
    }
    return <div className="profile-header-container" />;
  }
}

const mapStateToProps = (state: IApplicationState) => ({
  userInfo: state.userInfo.userInfo,
});

export const ProfileHeader = connect(mapStateToProps, null)(ProfileHeaders);