var plan = require('flightplan');

var appName = 'look';
var username = 'deployer';
var startFile = 'bin/www';

var tmpDir = appName+'-' + new Date().getTime();

// configuration
plan.target('staging', [
  {
    host: '195.154.37.122',
    username: username,
    privateKey: '/Users/pandascorp/.ssh/id_rsa',
    agent: process.env.SSH_AUTH_SOCK
  }
]);

plan.target('production', [
  {
    host: '195.154.37.122',
    username: 'deployer',
    password: 'profi123',
    //privateKey: '/Users/pandascorp/.ssh/id_rsa',
    agent: process.env.SSH_AUTH_SOCK
  },
//add in another server if you have more than one
// {
//   host: '104.131.93.216',
//   username: username,
//   agent: process.env.SSH_AUTH_SOCK
// }
]);

// run commands on localhost
plan.local(function(local) {
  // uncomment these if you need to run a build on your machine first
  // local.log('Run build');
  // local.exec('gulp build');

  local.log('Copy files to remote hosts');
  var filesToCopy = local.exec('git ls-files', {silent: true});
  // rsync files to all the destination's hosts
  local.transfer(filesToCopy, '/tmp/' + tmpDir);
});

// run commands on remote hosts (destinations)
plan.remote(function(remote) {
  remote.log('Move folder to root');
  remote.sudo('cp -R /tmp/' + tmpDir + ' ~/node_apps/', {user: username});
  remote.rm('-rf /tmp/' + tmpDir);

  remote.log('Install dependencies');
  remote.sudo('npm --production --prefix ~/node_apps/' + tmpDir + ' install ~/node_apps/' + tmpDir, {user: username});

  remote.log('Reload application');
  remote.sudo('ln -snf ~/node_apps/' + tmpDir + ' ~/node_apps/'+ appName, {user: username});
  remote.sudo('ln -s ~/node_apps/shared/logs ~/node_apps/'+appName, {user: username});
  remote.sudo('ln -s ~/node_apps/shared/uploads ~/node_apps/'+ appName + "/public/uploads", {user: username});
  remote.exec('forever stop ~/node_apps/'+appName+'/'+startFile, {});
  remote.exec('PORT=3001 NODE_ENV=production forever start ~/node_apps/'+appName+'/'+startFile);
});