var express = require('express');
var dataFunctions = require('../utils-module').projectDataUtils;
var router = express.Router();



/* GET home page. */
router.get('/:project', function(req, res, next) {
  dataFunctions.getProjectDataJSON(req.params.project, function (dataObject){
    if (dataObject.errno){
      console.log(dataObject);
      dataObject = ['An error has occurred.']
    }
    dataObject.hasIndex = dataFunctions.hasIndexJS(req.params.project);
    res.render('project', { title: 'JAMM\'s Portfolio', projectName:  req.params.project, data: dataObject});
  });
});




module.exports = router;
