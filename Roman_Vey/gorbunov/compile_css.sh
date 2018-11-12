#bin/bash
for FILE in src/*.scss
do
	sass ${FILE} ${FILE%%.*}.css
done
mv src/*.css build
mv src/*.map build
cp src/*.scss build