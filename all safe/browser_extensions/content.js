
const isEmailOpened = (document) => document.getElementsByClassName("hP").length > 0 ? true:false
if (!window.firstTimeExecuted) {
    console.log("executed content.js");
    window.firstTimeExecuted = true;
    
    chrome.runtime.onMessage.addListener((data, sender, sendResponse) => {
        console.log("received message : " + data.msg);
        if(data.msg == "urlchange"){
            console.log("url changed" + data.status)
            isEmailOpened = document.getElementsByClassName("hP").length > 0 ? true:false
            if(isEmailOpened){console.log("email opened !")}
            else {console.log("email NOT opened !")}            
            //TODO
        }
        if(data.msg == "extract"){
            if(!isEmailOpened(document)) 
                console.log("not email")
            else{
                console.log("extracting")
                let extractor = new ExtractorEmail(document)
                console.log(extractor)
                a = extractor.sender
                b = extractor.subject.innerText
                c = extractor.body.innerHTML
                console.log("body is :")
                console.log(c)
                sendResponse({
                    'sender' : a,
                    'subject' : b,
                    'body' : c
                })
            }

        }
    });
}

function getCurrentTabUrl(callback) {
    chrome.tabs.query({ active: true, currentWindow: true }, function(tabs) {
      var tab = tabs[0];
      var url = tab.url;
      callback(url);
    });
  }

