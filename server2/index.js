const cors = require('cors');
const express = require('express');
const app = express();


const os = require('os');

const networkInterfaces = os.networkInterfaces();

let ip;
for(let interfaceName in networkInterfaces) {
  const interface = networkInterfaces[interfaceName];
  for(let i = 0; i < interface.length; i++) {
    const alias = interface[i];
    if ('IPv4' === alias.family && alias.internal === false) {
      ip = alias.address;
    }
  }
}



app.use(cors());

app.listen(3000, '0.0.0.0', () => {
    console.log('Server started!');
    console.log(`http://${`192.168.1.91`}:3000`);
});

app.get('/',  (req, res) => {
    console.log('Request received!');
    res.send('Hello World!');
});