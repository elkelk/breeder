(function (){
  var person_definition = {
    width: 80,
    height: 110,
    color_r: 0,
    color_g: 0,
    color_b: 0,
    x: 0,
    y: 0,
    parts: {
      head: {
        width: 70,
        height: 100,
        color_r: 237,
        color_g: 175,
        color_b: 101,
        x: 5,
        y: 5,
        parts:{
          left_eye: {
            width: 15,
            height: 13,
            color_r: 255,
            color_g: 255,
            color_b: 255,
            x: 20,
            y: 40,
            parts: {
              pupil: {
                width: 10,
                height: 8,
                color_r: 50,
                color_g: 50,
                color_b: 50,
                x: 20,
                y: 40
              }
            }
          },
          right_eye: {
            width: 15,
            height: 13,
            color_r: 255,
            color_g: 255,
            color_b: 255,
            x: 50,
            y: 40,
            parts: {
              pupil: {
                width: 10,
                height: 8,
                color_r: 50,
                color_g: 50,
                color_b: 50,
                x: 50,
                y: 40
              }
            }
          }
        }
      }
    }
  };

  var person = new Part("person", person_definition);
  person.draw("#main_canvas", 100, 100);
})();
