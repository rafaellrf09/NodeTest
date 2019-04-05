if(process.env.NODE_ENV === 'production'){
  var uri = 'mongodb://rafaellrf:a1b2c3d4e5@ds133086.mlab.com:33086/projectnode'
}else{
  var uri = 'mongodb://10.22.1.139:27017/projectNode'
}

module.exports = {mongoURI: uri}
