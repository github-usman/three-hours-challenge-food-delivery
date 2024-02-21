const express = require('express');
const { Food, connectMongodb } = require('./db');
const cors = require('cors');

const bodyParser = require('body-parser');
const app = express();
app.use(bodyParser.json());
app.use(express.json());

connectMongodb();
app.use(cors());



app.get('/food', async (req, res) => {
    try {
        const value = await Food.find();
        res.send(value);
    } catch (error) {
        console.error("Error  finding  users:", error);
        res.status(500).send("Error  finding  users");
    }
});


// create food_data

app.post('/food', async (req, res) => {
    try {

        console.log(req.body, " inside try block body value");
        const newUser = await Food.create(req.body);
        res.send(newUser);
    } catch (error) {
        console.error("Error creating new user:", error);
        res.status(500).send("Error creating new user");
    }
});

// Update food_data
app.put('/food/:_id', async (req, res) => {
    try {
        const { _id } = req.params;
        const updatedFood = await Food.findByIdAndUpdate(_id, req.body, { new: true });
        if (!updatedFood) {
            return res.status(404).send("Food not found");
        }
        res.send(updatedFood);
    } catch (error) {
        console.error("Error updating food:", error);
        res.status(500).send("Error updating food");
    }
});

// Delete food_data
app.delete('/food/:id', async (req, res) => {
    try {
        const { id } = req.params;
        const deletedFood = await Food.findByIdAndDelete(id);
        if (!deletedFood) {
            return res.status(404).send("Food not found");
        }
        res.send("Food deleted successfully");
    } catch (error) {
        console.error("Error deleting food:", error);
        res.status(500).send("Error deleting food");
    }
});



// get food_data
app.get('/', (req, res) => {
    res.send("Hello world");
})


app.listen(5000, () => {
    console.log('listening on port 3000');
})