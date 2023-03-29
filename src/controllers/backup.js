const backupService = require('../services/backup');

const backup = async (req, res) => {
  try {
    const { repoUrl, frequency, token } = req.body;
    const result = await backupService.backup(repoUrl, frequency, token);
    res.status(200).json(result);
  }
  catch (error) {
    res.status(500).json({ error: error.message });
  }
  
};

module.exports = {
  backup,
};
