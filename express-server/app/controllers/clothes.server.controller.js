const mongoose = require('mongoose');
const Clothing = mongoose.model('Clothing');
const User = require('mongoose').model('User');

//
function getErrorMessage(err) {
    if (err.errors) {
        for (let errName in err.errors) {
            if (err.errors[errName].message) return err.errors[errName].
                message;
        }
    } else {
        return 'Unknown server error';
    }
};
//
exports.create = function (req, res) {
    const clothing = new Clothing();
    clothing.name = req.body.name;
    clothing.category = req.body.category;
    clothing.price = req.body.price;

    console.log(req.body)
    // Assuming you have an array of user IDs in req.body.users
    const userIds = req.body.users;

    // Find users by their IDs
    User.find({ _id: { $in: userIds } }, (err, users) => {
        if (err) {
            return res.status(400).send({
                message: getErrorMessage(err)
            });
        }

        // Assign the found users to the course
        clothing.users = users.map(user => user._id);

        clothing.save((err) => {
            if (err) {
                console.log('error', getErrorMessage(err));
                return res.status(400).send({
                    message: getErrorMessage(err)
                });
            } else {
                res.status(200).json(clothing);
            }
        });
    });
};
//
// 'addClothing' controller method to add a clothing to the user's clothees
exports.addClothing = function (req, res, next) {
    const clothingId = req.body.id;
    const userId = req.id; // Assuming you set req.id during authentication middleware

    // Find the user by ID and update the 'clothes' array
    User.findByIdAndUpdate(userId, { $push: { clothes: id } }, { new: true }, function (err, user) {
        if (err) {
            return next(err);
        } else {
            res.json(user);
        }
    });
}
exports.list = function (req, res) {
    Clothing.find().populate('name', 'category', 'price').exec((err, clothes) => {
if (err) {
        return res.status(400).send({
            message: getErrorMessage(err)
        });
    } else {
        res.status(200).json(clothes);
    }
});
};
//
exports.clothingById = function (req, res, next, id) {
    Clothing.findById(id).populate('name', 'category', 'price').exec((err, clothing) => {if (err) return next(err);
    if (!clothing) return next(new Error('Failed to load clothing '
            + id));
        req.clothing = clothing;
        console.log('in clothingById:', req.clothing)
        next();
    });
};
//
exports.read = function (req, res) {
    res.status(200).json(req.clothing);
};
//
exports.update = function (req, res) {
    console.log('in update:', req.clothing)
    const clothing = req.clothing;
    clothing.name = req.body.name;
    clothing.category = req.body.category;
    clothing.price = req.body.price;
    clothing.save((err) => {
        if (err) {
            return res.status(400).send({
                message: getErrorMessage(err)
            });
        } else {
            res.status(200).json(clothing);
        }
    });
};
//
exports.delete = function (req, res) {
    const clothing = req.clothing;
    clothing.remove((err) => {
        if (err) {
            return res.status(400).send({
                message: getErrorMessage(err)
            });
        } else {
            res.status(200).json(clothing);
        }
    });
};
