#!/usr/bin/env bash
for FILE in src/*.scss
do
    sass ${FILE} ${FILE%%.*}.css
    echo building ${FILE}
done

mv src/main.css css