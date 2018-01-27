let tooltip_visible = false;
var word = "";
document.addEventListener("dblclick",get_word,false);
document.addEventListener("click",hide_tooltip,false);

/* -- ulility code for mouse position*/
var x = null;
var y = null;

document.addEventListener('mousemove', onMouseUpdate, false);
document.addEventListener('mouseenter', onMouseUpdate, false);

function onMouseUpdate(e) {
    x = e.pageX;
    y = e.pageY;
}

/*------------------------------------------------------------------------ */

chrome.extension.onMessage.addListener(function(msg, sender, sendResponse) {
      get_word(msg.selection);
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
function get_meaning(word){
    var response = "{\r\n\t\"word\": \"dog\",\r\n\t\"language\": \"english\",\r\n\t\"meanings\": [{\r\n\t\t\t\"partofSpeech\": \"noun\",\r\n\t\t\t\"text\": \"An animal found specially in college campus\"\r\n\t\t},\r\n\t\t{\r\n\t\t\t\"partOfSpeech\": \"adjective \",\r\n\t\t\t\"text\": \"an abuse used by people generally for insulting someone\"\r\n\t\t}\r\n\t]\r\n}   ";
    return JSON.parse(response);
}

/**
 * method to save word in user history
 */
function save_word(event){
    //console.log(event.path[0].attributes["difficulty"]);
    let difficulty = event.path[0].attributes["difficulty"].nodeValue;
    alert(word+" : "+difficulty);
}

/** 
 *  Create Tooltip for selected word/ phrase
 *  params: selection
*/
function show_tooltip(selection){
    /*making extra sure that no more than one tooltip is visible at a time */
    hide_tooltip();
    
    px = x;
    py = y-160;
    /* getting accurate x & y in case of double tap */
    if(event != undefined){
        px = event.clientX;     // Get the horizontal coordinate
        py = event.clientY;     // Get the vertical coordinate
    }
    
    let word = get_meaning(selection);

    let text = document.createElement("div");
    let strong = document.createElement("strong");
    let textNode = document.createTextNode(selection);
    let meanings = document.createElement("ol");
    //console.log(word);
    for(let meaning of word.meanings){
        //console.log(meaning);
        let li = document.createElement("li");
        let partOfSpeech = document.createTextNode("["+meaning.partOfSpeech +"] "); 
        let meaning_text = document.createTextNode(meaning.text);
        li.appendChild(partOfSpeech);
        li.appendChild(meaning_text);
        meanings.appendChild(li);
    }
    let save_buttons = document.createElement("span");
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
        show_tooltip(selection);
    }
}