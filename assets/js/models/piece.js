Salesloft.Models.Piece = Backbone.Model.extend({
    initialize: function()
    {
      // Javascript Model Initialization for a Piece.
      // If we have to do any kind of changes to Piece properties, this is where to do it.
      this.checkColor();
    },

    checkColor: function() {
      if (this.get('color') === '') {
        this.set('color', 'yellow');
      }
    },

    url: function()
    {
      // Server endpoint
        return '/piece';
    }
});
