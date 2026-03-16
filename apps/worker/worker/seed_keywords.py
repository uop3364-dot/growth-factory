"""Script to seed keywords and generate page candidates."""

from .keyword_engine import generate_page_candidates, get_candidate_count
import json


def main():
    counts = get_candidate_count()
    print(f"Page candidate counts:")
    print(f"  Platform pages: {counts['platform_pages']}")
    print(f"  Topic pages: {counts['topic_pages']}")
    print(f"  Tone pages: {counts['tone_pages']}")
    print(f"  Total: {counts['total']}")
    print()

    candidates = generate_page_candidates()

    # Write to data directory
    output_path = "../../data/page_candidates.json"
    with open(output_path, "w") as f:
        json.dump(candidates, f, indent=2)

    print(f"Generated {len(candidates)} page candidates")
    print(f"Written to {output_path}")

    # Show first 10
    print("\nFirst 10 candidates:")
    for c in candidates[:10]:
        print(f"  {c['slug']} ({c['page_type']}) - {c['title']}")


if __name__ == "__main__":
    main()
