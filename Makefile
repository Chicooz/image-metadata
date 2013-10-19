REPORTER = spec

test:
	./node_modules/.bin/mocha -b --reporter $(REPORTER)

lib-cov:
	jscoverage --no-highlight lib lib-cov

test-cov:
	$(MAKE) lib-cov
	@IMAGE_METADATA_COV=1 $(MAKE) test REPORTER=html-cov > coverage.html
	rm -rf lib-cov

test-coveralls:
	$(MAKE) lib-cov
	$(MAKE) test REPORTER=spec
	echo TRAVIS_JOB_ID $(TRAVIS_JOB_ID)
	@IMAGE_METADATA_COV=1 $(MAKE) test REPORTER=mocha-lcov-reporter | ./node_modules/coveralls/bin/coveralls.js
	rm -rf lib-cov

.PHONY: test