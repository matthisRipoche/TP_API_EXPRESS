const determineCoupureGeneric = require("../utils/DabService");

exports.getDab = (req, res) => {
    res.render("dab", {
        title: "DAB",
        result: null,
        amount: null,
        devise: null,
    });
};

exports.postDab = (req, res) => {
    const { amount, devise } = req.body;

    const data = determineCoupureGeneric({
        amount,
        currencyType: devise,
    });

    res.render("dab", {
        title: "DAB",
        amount: data.amount,
        devise: data.currency,
        result: data.result,
    });
};
