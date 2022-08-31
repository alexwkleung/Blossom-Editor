.PHONY: build
build: 
	npm run build

.PHONY: electron
electron:
	npm run electron

.PHONY: rebuild
rebuild:
	npm run rebuild

.PHONY: package
package: 
	npm run package

.PHONY: package-arm
package-arm:
	npm run package-arm