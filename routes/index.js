var express = require('express');
var getProjects = require('../data/projects-data.js')
var router = express.Router();

var projectsList;

// I don't think this is ideal, does this make the whole website not render unltil the projects are returned?
// But maybe I can call the async function in the pug template?
getProjects(function (projects){
  projectsList = projects;
  if (projectsList.errno){
    console.log(projectsList);
    projectsList = ['An error has occurred.']
  }
  /* GET home page. */
  router.get('/', function(req, res, next) {
    res.render('index', { title: 'JAMM\'s Portfolio', projects:  projectsList});
  });
});


module.exports = router;
