'use strict';

let currentPlayer = 0;

const btnRollDice = document.querySelector('.btn--roll');

const btnNewGame = document.querySelector('.btn--new');

const btnHold = document.querySelector('.btn--hold');

const playerSections = document.querySelectorAll('.player');
const playerScores = document.querySelectorAll('.score');
const playerNames = document.querySelectorAll('.name');

const currentScores = document.querySelectorAll('.current-score');

const dice = document.querySelector('.dice');

const roll_dice = function () {
  const rolled_dice = Math.trunc(Math.random() * 6) + 1;

  if (rolled_dice === 1) {
    switch_player();
  } else {
    const newScore = get_current_score() + rolled_dice;
    set_current_score(newScore);
  }
};

const switch_player = function () {
  playerScores[currentPlayer].textContent = '0';
  currentPlayer = currentPlayer == 0 ? 1 : 0;
  set_active();
};

const set_active = function () {
  const other = currentPlayer === 1 ? 0 : 1;
  playerSections[other].classList.remove('player--active');
  playerSections[currentPlayer].classList.add('player--active');
};

const get_current_score = function () {
  const current_score = Number(currentScores[currentPlayer].textContent);
  return current_score;
};

const set_current_score = function (score) {
  currentScores[currentPlayer].textContent = score;
};

const get_player_score = function () {
  const player_score = Number(playerScores[currentPlayer].textContent);
  console.log(currentPlayer, ' ps ', player_score);

  return player_score;
};

const set_player_score = function (score) {
  console.log('s', score);
  console.log(playerScores[currentPlayer]);

  playerScores[currentPlayer].innerText = score;
};

const hold_score = function () {
  const player_new_score = get_player_score() + get_current_score();
  console.log('ns', player_new_score);

  set_player_score(player_new_score);

  if (player_new_score >= 100) {
    player_wins();
  } else {
    switch_player();
  }
};

const new_game = function () {
  playerSections.forEach(player => player.classList.remove('.player--winner'));
  playerNames.forEach(player => player.classList.remove('.player--winner'));
  playerScores.forEach(score => (score.textContent = '0'));
  currentScores.forEach(score => (score.textContent = '0'));
  btnHold.style.disabled = false;
  btnRollDice.style.disabled = false;

  currentPlayer = 0;
  set_active();
};

const player_wins = function () {
  playerSections[currentPlayer].classList.add('.player--winner');
  playerNames[currentPlayer].classList.add('.player--winner');

  btnHold.style.disabled = true;
  btnRollDice.style.disabled = true;
};

btnNewGame.addEventListener('click', new_game);

btnHold.addEventListener('click', hold_score);

btnRollDice.addEventListener('click', roll_dice);

new_game();
