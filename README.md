# 2charie 개인 포트폴리오

심리학, 웹 기획·데이터 분석 경험과 AI·스마트팜 학습 및 프로젝트를 소개하기 위한 확장 가능한 정적 사이트입니다. 현재 프로젝트는 모두 명시적인 임시 데이터이며 경력이나 성과를 생성하지 않았습니다.

## 기술 스택
HTML5, CSS3, Vanilla JavaScript(ES6+). 프레임워크, 패키지 설치, 빌드가 필요하지 않습니다. Pretendard 1.3.9 웹폰트는 jsDelivr에서 불러오며 실패 시 시스템 폰트를 사용합니다.

## 폴더 구조
~~~text
portfolio/
├── index.html
├── projects/
│   ├── index.html
│   └── detail.html
├── assets/
│   ├── css/
│   │   ├── variables.css
│   │   ├── base.css
│   │   ├── layout.css
│   │   ├── components.css
│   │   └── responsive.css
│   ├── js/
│   │   ├── main.js
│   │   ├── projects-data.js
│   │   ├── projects.js
│   │   └── project-detail.js
│   └── images/
│       ├── hero/.gitkeep
│       └── projects/placeholder-01.svg … placeholder-04.svg
├── scripts/serve.mjs
├── docs/
│   ├── design-guide.md
│   └── validation.md
├── output/playwright/home-desktop.png
└── README.md
~~~

## 로컬 실행
프로젝트 루트의 터미널에서 Node.js로 실행합니다.
~~~powershell
node scripts/serve.mjs
~~~
브라우저에서 http://127.0.0.1:4173 을 엽니다. 종료는 Ctrl+C입니다. 다른 포트는 node scripts/serve.mjs 8080 으로 지정합니다. Python이 설치되어 있다면 python -m http.server 4173 --bind 127.0.0.1 도 사용할 수 있습니다.

## 주요 페이지
- Home: /index.html — Hero, 대표 프로젝트, About 위치, 역량 목록, Contact
- Projects: /projects/index.html — 전체 프로젝트와 16개 분류 단일 선택
- Detail: /projects/detail.html?id=project-001 — 데이터 기반 공통 상세 템플릿
- About Me는 콘텐츠가 준비될 때까지 hidden 처리되어 불필요한 공백을 만들지 않습니다.

## 프로젝트 등록 및 수정
assets/js/projects-data.js의 PORTFOLIO.projects 배열에 객체를 추가합니다. 기존 임시 객체를 복사하면 모든 필드를 확인할 수 있습니다.

| 필드 | 용도 |
| --- | --- |
| id | 중복되지 않는 영문 ID. 상세 URL에 사용 |
| title, summary | 제목, 요약 |
| categories | PORTFOLIO.categories의 정확한 명칭을 사용하는 배열 |
| image, imageAlt | 사이트 루트 기준 상대 경로, 이미지 설명 |
| placeholder | 실제 콘텐츠로 교체하면 false |
| featured | true인 프로젝트 중 데이터 순서대로 최대 4개를 Home에 표시 |
| period, type, role | 기간, 수행 유형, 담당 역할. 비어 있으면 생략 |
| tools | 기술 및 도구 배열 |
| overview, problem, process, results, reflection | 상세 본문. 빈 값은 제목을 포함해 생략 |

이미지를 assets/images/projects/에 등록하고 image 경로를 입력합니다. 데이터의 경로 앞에 /를 붙이지 마세요. 대표 이미지 권장 비율은 4:3입니다. 기본적으로 HTML 수정 없이 데이터와 이미지만 추가하면 됩니다. 이전·다음 이동은 배열 순서를 따르며 처음/마지막에서는 존재하는 방향만 표시합니다.

본문은 문자열 또는 블록 배열을 지원합니다. 임의 HTML을 넣지 않으며 텍스트는 이스케이프합니다.
~~~js
process: [
  { type: 'paragraph', text: '실제 수행 과정' },
  { type: 'image', src: 'assets/images/projects/process.jpg', alt: '이미지 설명', caption: '캡션' },
  { type: 'table', caption: '비교 표', headers: ['항목', '내용'], rows: [['A', '설명']] },
  { type: 'link', href: 'https://example.com', label: '관련 자료' }
]
~~~
표, 이미지, 링크는 실제 콘텐츠가 준비되었을 때만 등록합니다. 링크 블록은 http, https, mailto 프로토콜만 허용합니다.

## Hero 및 연락처 수정
1. assets/images/hero/에 이미지를 등록합니다.
2. 현재 Hero 이미지는 assets/images/hero/hero-main.png입니다. 교체하려면 assets/css/variables.css의 --hero-image 경로를 변경합니다.
3. index.html의 #hero-title과 .hero-description을 수정합니다. 이미지 적용 후 글자 대비를 확인하고 필요하면 오버레이를 추가합니다.
4. assets/js/projects-data.js의 email을 실제 주소로 채우면 Email 행이 mailto 링크로 바뀝니다. 빈 상태에서는 주소 준비 중으로 표시합니다.
5. 역량·도구는 index.html의 .expertise-list를 수정합니다. About은 #about의 hidden을 제거하고 실제 제목과 본문을 추가합니다.

## 디자인과 검증
디자인 기준: docs/design-guide.md. 로컬 검증 기록: docs/validation.md.

## 향후 GitHub Pages 참고
2charie.github.io 저장소 루트에 index.html과 assets, projects를 동일한 구조로 배치할 수 있습니다. 경로는 스크립트 위치로부터 사이트 루트를 계산하므로 하위 경로에서도 작동합니다. 서버 스크립트는 개발 전용이며 배포에 필요하지 않습니다. 커스텀 도메인, 자동 배포, Git 커밋·푸시는 이번 작업에 포함하지 않았습니다. 정적 호스팅에서 데이터 기반 상세 화면은 JavaScript가 필요합니다.

## Project 01 연구 콘텐츠
project-001은 연구 질문·설계·분석·결과·한계를 담은 sections 배열을 사용합니다. 각 항목은 title과 content(기존 본문 블록 배열)를 가집니다. 기존 overview/problem/process/results/reflection 필드도 계속 지원하므로 다른 프로젝트를 수정할 필요가 없습니다.

추가 본문 블록: heading(text), note(text), steps/flow/findings(items: [{title, text}]), barChart(caption, unit, max, ticks, rows: [{label, detail, value}], note). 차트의 수치는 원문에서 확인한 집계값만 등록합니다. 대표 이미지는 assets/images/projects/personality-research.svg이며 실제 관측 자료가 아닌 개념 그래픽입니다.

원문 대조와 확인 사항은 docs/project-001-review.md에 기록했습니다. 원본 PDF는 저장소에 포함하지 않습니다.

## Project 02 기획 사례
공공 계약 모니터링 프로젝트는 project-002의 sections 데이터로 관리합니다. 진행 중 상태와 담당 역할을 표시하고, 계획 과정 및 독립 제작 개념 화면을 추가했습니다. 신규 대표 이미지는 assets/images/projects/contract-monitoring-cover.svg, 기획 블록은 assets/js/project-planning.js와 assets/css/project-planning.css입니다.

개념 화면의 기업·계약·금액은 가상 데이터입니다. planningDemo.companies의 계약 배열에서 건수·금액을 계산하며 실제 회사 자료를 등록하지 않습니다. 제작 범위와 로컬 검수 기록은 docs/project-002-notes.md에 있습니다.
