#!/bin/bash
rm -Rf build
mkdir build
# Use an array to preserve order, pretty darn important
FILES=("javascripts/InputHandler.js" "javascripts/Engine.js" "javascripts/LaserShot.js" "javascripts/Sprite.js" "javascripts/Player.js" "javascripts/Enemy.js" "javascripts/Collision.js" "javascripts/SquareInvaders.js" "javascripts/init.js")
SI_FILE=javascripts/square-invaders.txt
touch $SI_FILE

for f in ${FILES[@]}
do
  echo "Processing $f..."
  cat $f >> $SI_FILE
done

echo "Done!"
echo "Minifying JavaScript files..."
mv $SI_FILE "./javascripts/square-invaders.js"
minify "./javascripts/square-invaders.js" -o build/square-invaders.min.js
rm "./javascripts/square-invaders.js"

echo "\"Minify\" HTML as well"
HTML_FILE=build/index.html
tr -d "\011\012\015" < index.html | cat > $HTML_FILE
echo "Removing old script references"
perl -i.bak -0777ne 's|<script.*?</script>||gms;print' $HTML_FILE
sed -i ".bak" s/'<\/body>'/"<script type='application\/javascript' src='square-invaders.min.js'><\/script><\/body>"/ $HTML_FILE
rm build/index.html.bak
echo "Build complete :)"
