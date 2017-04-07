Salesloft.Collections.Matches = Backbone.Collection.extend({
    model: Salesloft.Models.Match,

    initialize: function (models)
    {
    },

    url: function ()
    {
        // Server endpoint
        return '/match';
    }
});
