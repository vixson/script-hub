function highlightSelection(root, containerRoot, container, secureContainer, removeble, cleanSelection, clickFunction) {
    /*
    root: is the local machine window: window or document, for polymer framework use this.shadowRoot. || value: windows root
    containerRoot: is the textbox or input - textare or div-contenteditable. || value: HTML element, preferrable DIV HTML element
    container: is the elementNode to use as the highlighter. || value: HTML element
    secureContainer: this ensure that selection is not made inside another container. || value: boolean
    removeble: if the highlighted selected text can be removed? || value: boolean
    cleanSelection: if the selection shold ignor white spacing before and after a selected phrase or word? || value: boolean
    clickFunction: is the function to execute when container is clicked. || value: function()
    */
    var containerSecured = false;
    var selectionContents = '';
    var selectedContent = '';
    var selectedResult = {};
    selectedResult.value = '';
    selectedResult.errorMsg = '';
    selectedResult.highlighterNode = null;
    selectedResult.type = -1;
    if(root.getSelection().rangeCount > 0){
        var range = root.getSelection().getRangeAt(0);
        var _parent = range.startContainer.parentNode;
        var _inContainerRoot = false;
        var _loopParent = true;
        //Checkes if the parent element is the actual provided element
        while(_loopParent){
            _inContainerRoot = _parent == containerRoot;
            if(_parent == null || _inContainerRoot){
                _loopParent = false;
            } else {_parent = _parent.parentNode;}
        }
        if(secureContainer){
            //containerSecured = range.startContainer.parentNode.classList.contains('highSpan') < 0;
        }
        //Main highlighter creation
        if(_inContainerRoot/* && range.startContainer == range.endContainer*/){
            var contentContainer = document.createElement('span');
            var cancelBtn = document.createElement('span');
            container.setAttribute('style','display: inline-block; margin: 3px; border-radius: 2px; padding: 3px;');
            container.classList.add('highSpan');
            container.contentEditable = false;
            cancelBtn.setAttribute('style','display: inline-block; margin-left: 5px; border-radius: 50%; height: 10px; width: 10px; background-color: #b54040');
            if(container == null){
                container = document.createElement('span');
            }
            //For range selection
            if(root.getSelection().type == 'Range'){
                container.classList.add('selSpan');
                container.style.backgroundColor = '#b0c9f8';
                container.style.border = '1px solid #547bc1';
                container.highlightType = 0;
                if(cleanSelection){
                    range = trimSelection(root, range);
                }
                markedContent = range.extractContents();
                selectedContent = markedContent.textContent;
                selectionContent = selectedContent;
            }
            /*For cursor placed selection*/
            else if(root.getSelection().type == 'Caret'){
                container.classList.add('highBlank');
                container.style.fontFamily = 'Courier New, Courier, monospace';
                container.style.backgroundColor = '#a3a7af';
                container.style.border = '1px solid #646871';
                container.highlightType = 1;
                selectionContent = 'BLANK';
            }
            contentContainer.innerText = selectionContent;
            container.selectedContent = selectedContent;
            container.append(contentContainer);
            //For removing selection
            if(removeble){
                cancelBtn.setAttribute('class', 'removeBtn');
                cancelBtn.title = 'Remove';
                cancelBtn.addEventListener('click', function(ev){
                    var selSpan = ev.currentTarget.parentNode;
                    var _prevValue = (selSpan.previousSibling != null) ? selSpan.previousSibling.nodeValue : '';
                    var _nextValue = (selSpan.nextSibling != null) ? selSpan.nextSibling.nodeValue : '';
                    var newValue = _prevValue + selSpan.selectedContent + _nextValue;
                    if(selSpan.previousSibling != null){selSpan.previousSibling.nodeValue = newValue;}
                    //CLEANS UP UNUSED TEXT NODES
                    if(selSpan.nextSibling != null){selSpan.parentNode.removeChild(selSpan.nextSibling);}
                    selSpan.parentNode.removeChild(selSpan);
                });
                container.append(cancelBtn);
            }
            if(!(clickFunction == null || clickFunction == undefined)){
                contentContainer.addEventListener('click', clickFunction);
            }
            //Inserts the selector container at the selection range
            range.insertNode(container);
            //Returned result for  the selection
            selectedResult.value = selectedContent;
            selectedResult.highlighterNode = container;
            selectedResult.type = container.highlightType;
        }
        else{
            selectedResult.errorMsg = 'Please select only text on the provided container';
        }
        //root.getSelection().getRangeAt(0).detach;
    }
    else{
        selectedResult.errorMsg = 'Please select a range of text';
    }
    cleanContainer(containerRoot);
    //SELECTION HIGHLIGHTER WRITTEN BY VIXSON, 17 JULY 2017
    return selectedResult;
}
function noteHighlighter(root, containerRoot, container, removeble, clickFunction) {
    /*
    root: is the local machine window: window or document, for polymer framework use this.shadowRoot. || value: windows root
    containerRoot: is the textbox or input - textare or div-contenteditable. || value: HTML element, preferrable DIV HTML element
    container: is the elementNode to use as the highlighter. || value: HTML element
    removeble: if the highlighted selected text can be removed? || value: boolean
    clickFunction: is the function to execute when container is clicked. || value: function()
    */
    var selectionContents = '';
    var selectedContent = '';
    var rawContent = '';
    var selectedResult = {};
    selectedResult.value = '';
    selectedResult.errorMsg = '';
    selectedResult.highlighterNode = null;
    selectedResult.type = -1;
    if(root.getSelection().rangeCount > 0){
        var range = root.getSelection().getRangeAt(0);
        var _parent = range.startContainer.parentNode;
        var _inContainerRoot = false;
        var _loopParent = true;
        //Checkes if the parent element is the actual provided element
        while(_loopParent){
            _inContainerRoot = _parent == containerRoot;
            _parent = _parent.parentNode;
            if(_parent == null || _inContainerRoot){
                _loopParent = false;
            }
        }
        //Main highlighter creation
        if(_inContainerRoot){
            var contentContainer = document.createElement('span');
            var cancelBtn = document.createElement('span');
            container.setAttribute('style','display: inline-block; margin: 3px; border-radius: 2px; padding: 3px;');
            container.classList.add('highSpan');
            container.contentEditable = false;
            cancelBtn.setAttribute('style','display: inline-block; margin-left: 5px; border-radius: 50%; height: 10px; width: 10px; background-color: #b54040');
            if(container == null){
                container = document.createElement('span');
            }
            //For range selection
            if(root.getSelection().type == 'Range'){
                container.classList.add('selSpan');
                container.style.backgroundColor = '#b0c9f8';
                container.style.border = '1px solid #547bc1';
                container.highlightType = 0;
                selectedContent = trimSelection(root, range).extractContents();
                selectionContent = selectedContent;
            }
            /*For cursor placed selection*/
            else if(root.getSelection().type == 'Caret'){
                container.classList.add('highBlank');
                container.style.fontFamily = 'Courier New, Courier, monospace';
                container.style.backgroundColor = '#a3a7af';
                container.style.border = '1px solid #646871';
                container.highlightType = 1;
                selectionContent = 'BLANK';
            }
            contentContainer.innerText = selectionContent;
            container.selectedContent = selectedContent;
            container.append(contentContainer);
            //For removing selection
            if(removeble){
                cancelBtn.setAttribute('class', 'removeBtn');
                cancelBtn.title = 'Remove';
                cancelBtn.addEventListener('click', function(ev){
                    var selSpan = ev.currentTarget.parentNode;
                    var _prevValue = (selSpan.previousSibling != null) ? selSpan.previousSibling.nodeValue : '';
                    var _nextValue = (selSpan.nextSibling != null) ? selSpan.nextSibling.nodeValue : '';
                    var newValue = _prevValue + selSpan.selectedContent + _nextValue;
                    if(selSpan.previousSibling != null){selSpan.previousSibling.nodeValue = newValue;}
                    //CLEANS UP UNUSED TEXT NODES
                    if(selSpan.nextSibling != null){selSpan.parentNode.removeChild(selSpan.nextSibling);}
                    selSpan.parentNode.removeChild(selSpan);
                });
                container.append(cancelBtn);
            }
            if(!(clickFunction == null || clickFunction == undefined)){
                contentContainer.addEventListener('click', clickFunction);
            }
            //Inserts the selector container at the selection range
            range.insertNode(container);
            selectedResult.value = selectedContent;
            selectedResult.highlighterNode = container;
            selectedResult.type = container.highlightType;
        }
        else{
            selectedResult.errorMsg = 'Please select the text on the provided container';
        }
        //root.getSelection().getRangeAt(0).detach;
    }
    else{
        selectedResult.errorMsg = 'Please select a range of text';
    }
    //Cleans up parent container
    cleanContainer(containerRoot);
    //NOTE HIGHLIGHTER IS A CUSTOM UPGRADE OF HIGHLIGHT SELECTION WRITTEN BY VIXSON, 24 JAN 2018 :: 7:46 PM
    return selectedResult;
}
function trimWhitespace(text){
    var _startIndex = 0;
    var _endIndex = 0;
    var _hasStart = false;
    var _hasEnd = false;
    for(var _i = 0; _i < text.length; _i++){
        if(!/[\s]/.test(text[_i])){
            _startIndex = !_hasStart ? _i : _startIndex;
            _endIndex = _i;
            _hasStart = true;
            _hasEnd = false;
        }
        else{
            _hasEnd = true;
            _endIndex = !_hasEnd ? _i : _endIndex;
        }
    }
    return {
        text: text,
        value: text.substring(_startIndex, _endIndex + 1),
        startindex: _startIndex,
        endindex: _endIndex,
    };
}
function trimSelection(rt, rg){
    var _trimmedContent = {};
    var _rawContent = '';
    var _startHIndex = 0;
    var _endHIndex = 0;
    var _startNode = rg.startContainer;
    var _endNode = rg.endContainer;
    var _range = null;
    //Makes a copy of the raw selection, its node and the text contents
    _rawContent = rg.cloneContents().textContent;
    //Trims white spaces on both edge of the selected (raw) content
    _trimmedContent = trimWhitespace(_rawContent);
    //Gets the now start and end position for new selection
    _startHIndex = rg.startOffset + _trimmedContent.startindex;
    _endHIndex = rg.endOffset - (_rawContent.length - _trimmedContent.endindex - 1);
    //Cleans up old selection range
    rg.detach();
    //Creates new selection range
    _range = document.createRange();
    //Sets the position for new selection on startNode and endNode
    _range.setStart(_startNode, _startHIndex);
    _range.setEnd(_endNode, _endHIndex);
    //Adds selection range (SELECT NEW RANGE OF TEXT)
    rt.getSelection().removeAllRanges();
    rt.getSelection().addRange(_range);
    return _range;
}
function cleanContainer(container){
    //Cleans up and Rearrange an element
    var _isNewChild = true;
    var _oldChild = null;
    var _firstChild = null;
    for(var _i = 0; _i < container.childNodes.length; _i++){
        if(container.childNodes[_i].nodeName != 'DIV'){
            if(_isNewChild){
                _oldChild = container.childNodes[_i];
                _firstChild = document.createElement('div');
                container.replaceChild(_firstChild, container.childNodes[_i]);
                _firstChild.append(_oldChild);
                _isNewChild = false;
            }
            else{
                _firstChild.append(container.childNodes[_i]);
                _i--;
            }
        }
        else {
            _isNewChild = true;
            if(container.childNodes[_i].nodeValue == '' || container.childNodes[_i].innerHTML == '' || container.childNodes[_i].innerHTML == null){
                container.removeChild(container.childNodes[_i]);
            }
        }
    }
    //Clean Container Update by VIXSON 24 JAN 2018 :: 11:17 PM
}
/*

function setCookie(cname, cvalue, exdays, cpath) {
    var d = new Date();
    d.setTime(d.getTime() + (exdays * 24 * 60 * 60 * 1000));
    var expires = 'expires='+d.toUTCString();
    document.cookie = cname + '=' + cvalue + ';' + expires + ';path=/' + cpath;
}

function getCookie(cname) {
    var name = cname + '=';
    var ca = document.cookie.split(';');
    for(var i = 0; i < ca.length; i++) {
        var c = ca[i];
        while (c.charAt(0) == ' ') {
            c = c.substring(1);
        }
        if (c.indexOf(name) == 0) {
            return c.substring(name.length, c.length);
        }
    }
    return '';
}
*/
