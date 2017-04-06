    Salesloft.Router.router = Backbone.Router.extend({

    routes:
    {
        // Call index() function on '/' route
        "": "index"
    },

    initialize: function()
    {
    },

    index: function()
    {
        // Basic route for main page
        // Expects no inputs
        // Loads Games collection and passes it to index view
        var collection = new Salesloft.Collections.Games();

        // return of Games from the server.
        this.indexView = new Salesloft.Views.IndexView({ collection: collection });
    }

});
