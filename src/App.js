import React from "react";
import "./App.css";
import axios from "axios";

const CardList = props => (
  <div className="d-flex flex-wrap">
    {props.profiles.map(profile => (
      <Card key={profile.id} {...profile} />
    ))}
  </div>
);

class Card extends React.Component {
  render() {
    const profile = this.props;
    return (
      <div className="github-profile">
        <img src={profile.avatar_url} alt="img" />
        <div className="info">
          <div className="name">{profile.name}</div>
          <div className="company">
            {profile.company} {profile.location}
          </div>
          <a href={profile.html_url}>Github profile</a>
          <div>{"Public repositories: " + profile.public_repos}</div>
          <div>{"Since: " + profile.created_at.slice(0, 10)}</div>
        </div>
      </div>
    );
  }
}

class Form extends React.Component {
  state = { userName: "saood011" };
  handleSubmit = async event => {
    event.preventDefault();
    const resp = await axios.get(
      `https://api.github.com/users/${this.state.userName}`
    );
    this.props.onSubmit(resp.data);
    console.log(resp.data);
    this.setState({ userName: "" });
  };
  render() {
    return (
      <form className="p-2" onSubmit={this.handleSubmit}>
        <input
          type="text"
          value={this.state.userName}
          onChange={event => this.setState({ userName: event.target.value })}
          placeholder="GitHub username"
          required
        />
        <button className="btn btn-success">Get info!</button>
      </form>
    );
  }
}

export default class App extends React.Component {
  state = {
    profiles: []
  };
  addNewProfile = profileData => {
    this.setState(prevState => ({
      profiles: [...prevState.profiles, profileData]
    }));
  };
  render() {
    return (
      <div>
        <div className="p-2 header">
          GitHub Info App <br />
          <small>
            <em>by Saood</em>
          </small>
        </div>

        <Form onSubmit={this.addNewProfile} />
        <CardList profiles={this.state.profiles} />
      </div>
    );
  }
}
