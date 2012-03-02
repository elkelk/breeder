function Part(name, definition){
  Part.initialize(this, name, definition);
}

Part.initialize = function(instance, name, definition){
  instance.name = instance._create_get_or_set(name);
  instance.name(name);
  instance.values_list = [];
  instance.parts_list = [];
  for(var sub_part in definition){
    if(sub_part == "parts") continue;
    instance["_" + sub_part] = definition[sub_part];
    instance[sub_part] = instance._create_get_or_set(sub_part);
    instance.values_list.push(sub_part);
  }
  if(definition.parts !== undefined){
    for(var part in definition.parts){
      instance["_" + part] = new Part(part, definition.parts[part])
      instance[part] = instance._create_get_or_set(part);
      instance.parts_list.push(part);
    }
  }
};

Part.combine = function(part1, part2){
  var new_definition = {parts: {}};
  $.each(part1.values_list, function(){
    if(this == "parts") return;
    new_definition[this] = (part1[this]() + part2[this]()) / 2;
  });
  $.each(part1.parts_list, function(){
    new_definition.parts[this] = Part.combine(part1[this](), part2[this]());
  });
  return new_definition;
}

Part.prototype = {
  _create_get_or_set: function(name){
    return function(value){
      if(value === undefined){
        return this["_" + name];
      } else {
        this["_" + name] = value;
      }
    };
  },
  reproduce: function(mate){
    return new Part(this.name(), Part.combine(this, mate));
  },
  draw: function(selector, x, y){
    $(selector).drawEllipse({
      fillStyle: "rgb(" + this.color_r() + "," + this.color_g() + "," + this.color_b() + ")",
      x: x + this.x() , y: y + this.y(),
      width: this.width(), height: this.height(),
      fromCenter: false
    });
    this.draw_parts(selector, x, y);
  },
  draw_parts: function(selector, x, y){
    var $this = this;
    $.each(this.parts_list, function(){
      $this[this]().draw(selector, x, y);
    });
  }
};
