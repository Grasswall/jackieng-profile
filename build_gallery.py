#!/usr/bin/env python3
"""
Extract hero frames from brand pipeline for portfolio gallery.
Finds the best frame from each published post.
"""

import json
import os
import shutil
from pathlib import Path

# Paths
BRAND_ROOT = Path("/home/jackie/OneDrive/Others/Brand")
POSTED = BRAND_ROOT / "posted"
READY = BRAND_ROOT / "ready-to-post"
OUTPUT = Path("/home/jackie/.openclaw/workspaces/brand/profile-site")
ASSETS = OUTPUT / "assets"

def find_hero_images():
    """Find hero/final frames from posted content."""
    gallery_items = []
    
    # Search both posted and ready-to-post
    for root_dir in [POSTED, READY]:
        if not root_dir.exists():
            continue
            
        for post_dir in root_dir.iterdir():
            if not post_dir.is_dir():
                continue
                
            slug = post_dir.name
            
            # Try to find hero image
            candidates = [
                post_dir / "hero_raw.png",
                post_dir / "hero.png",
                post_dir / "final.png",
                post_dir / f"{slug}_final.png",
            ]
            
            # Also check nested directories
            for subdir in post_dir.rglob("*"):
                if subdir.is_dir():
                    candidates.extend([
                        subdir / "hero_raw.png",
                        subdir / "hero.png",
                        subdir / "final.png",
                    ])
            
            # Find first valid image
            hero_path = None
            for candidate in candidates:
                if candidate.exists() and candidate.stat().st_size > 10000:  # > 10KB
                    hero_path = candidate
                    break
            
            if hero_path:
                # Copy to assets
                dest = ASSETS / f"{slug}.png"
                if not dest.exists():
                    shutil.copy2(hero_path, dest)
                    print(f"✓ Copied: {slug}")
                
                # Read caption if available
                caption = ""
                caption_file = post_dir / "captions.txt"
                if caption_file.exists():
                    caption = caption_file.read_text().split('\n')[0][:100]
                
                gallery_items.append({
                    "slug": slug,
                    "image": f"assets/{slug}.png",
                    "title": slug.replace('-', ' ').title(),
                    "caption": caption or "Molecular visualization from The Invisible Architect series"
                })
    
    return gallery_items

def main():
    ASSETS.mkdir(parents=True, exist_ok=True)
    
    print("Scanning for hero images...")
    gallery = find_hero_images()
    
    # Sort by slug (roughly chronological)
    gallery.sort(key=lambda x: x['slug'], reverse=True)
    
    # Take top 9 for grid
    gallery = gallery[:9]
    
    # Write gallery.json
    output_file = OUTPUT / "gallery.json"
    with open(output_file, 'w') as f:
        json.dump(gallery, f, indent=2)
    
    print(f"\n✓ Gallery created: {len(gallery)} items")
    print(f"✓ Output: {output_file}")
    
    # Also create a placeholder hero image if none exists
    hero_placeholder = ASSETS / "hero.jpg"
    if not hero_placeholder.exists() and gallery:
        # Use first gallery item as hero
        first_item = ASSETS / f"{gallery[0]['slug']}.png"
        if first_item.exists():
            shutil.copy2(first_item, hero_placeholder)
            print(f"✓ Hero placeholder: {hero_placeholder}")

if __name__ == "__main__":
    main()
