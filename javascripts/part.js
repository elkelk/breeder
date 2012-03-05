function Part(name, definition, parent_width, parent_height){
  this.name = this._create_get_or_set("name");
  this.name(name);
  this.parent_width = this._create_get_or_set("parent_width");
  this.parent_width(parent_width);
  this.parent_height = this._create_get_or_set("parent_height");
  this.parent_height(parent_height);

  this.values_list = [];
  this.parts_list = [];
  for(var sub_part in definition){
    if(sub_part == "parts") continue;
    this["_" + sub_part] = definition[sub_part];
    this[sub_part] = this._create_get_or_set(sub_part);
    this.values_list.push(sub_part);
  }
  if(definition.parts !== undefined){
    for(var part in definition.parts){
      this["_" + part] = new Part(part, definition.parts[part], this.width(), this.height());
      this[part] = this._create_get_or_set(part);
      this.parts_list.push(part);
    }
  }
};

Part.combine = function(part1, part2, max_width, max_height){
  var new_definition = {parts: {}};
  $.each(part1.values_list, function(){
    if(this == "parts") return;
    if(this.split("_")[0] == "custom") return;
    var a = part1[this]();
    var b = part2[this]();
    if(part1["custom_" + this] === undefined){
      new_definition[this] = (a + b) / 2;
    } else {
      new_definition[this] = eval(part1["custom_" + this]());
      if(this == "height" && max_height && new_definition[this] > max_height){
        new_definition[this] = max_height;
      }
      if(this == "width" && max_width && new_definition[this] > max_width){
        new_definition[this] = max_width;
      }
    }
  });
  $.each(part1.parts_list, function(){
    new_definition.parts[this] = Part.combine(part1[this](), part2[this](), Math.max(part1.width(), part2.width()), Math.max(part1.height, part2.height()));
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
  corner_radius: function(){
    if (this.corner !== undefined){
     return this.corner();
    } else {
      return this.width() < this.height() ? this.width() : this.height();
    }
  },
  rotation: function(){
    return this.angle !== undefined ? this.angle() : 0;
  },
  draw: function(selector, x, y){
    console.log(this.corner_radius());
    $(selector).drawRect({
      fillStyle: "rgb(" + this.color_r() + "," + this.color_g() + "," + this.color_b() + ")",
      x: x + this.x() , y: y + this.y(),
      width: this.width(), height: this.height(),
      cornerRadius: this.corner_radius(),
      angle: this.rotation(),
      fromCenter: true
    });
    this.draw_parts(selector, x + this.x(), y + this.y());
  },
  draw_parts: function(selector, x, y){
    var $this = this;
    $.each(this.parts_list, function(){
      $this[this]().draw(selector, x, y);
    });
  }
};

