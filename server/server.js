const express = require('express')
const app = express()
const port = 3000
const userInfo = require('./userInfo.js')
const bodyParser = require('body-parser')

app.use(bodyParser.json())

app.all('*', (req, res, next) => {
    res.header("Access-Control-Allow-Origin", "*");
    res.header('Access-Control-Allow-Methods', 'PUT, GET, POST, DELETE, OPTIONS');
    res.header("Access-Control-Allow-Headers", "X-Requested-With");
    res.header('Access-Control-Allow-Headers', 'Content-Type');
    next();
});

app.get('/user/info', (request, response) => {
	var userId = request.query.Id;
	var result = [];
	if (userId){
		userInfo.map((user) => {
			if (user.Id.toString() === userId.toString()) {
				result.push(user);
			}
		});
	} else {
		result = userInfo;
	}
	
  	response.json(result)
})

app.post('/user/confirm', (request, response) => {
	console.log(request.body)
	result = request.body.data;
	result.Id = Math.floor(Math.random()*1000)
	userInfo.push(result)
	response.json(result);
})

app.listen(port, (err) => {
  if (err) {
    return console.log('something bad happened', err)
  }
  console.log(`server is listening on ${port}`)
})