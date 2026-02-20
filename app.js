const express = require('express');
const app = express();
const port = 3000;

let products = [
    { id: 1, name: 'Книга Пусть к успеху', price: 50000 },
    { id: 2, name: 'Лайфончик', price: 1500 },
    { id: 3, name: 'Пиджак с широким лацканом', price: 3000 },
];

app.use(express.json());

app.get('/', (req, res) => {
    res.send('API для управления товарами');
});

app.get('/products', (req, res) => {
    res.json(products);
});

app.get('/products/:id', (req, res) => {
    let product = products.find(p => p.id == req.params.id);
    if (product) {
        res.json(product);
    } else {
        res.status(404).send('Товар не найден');
    }
});

app.post('/products', (req, res) => {
    const { name, price } = req.body;
    const newProduct = { id: Date.now(), name, price };
    products.push(newProduct);
    res.status(201).json(newProduct);
});

app.patch('/products/:id', (req, res) => {
    let product = products.find(p => p.id == req.params.id);
    const { name, price } = req.body;

    if (product) {
        if (name !== undefined) product.name = name;
        if (price !== undefined) product.price = price;
        res.json(product);
    } else {
        res.status(404).send('Товар не найден');
    }
});

app.delete('/products/:id', (req, res) => {
    const initialLength = products.length;
    products = products.filter(p => p.id != req.params.id);

    if (products.length < initialLength) {
        res.send('Ok');
    } else {
        res.status(404).send('Товар не найден');
    }
});

app.listen(port, () => {
    console.log(`Сервер запущен на http://localhost:${port}`);
});