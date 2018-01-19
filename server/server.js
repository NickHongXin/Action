const express = require('express')
const app = express()
const port = 3000
const userInfo = require('./userInfo.js')

app.get('/user/info', (request, response) => {
  response.json(userInfo)
})

app.post('/user/confirm', (request, response) => {
	console.log(request.toString())
	// if (request.body.Id === userInfo.Id) {
	// 	response.json({result: "Success"})
	// } else{
	// 	response.json({result: "Failed"})
	// }
  	response.json(userInfo)
})

app.listen(port, (err) => {
  if (err) {
    return console.log('something bad happened', err)
  }

  console.log(`server is listening on ${port}`)
})