function highlightSelection(root, containerRoot, container, cancelable, clickFunction) {
    var selectionContents = '';
    var selectedContents = '';
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
        while(_loopParent){
            _inContainerRoot = _parent == containerRoot;
            _parent = _parent.parentNode;
            if(_parent == null || _inContainerRoot){
                _loopParent = false;
            }
        }
        if(_inContainerRoot){
            var contentContainer = document.createElement('span');
            var cancelBtn = document.createElement('span');
            container.setAttribute('style','display: inline-block; margin: 3px; border-radius: 2px; padding: 3px;');
            cancelBtn.setAttribute('style','display: inline-block; margin-left: 5px; border-radius: 50%; height: 10px; width: 10px;');
            if(container == null){
                container = document.createElement('span');
            }
            if(root.getSelection().type == 'Range'){
                container.classList.add('selSpan');
                container.style.backgroundColor = '#b0c9f8';
                container.style.border = '1px solid #547bc1';
                cancelBtn.style.backgroundColor = '#547bc1';
                if(cancelable){
                    cancelBtn.addEventListener('click', function(ev){
                        var selSpan = ev.currentTarget.parentNode;
                        var _prevValue = (selSpan.previousSibling != null) ? selSpan.previousSibling.nodeValue : '';
                        var _nextValue = (selSpan.nextSibling != null) ? selSpan.nextSibling.nodeValue : '';
                        var newValue = _prevValue + selSpan.selectedContents + _nextValue;
                        selSpan.previousSibling.nodeValue = newValue;
                        /*CLEANS UP UNUSED TEXT NODES*/
                        if(selSpan.nextSibling != null){selSpan.parentNode.removeChild(selSpan.nextSibling);}
                        selSpan.parentNode.removeChild(selSpan);
                    });
                }
                selectedContents = range.extractContents().childNodes[0].nodeValue.toString();
                var _j = selectedContents.length - 1;
                var _startIndex = 0;
                var _endIndex = 0;
                for(var _i = 0; _i < selectedContents.length; _i++){
                    //console.log(_i);
                    if(selectedContents[_i] != ' '){
                        //_startIndex = _i;
                        //_i = selectedContents.length;
                    }
                }
                //console.log(_startIndex);
                //console.log(_endIndex);
                //console.log(selectedContents.substring(_i, _j+1));
                //console.log('---Length---');
                //console.log(selectedContents.length);
                selectionContents = selectedContents;
                selectedResult.type = 0;
            }
            else if(root.getSelection().type == 'Caret'){
                container.classList.add('highBlank');
                container.style.fontFamily = 'Courier New, Courier, monospace';
                container.style.backgroundColor = '#a3a7af';
                container.style.border = '1px solid #646871';
                cancelBtn.style.backgroundColor = '#646871';
                if(cancelable){
                    cancelBtn.addEventListener('click', function(ev){
                        var selSpan = ev.currentTarget.parentNode;
                        var _prevValue = (selSpan.previousSibling != null) ? selSpan.previousSibling.nodeValue : '';
                        var _nextValue = (selSpan.nextSibling != null) ? selSpan.nextSibling.nodeValue : '';
                        var newValue = _prevValue + _nextValue;
                        if(selSpan.previousSibling != null){selSpan.previousSibling.nodeValue = newValue;}
                        /*CLEANS UP UNUSED TEXT NODES*/
                        if(selSpan.nextSibling != null){selSpan.parentNode.removeChild(selSpan.nextSibling);}
                        selSpan.parentNode.removeChild(selSpan);
                    });
                }
                selectionContents = 'BLANK';
                selectedResult.type = 1;
            }
            contentContainer.innerText = selectionContents;
            container.selectedContents = selectedContents;
            container.append(contentContainer);
            if(cancelable){
                cancelBtn.setAttribute('class', 'cancel');
                cancelBtn.title = 'Remove';
                container.append(cancelBtn);
            }
            container.classList.add('highSpan');
            if(clickFunction != null || clickFunction != undefined){
                contentContainer.addEventListener('click', clickFunction);
            }
            container.highlightType = selectedResult.type;
            container.contentEditable = false;
            range.insertNode(container);
            selectedResult.value = selectionContents;
            selectedResult.highlighterNode = container;
        }
        else{
            selectedResult.errorMsg = 'Please select the text on the provided container';
        }
        //root.getSelection().getRangeAt(0).detach;
    }
    else{
        selectedResult.errorMsg = 'Please select a range of text';
    }
    var _isNewChild = true;
    var _oldChild = null;
    var _firstChild = null;
    for(var _i = 0; _i < containerRoot.childNodes.length; _i++){
        if(containerRoot.childNodes[_i].nodeName != 'DIV'){
            if(_isNewChild){
                _oldChild = containerRoot.childNodes[_i];
                _firstChild = document.createElement('div');
                _firstChild.style.display = 'inline-block';
                _isNewChild = false;
                containerRoot.replaceChild(_firstChild, containerRoot.childNodes[_i]);
                _firstChild.append(_oldChild);
            }
            else{
                _firstChild.append(containerRoot.childNodes[_i]);
                _i--;
            }
        }
        else {
            _isNewChild = true;
            if(containerRoot.childNodes[_i].innerHTML == '' || containerRoot.childNodes[_i].innerHTML == null){
                containerRoot.removeChild(containerRoot.childNodes[_i]);
            }
        }
    }
    return selectedResult;
}
