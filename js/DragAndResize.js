interact('.DR')
  // change how interact gets the
  // dimensions of '.edit-rectangle' elements
  .rectChecker(function (element) {
    // find the Rectangle object that the element belongs to
    var rectangle = rectangles[element.getAttribute('data-index')];

    // return a suitable object for interact.js
    return {
      left  : rectangle.x,
      top   : rectangle.y,
      right : rectangle.x + rectangle.w,
      bottom: rectangle.y + rectangle.h
    };
  })
  .inertia({
    // don't jump to the resume location
    // https://github.com/taye/interact.js/issues/13
    zeroResumeDelta: true
  })
  .restrict({
    // restrict to a parent element that matches this CSS selector
    drag: 'svg',
    // only restrict before ending the drag
    endOnly: true,
    // consider the element's dimensions when restricting
    elementRect: { top: 0, left: 0, bottom: 1, right: 1 }
  })
  .draggable({
    max: Infinity,
    onmove: function (event) {
      var rectangle = rectangles[event.target.getAttribute('data-index')];

      rectangle.x += event.dx;
      rectangle.y += event.dy;
      rectangle.draw();
    }
  })
  .resizable({
    max: Infinity,
    onmove: function (event) {
      var rectangle = rectangles[event.target.getAttribute('data-index')];

      rectangle.w = Math.max(rectangle.w + event.dx, 10);
      rectangle.h = Math.max(rectangle.h + event.dy, 10);
      rectangle.draw();
    }
  });

interact.maxInteractions(Infinity);