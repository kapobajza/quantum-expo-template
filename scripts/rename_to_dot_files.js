const fs = require('fs');
const path = require('path');

const filesToRename = [
  { oldName: 'env.example', newName: '.env.example' },
  { oldName: 'prettierrc.js', newName: '.prettierrc.js' },
  { oldName: 'github', newName: '.github' },
];

const projectRoot = path.resolve(__dirname, '../');

filesToRename.forEach((file) => {
  const oldPath = path.join(projectRoot, file.oldName);
  const newPath = path.join(projectRoot, file.newName);

  if (!fs.existsSync(oldPath)) {
    console.warn(`File ${file.oldName} does not exist at ${oldPath}.`);
    return;
  }

  if (fs.statSync(oldPath).isDirectory()) {
    fs.cpSync(oldPath, newPath, { recursive: true });
    fs.rmSync(oldPath, { recursive: true, force: true });
    console.log(`Renamed directory ${file.oldName} to ${file.newName}`);
    return;
  }

  fs.rename(oldPath, newPath, (err) => {
    if (err) {
      console.error(`Error renaming ${file.oldName} to ${file.newName}:`, err);
    } else {
      console.log(`Renamed ${file.oldName} to ${file.newName}`);
    }
  });
});
