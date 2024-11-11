const userModel = require('../models/user-model');
const bcrypt = require('bcrypt');
const { generateToken } = require('../utils/generateToken');

//********** Register Code ************//
module.exports.registerUser = async function (req, res) {
    try {
        const { email, fullname, password } = req.body;

        let user = await userModel.findOne({ email:email });
        if (user) {
            req.flash("error", "Account already exists, Please login!");
            res.redirect("/");
            
        }

        bcrypt.genSalt(12, function (err, salt) {
            if (err) return res.send(err.message);

            bcrypt.hash(password, salt, async function (err, hash) {
                if (err) {
                    return res.send(err.message);
                }

                let newUser = await userModel.create({
                    email,
                    fullname,
                    password: hash
                });

                let token = generateToken(newUser);
                res.cookie("token", token);
                req.flash("error", "user registered succesfully");
                res.redirect("/");
            });
        });
    } catch (err) {
        return res.send(err.message);
    }
};

//************** Login Code **************//
module.exports.loginUser = async function (req, res) {
    const { email, password } = req.body;

    let user = await userModel.findOne({ email });
    if (!user) {
        req.flash("error","Incorrect email or password");
        res.redirect("/");
    }

    bcrypt.compare(password, user.password, (err, result) => {
        if (err) return res.send("Error comparing passwords");

        if (result) {
            let token = generateToken(user);
            res.cookie("token", token);
            req.flash("error","Login successfull!");
            res.redirect("/shop");
        } else {
            req.flash("error","Incorrect email or password");
            res.redirect("/");
        }
    });
};


//**********logout code*************//

module.exports.logout = function(req,res)
{
    res.cookie("token", "");
    res.redirect("/");
}