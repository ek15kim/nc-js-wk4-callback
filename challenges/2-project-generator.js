const fs = require('fs');

function projectGenerator(projectName, callback) {
    const projectPath = `./${projectName}`;
    fs.mkdir(projectPath, (err, data) => {
        if (err) throw err;
        else {
            fs.appendFile(projectPath + "/.gitignore", 'Learn Node FS module', function (err) {
                if (err) throw err;
                console.log('File is created successfully.');
            });
            callback(err, data)
        }
    });
}

module.exports = projectGenerator;
