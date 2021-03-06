(function e(t,n,r){function s(o,u){if(!n[o]){if(!t[o]){var a=typeof require=="function"&&require;if(!u&&a)return a(o,!0);if(i)return i(o,!0);var f=new Error("Cannot find module '"+o+"'");throw f.code="MODULE_NOT_FOUND",f}var l=n[o]={exports:{}};t[o][0].call(l.exports,function(e){var n=t[o][1][e];return s(n?n:e)},l,l.exports,e,t,n,r)}return n[o].exports}var i=typeof require=="function"&&require;for(var o=0;o<r.length;o++)s(r[o]);return s})({1:[function(require,module,exports){
'use strict';

window.addEventListener('load', function () {

  //  constants
  var GAME_WIDTH = 640;
  var GAME_HEIGHT = 360;

  //  keep the game going
  var gameLive = true;

  //  enemies
  var enemies = [{
    x: 100, //  x coordinate
    y: 100, //  y coordinate
    speedY: 2, //  speed in Y
    w: 40, //  width
    h: 40 //  heght
  }, {
    x: 200,
    y: 0,
    speedY: 2,
    w: 40,
    h: 40
  }, {
    x: 330,
    y: 100,
    speedY: 3,
    w: 40,
    h: 40
  }, {
    x: 450,
    y: 100,
    speedY: 5,
    w: 40,
    h: 40
  }];

  //  the player object
  var player = {
    x: 10,
    y: 160,
    speedX: 2.5,
    isMoving: false, //  keep track whether the player is moving or not
    w: 40,
    h: 40
  };

  //  the goal object
  var goal = {
    x: 580,
    y: 160,
    w: 50,
    h: 36
  };

  var movePlayer = function movePlayer() {
    player.isMoving = true;
  };

  var stopPlayer = function stopPlayer() {
    player.isMoving = false;
  };

  //  grab the canvas and context
  var canvas = document.getElementById('mycanvas');
  var ctx = canvas.getContext('2d');

  //  event listeners to move player
  canvas.addEventListener('mousedown', movePlayer);
  canvas.addEventListener('mouseup', stopPlayer);
  canvas.addEventListener('touchstart', movePlayer);
  canvas.addEventListener('touchend', stopPlayer);

  //  update the logic
  var update = function update() {

    //  check if you've won the game
    if (checkCollision(player, goal)) {
      //  stop the game
      gameLive = false;

      alert('You\'ve won!');

      //  reload page
      window.location = "";
    }

    //  update player
    if (player.isMoving) {
      player.x = player.x + player.speedX;
    }

    //  update enemies
    var i = 0;
    var n = enemies.length;

    enemies.forEach(function (element, index) {

      //  check for collision with player
      if (checkCollision(player, element)) {
        //  stop the game
        gameLive = false;

        alert('Game Over!');

        //  reload page
        window.location = "";
      }

      //  move enemy
      element.y += element.speedY;

      //  check borders
      if (element.y <= 10) {
        element.y = 10;
        //  element.speedY = element.speedY * -1;
        element.speedY *= -1;
      } else if (element.y >= GAME_HEIGHT - 50) {
        element.y = GAME_HEIGHT - 50;
        element.speedY *= -1;
      }
    });
  };

  //  show the game on the screen
  var draw = function draw() {
    //  clear the canvas
    ctx.clearRect(0, 0, GAME_WIDTH, GAME_HEIGHT);

    //  draw player
    ctx.fillStyle = '#00FF00';
    ctx.fillRect(player.x, player.y, player.w, player.h);

    //  draw enemies
    ctx.fillStyle = '#FF0000';
    enemies.forEach(function (element, index) {
      ctx.fillRect(element.x, element.y, element.w, element.h);
    });

    //  draw goal
    ctx.fillStyle = '#FFFFFF';
    ctx.fillRect(goal.x, goal.y, goal.w, goal.h);
  };

  //  gets executed multiple times per second
  var step = function step() {

    update();
    draw();

    if (gameLive) {
      window.requestAnimationFrame(step);
    }
  };

  //  check the collision between two rectangles
  var checkCollision = function checkCollision(rect1, rect2) {

    var closeOnWidth = Math.abs(rect1.x - rect2.x) <= Math.max(rect1.w, rect2.w);
    var closeOnHeight = Math.abs(rect1.y - rect2.y) <= Math.max(rect1.h, rect2.h);
    return closeOnWidth && closeOnHeight;
  };

  //  initial kick
  step();
});

},{}]},{},[1]);
