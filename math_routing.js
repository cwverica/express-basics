const express = require('express');
const myError = require('./myError');
const app = express();

app.use(express.json());

function meanCalc(numArr) {
    let sum = 0;
    numArr.forEach(e => sum = sum + e);
    return (sum / (numArr.length));
}

function medianCalc(numArr) {
    numArr.sort((a, b) => { return a - b });
    if (numArr.length % 2 === 1) {
        let index = Math.ceil((numArr.length) / 2) - 1;
        return numArr[index];
    } else {
        let ind1 = numArr.length / 2;
        let ind2 = ind1 - 1;
        return (numArr[ind1] + numArr[ind2]) / 2;
    }
}

function modeCalc(numStrArr) {
    const repititions = {};
    numStrArr.forEach(e => {
        if (!repititions[e]) {
            repititions[e] = 1
        } else {
            repititions[e] = repititions[e] + 1;
        }
    });

    const pairs = Object.entries(repititions).sort((a, b) => b[1] - a[1])
    let value = parseInt(pairs[0][0]);
    if (pairs[0][1] === pairs[1][1]) {
        value = 'This group is multimodal'
    }
    return value;
}


app.get("/mean", function (req, res, next) {
    try {
        checkValidity(req.query.nums, next);
        let numStrArr = req.query.nums.split(',');
        let numArr = numStrArr.map(e => parseInt(e));
        let value = meanCalc(numArr);
        const response = {
            operation: "mode",
            value
        }

        return res.json(response);
    } catch (err) {
        return next(err);
    }

});



app.get("/median", function (req, res, next) {
    try {
        checkValidity(req.query.nums, next);
        let numStrArr = req.query.nums.split(',');
        let numArr = numStrArr.map(e => parseInt(e));
        let value = medianCalc(numArr);


        const response = {
            operation: "median",
            value
        }

        return res.json(response);
    } catch (err) {
        return next(err);
    }
})



app.get("/mode", function (req, res, next) {
    try {
        checkValidity(req.query.nums, next);
        let numStrArr = req.query.nums.split(',');
        let value = modeCalc(numStrArr);

        const response = {
            operation: "mode",
            value
        }

        return res.json(response);
    } catch (err) {
        return next(err);
    }
})


app.get("/all", function (req, res, next) {
    try {
        checkValidity(req.query.nums, next);
        let numStrArr = req.query.nums.split(',');
        let numArr = numStrArr.map(e => parseInt(e));
        let mean = meanCalc(numArr);
        let median = medianCalc(numArr);
        let mode = parseInt(modeCalc(numStrArr));

        const response = {
            operation: "all",
            mean,
            median,
            mode
        }

        return res.json(response);
    } catch (err) {
        return next(err);
    }
});


function checkValidity(nums, next) {
    try {
        if (!nums) {
            throw new myError("You must povide numbers.", 400)
        };
        let numStrArr = nums.split(',');
        numStrArr.forEach(e => {
            if (isNaN(e)) {
                throw new myError(`${e} is not a number.`, 400)
            }
        });
    } catch (err) {
        return next(err);
    }
}


app.use(function (err, req, res, next) {
    let status = err.status || 500;
    let message = err.message;

    return res.status(status).json({
        error: { message, status }
    });
});

// app.listen(3000, function () {
//     console.log('Server is listening on port 3000');
// });

module.exports = {
    meanCalc,
    medianCalc,
    modeCalc
}