const mongoose = require('mongoose');
const Clothing = mongoose.model('Clothing');

function getErrorMessage(err) {
    if (err.errors) {
        for (let errName in err.errors) {
            if (err.errors[errName].message) return err.errors[errName].message;
        }
    } else {
        return 'Unknown server error';
    }
}

exports.create = function (req, res) {
    const clothing = new Clothing({
        name: req.body.name,
        category: req.body.category,
        price: req.body.price
    });

    clothing.save((err, savedClothing) => {
        if (err) {
            console.error('Error saving clothing:', err);
            return res.status(400).send({
                message: getErrorMessage(err)
            });
        }
        res.status(200).json(savedClothing);
    });
};

exports.list = function (req, res) {
    Clothing.find({}, 'name category price', (err, clothes) => {
        if (err) {
            return res.status(400).send({
                message: getErrorMessage(err)
            });
        }
        res.status(200).json(clothes);
    });
};

exports.read = function (req, res) {
    res.status(200).json(req.clothing);
};

exports.update = function (req, res) {
    const clothing = req.clothing;
    clothing.name = req.body.name;
    clothing.category = req.body.category;
    clothing.price = req.body.price;

    clothing.save((err, updatedClothing) => {
        if (err) {
            return res.status(400).send({
                message: getErrorMessage(err)
            });
        }
        res.status(200).json(updatedClothing);
    });
};

exports.delete = function (req, res) {
    const clothing = req.clothing;
    clothing.remove((err) => {
        if (err) {
            return res.status(400).send({
                message: getErrorMessage(err)
            });
        }
        res.status(200).json(clothing);
    });
};

exports.clothingById = function (req, res, next, id) {
    Clothing.findById(id, (err, clothing) => {
        if (err) {
            return next(err);
        }
        if (!clothing) {
            return next(new Error('Clothing not found'));
        }
        req.clothing = clothing;
        next();
    });
};