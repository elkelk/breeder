var ObjectFactory = {
  person: function(new_values){
    return $.extend({}, {
      parts: {
        head: {
          width: 15,
          height: 30,
          color_r: 237,
          color_g: 175,
          color_b: 101,
          x: 0,
          y: 0
        }
      },
      width: 15,
      height: 30,
      color_r: 50,
      color_g: 50,
      color_b: 50,
      x: 0,
      y: 0

    }, new_values);
  },
  head: function(new_values){
    return $.extend({}, {
      width: 15,
      height: 30,
      color_r: 237,
      color_g: 175,
      color_b: 101,
      x: 0,
      y: 0
    }, new_values);
  }
};
