'use strict';

//get current open tab URL
function getCurrentTabUrl(callback) {
  chrome.tabs.query({ active: true, currentWindow: true }, function(tabs) {
    var tab = tabs[0];
    var url = tab.url;
    callback(url);
  });
}

function sendMessageToExtension(msg){
  chrome.tabs.query({ active: true, currentWindow: true }, function(tabs){
    const tab = tabs[0];
    console.log(tab);
    chrome.tabs.sendMessage(tab.id, msg)} //{ msg: "giveme"}
)
}



// Main extract button function

function extractButton(event){
  console.log("click Extract")

  chrome.tabs.query({ active: true, currentWindow: true }, function(tabs){
    const tab = tabs[0];
    //console.log(tab);
    chrome.tabs.sendMessage(tab.id, { msg: "extract"}, function(response) {
      console.log("Response from content script:", response);
      //console.log(extractURLsFromHtml(response.body))


      if (response) {
        //edit popup.js
        document.getElementsByClassName("email-sender")[0].innerText = response.sender
        document.getElementsByClassName("email-subject")[0].innerText = response.subject
        document.getElementsByClassName("email-body")[0].innerHTML = response.body
        let emailbody =response.body
        let url = extractURLsFromHtml(emailbody)
        let emailsubject = response.subject
        if(event == null) return

        // Phishing check section
        let phshing_text = document.getElementsByClassName("server-result")[0].querySelector(".p") 

        phshing_text.innerText = ""
        phshing_text.classList.remove("danger_text","safe_text")
        phshing_text.classList.add("loader")
        let chk  = checkPhishing(url[0]).then((response)=>{
          phshing_text.classList.remove("loader")
          if(response.startsWith("phishing")) phshing_text.classList.add("danger_text")
          else phshing_text.classList.add("safe_text")
          phshing_text.innerText = response + " probably" 
        }).catch((e)=>{phshing_text.innerText="error"})
               

        // Spam detection section
        let spam_text = document.getElementsByClassName("server-result")[0].querySelector(".s") 

        spam_text.innerText = ""
        spam_text.classList.remove("danger_text","safe_text")
        spam_text.classList.add("loader")
        let chk2  = checkSpam(emailsubject).then((response)=>{
          spam_text.classList.remove("loader")
          if(response.startsWith("s")) spam_text.classList.add("danger_text")
          else spam_text.classList.add("safe_text")
          spam_text.innerText = response 
        }).catch((e)=>{
          console.log("error in spam detection : " +e)
          spam_text.innerText="error"})

        
      
  
      } else {
        console.error('Failed to edit result, No response from content script' );
      }

      }
    )}
  )

}

async function checkPhishing(url){
  const myHeaders = new Headers();
  myHeaders.append("Content-Type", "application/json");

  const reqOption = {
    method: "POST",
    headers: myHeaders,
    body: JSON.stringify({'url': url}),
  };

try{
  const query = await fetch("http://localhost:5002/phishing_detection",reqOption)


  const response = await query.json()
  console.log("response = "+ response.result)
  return response.result
}
catch(e){
  return "error"
}
}

async function checkSpam(content){
  const myHeaders = new Headers();
  myHeaders.append("Content-Type", "application/json");

  const reqOption = {
    method: "POST",
    headers: myHeaders,
    body: JSON.stringify({'content': content}),
  };

try{
  const query = await fetch("http://localhost:5000/email_spam",reqOption)


  const response = await query.json()
  console.log("response = "+ response.result)
  return response.result
}
catch(e){
  return "error"
}
}



function extractURLsFromHtml(rawHTML){

var anchors = /<a\s[^>]*?href=(["']?)([^\s]+?)\1[^>]*?>/ig;
var links = [];
rawHTML.replace(anchors, function (_anchor, _quote, url) {
  links.push(url);
});
console.log("extracted links")
console.log(links);
return links
}

function chromeOnTabUpdatedListener (tabId, changeInfo, tab) {
    if (changeInfo.status) {
      console.log("The URL has changed");
      console.log("status = "+changeInfo.status)
    }
    if(changeInfo.status == 'complete'){
      console.log('true');
      setTimeout(function(){
          extractButton(null)
      },1000);

    }
  }

function chromeOnMessageListener (message, sender, sendResponse){
    console.log("received : "+ message)
  }

//-------------------------------------------------------------


//on load
function onLoadDOM(){
  document.getElementById('extract-btn').addEventListener('click', extractButton);
  chrome.tabs.onUpdated.addListener(chromeOnTabUpdatedListener);
  chrome.runtime.onMessage.addListener(chromeOnMessageListener);
  extractButton(null)

  chrome.tabs.query({ active: true, currentWindow: true }, function(tabs) {
    chrome.runtime.sendMessage({ msg: "test"}) //to backgorund.js
  });
}
document.addEventListener('DOMContentLoaded', onLoadDOM); 


// Upload PDF
document.getElementById('uploadBtnPDF').addEventListener('click', () => {
  const fileInput = document.getElementById('fileUploadPDF');
  const file = fileInput.files[0];
  const loaderPDF = document.getElementById('loaderPDF');
  const resultPDF = document.getElementById('resultPDF');

  if (file) {
      console.log('Fichier PDF sélectionné :', file.name);
      const formData = new FormData();
      formData.append('file', file);

      loaderPDF.style.display = 'inline-block';  // Show loader
      resultPDF.innerText = '';

      fetch('http://localhost:5003/pdf_detection', {
          method: 'POST',
          body: formData
      })
      .then(response => {
          console.log('Statut de la réponse :', response.status);
          return response.json();
      })
      .then(data => {
          console.log('Réponse du serveur :', data);
          if (data && data.message) {
              resultPDF.innerText = data.message;
          } else {
              resultPDF.innerText = 'Erreur: Réponse inattendue du serveur.';
          }
      })
      .catch(error => {
          console.error('Erreur:', error);
          resultPDF.innerText = 'Erreur lors de l\'analyse du fichier.';
      })
      .finally(() => {
          loaderPDF.style.display = 'none';  // Hide loader
      });
  } else {
      console.warn('Aucun fichier PDF sélectionné');
      alert('Veuillez sélectionner un fichier PDF.');
  }
});

// Upload EXE
document.getElementById('uploadBtnExe').addEventListener('click', () => {
  const fileInput = document.getElementById('fileUpload');
  const file = fileInput.files[0];
  const loaderExe = document.getElementById('loaderExe');
  const resultExe = document.getElementById('resultExe');

  if (file) {
      console.log('Fichier EXE sélectionné :', file.name);
      const formData = new FormData();
      formData.append('file', file);

      loaderExe.style.display = 'inline-block';  // Show loader
      resultExe.innerText = '';

      fetch('http://localhost:5001/malware_detection', {
          method: 'POST',
          body: formData
      })
      .then(response => {
          console.log('Statut de la réponse :', response.status);
          return response.json();
      })
      .then(data => {
          console.log('Réponse du serveur :', data);
          if (data && data.status === 'success') {
              resultExe.innerText = data.result;
          } else {
              resultExe.innerText = 'Erreur: ' + (data.message || 'Réponse inattendue du serveur.');
          }
      })
      .catch(error => {
          console.error('Erreur:', error);
          resultExe.innerText = 'Erreur lors de l\'analyse du fichier.';
      })
      .finally(() => {
          loaderExe.style.display = 'none';  // Hide loader
      });
  } else {
      console.warn('Aucun fichier EXE sélectionné');
      alert('Veuillez sélectionner un fichier EXE.');
  }
});



// design
document.addEventListener("DOMContentLoaded", function() {
  const buttons = document.querySelectorAll(".button1-container button");
  const containers = document.querySelectorAll(".email-container, .exe-container, .pdf-container");

  // Function to handle button clicks
  function handleButtonClick(targetId) {
    containers.forEach(container => {
      if (container.classList.contains(targetId)) {
        container.classList.add("active");
      } else {
        container.classList.remove("active");
      }
    });

    // Add Start Verification button to the Suspicious Mail container
    if (targetId === "email-container") {
      document.getElementById("start-verification-btn").style.display = "inline-block";
    } else {
      document.getElementById("start-verification-btn").style.display = "none";
    }
  }

  // Attach event listeners to buttons
  buttons.forEach(button => {
    button.addEventListener("click", function() {
      const targetId = this.getAttribute("data-target");
      handleButtonClick(targetId);
    });
  });

  // Show email details when Start Verification button is clicked
  document.getElementById("start-verification-btn").addEventListener("click", function() {
    document.querySelector(".email-container .server-result").style.display = "block";
  });
});
