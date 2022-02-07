const express = require('express');
const app = express();
const mongoose = require('mongoose')
const Item = require('./models/items')
const dotenv = require('dotenv')
dotenv.config();

// connecttolocal
// const mymongo = "mongodb://127.0.0.1:27017/"

const mongodb = process.env.mongodb;
mongoose.connect(mongodb, { useNewUrlParser: true, useUnifiedTopology: true }).then(() => console.log('connected')).catch(err => console.log(err))

// useurlencode
app.use(express.urlencoded({ extended: true }))

// useengine
app.set('view engine', 'ejs');

// listenport
const PORT = process.env.PORT || 3000
app.listen(PORT, () => {
    console.log(`Server started on http://localhost:${PORT}`);
});

// createitem
app.get('/create-item', (req, res) => {
    const item = new Item({
        name: 'blabla',
        price: 300
    })
    item.save().then(result => res.send(result)).catch(err => console.log(err))
});

// renderindex
app.get('/', (req, res) => {
    res.redirect('/get-item')
});

// getitem
app.get('/get-item', (req, res) => {
    Item.find().then(result => {
        res.render('index', { items: result })
    }).catch(err => console.log(err))
});

// renderadditempage
app.get('/add-items', (req, res) => {
    res.render('add-items')
});

// postrequest
app.post('/items', (req, res) => {
    const item = Item(req.body)
    item.save().then(() => {
        res.redirect('/')
    }).catch(err => console.log(err))
});

// itemid
app.get('/items/:id', (req, res) => {
    const id = req.params.id;
    Item.findById(id).then(result => {
        console.log('result', result)
        res.render('item-detail', { item: result });
    })
});

// deleterequest
app.delete('/api/delete/:id', (req, res) => {
    const id = req.params.id;
    Item.findByIdAndDelete(id).then(result => {
        res.json({ redirect: '/' });
    })
});

// putrequest
app.put('/api/update/:id', (req, res) => {
    const id = req.params.id;
    Item.findByIdAndUpdate(id, req.body).then(result => {
        res.json({ msg: 'update successfylly' });
    })
});

// render404page
app.use('', (req, res) => {
    res.render('error');
});