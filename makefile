.PHONY: build
build: 
	npx tsc --build --clean && npx tsc 

.PHONY: electron
electron:
	npx electron .