const fs = require('fs');

const escapeRegExp = str => str.replace(/([.*+?^=!:${}()|\[\]\/\\])/g, "\\$1");

const BASE_DOMAIN = '.example.com';

const REGISTRY_DOMAIN = `registry.ci${BASE_DOMAIN}`;

const isDirExisits = dir => fs.existsSync(dir) && fs.lstatSync(dir).isDirectory();

const [containerName, containerHost] = process.argv.slice(2);

if (!containerName) {
  console.log('You should provide at least container name');
  process.exit(1);
}

if (!isDirExisits(`./servers/${containerName}`)) {
  console.log('Service already exists');
  process.exit(1);
}

const placeholder = token => '${'+token+'}';

const validContainerHost = containerHost ? `${encodeURI(containerHost)}${BASE_DOMAIN}` : `${encodeURI(containerName)}${BASE_DOMAIN}`;

const template = fs.readFileSync('./docker-compose.example', { encoding: 'utf-8'});

const hydrated = template
  .replace(new RegExp(escapeRegExp(placeholder('container-name')), 'gi'), containerName)
  .replace(new RegExp(escapeRegExp(placeholder('container-host')), 'gi'), validContainerHost)
  .replace(new RegExp(escapeRegExp(placeholder('registry-domain')), 'gi'), REGISTRY_DOMAIN);

if (!isDirExisits('./servers/')) {
  fs.mkdirSync('./servers/');
}

fs.mkdirSync(`./servers/${containerName}`);

fs.writeFileSync(`./servers/${containerName}/docker-compose.yml`, hydrated, { encoding: 'utf-8'});
