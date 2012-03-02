describe("Person", function() {
  afterEach(function(){
    $("#main_canvas").clearCanvas();
  });
  it("can be created with an initial set of values", function() {
    var head = ObjectFactory.head({width: 16, height: 32});
    var person = new Person(ObjectFactory.person({head: head}));
    expect(person.head().width()).toBe(16);
    expect(person.head().height()).toBe(32);
  });
  describe("reproduction", function(){
    it("can created a child when given a mate", function() {
      var head1 = ObjectFactory.head({width: 16, height: 32});
      var head2 = ObjectFactory.head({width: 18, height: 36});
      var person1 = new Person(ObjectFactory.person({head: head1}))
      var person2 = new Person(ObjectFactory.person({head: head2}))
      var child = person1.reproduce(person2);
      expect(child.head().width()).toBe(17);
      expect(child.head().height()).toBe(34);
    });
  });
  it("can draw itself on the canvas centered on the given coordinates", function() {
    var head = ObjectFactory.head({width: 16, height: 32});
    var person = new Person(ObjectFactory.person({head: head}));
    person.draw("#main_canvas", 100, 100);
    $("#main_canvas").setPixels({
      x: 108, y: 116,
      width: 1, height: 1,
      // loop through each pixel
      each: function(px) {
        expect(px.r > 0).toBe(true);
        expect(px.g > 0).toBe(true);
        expect(px.b > 0).toBe(true);
      }
    });
  });
});
