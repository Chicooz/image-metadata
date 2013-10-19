test:
	mocha

coverage:
	jscoverage --no-highlight lib lib-cov
	IMAGE_METADATA_COV=1 mocha -R html-cov > coverage.html
	rm -rf lib-cov

.PHONY: test