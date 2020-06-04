var express = require('express');
var dataFunctions = require('../utils-module').projectDataUtils;
var router = express.Router();


let aboutInfo = "Hi, I’m John. A trilingual, lifelong learner who loves technology, science, psychology, philosophy, exercise and nutrition. I feel at my best when I’m doing something that I know is helping people with their lives.";

// I don't think this is ideal, does this make the whole website not render unltil the projects are returned?
// But maybe I can call the async function in the pug template?
/* GET home page. */
router.get('/', function(req, res, next) {
  dataFunctions.getFolderNames(function (projects){
    if (projects.errno){
      console.log(projects);
      projects = ['An error has occurred.']
    }

    res.render('index', { title: 'JAMM\'s Portfolio', projects:  projects, aboutInfo: aboutInfo});
  });
});


module.exports = router;
