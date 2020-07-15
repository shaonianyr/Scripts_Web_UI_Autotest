const util = require('util');
const exec = util.promisify(require('child_process').exec);
const cmd = async function (shell) {
  const { stdout, stderr } = await exec(shell);
  if (stderr) {
    console.error(stderr);
    return stderr
  } else {
    console.log(stdout);
    return stdout
  }
}
module.exports = {
    cmd
};