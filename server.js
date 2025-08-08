const express = require('express'); 
const mongoose = require('mongoose'); 
const cors = require('cors');
const app = express();

app.use(cors({
  origin: 'http://localhost:5173', // or 3000 if that's where frontend runs
}));
app.use(express.json());
mongoose.connect('mongodb://localhost:27017/crudshort', { 
useNewUrlParser: true,
useUnifiedTopology: true,
});
const Item = mongoose.model('Item', { name: String });
app.get('/items', (req, res) => { Item.find().then(data => res.json(data)); });
app.post('/items', (req, res) => {
new Item({ name: req.body.name }).save().then(data => res.json(data)); });
app.put('/items/:id', (req, res) => {
Item.findByIdAndUpdate(req.params.id, { name: req.body.name }, { new: true }) .then(data => res.json(data));
});
app.delete('/items/:id', (req, res) => { Item.findByIdAndDelete(req.params.id).then(() => res.json({ success: true })); });
app.listen(5000, () => console.log('http://localhost:5000'));