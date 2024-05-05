document.getElementById('check-btn').addEventListener('click', function() {
    const userInput = document.getElementById('user-input').value;
    if (!userInput) {
        alert("Please provide a phone number");
        return;
    }
    const isValid = validatePhoneNumber(userInput);
    const resultText = isValid ? `Valid US number: ${userInput}` : `Invalid US number: ${userInput}`;
    document.getElementById('results-div').innerText = resultText;
});

document.getElementById('clear-btn').addEventListener('click', function() {
    document.getElementById('user-input').value = '';
    document.getElementById('results-div').innerText = '';
});

function validatePhoneNumber(number) {
    const regex = /^(1\s?)?(\(\d{3}\)|\d{3})([\s.-]?)\d{3}([\s.-]?)\d{4}$/;
    return regex.test(number);
}
