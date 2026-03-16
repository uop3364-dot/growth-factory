"""Keyword engine: generates page candidates from seed data combinations."""

from itertools import product
from typing import Optional
from .seed_data import PLATFORMS, TOPICS, TONES, PLATFORM_DISPLAY, TOPIC_DISPLAY, TONE_DISPLAY


def generate_page_candidates(
    platforms: Optional[list[str]] = None,
    topics: Optional[list[str]] = None,
    tones: Optional[list[str]] = None,
) -> list[dict]:
    """Generate all page candidate combinations."""
    platforms = platforms or PLATFORMS
    topics = topics or TOPICS
    tones = tones or TONES

    candidates = []
    seen_slugs = set()

    # Platform-only pages
    for platform in platforms:
        slug = f"/caption-generator/{platform}"
        if slug not in seen_slugs:
            seen_slugs.add(slug)
            candidates.append({
                "slug": slug,
                "page_type": "platform",
                "platform": platform,
                "topic": None,
                "tone": None,
                "title": f"Free {PLATFORM_DISPLAY.get(platform, platform)} Caption Generator",
                "priority": 0.8,
            })

    # Platform + Topic pages
    for platform, topic in product(platforms, topics):
        slug = f"/caption-generator/{platform}/{topic}"
        if slug not in seen_slugs:
            seen_slugs.add(slug)
            candidates.append({
                "slug": slug,
                "page_type": "platform_topic",
                "platform": platform,
                "topic": topic,
                "tone": None,
                "title": f"{PLATFORM_DISPLAY.get(platform, platform)} {TOPIC_DISPLAY.get(topic, topic)} Caption Generator",
                "priority": 0.7,
            })

    # Platform + Topic + Tone pages
    for platform, topic, tone in product(platforms, topics, tones):
        slug = f"/caption-generator/{platform}/{topic}/{tone}"
        if slug not in seen_slugs:
            seen_slugs.add(slug)
            candidates.append({
                "slug": slug,
                "page_type": "platform_topic_tone",
                "platform": platform,
                "topic": topic,
                "tone": tone,
                "title": f"{TONE_DISPLAY.get(tone, tone)} {TOPIC_DISPLAY.get(topic, topic)} Captions for {PLATFORM_DISPLAY.get(platform, platform)}",
                "priority": 0.6,
            })

    return candidates


def get_candidate_count(
    platforms: Optional[list[str]] = None,
    topics: Optional[list[str]] = None,
    tones: Optional[list[str]] = None,
) -> dict:
    """Get counts without generating all candidates."""
    p = len(platforms or PLATFORMS)
    t = len(topics or TOPICS)
    tn = len(tones or TONES)
    return {
        "platform_pages": p,
        "topic_pages": p * t,
        "tone_pages": p * t * tn,
        "total": p + (p * t) + (p * t * tn),
    }
