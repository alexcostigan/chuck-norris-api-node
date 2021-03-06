const express = require('express');
const hbs = require('hbs');
const path = require('path');
const request = require('request');
const app = express();

const publicDirectory = path.join(__dirname, './public');
const viewsPath = path.join(__dirname, './views');

app.use(express.static(publicDirectory));

app.use(express.urlencoded());

app.use(express.json());

app.set('view engine', 'hbs');
app.set('views', viewsPath);

app.get("/", (req, res) => {
    res.render('index')
});

app.post('/api/jokes', (req, res) => {
    console.log(req.body)

    const category = req.body.jokeCategory;

    const jokeUrl = `https://api.chucknorris.io/jokes/random?category=${category}`;
    console.log(jokeUrl);

    request({url: jokeUrl, json: true}, (error, response) => {
        console.log(response.body.value)

        if(error) {
            res.render('index', {
                joke: "Sorry that category doesn't exist"
            })
        } else {
            res.render('index', {
                joke: response.body.value
            })
        }

       
    })
})

app.listen(3000, () => {
    console.log('Server is running');
});