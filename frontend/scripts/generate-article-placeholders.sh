#!/bin/bash

# Generate placeholder article images with gradients
# Requires ImageMagick: brew install imagemagick

ARTICLE_DIR="public/articles"

# Create directory if it doesn't exist
mkdir -p "$ARTICLE_DIR"

# Define article images with themed colors
declare -A articles=(
  ["chatgpt-guide.jpg"]="#10a37f,#1a7f64"
  ["claude-features.jpg"]="#D97757,#C65D3B"
  ["gemini-vs-gpt.jpg"]="#4285f4,#34a853"
  ["ai-tools-2024.jpg"]="#7c3aed,#a855f7"
  ["spotify-premium.jpg"]="#1db954,#1ed760"
  ["youtube-premium.jpg"]="#ff0000,#cc0000"
  ["netflix-plans.jpg"]="#e50914,#b20710"
  ["github-copilot.jpg"]="#6e40c9,#8957e5"
  ["cursor-review.jpg"]="#000000,#1a1a1a"
  ["canva-pro.jpg"]="#00c4cc,#7d2ae8"
)

echo "Generating article placeholder images..."

for image in "${!articles[@]}"; do
  colors=(${articles[$image]//,/ })
  color1=${colors[0]}
  color2=${colors[1]}
  
  output_path="$ARTICLE_DIR/$image"
  
  # Check if ImageMagick is installed
  if command -v convert &> /dev/null; then
    # Create gradient with overlay text
    convert -size 1200x675 \
      gradient:"$color1"-"$color2" \
      -gravity center \
      -pointsize 60 \
      -fill white \
      -annotate +0+0 "Article" \
      "$output_path"
    echo "✓ Generated: $image"
  else
    echo "⚠ ImageMagick not installed. Creating empty file: $image"
    touch "$output_path"
  fi
done

echo ""
echo "✓ Article placeholders generated in $ARTICLE_DIR"
echo "Note: These are temporary placeholders. Replace with real article images."
