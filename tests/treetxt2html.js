

(function(){

  /* References
   * - http://stackoverflow.com/a/21835720/188833
   */

  function main() {
    var args = process.argv.slice(2);
    if (args.length !== 1) {
      console.log(process.argv.slice(1) + " <filename.txt>");
      return 1;
    }
    var filename = args[0];
    var jsdom = require("jsdom");
    var env = jsdom.env('<html><body></body></html>', [],
      function (err, window) {

        // console.log(document);
        // console.log(window);
        var $ = require('jquery')(window);

        // filename = 'test_tree0.txt'
        var lineReader = require('readline').createInterface({
          input: require('fs').createReadStream(filename)
        });

        var document = window.document.documentElement;
        // console.log(document.outerHTML);
        var rootNode = (
          $('<div id="rootNode" name="rootNode"></div>')
            .appendTo(document)); //
        var prevDepth = -1;
        var prevNodes = [rootNode];
        lineReader.on('line', function (line) {
          var depth = (line.match(/\t/g) || []).length;
          var depthDelta = depth - prevDepth;
          var prevNode = $(prevNodes.slice(-1));
          var lineNode = $('<div></div>')
            .attr('name', line.trim())
            .attr('prevDepth', prevDepth)
            .attr('depth', depth)
            .attr('depthd', depthDelta)
            .attr('prevNode', prevNode.attr('name'))
            .attr('prevNodes', $(prevNodes).map(function() {
              return this.attr('name')}).get().join('--'))
            .text(line.trim());
          var id = (line.match(/id=([\w-_]+)/) || null);
          if (id) {
            lineNode.attr('id', id[1]);
          }

          if (depth > prevDepth) {
            prevNodes.push(
              lineNode.appendTo(prevNode));
          } else if (depth < prevDepth) {
            for (i=0; i<=Math.abs(depthDelta); i++) {
              prevNodes.pop();
            }
            prevNode = $(prevNodes.slice(-1));
            lineNode
              .attr('prevNode', prevNode.attr('name'))
              .attr('prevNodes', $(prevNodes).map(function() {
                return this.attr('name')}).get().join('--'));
                prevNodes.push(lineNode.appendTo(prevNode));
          } else {
            prevNodes[prevNodes.length-1] = 
              lineNode
                .attr('prevNode', $(prevNodes.slice(-2)).attr('name'))
                .insertAfter(prevNode);
          } // ...
          prevDepth = depth;
      });

      lineReader.on('close', function (line) {
        console.log($(rootNode).html());
        process.exit(0);
      });
    });
  }
  main();
})();
