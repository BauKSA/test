const server = require('./app.js')
const { conn } = require('./db.js')

conn.sync({force:true})
.then(()=>{
  server.listen(3002, ()=>{
    console.log("Server listening on port: ", 3002)
  })
})