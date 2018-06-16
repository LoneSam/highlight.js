var initTag = "test";
//var s = window.getSelection();
//s.removeAllRanges();

document.observe("click", function() {
	var s = window.getSelection();
	var sRange = s.getRangeAt(0);
	var sURL = JSON.stringify(sRange, ['anchorOffset','focusOffset']);
	console.log(s);
	console.log(sRange);
	console.log(sURL);
});


/*
document.observe("click", function() {
			
	var strongs = document.getElementsByTagName(initTag);
	var s = window.getSelection();

	if(s.rangeCount > 0) s.removeAllRanges();

	for(var i = 0; i < strongs.length; i++) {
		var range = document.createRange();
		range.selectNode(strongs[i]);
		s.addRange(range);
	}
	console.log(s);
	
});
*/
/*
http://stackoverflow.com/questions/12431085/pass-js-objects-in-url

var jObj = {"color":"red","shape":"square"}
var urlParam = []

for (var i in jObj){
   urlParam.push(encodeURI(i) + "=" + encodeURI(jObj[i]));
}

window.open("/process/?" + urlParam.join("&"));
*/