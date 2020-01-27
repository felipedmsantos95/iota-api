const validate = require('validate.js')
const allConstraints = require('../routes/constraints')



// Error wrapper to use in Express
wrapAsync = (fn) => {
    return (req, res, next) => {
        fn(req, res, next).catch(next)
    }
}

constraintsMiddleware = (req, res, next) => {
    const constraints = allConstraints[req.url]
    // If there is no constraint for this route, then leave it be
    if (!constraints) {
        //console.log("[CONSTRAINTS] No constraints, next.")
        return next()
    }
    const errors = validate(req.body, constraints)

    if (errors) {
        //console.log("[CONSTRAINTS] Constraint error.")
        var errs = []
        for (var key in errors)
        {
            errors[key].forEach(el => {
                errs.push(el)
            });
        }
        return res.status(500).send(errs)
    }
    else {
        //console.log("[CONSTRAINTS] Good to go. ")
        return next()
    }
}

errorMiddleware = (err, req, res, next) => {
    if(err.name === 'ValidationError')
    {
        var errors = []
        for(var key in err.errors)
            errors.push(err.errors[key].message + ' -  ' + err.errors[key].value)
        return res.status(500).json(errors)
    }

    console.log("[ERROR HANDLER]  -  " + err.message)
    res.status(500).json([err.message])
    
}

module.exports = {
    wrapAsync,
    constraintsMiddleware,
    errorMiddleware
}