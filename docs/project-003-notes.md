# Project 03 원고 반영 기록

2026-11-09. 사용자가 새로 제공한 원고를 기준으로 본문을 7개 영역으로 교체했습니다.

## 구성

1. Overview — 여러 공공 웹사이트의 경험을 종합한 프로젝트 개요
2. Google Analytics 4 — 사용자·유입·이용 데이터 수집
3. Google Tag Manager — 사용자 행동 태깅과 검증
4. Looker Studio — KPI·유입·행동·기간별 비교 시각화
5. Operation & Monitoring — 정기 모니터링, 이슈 검토, 대응 제안
6. Web Consulting — 현황 진단, 문제 정의, 신규·개편 방향 제안
7. Results & Reflection — 주요 수행 업무와 회고

이전 지시에 맞춰 ‘주요 수행 업무 및 산출물’은 ‘주요 수행 업무’로 표시했습니다. 한 사이트에서 모든 업무를 수행한 것으로 읽히지 않도록 복수 사이트 경험이라는 설명을 유지했습니다. 이상 현상의 원인은 확정했다는 표현 대신 검토했다고 기술했습니다.

이번 원고 중심 구성에서는 이전 가상 태깅 표·대시보드·개선 방향 표를 본문에서 제외했습니다. 회사 자료와 실제 운영 데이터는 추가하지 않았습니다. 대표 SVG·상단 도구 목록·타 프로젝트는 유지했습니다.

## 수정 및 검증

- assets/js/projects-data.js: project-003 본문 교체. 수정 직전과 비교해 나머지 프로젝트 데이터 객체 동일 확인.
- assets/css/project-analytics.css: 분석 페이지에만 하위 제목·목록 간격과 글자 크기 적용.
- README.md 및 이 기록 갱신.
- Node JavaScript 문법 검사 통과.
- 로컬 인앱 브라우저 PC 1280px·모바일 390px에서 본문과 제목 위계를 검수하고 가로 넘침 없음 확인.
- 7개 본문 영역, 산출물 문구 없음, 콘솔 error/warn 없음 확인.
- 화면 기록: output/playwright/project-003-tools-desktop.png, output/playwright/project-003-tools-mobile.png.

원격 사이트 배포, Git 커밋·푸시는 수행하지 않았습니다. 실제 모바일 하드웨어·Safari·Firefox 검수는 포함하지 않았습니다.
