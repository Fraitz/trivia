import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import './components-css/Header.css';

class Header extends Component {
  constructor() {
    super();
    this.state = {
      name: '',
      src: '',
    };

    this.mountHeader = this.mountHeader.bind(this);
  }

  componentDidMount() {
    const { player } = JSON.parse(localStorage.getItem('state'));
    if (player !== null) {
      this.mountHeader(player);
    }
  }

  mountHeader(player) {
    this.setState({
      name: player.name,
      src: player.gravatarUrl,
    });
  }

  render() {
    const { name, src } = this.state;
    const { thisScore } = this.props;

    return (
      <div>
        <header className="header">
          <section className="header-profile">
            <img
              data-testid="header-profile-picture"
              src={ src }
              alt="imagem do avatar"
              className="header-profile-picture"
            />
            <h2
              data-testid="header-player-name"
              className="header-player-name"
            >
              { name }
            </h2>
          </section>
          <div className="header-points">
            <h3>Pontos:</h3>
            <h3 data-testid="header-score" className="header-score">
              { thisScore }
            </h3>
          </div>
        </header>
      </div>
    );
  }
}

Header.propTypes = {
  thisScore: PropTypes.number,
}.isRequired;

const mapStateToProps = (state) => ({
  thisScore: state.score.score,
});

export default connect(mapStateToProps)(Header);
