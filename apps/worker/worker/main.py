"""Main worker entry point."""

import argparse
from .keyword_engine import generate_page_candidates, get_candidate_count


def main():
    parser = argparse.ArgumentParser(description="GrowthFactory Worker")
    parser.add_argument("--action", choices=["seed", "count", "report"], default="count")
    args = parser.parse_args()

    if args.action == "count":
        counts = get_candidate_count()
        print(f"Total page candidates: {counts['total']}")
        for key, value in counts.items():
            print(f"  {key}: {value}")

    elif args.action == "seed":
        from .seed_keywords import main as seed_main
        seed_main()

    elif args.action == "report":
        candidates = generate_page_candidates()
        print(f"Report: {len(candidates)} pages available")
        by_type = {}
        for c in candidates:
            by_type.setdefault(c['page_type'], []).append(c)
        for page_type, pages in by_type.items():
            print(f"  {page_type}: {len(pages)} pages")


if __name__ == "__main__":
    main()
