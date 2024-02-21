const mongoose = require('mongoose');
const uri = 'mongodb://0.0.0.0:27017/food_data';

const connectMongodb = () => {
    mongoose.connect(uri, {})
        .then(e => {
            process.stdout.write(`Connect to MongoDB Successfully: ${e.connection.port}`)
        })
        .catch(e => {
            process.stdout.write(`Error DB connectivity ${e}`);
        })
}

// Food schema
const FoodSchema = new mongoose.Schema({
    name_of_the_food: {
        type: String,
        required: true,
    },
    start_deliver_date_and_time: {
        type: Date,
        required: true,
    },
    end_delivery_date_and_time: {
        type: Date,
        required: true,
    }
});

const Food = mongoose.model("Food", FoodSchema);



module.exports = {
    Food: Food,
    connectMongodb: connectMongodb
};
