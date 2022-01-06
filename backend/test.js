var data = new Date(); // without jquery remove this $.now()
console.log(data)// Thu Jun 23 2016 15:48:24 GMT+0530 (IST)

var d = new Date,
    dformat = [d.getFullYear() ,d.getMonth()+1,
               d.getDate()
               ].join('-')+' '+
              [d.getHours(),
               d.getMinutes(),
               d.getSeconds()].join(':');

console.log(dformat) //2016-6-23 15:54:16