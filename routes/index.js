var express = require('express');
var router = express.Router();

/* GET home page. */
router.get('/', isLoggedin ,function(req, res, next) {
  res.render('index', { title: 'Members' });
});

module.exports = router;

function isLoggedin(req,res,next) {
    if (req.isAuthenticated()) {
        return next();
    }
    res.redirect('/users/login');
}