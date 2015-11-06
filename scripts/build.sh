#!/bin/bash
rm -Rf build
mkdir build
# Use an array to preserve order, pretty darn important
FILES=("javascripts/InputHandler.js" "javascripts/Engine.js" "javascripts/LaserShot.js" "javascripts/Sprite.js" "javascripts/Player.js" "javascripts/Enemy.js" "javascripts/Collision.js" "javascripts/SquareInvaders.js" "javascripts/init.js")
SI_FILE=javascripts/square-invaders.js
SI_BUILD=build/square-invaders.min.js
HTML_FILE=build/index.html
touch $SI_FILE && touch $SI_BUILD && touch $HTML_FILE

for f in ${FILES[@]}
do
  echo "Processing $f..."
  cat $f >> $SI_FILE
done

echo "Done!"
echo "Minifying JavaScript files..."
minify $SI_FILE -o $SI_BUILD
cat $SI_BUILD | tr "\n" ";" > temp.txt && mv temp.txt $SI_BUILD
rm $SI_FILE

echo "Creating HTML"
cat index.html > $HTML_FILE
echo "Removing old script references"
perl -i.bak -0777ne 's|<script.*?</script>||gms;print' $HTML_FILE
sed -i ".bak" s/'<\/body>'/"<script type='application\/javascript' src='square-invaders.min.js'><\/script><\/body>"/ $HTML_FILE
echo "\"Minify\" HTML as well"
cat $HTML_FILE | tr -d "\n" |  tr -s " " > temp.txt && mv temp.txt $HTML_FILE
rm build/index.html.bak
echo "Build complete :)"
