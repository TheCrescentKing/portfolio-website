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


module.exports = getFolderNames;
