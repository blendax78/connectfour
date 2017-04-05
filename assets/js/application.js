// Declares Javascript 'namespacing' and initializes router
Salesloft = {};
Salesloft.Views = {};
Salesloft.Models = {};
Salesloft.Collections = {};
Salesloft.Router = {};

function init() {
  // Basic Application Initialization.
  Salesloft.Router.router = new Salesloft.Router.router;
  Backbone.history.start();
}

