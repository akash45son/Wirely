const dns = require("dns");

dns.getServers();

console.log("DNS Servers:", dns.getServers());