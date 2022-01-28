import React, { Component } from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import { Redirect } from 'react-router-dom';
import Header from '../components/Header';
import Question from '../components/Question';
import Button from '../components/Button';
import mountQuestions from '../services/fetchGame';
import { getScore } from '../redux/actions/index';
import './pages-css/GamePage.css';

class GamePage extends Component {
  constructor() {
    super();
    this.state = {
      questions: [],
      questionsIndex: 0,
      hidden: true,
      loading: true,
      timerValue: 30,
      finalizeDisabled: true,
    };
    this.componentDidMount = this.componentDidMount.bind(this);
    this.getQuestions = this.getQuestions.bind(this);
    this.hideNextQuestionButton = this.hideNextQuestionButton.bind(this);
    this.nextQuestion = this.nextQuestion.bind(this);
    this.showNextQuestionButton = this.showNextQuestionButton.bind(this);
    this.resetTimer = this.resetTimer.bind(this);
    this.timer = this.timer.bind(this);
    this.stopTimer = this.stopTimer.bind(this);
    this.pauseTimer = this.pauseTimer.bind(this);
    this.isClicked = this.isClicked.bind(this);
    this.saveRanking = this.saveRanking.bind(this);
    this.generateButtons = this.generateButtons.bind(this);
  }

  async componentDidMount() {
    const { configs } = this.props;
    const questions = await mountQuestions(configs);
    this.getQuestions(questions);
    const { storeScore } = this.props;
    const { player } = JSON.parse(localStorage.getItem('state'));
    player.assertions = 0;
    player.score = 0; // zera e salva no localStorage chave player.score
    storeScore(player.score);
    localStorage.setItem('state', JSON.stringify({ player: { ...player } }));
  }

  getQuestions(questions) {
    this.setState({
      questions,
      loading: false,
    });
  }

  generateButtons() {
    const { hidden, finalizeDisabled } = this.state;
    return (
      <div className="game-btn-next-container">
        {
          !hidden && <Button
            classe="btn-next"
            dataTestId="btn-next"
            disabled={ hidden }
            name="Próxima"
            onClick={ this.nextQuestion }
          />
        }
        {
          !finalizeDisabled && <Button
            classe="btn-finale"
            dataTestId="btn-next"
            disabled={ finalizeDisabled }
            name="Finalizar"
            onClick={ this.nextQuestion }
          />
        }
      </div>
    );
  }

  hideNextQuestionButton() {
    this.setState({
      hidden: true,
    });
  }

  isClicked() {
    this.setState({
      disabledOptions: true,
    });
  }

  nextQuestion() {
    const FOUR = 4;
    const { questionsIndex } = this.state;
    if (questionsIndex === FOUR) {
      this.saveRanking();
    }
    this.resetTimer();
    this.timer();
    this.setState((prevState) => ({
      questionsIndex: prevState.questionsIndex + 1,
      disabledOptions: false,
      hidden: true,
    }));
  }

  pauseTimer() {
    clearInterval(this.interval);
  }

  resetTimer() {
    this.setState({
      timerValue: 30,
    });
  }

  saveRanking() {
    const ranking = JSON.parse(localStorage.getItem('ranking'));
    const { player } = JSON.parse(localStorage.getItem('state'));
    const { gravatarUrl } = player;
    const finalScore = {
      picture: gravatarUrl,
      name: player.name,
      score: player.score,
      record: '',
    };
    if (!ranking) {
      localStorage.setItem('ranking', JSON.stringify([finalScore]));
    }
    if (ranking) {
      const thisUser = ranking.find((playerScore) => playerScore.picture === gravatarUrl);

      // Valeu Sir. Rafael Janovicci
      if (thisUser && thisUser.score <= player.score) {
        thisUser.score = player.score;
        thisUser.record = 'recorde';
        localStorage.setItem('ranking', JSON.stringify(ranking));
      } else {
        ranking.push(finalScore);
        localStorage.setItem('ranking', JSON.stringify(ranking));
      }
    }
  }

  stopTimer() {
    const { timerValue } = this.state;
    const ZERO = 0;
    if (timerValue === ZERO) {
      clearInterval(this.interval);
      this.setState({
        disabledOptions: true,
      });
      this.showNextQuestionButton();
    }
  }

  showNextQuestionButton() {
    const { questionsIndex } = this.state;
    const FOUR = 4;
    if (questionsIndex === FOUR) {
      this.setState({
        finalizeDisabled: false,
      });
    } else {
      this.setState({
        hidden: false,
      });
    }
  }

  timer() {
    const ONE_SECOND = 1000;

    this.interval = setInterval(() => {
      this.setState((prevState) => ({
        timerValue: prevState.timerValue - 1,
      }));
      this.stopTimer();
    }, ONE_SECOND);
  }

  render() {
    const {
      questions,
      questionsIndex,
      loading,
      timerValue,
      disabledOptions } = this.state;
    const FIVE = 5;
    if (questionsIndex === FIVE) {
      return <Redirect to="/feedback" />;
    }

    return (
      <div className="game-page-container">
        <Header />
        <div className="game">
          <div className="game-container">
            <div className="game-question-container">
              {
                loading ? <p><i className="fas fa-spinner loading" /></p> : <Question
                  hide={ this.hideNextQuestionButton }
                  question={ questions[questionsIndex] }
                  show={ this.showNextQuestionButton }
                  timerValue={ timerValue }
                  pauseTimer={ this.pauseTimer }
                  startTimer={ this.timer }
                  resetTimer={ this.resetTimer }
                  isClicked={ this.isClicked }
                  disabledOptions={ disabledOptions }
                />
              }
            </div>
            { this.generateButtons() }
          </div>
        </div>
      </div>
    );
  }
}

GamePage.propTypes = {
  configs: PropTypes.shape({
    difficulty: PropTypes.string,
    cattegory: PropTypes.string,
    type: PropTypes.string }),
  storeScore: PropTypes.func,
}.isRequired;

const mapStateToProps = ({ gameSettings: { difficulty, category, type } }) => ({
  configs: {
    difficulty,
    category,
    type,
  },
});

const mapDispatchToProps = (dispatch) => ({
  storeScore: (score) => dispatch(getScore(score)),
});

export default connect(mapStateToProps, mapDispatchToProps)(GamePage);
