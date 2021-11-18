const express = require('express');
const cors = require('cors');
const app = express();
app.use(cors());
app.use(express.json());
app.listen(4000, () => console.log('server is up'));

let data = [];

app.get('/shoppingList', (req, res) => {
    console.log('in GET ' + new Date());
    console.log(data);
    res.status(200).send(data);
});

app.post('/shoppingList', (req, res) => {
    const { name, quantity, remarks } = req.body;
    console.log('in POST ' + new Date());
    console.log(name);
    console.log(quantity);
    console.log(remarks);
    data.push({ name: name, quantity: quantity, remarks: remarks });
    res.status(200).send(data);
});

app.put('/shoppingList/:name', (req, res) => {
    console.log(req.params.name);
    console.log(req.body);
    const { quantity, remarks } = req.body;
    const updated = { name: req.params.name, quantity: quantity, remarks: remarks };
    const foundIndex = data.findIndex(i => i.name == req.params.name);
    if (foundIndex != -1) {
        data[foundIndex].quantity = updated.quantity;
        data[foundIndex].remarks = updated.remarks;
        res.status(200).send(updated);
    } else {
        res.status(404).send()
    }
});

app.delete('/shoppingList/:name', (req, res) => {
    console.log(req.params.name);
    console.log(req.body);
    const { quantity, remarks } = req.body;
    const updated = { name: req.params.name, quantity: quantity, remarks: remarks };
    const foundIndex = data.findIndex(i => i.name == req.params.name);
    if (foundIndex != -1) {
        data = data.filter(o => o.name !== updated.name);
        res.status(200).send(data);
    } else {
        res.status(404).send()
    }
});