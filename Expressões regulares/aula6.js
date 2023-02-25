const { ips, cpfs } = require('./base');
const ipRegExp = /((25[0-5]|2[0-4][0-9]|1\d{2}|[1-9]\d|\d)(\.)){3}(25[0-5]|2[0-4][0-9]|1\d{2}|[1-9]\d|\d)/g;

/* 
encontrar ips range:
250 - 255 25[0-5]
200 - 249 2[0-4][0-9]
100 - 199 1\d{2}
10 - 99 [1-9]\d
0 - 9 \d
*/  
console.log(ips.match(ipRegExp));

// econtrar todos os cpfs
// console.log(cpfs.match(/(\d{3}\.){2}\d{3}\-\d{2}/g));