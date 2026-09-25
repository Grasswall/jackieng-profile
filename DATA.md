# Content Management

All site content is managed through JSON files in `data/`. This is the single source of truth.

## Quick Reference

### Add a competition or award

Edit `data/achievements.json`. Add to the appropriate category array:

```json
{
  "Date": "2026-09-01 00:00:00",
  "Title": "Competition Name — Award Level",
  "Organization": "Org Name",
  "Status": "Won",
  "Result": "Gold Medal"
}
```

### Add a speaking engagement

Edit `data/speaking.json`:

```json
{
  "title": "Event Name",
  "org": "Organization",
  "date": "2026-09",
  "role": "Speaker",
  "description": "Short description of the talk or event.",
  "photo": "/assets/event-photo.jpg"
}
```

### Add a gallery item

Edit `data/gallery.json`:

```json
{
  "slug": "project-slug",
  "image": "/assets/project-slug.png",
  "title": "Project Title",
  "caption": "One-line description"
}
```

### Update site metadata

Edit `data/meta.json` for name, title, tagline, email, social links, and site URL.

### Add a photo

1. Compress image (max 1920px wide, <300KB)
2. Name descriptively: `event-name-year.jpg`
3. Place in `public/assets/`
4. Reference in data file as `/assets/event-name-year.jpg`

## Categories in achievements.json

- `Academic-Awards` — scholarships, grades, academic honors
- `Competitions` — startup/innovation competitions
- `Speaking-Conferences` — talks, forums, symposia
- `Positions-Affiliations` — reviewer roles, board memberships
- `Media` — press, TV, print coverage
- `Publications` — papers, journal articles
- `Scholarships` — financial awards

## Automation

`build_gallery.py` can auto-populate gallery.json from OneDrive brand folders:

```bash
python3 build_gallery.py
```

This scans `/home/jackie/OneDrive/Others/Brand/posted/` and `ready-to-post/` for hero frames.
