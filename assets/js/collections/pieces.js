Salesloft.Collections.Pieces = Backbone.Collection.extend({
    model: Salesloft.Models.Piece,

    initialize: function (models)
    {
      // Javascript Collection Initialization for a Pieces.
      // If we have to do any kind of changes to Pieces properties, this is where to do it.
    },

    getGrid: function ()
    {
      // Converts collection to a grid
      var pieces = this.toJSON();
      var grid = { row: [] };

      // Convert pieces into two-dimensional grid.
      for (var i in _.uniq(_.pluck(pieces, 'y'))) {
        grid.row.push({ col: _.where(pieces, { y: parseInt(i) }) });
      }

      return grid;
    },

    url: function ()
    {
        // Server endpoint
        return '/piece';
    }
});
