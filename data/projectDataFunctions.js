const fs = require('fs');
const dir = 'public/projects/';

function getFolderNames(callback){
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
}

function getProjectDataJSON(projectName, callback){
  let filePath = dir + projectName + '/data.json';
  fs.readFile(filePath, (err, data) => {
    if (err) {
        return callback(err);
    }

    return callback(JSON.parse(data));
  })
}

function hasIndexJS(projectName){
  let filePath = dir + projectName + '/index.html';
  return (fs.existsSync(filePath));
}

module.exports = {
  getFolderNames: getFolderNames,
  getProjectDataJSON: getProjectDataJSON,
  hasIndexJS: hasIndexJS
};
