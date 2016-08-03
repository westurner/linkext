

//(function(){

  /* References
   * - http://stackoverflow.com/a/21835720/188833
   */

  function test_thing(filename) {
    var fs = require("fs");
    var htmlText = fs.readFileSync(filename).toString();
    var jsdom = require("jsdom");
    var env = jsdom.env(htmlText, [],
      function (err, window) {

        // console.log(document);
        // console.log(window);
        global.window = window;
        global.document = window.document;
        // global.document = window.document; //.documentElement;
  
        var $ = require('jquery')(window);

        var linkextjquery = require('../linkext-jquery.js')(window);

        function test_brute(testnode, expected_id) {
          console.log(testnode.outerHTML);

          var output1 = linkextjquery.getClosestIdAttrNode_brute(testnode);
          console.log(output1.id);

          if (output1.id !== expected_id) {
            console.log("assertEqual TODO!!!");
            console.log(output1.id, ' !== ', expected_id);
          }
        }

        function test_by_nodeid(testNodeId, expected_id) {
          console.log('\n')
          testnode = document.getElementById(testNodeId);
          if (!testnode) {
            console.log('ERR !testnode');
            process.exit(1);
          }
          if (testnode.id !== testNodeId) {
            console.log('ERR assertEqual', testnode.id, testNodeId);
            process.exit(1);
          }
          test_brute(testnode, expected_id);
        }

        test_by_nodeid('note', 'note');
        test_by_nodeid('here', 'here')
        test_by_nodeid('theticket', 'theticket');

        var testnode = document.querySelectorAll('[name="2.2.2.2"]')[0];
        console.log('testnode:', testnode.outerHTML, testnode.getAttribute('name'));

        test_brute(testnode, 'theticket');
    });
  }

  function main() {
    var args = process.argv.slice(2);
    if (args.length !== 1) {
      console.log(process.argv.slice(1) + " <filename.txt>");
      return 1;
    }
    var filename = args[0];
    test_thing(filename);
  }

  main();

//})();
