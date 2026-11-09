# About 이미지 제작 기록

## 업무 이미지 교체 — 2026-11-09

현재 업무 이미지는 `assets/images/about/about-web-planning-collage.webp`(1200×900, 4:3)입니다. 기존 심리학·스마트팜 이미지는 유지했습니다. 이전 업무 사진은 참조하지 않는 원본으로 보존합니다. 새 이미지는 실제 고객 데이터나 성과 수치를 포함하지 않는 생성 콜라주이며, 내장 image_gen 도구를 사용했습니다.

새 업무 이미지 프롬프트:

```text
Use case: productivity-visual. Create one landscape 4:3 image for the web-planning and data-analysis About section of a minimal personal portfolio. A polished editorial collage of work documents themselves, NOT a photographed desk or room. Center a large white website wireframe sheet with clear gray rectangular layout blocks and image placeholders. Around it layer slightly offset service flowchart sheets with connected rounded rectangles and nodes, and smaller analytics dashboard panels with bars, line charts, and circular indicators. Restrained dimensional paper layering with very soft shadows, mostly straight-on view, precise crisp diagram lines, generous breathing room. Bright warm off-white background, light grays and calm muted blue accents. Quiet professional visual coherent with warm neutral photographic About images, but clearly a document/diagram collage. No desk, laptop, plant, mug, interior, people, logo, branding, numbers, sentences, fake text or letter-like glyphs. All information expressed only through geometric shapes and charts. No implication of actual customer data or performance. Output exactly 4:3, ideally 1200x900.
```

아래는 최초 세 이미지 제작 기록입니다.

2026-11-09 내장 image_gen 도구로 각각 생성했습니다. 실제 개인 작업실·수행 결과·재배시설을 촬영한 사진이 아닌 분야 소개용 이미지입니다. 페이지에 실제 결과를 암시하는 캡션은 넣지 않았고, 대체 텍스트에 생성 이미지임을 표시했습니다.

| 적용 파일 | 내용 | 형식 |
| --- | --- | --- |
| assets/images/about/about-psychology.webp | 심리 측정 자료·통계 그래프·연구 노트 | 1200×900, 4:3 |
| assets/images/about/about-web-planning.webp | 와이어프레임·서비스 흐름도·분석 대시보드 | 1200×900, 4:3 |
| assets/images/about/about-smart-farm.webp | 실내 재배시설·환경 센서·모니터링 화면 | 1200×900, 4:3 |

생성 원본은 Codex generated_images에 보존하고, 사이트용 파일은 비율을 유지해 1200×900으로 축소 후 WebP quality 86으로 저장했습니다. 각 약 95/108/140KB입니다.

## 실제 프롬프트

각 요청은 아래 공통 프롬프트와 해당 장면 프롬프트를 순서대로 연결했습니다. 투명 배경은 사용하지 않았습니다.

공통:
```text
Use case: photorealistic-natural. Asset: personal portfolio About editorial image, landscape exactly 4:3, 1200x900. A calm, realistic photographic series: warm off-white #F8F7F3, light gray #EEECE6, restrained charcoal #171717 accents; soft diffused daylight from left, neutral warm grading, medium-wide three-quarter viewpoint slightly above the workspace, natural matte materials, consistent moderate detail, no people. No title, logos, watermark, readable sentences or branded screens. Diagrams and screen contents are abstract lines, nodes, bars and curves, not typography.
```

심리학:
```text
Scene 1 of 3, psychology research desk. Off-white desk with psychological measurement questionnaire sheets showing abstract rows of empty circular response scales, printed statistical scatter and distribution plots, an open research notebook and a pencil. Quiet ordered composition with paper and research tools as main subjects. Frame the complete desk grouping with breathing room. Create one standalone photo, not a collage.
```

웹 기획·데이터 분석:
```text
Scene 2 of 3, web planning and analytics workspace. Off-white desk with a restrained charcoal monitor and open laptop showing abstract website wireframe panels, a service flow diagram with connected boxes and nodes, and a clean analytics dashboard with simple line and bar charts. Printed wireframe sheets and notebook on desk. Same soft side daylight, warm-white wall, gray textiles, calm ordered density as an editorial research desk photograph. No people, no readable text, no labels, no logos. Frame entire workspace grouping, one standalone photograph.
```

AI·스마트팜:
```text
Scene 3 of 3, indoor smart farming environment. Small clean indoor cultivation facility with off-white growing racks and trays of leafy green seedlings, visible compact environmental sensor modules and neat probe cables; a charcoal monitoring display at the side shows abstract humidity and temperature trends as minimal graphs, bars, circular gauges without words. Soft diffused neutral daylight from left, gentle warm white growing lights not purple, warm-gray interior surfaces, same eye-level slightly elevated three-quarter photographic viewpoint and calm detail level as workspace editorial photos. Green only from natural foliage; charcoal details restrained. No people, no logos, no readable text, one standalone photo.
```
