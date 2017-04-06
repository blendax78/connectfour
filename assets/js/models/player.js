Salesloft.Models.Player = Backbone.Model.extend({
    initialize: function()
    {
      // Javascript Model Initialization for a User.
      // If we have to do any kind of changes to User properties, this is where to do it.
      var _this = this;
    },

    url: function()
    {
      // Server endpoint
        return '/player';
    }
});
