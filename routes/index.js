var express = require('express');
var dataFunctions = require('./data/projectDataFunctions.js')
var router = express.Router();

// I don't think this is ideal, does this make the whole website not render unltil the projects are returned?
// But maybe I can call the async function in the pug template?
/* GET home page. */
router.get('/', function(req, res, next) {
  dataFunctions.getFolderNames(function (projects){
    if (projects.errno){
      console.log(projects);
      projects = ['An error has occurred.']
    }

    res.render('index', { title: 'JAMM\'s Portfolio', projects:  projects});
  });
});


module.exports = router;
