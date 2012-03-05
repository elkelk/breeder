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
  function brow(values){
    return $.extend({}, {
      width: 15,
      height: 3,
      color_r: 95,
      color_g: 34,
      color_b: 34,
      x: 0,
      y: -10,
      corner: 2,
      angle: 10
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
      y: 0,
      corner: 6,
      angle: 0,
      parts: {
        brow: brow(),
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
      y: -15,
      parts: {
      }
    }, values);
  };
  function tooth(values){
    return $.extend({}, {
      width: 2,
      height: 5,
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
      height: 5,
      color_r: 255,
      color_g: 255,
      color_b: 255,
      x: 0,
      y: 10,
      corner: 6,
      angle: 0,
      parts: {
        tooth1: tooth({x: -10}),
        tooth2: tooth(),
        tooth3: tooth({x: 10})
      }
    }, values);
  };
  function hair_mask(values){
    return $.extend({}, {
      width: 60,
      height: 50,
      color_r: 237,
      color_g: 175,
      color_b: 101,
      x: 0,
      y: 20,
      corner: 20,
      angle: 0,
      parts: {
      }
    }, values);
  };
  function hair(values){
    return $.extend({}, {
      width: 70,
      height: 50,
      color_r: 95,
      color_g: 34,
      color_b: 34,
      x: 0,
      y: -10,
      corner: 40,
      angle: 0,
      parts: {
        hair_mask: hair_mask()
      }
    }, values);
  };
  function top_head(values){
    return $.extend({}, {
      width: 70,
      height: 70,
      color_r: 237,
      color_g: 175,
      color_b: 101,
      x: 0,
      y: -10,
      corner: 30,
      angle: 0,
      parts:{
        hair: hair(),
        left_eye: eye(),
        right_eye: eye({
          x: 15, parts: {
            brow: brow({angle:-10}),
            pupil: pupil()
          }
        })
      }
    }, values);
  };
  function bottom_head(values){
    return $.extend({}, {
      width: 50,
      height: 50,
      color_r: 237,
      color_g: 175,
      color_b: 101,
      x: 0,
      y: 20,
      corner: 20,
      angle: 0,
      parts:{
        nose: nose(),
        mouth: mouth(),
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
        top_head: top_head(),
        bottom_head: bottom_head()
      }
    }, values);
  };

  var person1 = new Part("person1", person());
  var person2 = new Part("person2", person({
    parts:{
      top_head: top_head({
        width: 65,
        height: 70,
        color_r: 255,
        color_g: 195,
        color_b: 121,
        parts: {
          hair: hair({
            height: 60,
            color_r: 115,
            color_g: 74,
            color_b: 54,
            parts: {
              hair_mask: hair_mask({
                color_r: 255,
                color_g: 195,
                color_b: 121
              })
            }
          }),
          left_eye: eye({
            width: 17,
            height: 10,
            angle: 10,
            parts: {
              brow: brow({
                color_r: 115,
                color_g: 74,
                color_b: 54,
                angle: 5,
                height: 4
              }),
              pupil: pupil()
            }
          }),
          right_eye: eye({
            x: 15,
            width: 17,
            height: 10,
            angle: -10,
            parts: {
              brow: brow({
                color_r: 115,
                color_g: 74,
                color_b: 54,
                angle: -5,
                height: 4
              }),
              pupil: pupil()
            }
          })
        }
      }),
      bottom_head: bottom_head({
        width: 45,
        height:50,
        color_r: 255,
        color_g: 195,
        color_b: 121,
        parts: {
          nose: nose({width: 8, height:15}),
          mouth: mouth({
            height: 10,
            corner: 1,
            parts: {
              tooth1: tooth({height: 10, x: -10}),
              tooth2: tooth({height: 10}),
              tooth3: tooth({height: 10, x: 10})
            }
          })
        }
      })
    }
  }));
  person1.draw("#main_canvas", 100, 100);
  person2.draw("#main_canvas", 200, 100);
  var child = person1.reproduce(person2);
  child.draw("#main_canvas", 150, 250);
})();
