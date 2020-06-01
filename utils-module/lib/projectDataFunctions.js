const fs = require('fs');
const dir = 'public/projects/';

module.exports = {
  getFolderNames: function getFolderNames(callback){
    // list all files in the directory
    fs.readdir(dir, (err, files) => {
        if (err) {
            return callback(err);
        }

        // files object contains all files names
        // log them on console
        // files.forEach(file => {
        //     console.log(file);
        // });

        return callback(files);
    });
  },
  getProjectDataJSON: function getProjectDataJSON(projectName, callback){
    let filePath = dir + projectName + '/data.json';
    fs.readFile(filePath, (err, data) => {
      if (err) {
          return callback(err);
      }

      return callback(JSON.parse(data));
    })
  },
  hasIndexJS: function hasIndexJS(projectName){
    let filePath = dir + projectName + '/index.html';
    return (fs.existsSync(filePath));
  }
};
