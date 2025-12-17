module.exports = function determineCoupureGeneric({ amount, currencyType }) {
    const currencies = {
        EUR: {
            name: "€",
            values: [500, 200, 100, 50, 20, 10, 5, 2, 1],
            bills: [500, 200, 100, 50, 20, 10, 5],
        },
        USD: {
            name: "$",
            values: [100, 50, 20, 10, 5, 1],
            bills: [100, 50, 20, 10, 5, 1],
        },
    };

    const currency = currencies[currencyType];
    let remaining = Number(amount);
    let result = [];

    currency.values.forEach((value) => {
        const count = Math.floor(remaining / value);
        if (count > 0) {
            result.push({
                value,
                count,
                type: currency.bills.includes(value) ? "billet" : "pièce",
            });
            remaining -= count * value;
        }
    });

    return {
        amount,
        currency: currency.name,
        result,
    };
};
