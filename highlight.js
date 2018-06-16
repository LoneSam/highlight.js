/* Author: Blake Coleman

This program allows users to highlight the page share the url with 
highlightURIs added to the end of the url.

i.e. "www.wikipedia.com/tigers#startIdices=1,2,3,4#endIndices=1,2,3,5"

start of highlight: DOM index firstDocumentElement[2][3][4]
end of highlight: DOM index firstDocumentElement[2][3][5]

The last numbers 4 and 5 represent the index of the innerHTML property
of the indexed element firstDocumentElement[2][3] and 
firstDocumentElement[2][3][5]

This is a relatively accurate way to quickly share strictly necessary
information to a recipient.

The Highlight.js document and any documents inspired by
Highlight.js are free to use strictly as a means to have
specific information identified on a site by a site's user group. 
The highlight.js document and any inspired documents thereafter cannot 
be used for any type of tracking of user data generated by by the highlight.js
functionality and that of any of its children's functionalities.
Tracking of user data shall only be allowed under the circumstance 
of contractual user consent. Unauthorized use of Highlight.js can
result in serious consequences assessed by law.
*/

//intended output  highlight "nine" id="three":
//format "(start),(end)"
//offset string indices: 10,13
//offset node indices: 2,2
//2
//final url: web.com/page.html#2&2&&10&13
//a worse case would include a deeper node structure
//with more sets, so 2,1&2,1 for single node id="three-two"
//final url: web.com/page.html#2,1&2,1&&10&13

var highlightCount = 0;
var highlightArray = [];


var readHighlightURL = function() {
	rawURL = window.location();
	endOfUrl = rawURL.split('/').pop();
	
}

var Highlight = {
	initialize: function(selection) {
		console.log("Highlight initialize args: " + selection.anchorNode);
		console.log(arguments.callee);
		this.getHighlight(
			selection.anchorNode,
			selection.focusNode
		);
		this.startOffset = selection.anchorOffset;
		this.endOffset = selection.focusOffset;
		console.log("startOffset: " + this.startOffset);
		console.log("endOffset: " + this.endOffset);
		if (this.startOffset > this.endOffset) {this.isReverse = true} else {this.isReverse = false}
		return this;
	},
	
	//responsible for defining Highlight object for HighlightPrinter
	getHighlight: function(startNode,endNode) {
		console.log("Get highlight started by: "+arguments.callee);
		this.startNodeIndex = this.getNodeIndex(startNode);
		this.endNodeIndex = this.getNodeIndex(endNode);
	},
	
	//returns array of indices to a node
	//assumes there is a body node
	//LATER: can be set by website creator URL with an element id which encompasses any info that may be highlighted
	//or multiple id's
	//can be used for more accurate highlights when link is shared
	getNodeIndex: function(node) {
		console.log(arguments.callee);
		element = node.parentElement;
		indicesArray = [];
		
		var getNodeIndices = function (element,indicesArray) {
			elementDepth = 0;
			if (element.getTag == "BODY") {return indicesArray.reverse();}
			
			while (element.parentElement) {
				element = element.previousSibling;
				elementDepth += 1;
			}
			return getNodeIndices(element,indicesArray.push(elementDepth));
		}
		
		return getNodeIndices;
	
	},
	
	//start and end indices to string for HighlighterScanner
	//to append to window url
	toEndUrl: function(startIndices, endIndices) {
		console.log(arguments.callee);
		var indicesString = '';
		for (var i = 0; i < startIndices.length; i++) {
			if (i == startIndices.length - 1) {
				indicesString += startIndices[i];
			} else {
				indicesString += startIndices[i];
			}
		}
		//separate start and end indices
		indecesString += '-';
		//repeat first for loop for endIndices
		for (var i = 0; i < endIndices.length; i++) {
			indicesString += endIndices[i];
		}
		return indicesString;
	}
}

//append URI strings to hStream in format used when appending an id
//to the end of a url

var HighlightPrinter = {

	initialize: function(hStream) {
		console.log(arguments.callee);
		this.print(hStream);
	},
	
	print: function(hStream) {
		console.log(arguments.callee);
		//highlight Start Node
		for(var i = 0; i < highlight; i++) {
			highlightURL += "#highlightSN="+1+",";
		}
			
		//highlight End Node
		for(var i = 0; i < highlight; i++) {
			highlightURL += "&highlightEN="+1+",";
		}
			
		//highlight Start Offset
		for(var i = 0; i < highlight; i++) {
			highlightURL += "&highlightSI="+1+",";
		}
			
		//highlight End Offset
		for(var i = 0; i < highlight; i++) {
			highlightURL += "&highlightEI="+1+",";
		}
		
		window.location = window.location + highlightURL;
	}
}

var HighlightScanner = {
	
	initialize: function() {
		this.observe();
	},
	
	//Listen for click and save highlight to highlightArray
	observe: function() {
		console.log(arguments.callee);
		document.observe("click", function() {
			console.log("Grabbing highlight");
			HighlightScanner.getHighlight();
			//console.log(this.highlight);
			return (this);
		});
	},
	
	//Stop listening
	/*
	stopScanning: funtion() {
	
	},
	*/
	
	//Create new highlight object and count number of highlights
	getHighlight: function() {
		console.log(arguments.callee);
		var selection = window.getSelection();
		//console.log(selection);
		if (typeof selection != 'undefined') {
			this.highlight_obj = Highlight.initialize(window.getSelection());
			this.appendHighlightIndices(this.highlight, this.highlightCount);
			this.highlightCount++;
		}
		
	}	
}
	
//Test:
//var highlight = new Highlight();
//console.log(HighlightScanner.constructor);
//console.log(HighlightScanner.prototype.constructor);


var highlightScanner = HighlightScanner.initialize();
//var highlighter = new Highlighter();

//var highlightPrinter = new HighlightPrinter(window.location);




