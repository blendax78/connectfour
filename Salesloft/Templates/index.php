<!DOCTYPE html>
<html lang="en">
  <head>
    <meta charset="utf-8">
    <meta name="viewport" content="width=device-width, initial-scale=1">
  
    <title>Connect Four</title>
    <link rel="stylesheet" href="/assets/bootstrap/css/bootstrap.min.css" type="text/css" />
    <link rel="stylesheet" href="/assets/bootstrap/css/bootstrap-theme.min.css" type="text/css" />
    <link rel="stylesheet" href="/assets/stylesheets/style.css" type="text/css" />
  </head>
  <body>

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
                <li class=""><a href="/new">New Game</a></li>
            </ul>
        </div>
    </div>
  </nav>

    <div class="container">
      <div id="add-bookmark"></div>
      <div id="salesloft-container"></div>
    </div>

    <script src="/assets/js/libs/LAB.min.js"></script>
    <script src="/assets/js/libs/jquery.min.js"></script>
    <script>
    $(document).ready(function() {
      $LAB
        // Libraries
        .script('/assets/js/libs/underscore-min.js')
        .script('/assets/js/libs/backbone-min.js').wait()
        .script('/assets/js/libs/ICanHaz.min.js')
        .script('/assets/bootstrap/js/bootstrap.min.js')
        // Backbone Objects
        .script('/assets/js/application.js')
        .script('/assets/js/router.js')
        .script('/assets/js/models/user.js')
        .script('/assets/js/models/piece.js')
        .script('/assets/js/models/game.js')
        .script('/assets/js/collections/users.js')
        .script('/assets/js/collections/pieces.js')
        .script('/assets/js/collections/games.js')
        .script('/assets/js/views/index.js').wait(function(){
          // Backbone Initialization
          init();
        });
    });
    </script>

  <!-- JS Templates -->
    <script id="add_template" type="text/html">
      <div class="row">
        <div class="col-md-12 col-sm-12">
          <form class="form-inline col-md-12 col-sm-12" id="add-form">
            <input type="text" class="form-control" id="add-title" placeholder="Bookmark Title" />
            <input type="text" class="form-control" id="add-url" placeholder="Bookmark URL" />
            <button class="btn btn-primary" id="add-button">Add</button>
          </form>
        </div>
      </div>
    </script>
    <script id="bookmark_template" type="text/html">
      <div class="row">
        <div class="col-md-2 col-sm-2 bold">
          Title
        </div>
        <div class="col-md-4 col-sm-4 bold">
          URL
        </div>
        <div class="col-md-1 col-sm-1 bold">
          Clicks
        </div>
        <div class="col-md-1 col-sm-1 bold">
          Delete?
        </div>
      </div>
      {{#models}}
      <div class="row" data-id={{id}}>
        <div class="col-md-2 col-sm-2">
          {{title}}
        </div>
        <div class="col-md-4 col-sm-4">
          <a href="#" class="link" data-id="{{id}}" >{{url}}</a>
        </div>
        <div class="col-md-1 col-sm-1">
          {{click_count}}
        </div>
        <div class="col-md-1 col-sm-1">
          <a href="#" class="delete" data-id="{{id}}">X</a>
        </div>
      </div>
      {{/models}}
    </script>
  </body>
</html>