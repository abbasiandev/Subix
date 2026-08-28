#!/bin/bash

# Brand Icon Downloader
# Downloads official brand logos from SimpleIcons CDN
# Usage: ./scripts/download-brand-icons.sh

set -e

BRANDS_DIR="public/brands"
CDN_BASE="https://cdn.simpleicons.org"

echo "📦 Downloading brand icons..."
echo "================================"

# Create brands directory
mkdir -p "$BRANDS_DIR"

# Brand list with SimpleIcons slugs
declare -A BRANDS=(
  ["openai"]="openai"
  ["anthropic"]="anthropic"
  ["google"]="google"
  ["spotify"]="spotify"
  ["youtube"]="youtube"
  ["netflix"]="netflix"
  ["github"]="github"
  ["cursor"]="cursor"
  ["midjourney"]="midjourney"
  ["canva"]="canva"
  ["figma"]="figma"
  ["adobe"]="adobe"
  ["notion"]="notion"
  ["grammarly"]="grammarly"
  ["discord"]="discord"
  ["apple"]="apple"
  ["microsoft"]="microsoft"
  ["amazon"]="amazon"
  ["meta"]="meta"
  ["twitter"]="x"
  ["linkedin"]="linkedin"
  ["instagram"]="instagram"
  ["telegram"]="telegram"
  ["whatsapp"]="whatsapp"
  ["slack"]="slack"
  ["zoom"]="zoom"
  ["dropbox"]="dropbox"
  ["trello"]="trello"
  ["asana"]="asana"
  ["monday"]="monday"
)

# Download each brand icon
for brand in "${!BRANDS[@]}"; do
  slug="${BRANDS[$brand]}"
  output_file="$BRANDS_DIR/${brand}.svg"
  
  if [ -f "$output_file" ]; then
    echo "✓ $brand (already exists)"
  else
    if curl -f -s "${CDN_BASE}/${slug}" -o "$output_file"; then
      echo "✓ $brand (downloaded)"
    else
      echo "✗ $brand (failed - will create placeholder)"
      # Create placeholder if download fails
      cat > "$output_file" << EOF
<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor">
  <rect x="2" y="2" width="20" height="20" rx="4" fill="#999"/>
  <text x="12" y="14" text-anchor="middle" fill="white" font-size="10" font-family="Arial">
    ${brand:0:1}
  </text>
</svg>
EOF
    fi
  fi
done

echo ""
echo "================================"
echo "✅ Brand icons ready!"
echo ""
echo "Next steps:"
echo "1. Optimize icons: npx svgo -f $BRANDS_DIR"
echo "2. Review icons in: $BRANDS_DIR"
echo ""
