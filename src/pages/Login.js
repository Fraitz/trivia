import React, { Component } from 'react';
import { Redirect } from 'react-router-dom';
import md5 from 'crypto-js/md5';
import fetchTriviaAPI from '../services/triviaAPI';
import InputLogin from '../components/InputLogin';
import Button from '../components/Button';
import './pages-css/Login.css';

class Login extends Component {
  constructor() {
    super();

    this.state = {
      btnDisabledStatus: true,
      email: '',
      name: '',
      redirectToGamePage: false,
      redirectToSettings: false,
      redirectToRankingPage: false,
      rankingBtn: true,
    };

    this.handleChange = this.handleChange.bind(this);
    this.handleClickPlay = this.handleClickPlay.bind(this);
    this.handleClickRanking = this.handleClickRanking.bind(this);
    this.handleClickSettings = this.handleClickSettings.bind(this);
    this.verifyInputs = this.verifyInputs.bind(this);
    this.playBtnOn = this.playBtnOn.bind(this);
    this.savePlayerData = this.savePlayerData.bind(this);
    this.rankingOn = this.rankingOn.bind(this);
    this.renderForm = this.renderForm.bind(this);
  }

  componentDidMount() {
    const player = JSON.parse(localStorage.getItem('state'));
    if (player !== null) {
      this.playBtnOn(false, player);
    }
    const ranking = JSON.parse(localStorage.getItem('ranking'));
    if (ranking !== null) {
      this.rankingOn();
    }
  }

  rankingOn() {
    this.setState({
      rankingBtn: false,
    });
  }

  savePlayerData() {
    const { email, name } = this.state;
    const hash = md5(email).toString();
    const SRC = `https://www.gravatar.com/avatar/${hash}`;
    const state = {
      player: {
        name,
        assertions: 0,
        score: 0,
        gravatarEmail: email,
        gravatarUrl: SRC,
      },
    };
    localStorage.setItem('state', JSON.stringify(state));
  }

  playBtnOn(on, game) {
    const { player } = game;
    this.setState({
      name: player.name,
      email: player.gravatarEmail,
      btnDisabledStatus: on,
    });
  }

  handleClickSettings() {
    this.setState({
      redirectToSettings: true,
    });
  }

  async handleClickPlay() {
    this.savePlayerData();
    fetchTriviaAPI();

    this.setState({
      redirectToGamePage: true,
    });
  }

  async handleClickRanking() {
    this.savePlayerData();

    this.setState({
      redirectToRankingPage: true,
    });
  }

  handleChange({ target: { name, value } }) {
    this.setState({
      [name]: value,
    }, () => this.verifyInputs());
  }

  verifyInputs() {
    const { name, email } = this.state;
    const emailVerification = /\S+@\S+\.\S+/;
    const isValidEmail = emailVerification.test(email);

    if (name !== '' && email !== '' && isValidEmail) {
      this.setState({
        btnDisabledStatus: false,
      });
    } else {
      this.setState({
        btnDisabledStatus: true,
      });
    }
  }

  renderForm() {
    const { btnDisabledStatus, email, name,
      rankingBtn } = this.state;
    return (
      <form className="formLogin">
        <InputLogin
          placeHolder=" Name/Username"
          dataTestId="input-player-name"
          onChange={ this.handleChange }
          maxlength="29"
          name="name"
          value={ name }
        />
        <InputLogin
          placeHolder=" E-mail"
          dataTestId="input-gravatar-email"
          onChange={ this.handleChange }
          name="email"
          value={ email }
        />
        <div className="buttons">
          <Button
            dataTestId="btn-play"
            name="Jogar"
            classe="btn-play"
            disabled={ btnDisabledStatus }
            onClick={ this.handleClickPlay }
          />
          <Button
            dataTestId="btn-settings"
            name="Configurações"
            classe="btn-config"
            onClick={ this.handleClickSettings }
          />
          <Button
            name="Ranking"
            classe="btn-ranking"
            disabled={ rankingBtn }
            onClick={ this.handleClickRanking }
          />
        </div>
      </form>
    );
  }

  render() {
    const { redirectToGamePage, redirectToSettings,
      redirectToRankingPage } = this.state;

    return (
      <div className="loginBackground">
        <div className="loginDiv">
          <h1 className="loginTitle">Trivia Game</h1>
          { this.renderForm() }
          { redirectToGamePage && <Redirect to="/gamepage" /> }
          { redirectToSettings && <Redirect to="/settings" /> }
          { redirectToRankingPage && <Redirect to="/ranking" />}
        </div>
      </div>
    );
  }
}

export default Login;
