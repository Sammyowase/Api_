const validateUser = (req, res, next) => {
    console.log(req.headers);
   next();
}

module.exports = validateUser 