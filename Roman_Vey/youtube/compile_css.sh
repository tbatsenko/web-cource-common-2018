#bin/bash
for FILE in styles/*.scss
do
	sass ${FILE} ${FILE%%.*}.css
	mv styles/*.css src
	mv styles/*.map src
	cp styles/*.scss src
done