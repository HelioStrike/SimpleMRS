var mongoose    = require("mongoose"),
    Campground  = require("./models/campground"),
    Comment     = require("./models/comment");

var data = [
  {
    name: "Chilly Peak",
    image: "https://wpgawritingblog.files.wordpress.com/2017/02/screen-shot-2017-02-06-at-12-41-38-pm.png?w=640",
    description: "bla ble blo"
  },
  {
    name: "Chilly Peak",
    image: "https://wpgawritingblog.files.wordpress.com/2017/02/screen-shot-2017-02-06-at-12-41-38-pm.png?w=640",
    description: "bla ble blo"
  },
  {
    name: "Chilly Peak",
    image: "https://wpgawritingblog.files.wordpress.com/2017/02/screen-shot-2017-02-06-at-12-41-38-pm.png?w=640",
    description: "bla ble blo"
  }
]

function seedDB() {
  Campground.remove({}, function(err) {
    if(err) {
      console.log(err);
    } else {
      data.forEach(function(seed) {
        Campground.create(seed, function(err, cg) {
          if(err) {
            console.log(err);
          } else {
            console.log(cg);
            Comment.create({
              text: "Chilly place",
              author: "Mortimer"
            }, function(err, comment) {
              if(err) {
                console.log(err);
              } else {
                cg.comments.push(comment);
                cg.save();
                console.log(comment);
              }
            });
          }
        });
      });
    }
  });
}

module.exports = seedDB;
