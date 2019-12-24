const fs = require('fs');
const path = require('path');


const [baseDomain, email] = process.argv.slice(2);

const isDir = dir => fs.statSync(dir).isDirectory();

const servicesDir = path.join('.', 'services')



if (!baseDomain) {
  console.log('You should provide base domain')
  process.exit(1);
}

if (!email) {
  console.log('You should provide email')
  process.exit(1);
}

const content =
`BASE_DOMAIN=${baseDomain}
EMAIL=${email}`;

fs.readdirSync(servicesDir).forEach(file => {
  const serviceDir = path.join(servicesDir, file);
  if(isDir(serviceDir)) {
    fs.writeFileSync(path.join(serviceDir, '.env'), content, {encoding: 'utf-8'});
  }
});

console.log('Done');
