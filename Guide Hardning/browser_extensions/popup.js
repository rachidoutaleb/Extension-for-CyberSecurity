'use strict';

function sendMsg() {
    var query = document.getElementById('input-field').value;
    var xhr = new XMLHttpRequest();
    xhr.open('POST', 'http://127.0.0.1:5000/send-query', true);
    xhr.setRequestHeader('Content-Type', 'application/json');
    xhr.onreadystatechange = function() {
        if (xhr.readyState === 4 && xhr.status === 200) {
            var response = JSON.parse(xhr.responseText);
            var answer = response.answer;
            var comment_section = document.getElementById('comment-section');
            var new_div = document.createElement('div');
            new_div.classList.add("message");
            new_div.innerHTML = `<pre>${answer}</pre>`;
            comment_section.appendChild(new_div);
            document.getElementById('input-field').value = '';
        }
    };
    xhr.send(JSON.stringify({query: query}));
}

document.getElementById('input-field').addEventListener('keydown', function(event) {
    if (event.key === 'Enter') {
        event.preventDefault(); 
        sendMsg(); 
    }
});


var submitButton = document.getElementById('submit-btn');
submitButton.addEventListener('click', sendMsg);

document.getElementById('input-field').addEventListener('keydown', function(event) {
    if (event.key === 'Enter') {
        event.preventDefault();
        sendMsg();
    }
});

var clearButton = document.getElementById('clear-button'); 
clearButton.addEventListener('click', function() {
    document.getElementById('input-field').value = ''; 
});
