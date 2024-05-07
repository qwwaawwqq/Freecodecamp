const apiUrl = 'https://api.quotable.io/random';

function fetchQuote() {
    fetch(apiUrl)
        .then(response => response.json())
        .then(data => {
            document.getElementById('text').textContent = `"${data.content}"`;
            document.getElementById('author').textContent = `- ${data.author}`;
            document.getElementById('tweet-quote').href = `https://twitter.com/intent/tweet?text=${encodeURIComponent(`"${data.content}" - ${data.author}`)}`;
        })
        .catch(error => console.error('Error fetching quote: ', error));
}

document.getElementById('new-quote').addEventListener('click', fetchQuote);

// Fetch a quote initially when the page loads
fetchQuote();
