const dns = require("dns");

dns.resolveSrv(
  "_xmpp-server._tcp.google.com",
  (err, records) => {
    if (err) {
      console.error(err);
    } else {
      console.log(records);
    }
  }
);