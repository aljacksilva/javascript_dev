// $1 $2 $3 <- retrovisores \1

const { html2 } = require('./base');

// console.log(html2.match(/<(\w+)[\s\S]*?>([\s\S]*?)<\/\1>/g));

console.log(html2.replace(/(<(\w+)(?:[\s\S]*?)>)([\s\S]*?)(<\/\2>)/g, '$1 HAHA $3 HAHA $4'));