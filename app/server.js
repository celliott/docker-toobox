var express = require('express'),
	basicAuth = require('basic-auth')
	bodyParser = require('body-parser'),
	basicAuth = require('basic-auth'),
	request = require('request'),
	jade = require('jade'),
	logger = require('morgan'),
	auth_user = process.env["AUTH_USER"],
	auth_pass = process.env["AUTH_PASS"],
	sonos_api = process.env["SONOS_API"],
	sonos_device = process.env["SONOS_DEVICE"].replace(' ', '%20'),
	wemo_api = process.env["WEMO_API"],
	wemo_device = process.env["WEMO_DEVICE"].replace(' ', '%20'),
	app = express()

app.use(bodyParser.json())
app.use(bodyParser.urlencoded({extended: true}))
app.use(logger('dev'))
app.set('views', __dirname + '/views')
app.set('view engine', 'jade')

app.use('/js', express.static(__dirname + '/public/js'));
app.use('/css', express.static(__dirname + '/public/css'));
app.use('/img', express.static(__dirname + '/public/img'));

// basic auth
var auth = function (req, res, next) {
	function unauthorized(res) {
		res.set('WWW-Authenticate', 'Basic realm=Authorization Required')
		return res.status(401).send({ msg: 'Not Authorized' })
	}
	var user = basicAuth(req)
	if (!user || !user.name || !user.pass) {
		return unauthorized(res)
	}
	if (user.pass === auth_pass) {
		return next()
	} else {
		return unauthorized(res)
	}
}

self = this

self.get_heater = (function(_this) {
  return function(method, url, cb) {
    return request({
      method: method,
      uri: url
    }, cb);
  };
})(this);

app.get('/', auth, function(req, res, next) {
	var url = "http://" + sonos_api + "/state";
	request(url, function(error, response, body) {
		var sonos = JSON.parse(body)
		url = 'http://' + wemo_api + '/api/device/' + wemo_device;
		self.get_heater("GET", url, function(e, r, b) {
			var wemo = JSON.parse(b)
			console.log(wemo);
			var is_checked = false;
			if (wemo.state == 1) {
				is_checked = true;
			}
			res.render('index', { title: 'sonos volume', value: sonos.volume, is_checked: is_checked });
		});

	});	
})

app.get('/volume/:value', auth, function(req, res, next) {
	var url = 'http://' + sonos_api + '/' + sonos_device + '/volume/' + req.params.value
	request(url, function(error, response, body) {
		res.status(200).send({ volume: url })
	});	
})

app.get('/heater', auth, function(req, res, next) {
	url = 'http://' + wemo_api + '/api/device/' + wemo_device;
	request.post(url, function(error, response, body) {
		var data = JSON.parse(body)
		res.status(200).send({ state: data.state })
	});	
})

app.listen(80, function(){
  console.log('Express server listening on port 80')
})