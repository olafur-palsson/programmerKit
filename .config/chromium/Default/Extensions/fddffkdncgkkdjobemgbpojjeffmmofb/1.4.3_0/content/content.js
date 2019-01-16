"use strict";

window.browser = (function () {
    return window.chrome || window.browser;
})();

browser.runtime.onMessage.addListener(function(message, sender, sendResponse) {
    switch(message.action) {
        case 'init':
            sendResponse({model: buildDOMReferenceObject()});
            break;
        case 'restore':
            sendResponse({success: restoreWebPage(message.uuids)});
            break;
        case 'update':
        case 'poll':
            sendResponse({success: true});
            break;
        default:
            return false;
    }

    return true;
});

//Build DOM Model Object, inject UUID references
function buildDOMReferenceObject() {
    var DOMTreeWalker = document.createTreeWalker(document.body, NodeFilter.SHOW_ALL, { acceptNode: nodeFilter }, false);
    var DOMModelObject = {};

    var end = false, groupIndex = 0, blockLevels = [], elementBoundary = false;
    var preformatted = {flag: false, index: null}, hidden = {flag: false, index: null};
    var node;
    while(!end) {
        if(!node)
            node = DOMTreeWalker.root;
        else
            node = DOMTreeWalker.nextNode();

        if(!node)
            end = true;

        var textGroup = {group: [], preformatted: false};
        while(node) {
            var nodeDepth = getNodeTreeDepth(node);

            if(!preformatted.flag && isPreformattedElement(node)) {
                preformatted.flag = true;
                preformatted.index = nodeDepth;
            }
            else if(preformatted.flag && nodeDepth <= preformatted.index) {
                preformatted.flag = false;
                preformatted.index = null;
            }

            if(!hidden.flag && isHiddenElement(node)) {
                hidden.flag = true;
                hidden.index = nodeDepth;
            }
            else if(hidden.flag && nodeDepth <= hidden.index) {
                if(!isHiddenElement(node)) {
                    hidden.flag = false;
                    hidden.index = null;
                }
                else
                    hidden.index = nodeDepth;
            }

            if(hidden.flag) {
                node = DOMTreeWalker.nextNode();
                continue;
            }

            if(isElementNode(node)) {
                if(nodeDepth <= blockLevels[blockLevels.length-1]) {
                    while(nodeDepth <= blockLevels[blockLevels.length-1])
                        blockLevels.pop();

                    if(!isInlineLevelElement(node))
                        blockLevels.push(nodeDepth);

                    elementBoundary = true;
                    break;
                }
                else {
                    if(!isInlineLevelElement(node)) {
                        blockLevels.push(nodeDepth);
                        elementBoundary = true;
                        break;
                    }
                }
            }
            else if(isTextNode(node)) {
                if(nodeDepth <= blockLevels[blockLevels.length-1]) {
                    while(nodeDepth <= blockLevels[blockLevels.length-1])
                        blockLevels.pop();

                    DOMTreeWalker.previousNode();
                    elementBoundary = true;
                    break;
                }

                var identifierUUID = generateElementUUID();
                var nodeText = formatTextNodeValue(node, preformatted.flag, elementBoundary);

                if((!preformatted.flag && isNodeTextValueWhitespaceOnly(node)) || nodeText.length == 0) {
                    node = DOMTreeWalker.nextNode();
                    continue;
                }

                var wrapperElement = document.createElement('span');
                wrapperElement.setAttribute('id', identifierUUID);
                node.parentNode.insertBefore(wrapperElement, node);
                wrapperElement.appendChild(node);

                var textNodeInformation = {groupIndex: groupIndex, text: nodeText, elementUUID: identifierUUID};
                textGroup.group.push(textNodeInformation);
                textGroup.preformatted = preformatted.flag;
            }

            node = DOMTreeWalker.nextNode();
            elementBoundary = false;
            if(!node)
                end = true;
        }

        if(textGroup.group.length == 0)
            continue;

        DOMModelObject[groupIndex++] = textGroup;
    }

    return DOMModelObject;
}

//TreeWalker Filter, Allowing Element and Text Nodes
function nodeFilter(node) {
    if(isElementNode(node)) {
        if(node.tagName.toLowerCase() == 'script' || node.tagName.toLowerCase() == 'noscript' || node.tagName.toLowerCase() == 'style' || node.tagName.toLowerCase() == 'textarea')
            return NodeFilter.FILTER_REJECT;
        else
            return NodeFilter.FILTER_ACCEPT;
    }

    if(isTextNode(node))
        return NodeFilter.FILTER_ACCEPT;

    return NodeFilter.FILTER_REJECT;
}

//Format text node value
function formatTextNodeValue(node, preformatted, elementBoundary) {
    if(isElementNode(node))
        return;

    var nodeText = decode(node.nodeValue);
    if(preformatted)
        return nodeText;

    var text = nodeText.replace(/[\t\n\r ]+/g,' ');
    if(elementBoundary)
        text = text.replace(/^[\t\n\r ]+/g, '');

    return text;
}

//Check if element is <pre> or has style white-space:pre
function isPreformattedElement(node) {
    if(!isElementNode(node))
        return;

    if(node.tagName.toLowerCase() == 'pre' || node.style.whiteSpace.toLowerCase() == 'pre')
        return true;

    var computedStyle = window.getComputedStyle(node);
    if(computedStyle.getPropertyValue('whitespace').toLowerCase() == 'pre')
        return true;

    return false;
}

//Check if element is hidden, i.e. has display: none/hidden;
function isHiddenElement(node) {
    if(!isElementNode(node))
        return;

    if(node.style.display == 'none' || node.style.display == 'hidden')
        return true;

    var computedStyle = window.getComputedStyle(node);
    if(computedStyle.getPropertyValue('display').toLowerCase() == 'none')
        return true;
    if(computedStyle.getPropertyValue('display').toLowerCase() == 'hidden')
        return true;

    return false;
}

//Remove All Highlighting and Injected Markup
function restoreWebPage(uuids) {
    for(var index = 0; index < uuids.length; index++) {
        var el = document.getElementById(uuids[index]);
        var parent = el.parentElement;

        while(el.firstChild)
            parent.insertBefore(el.firstChild, el);

        parent.removeChild(el);
        parent.normalize();
    }
}

//Check if Node is Element Node
function isElementNode(node) {
    return node.nodeType == Node.ELEMENT_NODE;
}

//Check if Node is Text Node
function isTextNode(node) {
    return node.nodeType == Node.TEXT_NODE;
}

//Check if Element is Inline
function isInlineLevelElement(element) {
    if(!isElementNode(element))
        return false;

    //Special case: will treat <br> as block element
    var elementTagName = element.tagName.toLowerCase();
    if(elementTagName == 'br')
        return false;

    if(window.getComputedStyle(element).display == 'inline')
        return true;

    return false;
}

//Check if a Text Node Value Contains only Whitespace
function isNodeTextValueWhitespaceOnly(node) {
    return !(/[^\t\n\r ]/.test(node.nodeValue));
}

//Get Depth of Node in Tree
function getNodeTreeDepth(node) {
    var depth = -1;

    while(node != null) {
        depth++;
        node = node.parentNode;
    }

    return depth;
}

//Generate V4 UUID
function generateElementUUID() {
    function generateBlock(size) {
        var block = '';
        for(var index = 0; index < size; index++)
            block += Math.floor((1 + Math.random()) * 0x10000).toString(16).substring(1);

        return block;
    }

    var uuid = '', blockSizes = [2,1,1,1,3];
    for(var index = 0; index < blockSizes.length; index++)
        uuid += generateBlock(blockSizes[index]) + (index == blockSizes.length-1 ? '' : '-');

    return uuid;
}