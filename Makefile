

default: test

test:
	@#$(MAKE) test-generate
	node ./tests/tests.js ./tests/test_tree0.html 

test-generate:
	node ./tests/treetxt2html.js ./tests/test_tree0.txt  \
		| python ./tests/prettify.py \
		> ./tests/test_tree0.html
