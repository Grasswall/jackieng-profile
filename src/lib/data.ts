// src/lib/data.ts
// Typed data loaders — all reading from /data/*.json at build time.

import metaRaw      from "../../data/meta.json";
import navRaw       from "../../data/navigation.json";
import speakingRaw  from "../../data/speaking.json";
import achieveRaw   from "../../data/achievements.json";
import galleryRaw   from "../../data/gallery.json";

// ─── Meta ────────────────────────────────────────────────────────────────────

export interface SiteMeta {
  name: string;
  title: string;
  tagline: string;
  description: string;
  email: string;
  socials: {
    linkedin: string;
    instagram: string;
    github: string;
  };
  siteUrl: string;
}

export const meta: SiteMeta = metaRaw as SiteMeta;

// ─── Navigation ──────────────────────────────────────────────────────────────

export interface NavItem {
  label: string;
  href: string;
}

export const navigation: NavItem[] = navRaw as NavItem[];

// ─── Speaking / Events ───────────────────────────────────────────────────────

export interface SpeakingEvent {
  id: string;
  org: string;
  title: string;
  year: number;
  location: string;
  type: "speaker" | "attendee" | "panelist";
  description: string;
  image: string | null;
}

export const speakingEvents: SpeakingEvent[] = speakingRaw as SpeakingEvent[];

// ─── Achievements ────────────────────────────────────────────────────────────

export interface Achievement {
  Date: string;
  Title: string;
  Organization: string;
  Status: string;
  Result: string;
}

export interface AchievementsData {
  [category: string]: Achievement[];
}

export const achievements: AchievementsData = achieveRaw as AchievementsData;

// ─── Gallery ─────────────────────────────────────────────────────────────────

// Gallery shape depends on the existing gallery.json — typed loosely here.
// Tighten once the data contract is confirmed.
export type GalleryData = typeof galleryRaw;
export const gallery: GalleryData = galleryRaw;
