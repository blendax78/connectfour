Salesloft.Collections.Matches = Backbone.Collection.extend({
    model: Salesloft.Models.Match,

    initialize: function (models)
    {
    },

    parse: function (result)
    {
      return result.matches;
    },

    url: function ()
    {
        // Server endpoint
        return '/match';
    }
});
