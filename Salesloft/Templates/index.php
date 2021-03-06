<!DOCTYPE html>
<html lang="en">
  <head>
    <meta charset="utf-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">

  
    <title>Connect Four</title>
    <link rel="stylesheet" href="/assets/bootstrap/css/bootstrap.min.css" type="text/css" />
    <link rel="stylesheet" href="/assets/bootstrap/css/bootstrap-theme.min.css" type="text/css" />
    <link rel="stylesheet" href="/assets/stylesheets/style.css" type="text/css" />
  </head>
  <body class="container">

  <nav class="navbar navbar-inverse navbar-fixed-top">
    <div class="container-fluid">
        <div class="navbar-header">
            <button type="button" class="collapsed navbar-toggle" data-toggle="collapse" data-target="#bs-example-navbar-collapse-9" aria-expanded="false">
                <span class="sr-only">Toggle navigation</span>
                <span class="icon-bar"></span>
                <span class="icon-bar"></span>
                <span class="icon-bar"></span>
            </button>
            <a href="/" class="navbar-brand">Connect Four</a>
        </div>
        <div class="collapse navbar-collapse" id="bs-example-navbar-collapse-9">
            <ul class="nav navbar-nav">
              <li class=""><a href="#" onClick="location.reload();">New Game</a></li>
              <!-- Ghetto way of doing this. TODO: Add event to Backbone to restart DB values & re-render-->
            </ul>
        </div>
    </div>
  </nav>

    <div class="container">
      <div class="row">
        <div id="player-container"></div>
      </div>
      <div class="row">
        <div id="salesloft-container"></div>
        <div id="matches-container"></div>
      </div>
    </div>

    <script src="/assets/js/libs/LAB.min.js"></script>
    <script src="/assets/js/libs/jquery.min.js"></script>
    <script>
    $(document).ready(function() {
      $LAB
        // Libraries
        .script('/assets/js/libs/underscore-min.js').wait()
        .script('/assets/js/libs/backbone-min.js').wait()
        .script('/assets/js/libs/ICanHaz.min.js')
        .script('/assets/bootstrap/js/bootstrap.min.js')
        // Backbone Objects
        .script('/assets/js/application.js').wait()
        .script('/assets/js/router.js').wait()
        .script('/assets/js/models/player.js')
        .script('/assets/js/models/piece.js')
        .script('/assets/js/models/game.js')
        .script('/assets/js/models/match.js')
        .script('/assets/js/collections/matches.js')
        .script('/assets/js/collections/players.js')
        .script('/assets/js/collections/pieces.js')
        .script('/assets/js/collections/games.js')
        .script('/assets/js/views/index.js').wait(function(){
          // Backbone Initialization
          init();
        });
    });
    </script>

  <!-- JS Templates -->
    <script id="match_template" type="text/html">
    <div class="col-sm-2 col-md-2 col-lg-2">
      <table class="table table-striped table-bordered table-hover table-condensed">
        <thead>
        <tr><th>Match</th><th>Winner</th></tr>
        </thead>
        <tbody>
        {{#matches}}
        <tr>
          <td>{{id}}</td>
          <td>{{name}}</td>
        </tr>
        {{/matches}}
        </tbody>
      </table>
    </div>
    </script>

    <script id="player_template" type="text/html">
      <div class="col-sm-12 col-md-12 col-lg-12">
        {{#currentPlayer}}
          <h2>Current Player: {{name}} {{#winner}}<span class="red">WINNER</span>{{/winner}}</h2>
          <input type="hidden" id="currentPlayer" value="{{id}}" />
        {{/currentPlayer}}
        {{#nextPlayer}}
          <input type="hidden" id="nextPlayer" value="{{id}}" />
        {{/nextPlayer}}
      </div>
    </script>

    <script id="game_template" type="text/html">
      <div class="col-sm-10 col-md-10 col-lg-10">
      {{#pieces}}
        {{#row}}
          <div class="row" data-id={{id}}>
            {{#col}}
              <div class="col-md-1 col-sm-1 c4-tile" style="background-color: {{color}}" id="tile{{id}}" data-id="{{id}}" data-selected="{{is_selected}}">
              </div>
            {{/col}}
          </div>
        {{/row}}
      {{/pieces}}
    </script>
  </body>
</html>