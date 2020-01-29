const validate = require('validate.js')
const allConstraints = require('../routes/constraints')
const { iota } = require('../config/')


//To convert any caractere of string in ASCII
const normalizeCase = (string) => {
    return string.normalize('NFD').replace(/[\u0300-\u036f]/g, "")
}

const asciiObj = (object) => {
    let obj = {}
    Object.keys(object).forEach(function(item){
         obj[item] = normalizeCase(object[item])
    });
    return obj
}

//

// Error wrapper to use in Express
wrapAsync = (fn) => {
    return (req, res, next) => {
        fn(req, res, next).catch(next)
    }
}


///////////////////////////////
// Middlewares
///////////////////////////////
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

// If necessary test the availablity of the network before every request, i will use this middleware.
// For while I decided that isn't necessary, but it's pretty and I'll leave it here
iotaMiddleware = (req, res, next) => {
    iota
      .getNodeInfo()
      .then(response => {
        next()
      })
      .catch(err => {
        console.log("[IOTA] The tangle not conected.")
        next(new Error('Não foi possível se conectar ao The Tangle. Por favor verifique o provider.'))
      })
}

module.exports = {
    wrapAsync,
    normalizeCase,
    asciiObj,
    constraintsMiddleware,
    iotaMiddleware,
    errorMiddleware
}