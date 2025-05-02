---
title: Chromium 컨트리뷰션 가이드
description: Chromium 프로젝트에 기여하는 방법을 배우고 실습하는 가이드
---

# Chromium 컨트리뷰션 가이드

이 사이트는 Chromium 프로젝트에 기여하는 방법을 배우고 실습하는 가이드입니다.

## 목차

- [시작하기](/getting-started)
- [컨트리뷰션 가이드](/contributing)
- [학생들의 컨트리뷰션](/student-contributions)

## 최근 업데이트

{% for post in site.posts limit:5 %}
- [{{ post.title }}]({{ post.url | relative_url }}) - {{ post.date | date: "%Y-%m-%d" }}
{% endfor %} 