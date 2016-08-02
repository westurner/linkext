
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

    function findClosestIdAttrNode_brute(origNode) {
        if (origNode.id !== "") {
            return origNode;
        }
        nodes = [];
        i = 0;
        for (node in document.all) {
            console.log(i + ' ' + node);
            if (node.id !== "") {
                console.log(node.id);
                nodes.push(node);
            };
            if (node == origNode) {
                //return false
                break
            }
            ++i;
        }
        var closestIdNode = nodes[nodes.length - 1];
        return closestIdNode;
    }

    function findClosestIdAttrNode_sfd(origNode) {
        var closestIdNode = null;
        function walkDOM_reverse(node) {
            do {
                if (node.hasChildNodes()) {
                    walkDOM(node.lastChild())
                }
                console.log(node);
                if (node.id !== "") {
                    closestIdNode = node;
                    break;
                }
            } while ((closestIdNode === null) && (node = node.previousSibling))
        }
        return closestIdNode;
    }

    function initMyBookmarklet() {
        window.jQuery.fn.extend({reverse: Array.prototype.reverse});
        window.findClosestIdAttrNode = findClosestIdAttrNode_brute;

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
                var closestElemWithId = window.findClosestIdAttrNode(event.target);
                console.log(closestElemWithId);
                var closestElemId = closestElemWithId.id;
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

