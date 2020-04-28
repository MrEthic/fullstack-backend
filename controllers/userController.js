const User = require('../models/userModel');

exports.newUser = (req, res, next) => {
    console.log(`NewUser call on id : ${req.body.fbId}`)
    const user = {
        fbId: req.body.fbId,
        name: req.body.name,
        avatarUrl: req.body.avatarUrl
        //isAdmin: false
    };
    User.updateOne({fbId: user.fbId}, {$set: user}, {upsert: true}).then(
        (result) => {
            if (result.upserted){
                console.log(`User ${req.body.fbId} added to DB`)
                res.status(200).json({
                    message: 'User created'
                });
            }
            else if (result.n != 0){
                console.log(`User ${req.body.fbId} updated`)
                res.status(201).json({
                    message: 'User Updated'
                });
            }
        }
    ).catch(
        (error) => {
            console.error(`Error during upsert : ${error}`)
            res.status(400).json({
                error: error
            });
        }
    )
    
};

exports.getOneUser = (req, res, next) => {
    User.findOne({
        fbId: req.params.fbId
    }).then(
        (user) => {
            res.status(200).json(user);
        }
    ).catch(
        (error) => {
            res.status(404).json({
                error: error
            });
        }
    );
};

exports.updateUser = (req, res, next) => {
    const user = new User({
        fbId: req.params.fbId,
        name: req.body.name,
        avatarUrl: req.body.avatarUrl,
    });
    User.updateOne({
        fbId: req.params.fbId
    }, user).then(
        () => {
            res.status(201).json({
                message: 'User Updated'
            });
        }
    ).catch(
        (error) => {
            res.status(400).json({
                error: error
            });
        }
    );
};

exports.getAdmins = (req, res, next) => {

    User.find({
        isAdmin: true
    }).then(
        (admins) => {
            res.status(200).json(admins);
        }
    ).catch(
        (error) => {
            res.status(404).json({
                error: error
            });
        }
    );
};