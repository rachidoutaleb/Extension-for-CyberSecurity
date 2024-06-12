chrome.runtime.onMessage.addListener(function(request, sender, sendResponse) {
    if (request.action === 'sendQuery') {
        fetch('http://127.0.0.1:5000/send-query', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({query: request.query})
        })
        .then(response => response.json())
        .then(data => {
            sendResponse(data);
        })
        .catch(error => {
            console.error('Error:', error);
        });
        return true; 
    }
});