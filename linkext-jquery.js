
(function(){

    /* 
    * - https://www.smashingmagazine.com/2010/05/make-your-own-bookmarklets-with-jquery/ 
    * - http://pastie.org/462639
    * - http://www.codetoad.com/javascript_get_selected_text.html
    */

	// the minimum version of jQuery we want
	var v = "3.1.0";

	// check prior inclusion and version
	if (window.jQuery === undefined || window.jQuery.fn.jquery < v) {
		var done = false;
		var script = document.createElement("script");
		script.src = "https://ajax.googleapis.com/ajax/libs/jquery/" + v + "/jquery.min.js";
		script.onload = script.onreadystatechange = function(){
			if (!done && (!this.readyState || this.readyState == "loaded" || this.readyState == "complete")) {
				done = true;
				initMyBookmarklet();
			}
		};
		document.getElementsByTagName("head")[0].appendChild(script);
	} else {
		initMyBookmarklet();
	}

    function findClosestIdElement(origElem) {
        /* http://stackoverflow.com/a/23937118/188833 */
        var elementsBeforeForm = $(origElem).parents().andSelf().prevAll();
        var elem = elementsBeforeForm.find('[id]').add(elementsBeforeForm).last();
        return elem
    }

	function initMyBookmarklet() {
        console.log('initMyBookmarklet');
		(window.myBookmarklet = function() {
            // your JavaScript code goes here!
            $(document).click(function(event) {
                // var text = $(event.target).text();
                // var clickedElem = $(event.target);
                console.log('event.target')
                console.log($(event.target));
                console.log('event.target.id');
                console.log($(event.target).attr('id'));
                var closestElemWithId = findClosestIdElement($(event.target));
                console.log(closestElemWithId);
                var closestElemId = closestElemWithId.attr('id');
                console.log(closestElemId);
                document.location.hash = closestElemId;
                var closestElemUrl = document.location.toString();
                console.log(closestElemUrl);
            });
		})();
	}


    function getSelText() {
        var SelText = '';
        if (window.getSelection) {
            SelText = window.getSelection();
        } else if (document.getSelection) {
            SelText = document.getSelection();
        } else if (document.selection) {
            SelText = document.selection.createRange().text;
        }
        return SelText;
    }

})();

