# Feature: Press Articles via Metaobjects

| Field            | Value                          |
| ---------------- | ------------------------------ |
| **Status**       | completed                      |
| **Owner**        | @dmytro                        |
| **Created**      | 2026-07-16                     |
| **Last Updated** | 2026-07-16                     |

## Original Prompt

> Louis Caverly [8:43 AM]: Hope you are well! We have a new article coming out about the brand this week. Trying to figure out a way that I can easily add these articles. We have a press section but it needs to be coded everytime. Any ideas?
>
> Louis Caverly [8:50 AM]: Ok, i am already hosting articles that we wrote in the blog section. These will be articles published on other sites (press coverage) that we link to

## Summary

Makes the Press Coverage modal (hb-footer-cta section) pull external press
links from a `press_article` Shopify metaobject instead of hard-coded
placeholders. Louis adds entries in Shopify Admin → Content → Metaobjects with
zero code changes; the modal falls back to the "coming soon" placeholders when
no entries exist.
