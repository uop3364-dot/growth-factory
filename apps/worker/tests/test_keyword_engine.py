"""Tests for keyword engine."""

from worker.keyword_engine import generate_page_candidates, get_candidate_count


def test_candidate_count():
    counts = get_candidate_count()
    # 5 platforms + 5*10 topics + 5*10*7 tones = 5 + 50 + 350 = 405
    assert counts["platform_pages"] == 5
    assert counts["topic_pages"] == 50
    assert counts["tone_pages"] == 350
    assert counts["total"] == 405


def test_generate_candidates():
    candidates = generate_page_candidates()
    assert len(candidates) == 405

    # Check no duplicates
    slugs = [c["slug"] for c in candidates]
    assert len(slugs) == len(set(slugs))


def test_candidates_have_required_fields():
    candidates = generate_page_candidates()
    for c in candidates:
        assert "slug" in c
        assert "page_type" in c
        assert "platform" in c
        assert "title" in c
        assert "priority" in c


def test_custom_subset():
    candidates = generate_page_candidates(
        platforms=["instagram"],
        topics=["travel"],
        tones=["funny", "cute"],
    )
    # 1 platform + 1*1 topic + 1*1*2 tones = 4
    assert len(candidates) == 4


def test_first_candidate_is_platform():
    candidates = generate_page_candidates()
    assert candidates[0]["page_type"] == "platform"
    assert candidates[0]["slug"].startswith("/caption-generator/")
