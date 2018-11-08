#bin/bash
for FILE in styles/*.scss
do
	sass ${FILE} ${FILE%%.*}.css
	mv src/*.css build
	mv src/*.map build
	cp src/*.scss build
done