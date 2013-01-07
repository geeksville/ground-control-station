define(['backbone', 'Templates',

  // Models
  'Models/Mission',

  // Widgets (subviews)
  'Views/Widgets/Speed',
  'Views/Widgets/Map',
  'Views/Widgets/Comms',
  'Views/Widgets/Altitude',
  'Views/Widgets/Gps',
  'Views/Widgets/Health',
  'Views/Widgets/State',
  'Views/Widgets/Battery'

  ], function(Backbone, template,
    // Models
    Mission,

    // Widgets (subviews)
    SpeedWidget,
    MapWidget,
    CommsWidget,
    AltitudeWidget,
    GpsWidget,
    HealthWidget,
    StateWidget,
    BatteryWidget
  ) {
  
  var MissionView = Backbone.View.extend({

    model: Mission,
    el: '#missionView',
    hasRendered: false,

    initialize: function() {
      _.bindAll(this);
    },
    
    render: function() {
      
      if(false === this.hasRendered) { this.renderLayout(); }
      
    },

    // Meant to be run only once; renders scaffolding and subviews.
    renderLayout: function() {

      // Render scaffolding
      this.$el.html(template['app/Templates/missionLayout.jade']());
      
      // Instantiate subviews, now that their elements are present on the page
      this.speedWidget = new SpeedWidget({model: this.model.get('platform')});
      this.mapWidget = new MapWidget({model: this.model.get('platform')});
      this.altitudeWidget = new AltitudeWidget({model: this.model.get('platform')});

      // Render party
      this.speedWidget.render();
      this.mapWidget.render();
      this.altitudeWidget.render();

      this.model.get('platform').on('change', function(e) {
      });
    }

  });

  return MissionView;

});