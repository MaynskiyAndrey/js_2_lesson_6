const express = require('express');
const fs = require('fs');

const app = express();

app.use(express.static('.'));
app.use(express.json());

app.get('/catalog', (req, res) => {
	fs.readFile('./catalog.json', (err, data) => {
		if (err) {
			throw Error(err);
		} else {
			res.send(data);
		}
	})
})

app.post('/addToCart', (req, res) => {
	fs.readFile('cart.json', 'utf8', (err, data) => {
		if (err) {
			res.send('{"result": 0}');
		} else {
			const cart = JSON.parse(data);
			const item = req.body;

			cart.push(item);

			fs.writeFile('cart.json', JSON.stringify(cart), (err) => {
				if (err) {
					res.send('{"result": 0}');
				} else {
					res.send('{"result": 1}');
				}
			})
		}

	});
});

app.get('/cart', (req, res) => {
	fs.readFile('cart.json', (err, data) => {
		if (err) {
			throw Error(err);
		} else {
			res.send(data);
		}
	})
})

app.post('/removeFromCart', (req, res) => {
	fs.readFile('cart.json', 'utf8', (err, data) => {
		if (err) {
			res.send('{"result": 0}');
		} else {
			const cart = JSON.parse(data);
			const item = req.body;

			let deleteIndex = cart.findIndex((i) => {
				return i.product_name === item.product_name;
			});

			cart.splice(deleteIndex, 1);

			let resJson = JSON.stringify(cart);
			fs.writeFile('cart.json', resJson, (err) => {
				if (err) {
					res.send('{"result": 0}');
				} else {
					res.send(resJson);
				}
			})
		}

	});
});


app.listen(3000, function () {
	console.log('server is running on port 3000!');
});