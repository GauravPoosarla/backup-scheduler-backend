const cron = require('node-cron');
const { Octokit } = require('@octokit/rest');
const fs = require('fs');
const path = require('path');

const backup = async (repoUrl, frequency, token) => {

  const octokit = new Octokit({
    auth: token, 
  });
  const [owner, repo] = repoUrl.replace('https://github.com/', '').split('/');
  cron.schedule(`* * */${frequency} * * *`, async () => {
    console.log(`Backing up repository at ${repoUrl}...`);

    octokit.repos.downloadZipballArchive({
      owner,
      repo,
      ref: 'main', 
    }).then(response => {
      const buffer = Buffer.from(response.data);

      const timestamp = new Date().toISOString().slice(0, 19).replace(/:/g, '-');
      const filename = `${repo}-${timestamp}.zip`;
      const filePath = path.join(__dirname, '..', '..', 'backups', filename);
      fs.writeFileSync(filePath, buffer);

      console.log(`Backup saved to ${filePath}`);
    }).catch(error => {
      console.log(`Error: ${error.message}`);
    });
  });
  return 'Backup scheduled';
};

module.exports = {
  backup,
};
