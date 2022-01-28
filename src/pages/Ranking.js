import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import './pages-css/Ranking.css';

class Ranking extends Component {
  constructor() {
    super();

    this.state = {
      ranking: [],
    };

    this.showRanking = this.showRanking.bind(this);
    this.divWon = this.divWon.bind(this);
    this.divPersonal = this.divPersonal.bind(this);
  }

  componentDidMount() {
    const ranking = JSON.parse(localStorage.getItem('ranking'));
    // Ordena o ranking pela pontuação;
    const sortedRanking = ranking.sort((a, b) => (
      b.score - a.score
    ));
    this.showRanking(sortedRanking);
  }

  showRanking(sortedRanking) {
    this.setState({
      ranking: sortedRanking,
    });
  }

  divWon() {
    return (
      <div className="won">
        <span className="material-icons md-24">
          emoji_events
        </span>
      </div>
    );
  }

  divPersonal() {
    return (
      <div className="best">
        <span className="material-icons md-24">star</span>
      </div>
    );
  }

  render() {
    const { ranking } = this.state;
    return (
      <div className="ranking-div">
        <div className="ranking-title">
          <h1 data-testid="ranking-title">Ranking</h1>
          <Link to="/" data-testid="btn-go-home">
            <button className="btn-go-home" type="button">Tela inicial</button>
          </Link>
        </div>
        <div className="rankingList">
          <ol className="ol-ranking">
            { ranking.map((player, index) => (
              <li className="li-ranking" key={ player.gravatarUrl }>
                <div className="mainInfos">
                  <h1>{ `${index + 1}` }</h1>
                  <img className="img-gravatar" src={ player.picture } alt="Gravatar" />
                  <h2 data-testid={ `player-name-${index}` }>
                    { player.name }
                  </h2>
                </div>
                <div className="score">
                  <h3>score</h3>
                  <div className="points">
                    <h3 data-testid={ `player-score-${index}` }>
                      { player.score }
                    </h3>
                  </div>
                  {
                    (player.record === 'recorde') && this.divPersonal()
                  }
                  {
                    (index + 1 === 1) && this.divWon()
                  }
                </div>
              </li>
            ))}
          </ol>
        </div>
      </div>
    );
  }
}

export default Ranking;
