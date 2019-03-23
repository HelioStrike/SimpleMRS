var express     = require('express'),
    router      = express.Router({mergeParams: true}),
    formidable  = require('formidable'),
    fs          = require('fs'),
    Record      = require('../models/record'),
    Patient     = require('../models/patient');

router.get("/new", function(req, res) {
  Patient.findById(req.params.id, function(err, patient) {
    if(err) {
      console.log(err);
    } else {
      res.render("records/new", {patient: patient});
    }
  });
});

router.post("/", isLoggedIn, function(req, res) {
  
  var form = new formidable.IncomingForm();
  
  form.parse(req, function (err, fields, files) {

    Record.create(
      {
        title: fields["title"],
        image: "",
        added_by: req.user,
        added_on: new Date()
      }
    , function(err, record) {
      if(err) {
        console.log(err);
      } else {
        Patient.find({mrno: fields["mrno"]}, function(err, patient) {
          if(err) {
            console.log(err);
          } else {
            patient[0].records.push(record);
            patient[0].save();

            var oldpath = files["image"].path;
            var newpath = "/home/krypt/myStuff/hosp/medicalRecordSystem/v1/public/imgs/" + record.id + ".jpg";

            // Read the file
            fs.readFile(oldpath, function (err, data) {
              if (err) throw err;

              // Write the file
              fs.writeFile(newpath, data, function (err) {
                  if (err) throw err;
              });

              // Delete the file
              fs.unlink(oldpath, function (err) {
                  if (err) throw err;
              });
            });

            record.image = "/imgs/" + record.id + ".jpg";
            record.save();
            
            res.redirect("/records/new");
          }
        });
      }
    });
  
  });
  
});

function isLoggedIn(req, res, next) {
  if(req.isAuthenticated()) {
    return next();
  } else {
    res.redirect("/login");
  }
};

module.exports = router;
