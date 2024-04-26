document.getElementById('check-btn').addEventListener('click', function() {
    const text = document.getElementById('text-input').value;
    if (!text) {
        alert("Please input a value");
        return;
    }
    const result = isPalindrome(text) ? `${text} is a palindrome` : `${text} is not a palindrome`;
    document.getElementById('result').textContent = result;
});

function isPalindrome(text) {
    const cleaned = text.toLowerCase().replace(/[\W_]/g, '');
    const reversed = cleaned.split('').reverse().join('');
    return cleaned === reversed;
}
