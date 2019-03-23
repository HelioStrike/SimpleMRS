var express     = require('express'),
    router      = express.Router(),
    formidable  = require('formidable'),
    fs          = require('fs'),
    Patient  = require('../models/patient');

router.get("/", function(req, res) {
  res.render("patients/patients");
});

router.post("/", function(req, res) {

  var form = new formidable.IncomingForm();
  
  form.parse(req, function (err, fields, files) {

    Patient.create(
      {
        mrno: fields["mrno"],
        name: fields["name"],
        image: "",
        added_by: req.user,
        added_on: new Date()
      }
    , function(err, patient) {
      if(err) {
        console.log(err);
      } else {
        var oldpath = files["image"].path;
        var newpath = "/home/krypt/myStuff/hosp/medicalRecordSystem/v1/public/imgs/" + patient.id + ".jpg";

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

        patient.image = "/imgs/" + patient.id + ".jpg";
        patient.save();

      }
    });
  
  });

  res.redirect("/patients/new");
});

router.post("/search", isLoggedIn, function(req, res) {
  var data = req.body;
  Patient.find({mrno: data["mrno"]}, function(err, patient) {
    if(err) {
      console.log(err);
    } else {
      res.redirect("/patients/" + patient[0].id);
    }
  });
});

router.get("/new", isLoggedIn, function(req, res) {
  res.render("patients/new");
});

router.get("/:id", function(req, res) {

  Patient.find({_id: req.params["id"],}).populate("records").exec(function(err, patient) {
    if(err) {
      console.log(err);
    } else {
      res.render("patients/showPatient", {patient: patient[0]});
    }
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
