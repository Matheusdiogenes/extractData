#!/bin/bash
FILES="import/*"
for f in $FILES
do
  echo "npm run cantos $f"
  npm run cantos "$f"
done