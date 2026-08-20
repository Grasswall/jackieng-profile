# Jackie Ng — Personal Brand Site

**High-quality personal profile showcasing research, achievements, and molecular visualization work.**

---

## What Makes This Exceptional

✨ **Full-bleed hero** with your molecular render  
✨ **Interactive timeline** with scroll animations  
✨ **Work gallery** showcasing your best SCALE renders  
✨ **Typography & space** that breathes (Playfair Display + Inter)  
✨ **Responsive** — beautiful on any device  
✨ **Fast** — pure HTML/CSS/JS, no frameworks  

---

## Setup

### 1. Add Your Images

**Hero Image** (required):
- Add your best molecular render as: `assets/hero.jpg`
- Recommended: 1920×1080px minimum, high contrast
- This appears full-bleed on the landing page

**Work Gallery** (optional but recommended):
- Run: `python3 build_gallery.py`
- This scans `/home/jackie/OneDrive/Others/Brand/posted` and `ready-to-post`
- Automatically copies hero frames to `assets/` and generates `gallery.json`
- If the script hangs on OneDrive, manually copy 6-9 of your best renders to `assets/` and update `gallery.json`

**Gallery JSON format:**
```json
[
  {
    "slug": "cfd-btk-c481s",
    "image": "assets/cfd-btk-c481s.png",
    "title": "BTK C481S Mutation",
    "caption": "CFD simulation of drug resistance mechanism"
  }
]
```

### 2. Verify Links

Edit `index.html` and check:
- Instagram: `https://instagram.com/jackieng_ch`
- LinkedIn: `https://linkedin.com/in/jackieng-ch`
- Email: `jackie.ng@connect.polyu.hk`

### 3. Deploy

**Option A: GitHub Pages (Free, Easy)**
```bash
# Create a new repo
gh repo create jackieng-profile --public --source=. --remote=origin

# Push
git add .
git commit -m "Initial site"
git push -u origin main

# Enable Pages
gh repo view --web
# Go to Settings → Pages → Deploy from branch: main
```

**Live URL:** `https://[your-username].github.io/jackieng-profile/`

**Option B: Netlify (Free, Custom Domain)**
1. Go to [app.netlify.com](https://app.netlify.com)
2. Drag and drop the `profile-site/` folder
3. Instant deploy → `jackieng.netlify.app`
4. Add custom domain if you have one

**Option C: Vercel (Free)**
```bash
npm i -g vercel
cd profile-site
vercel
```

---

## File Structure

```
profile-site/
├── index.html              # Main site (complete)
├── achievements.json       # Auto-generated from Excel
├── gallery.json           # Work gallery (run build_gallery.py)
├── build_gallery.py       # Gallery extraction script
├── assets/
│   ├── hero.jpg           # Landing page hero (ADD THIS)
│   └── *.png              # Gallery images (auto-generated)
└── README.md              # This file
```

---

## Design Philosophy

**Typography:**
- Headings: Playfair Display (classic, editorial)
- Body: Inter (clean, modern, readable)

**Color Palette:**
- Navy: `#0A1828` (your brand navy)
- Gold: `#BFA181` (your brand gold)
- White: `#FFFFFF`
- Grey: `#6B7280`

**Layout:**
- Hero: Full viewport, immersive
- About: Two-column grid with stats
- Work: Gallery grid with hover overlays
- Timeline: Year + achievement pairs, scroll-triggered
- Contact: Clean CTAs

**Interactions:**
- Smooth scroll navigation
- Scroll-triggered timeline animations
- Hover effects on gallery items
- Responsive at all breakpoints

---

## Preview Locally

```bash
cd profile-site
python3 -m http.server 8080
```

Open: `http://localhost:8080`

---

## Customization

**Change bio:**
Edit the "About" section in `index.html` (lines ~315-340)

**Change stats:**
Edit the highlight numbers in `index.html` (lines ~345-370)

**Change timeline items:**
Timeline is auto-generated from `achievements.json` (top 15 most significant)

**Change work gallery:**
Run `build_gallery.py` or manually edit `gallery.json`

---

## Next Steps

1. ✅ Add hero image (`assets/hero.jpg`)
2. ✅ Run `python3 build_gallery.py` to populate work gallery
3. ✅ Verify social links
4. ✅ Deploy to GitHub Pages or Netlify
5. (Optional) Register custom domain (`jackieng.ch`)

---

Built: 2026-08-20  
The Invisible Architect
