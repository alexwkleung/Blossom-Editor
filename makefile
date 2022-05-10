.PHONY: build
build: 
	npx tsc --build --clean && npx tsc 

.PHONY: electron
electron:
	npx electron .

.PHONY: rebuild
rebuild:
	npm run rebuild

.PHONY: package
package: 
	npm run package