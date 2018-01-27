let tooltip_visible = false;
var word = "";
var wordbook_token = "";
document.addEventListener("dblclick",get_word,false);
document.addEventListener("click",hide_tooltip,false);

/*
    getting and saving access token in current page localstorage
*/
chrome.extension.sendRequest({message: "token"}, function(response) {
    console.log("API Token : " + response.token);
    wordbook_token = response.token;
});


/**
 * Utility method for sending post request to WordBook API 
 */
function post(path, params, method) {
    method = method || "post"; // Set method to post by default if not specified.

    // The rest of this code assumes you are not using a library.
    // It can be made less wordy if you use one.
    var form = document.createElement("form");
    form.setAttribute("method", method);
    form.setAttribute("action", path);

    for(var key in params) {
        if(params.hasOwnProperty(key)) {
            var hiddenField = document.createElement("input");
            hiddenField.setAttribute("type", "hidden");
            hiddenField.setAttribute("name", key);
            hiddenField.setAttribute("value", params[key]);

            form.appendChild(hiddenField);
        }
    }

    document.body.appendChild(form);
    form.submit();
}

/* -- Ulility code for mouse position*/
var x = null;
var y = null;

document.addEventListener('mousemove', onMouseUpdate, false);
document.addEventListener('mouseenter', onMouseUpdate, false);

function onMouseUpdate(e) {
    x = e.pageX;
    y = e.pageY;
}

chrome.extension.onMessage.addListener(function(msg, sender, sendResponse) {
      get_word();
});

/**
 * get parent of selected element
 */
function getSelectionParentElement() {
    var parentEl = null, sel;
    if (window.getSelection) {
        sel = window.getSelection();
        if (sel.rangeCount) {
            parentEl = sel.getRangeAt(0).commonAncestorContainer;
            if (parentEl.nodeType != 1) {
                parentEl = parentEl.parentNode;
            }
        }
    } else if ( (sel = document.selection) && sel.type != "Control") {
        parentEl = sel.createRange().parentElement();
    }
    return parentEl;
}

/**
 * gets the meaning of selected word/ phrase from NodeJS API
 */
function get_meaning(word, event){
    var empty_response = "{\r\n\t\"word\": \""+word+"\",\r\n\t\"language\": \"language\",\r\n\t\"meanings\": []\r\n}";
    /* sending post request and getting meaning*/
    var xhttp = new XMLHttpRequest();
    xhttp.onreadystatechange = function() {
        if (this.readyState == 4 && this.status == 200) {
            console.log(this.response);
            console.log(this.responseText);
            show_tooltip(word, JSON.parse(this.responseText).data, event);
        }else if (this.readyState == 4 && (this.status == 500 || this.status == 400 || this.status == 404)){
            show_tooltip(word, JSON.parse(empty_response), event);
        }
    };
    xhttp.open("GET", "http://arvinddhakad.me/hack36/api/dictionary/word/"+word, true);
    xhttp.send();
    //return JSON.parse(response);
}

/**
 * method to save word in user history
 */
function save_word(event){
    
    let difficulty = event.path[0].attributes["difficulty"].nodeValue;
    //alert(word+" : "+difficulty);
    //post("http://arvinddhakad.me/hack36/api/user/saveWord", {word: word, difficulty: difficulty})
    
    var data = "word="+word+"&difficulty="+difficulty;

    var xhr = new XMLHttpRequest();
    xhr.withCredentials = true;

    xhr.addEventListener("readystatechange", function () {
        if (this.readyState === 4) {
            console.log(this.responseText);
            alert("Word Saved!");
        }
    });

    xhr.open("POST", "http://arvinddhakad.me/hack36/api/user/saveWord");
    xhr.setRequestHeader("Content-Type", "application/x-www-form-urlencoded");
    xhr.setRequestHeader("Authorization", wordbook_token);
    xhr.setRequestHeader("Cache-Control", "no-cache");

    xhr.send(data);
}

/** 
 *  Create Tooltip for selected word/ phrase
 *  params: selection
*/
function show_tooltip(selection, word, event){
    /*making extra sure that no more than one tooltip is visible at a time */
    let not_found = false;
    hide_tooltip();
    
    px = x;
    py = y-160;
    /* getting accurate x & y in case of double tap */
    if(event != undefined){
        px = event.clientX;     // Get the horizontal coordinate
        py = event.clientY;     // Get the vertical coordinate
    }
    
    //let word = get_meaning(selection);
    console.log("------ Back to show tooltip -------");
    console.log(word);
    console.log("-----------------------------------");
    let text = document.createElement("div");
    let strong = document.createElement("strong");
    let textNode = document.createTextNode(selection);
    let meanings = document.createElement("ol");
    let save_buttons = document.createElement("span");
    let i=1;

    if(word.meanings.length <= 0){
        not_found = true;
    }
    
    if(not_found){
        meanings.appendChild(document.createTextNode("Definition not Found!!"));
        let googleit = document.createElement("a");
        googleit.appendChild(document.createTextNode("'google it'"));
        googleit.setAttribute("target", "_blank");
        googleit.setAttribute("id", "more-info");
        googleit.setAttribute("href", "http://google.com/search?q=define "+word.word);
        save_buttons.appendChild(googleit);
    }else{
        for(let meaning of word.meanings){
            //console.log(meaning);
            let li = document.createElement("li");
            let partOfSpeech = document.createTextNode("["+meaning.partOfSpeech +"] "); 
            let meaning_text = document.createTextNode(meaning.text);
            li.appendChild(partOfSpeech);
            li.appendChild(meaning_text);
            meanings.appendChild(li);
            if(i == 4){
                break;
            }
            i++;
        }
        let easy = document.createElement("button");
        let medium = document.createElement("button");
        let difficult = document.createElement("button");
        let moreinfo = document.createElement("a");
        moreinfo.appendChild(document.createTextNode("more.."));
        moreinfo.setAttribute("target", "_blank");
        moreinfo.setAttribute("id", "more-info");
        moreinfo.setAttribute("href", "http://wordbook.com/"+word.language+"/"+word.word);

        easy.addEventListener('click', save_word, false);
        medium.addEventListener('click', save_word, false);
        difficult.addEventListener('click', save_word, false);
        
        easy.appendChild(document.createTextNode("Easy"));
        medium.appendChild(document.createTextNode("Medium"));
        difficult.appendChild(document.createTextNode("Difficult"));

        easy.setAttribute("difficulty", "easy");
        medium.setAttribute("difficulty", "medium");
        difficult.setAttribute("difficulty", "difficult");

        save_buttons.appendChild(easy);
        save_buttons.appendChild(medium);
        save_buttons.appendChild(difficult)    
        save_buttons.appendChild(moreinfo);
    }

    strong.appendChild(textNode);
    text.appendChild(strong);
    text.appendChild(meanings);
    text.appendChild(save_buttons);
    text.id = "wordbook-tooltip";
    text.style.position = "absolute";
    text.style.left = px+"px";
    text.style.top = (py+document.documentElement.scrollTop)+"px";
    document.body.appendChild(text);
    tooltip_visible = true;
}

function hide_tooltip(){
    if(tooltip_visible){
        let p = document.querySelector("#wordbook-tooltip");
        p.parentNode.removeChild(p);
        tooltip_visible = false;
    }
}

function get_word(){
    let selection = window.getSelection().toString();
    if(selection.trim().length > 0){
        word = selection;
        get_meaning(selection,event);
        //show_tooltip(selection);
    }
}