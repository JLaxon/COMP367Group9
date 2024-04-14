const mongoose = require('mongoose');
const Schema = mongoose.Schema;
const ClothingSchema = new Schema({
    name: String,
    category: String,
    price: {
        type: Number,
        validate: [
            {
                validator: Number.isInteger,
                message: 'Price must be a number'
            }
        ]
    },
});
mongoose.model('Clothing', ClothingSchema);
