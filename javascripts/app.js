(function (){
  function pupil(values){
    return $.extend({}, {
      width: 10,
      height: 8,
      color_r: 50,
      color_g: 50,
      color_b: 50,
      x: 0,
      y: 0,
      corner: 6,
      angle: 0
    }, values);
  };
  function eye(values){
    return $.extend({}, {
      width: 15,
      height: 13,
      color_r: 255,
      color_g: 255,
      color_b: 255,
      x: -15,
      y: -15,
      corner: 6,
      angle: 0,
      parts: {
        pupil: pupil()
      }
    }, values);
  };
  function nose(values){
    return $.extend({}, {
      width: 10,
      height: 23,
      color_r: 217,
      color_g: 155,
      color_b: 81,
      corner: 6,
      angle: 0,
      x: 0,
      y: 0,
      parts: {
      }
    }, values);
  };
  function tooth(values){
    return $.extend({}, {
      width: 2,
      height: 10,
      color_r: 0,
      color_g: 0,
      color_b: 0,
      x: 0,
      y: 0,
      corner: 0,
      angle: 0,
      parts: {
      }
    }, values);
  }
  function mouth(values){
    return $.extend({}, {
      width: 30,
      height: 10,
      color_r: 255,
      color_g: 255,
      color_b: 255,
      x: 0,
      y: 25,
      corner: 6,
      angle: 0,
      parts: {
        tooth1: tooth({x: -10}),
        tooth2: tooth(),
        tooth3: tooth({x: 10})
      }
    }, values);
  };
  function head(values){
    return $.extend({}, {
      width: 70,
      height: 100,
      color_r: 237,
      color_g: 175,
      color_b: 101,
      x: 0,
      y: 0,
      corner: 60,
      angle: 0,
      parts:{
        nose: nose(),
        mouth: mouth(),
        left_eye: eye(),
        right_eye: eye({
          x: 15, parts: {
            pupil: pupil()
          }
        })
      }
    }, values);
  };
  function person(values){
    return $.extend({}, {
      width: 80,
      height: 110,
      color_r: 0,
      color_g: 0,
      color_b: 0,
      x: 0,
      y: 0,
      corner: 6,
      angle: 0,
      parts: {
        head: head()
      }
    }, values);
  };

  var person1 = new Part("person", person());
  person1.draw("#main_canvas", 100, 100);
})();
