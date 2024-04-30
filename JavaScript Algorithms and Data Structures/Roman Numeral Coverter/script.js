document.getElementById('convert-btn').addEventListener('click', function() {
    const number = parseInt(document.getElementById('number').value);
    const output = document.getElementById('output');

    if (isNaN(number)) {
        output.textContent = 'Please enter a valid number';
    } else if (number < 1) {
        output.textContent = 'Please enter a number greater than or equal to 1';
    } else if (number >= 4000) {
        output.textContent = 'Please enter a number less than or equal to 3999';
    } else {
        output.textContent = convertToRoman(number);
    }
});

function convertToRoman(num) {
    const romanPairs = {
        M: 1000,
        CM: 900,
        D: 500,
        CD: 400,
        C: 100,
        XC: 90,
        L: 50,
        XL: 40,
        X: 10,
        IX: 9,
        V: 5,
        IV: 4,
        I: 1
    };
    let roman = '';

    for (let key in romanPairs) {
        while (num >= romanPairs[key]) {
            roman += key;
            num -= romanPairs[key];
        }
    }

    return roman;
}
