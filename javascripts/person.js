function Person(definition){
  this.definition = definition;
  Part.initialize(this, name, definition);
  for(part in definition){
    this["_" + part] = new Part(part, definition[part])
    this[part] = this._create_get_or_set(part);
    this.parts_list.push(part);
  }
}

Person.combine = function(parent1, parent2){
  var new_definition = {};
  $.each(parent1.parts_list, function(){
    new_definition[this] = Part.combine(parent1[this](), parent2[this]());
  });
  return new_definition;
}

Person.prototype = $.extend({}, Part.prototype, {
  reproduce: function(mate){
    return new Person(Person.combine(this, mate));
  },

  draw: function(selector, x, y){
    this.draw_parts(selector, x, y);
  }
});
