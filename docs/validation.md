# 로컬 검증 기록

검증일: 2026-11-04 (Asia/Seoul). Codex 인앱 실제 Chromium 브라우저 및 Node.js 24.22.1 사용. 빌드나 외부 라이브러리 설치 없이 검증했습니다.

## 완료한 검증

| 항목 | 실제 결과 |
| --- | --- |
| Home / Projects / Detail | 실제 브라우저에서 정상 렌더링 |
| 공통 Header / Footer | 모든 페이지 및 잘못된 ID 안내 화면에서 표시 |
| 대표 프로젝트 | Home 4개, 동일 데이터에서 목록 4개 표시 |
| 폰트 | 브라우저 document.fonts.check('16px Pretendard') true |
| 데스크톱 1280px | 프로젝트 2열, 가로 넘침 없음 |
| 태블릿 834×1112 | 프로젝트 1열, 가로 넘침 없음, 스크린샷 확인 |
| 모바일 390×844 | Home/목록/상세 정상, 1열, 가로 넘침 없음, 스크린샷 확인 |
| 메뉴 | 열기, Escape 닫기, 외부 클릭 닫기, Contact 선택 후 닫기 확인 |
| 메뉴와 본문 | 열린 헤더 하단과 Hero 상단 좌표가 같아 본문 겹침 없음 |
| Contact | Home의 #contact로 이동하여 화면 내 표시 확인 |
| 분류 데이터 | 요청한 정확한 명칭의 16개 분류 확인 |
| 단일 필터 | 심리학 선택 시 Project 01 1개, 클라우드 선택 시 0개 |
| 빈 결과 | 안내 화면 표시 및 전체 프로젝트 보기로 4개 복구 |
| 자동 이동 | 시점별 scrollLeft 증가 확인, 정지 버튼 aria-pressed=true 확인 |
| 복제 버튼 | 원본 전체 포함 17개, 복제 그룹 aria-hidden=true 및 모든 버튼 tabindex=-1 |
| 상세 이동 | 카드 → Project 01 → 다음 Project 02 → 이전 Project 01 확인 |
| 빈 필드 | 기간·역할 등 미등록 메타 정보 영역 0개, 개요 1개만 표시 |
| 잘못된 ID | missing ID의 안내 제목과 목록 복귀 링크 정상 |
| 콘솔 | 검증 브라우저에서 수집한 error/warn 로그 없음 |
| 정적 검증 | 모든 JS 및 서버 문법, 데이터 ID 중복, 분류 명칭, 이미지 존재, 로컬 HTML 자산 참조 통과 |

## 발견 및 수정
화면 밖 원본 분류를 클릭할 때 focusin의 위치 보정이 포인터 클릭 좌표를 바꾸는 문제를 수정했습니다. 키보드 focus-visible에만 수동 보정을 적용하며 수정 후 심리학 → 클라우드 → 전체 복구 흐름을 실제 클릭으로 재검증했습니다.

초기 서버는 실행 환경의 네트워크 격리 때문에 접근하지 못했으나, 같은 실행 환경에서 서버와 HTTP 확인을 수행한 뒤 127.0.0.1:4175에서 HTTP 200 및 실제 브라우저 접근을 확인했습니다. 서버는 검증 후 종료합니다. 재실행은 README를 참고하세요.

## 검증 범위의 제한
- 실제 모바일 하드웨어의 손가락 스와이프, OS의 모션 감소 설정 전환, 모든 분류의 무한 순환 경계에 대한 장시간 관찰은 수행하지 않았습니다. 터치 스크롤, reduced-motion 분기 및 루프 계산은 코드 검토로 확인했습니다.
- Safari/Firefox 및 별도 스크린리더 실기 검증은 수행하지 않았습니다.
- 아직 실제 이메일이 없어 mailto 발송, 실제 프로젝트의 장문·표·추가 이미지 콘텐츠는 운영 데이터로 검증하지 않았습니다.

## 남은 콘텐츠 작업
실제 프로젝트 4개의 제목·이미지·기간·역할·과정·성과·회고, Hero 이미지, About Me, 이메일은 의도적으로 미등록 상태입니다. 임의 경력이나 성과를 만들지 않았습니다. 코드상 확인된 미해결 오류는 없습니다.

## 기록 파일
output/playwright/home-desktop.png — 실제 브라우저 데스크톱 Home 캡처. 검증 자료이므로 호스팅에 포함할 필요가 없습니다.

## 2026-11-09 상세 페이지 공통 시스템

이 절은 현재 Project 01~04의 실제 콘텐츠를 대상으로 한 추가 검증입니다. 앞선 초기 구축 기록의 미등록 콘텐츠 설명은 당시 상태입니다.

기존 문제는 기본 컨테이너 1160px, 제목 900px, 본문 760px이 서로 달랐고 연구/분석/비전 스타일에서 메타 열 비율·간격을 덮어쓴 데 있었습니다. 상세 전용 공통 CSS로 800px 기준선을 통합했습니다. ID별 보정은 추가하지 않았습니다. 프로젝트 데이터·이미지·통계 수치·Home/목록 HTML은 이번 작업에서 변경하지 않았습니다.

Chromium Headless Shell에서 `scripts/validate-detail.cjs`로 50개 사례를 통과했습니다. 각 사례는 1440/1280/834/390/360px에서 실행했습니다.

| 대상 | 결과 |
| --- | --- |
| Project 01 | 수행 유형 전체 행, 기술·도구 독립 전체 행 정상 |
| Project 02 | 수행 유형/담당 역할 데스크톱 50:50, 모바일 1열 정상 |
| Project 03 | 수행 유형/담당 역할 50:50, 긴 기술 목록 전체 행 정상 |
| Project 04 | 수행 유형/담당 역할 50:50, 여러 도구·이미지·차트 정상 |
| 수행 유형만 / 역할만 / 도구만 | 각 5개 화면에서 전체 행 정상 |
| 메타 없음 / 공백만 있음 | 각 5개 화면에서 dl·구분선 생략 |
| 긴 제목·영문·URL·기술 목록·추가 메타 | 줄바꿈 및 추가 항목 전체 행, 빈 항목 생략 정상 |
| 확장 표·차트 | 최대 1160px/화면 여백 유지, 일반 본문은 800px 유지 |
| 모바일 표 | 표 내부 가로 스크롤, 페이지 가로 넘침 없음 |
| 긴 이전·다음 제목 | 줄바꿈 후 페이지 가로 넘침 없음 |
| 인터랙션 | details 펼치기 및 기획 데모 기업 전환 정상 |

모든 사례에서 제목·대표 이미지(있는 경우)·메타·본문·이전/다음 탐색의 좌우 좌표와 너비가 일치했습니다. 기존 프로젝트 이미지 로딩 실패와 JavaScript 페이지 오류는 0건입니다. 데스크톱과 360px 모바일 스크린샷 8장을 저장하고 화면 구성을 확인했습니다.

검증 자료: `output/playwright/detail-system-results.json`, `output/playwright/detail-system-project-00{1..4}-{1440,360}.png`. `DETAIL_TEST_URL`로 검증 서버 주소를 지정할 수 있습니다. 외부 CDN 대기를 차단해 시스템 폰트로 검사했으므로 Pretendard 다운로드 상태와 별도 Safari/Firefox/실제 모바일 하드웨어는 이번 검증에 포함하지 않았습니다.

수정 파일: `assets/css/variables.css`, `layout.css`, `responsive.css`, `project-research.css`, `project-analytics.css`, `project-vision.css`, 신규 `project-detail.css`, `assets/js/project-detail.js`, `projects/detail.html`, `scripts/validate-detail.cjs`, `docs/design-guide.md`, 이 문서. 기존 작업 중 변경사항은 보존했습니다.

## 2026-11-09 Home About·Skills와 Projects 태그 연결

- About 세 문단의 textContent를 요청 원문과 정확히 비교해 통과했습니다. Home 섹션 순서도 Hero → Selected Projects → About → Skills → Contact와 일치합니다.
- 1440/1280/834/390/360px에서 PC About 2열·모바일 1열, Skills PC 한 행·모바일 설명 아래 배치, 페이지 가로 넘침 없음, 호버 문구 전환 후 동일한 행 높이를 확인했습니다.
- 다섯 Skills 링크의 URL 매핑을 확인하고 실제 키보드 Enter 및 터치 에뮬레이션 탭으로 각 태그에 이동했습니다. 링크 간 Tab 이동, 포커스 외곽선도 확인했습니다.
- 각 태그의 선택 버튼, 프로젝트 id 목록과 건수를 원본 데이터에서 계산한 기대값과 대조해 일치했습니다. 새로고침, 전체 선택 시 URL tag 제거, 빈 결과의 초기화 버튼, 뒤로/앞으로 이동, 태그 누락·유효하지 않음·잘못된 인코딩도 통과했습니다.
- Chromium Headless Shell, 시스템 폰트 기준입니다. JavaScript 페이지 오류 0건. 실제 모바일 기기와 Safari/Firefox는 검증하지 않았습니다.
- 검증 스크립트: scripts/validate-home.cjs. 기존 검증과 같이 PLAYWRIGHT_MODULE/CHROMIUM_PATH 및 DETAIL_TEST_URL 환경 변수를 지원합니다.
- 화면 검토: output/playwright/home-about-{1440,360}.png, home-skills-{1440,360}.png.
- 프로젝트 데이터와 기존 태그는 수정하지 않았습니다.

## 2026-11-09 Home 이미지형 About·카드형 Skills

이 기록은 같은 날 앞선 텍스트형 About·리스트형 Skills를 대체하는 UI 검증입니다.

- About: 요청한 세 라벨/제목 및 본문 원문 일치를 확인했습니다. 생성 이미지 3장은 1200×900 WebP로 프로젝트에 저장했습니다. 모든 화면에서 4:3을 유지하고, PC는 동일 너비 이미지 왼쪽/텍스트 오른쪽 및 세로 중앙 정렬, 모바일은 이미지 다음 텍스트 배치를 확인했습니다. 페이지 가로 넘침은 없었습니다.
- Skills: Lucide 라이브러리의 뇌/화면/차트/칩/새싹 선형 SVG를 로컬 저장했습니다. 카드 크기·높이 동일, PC 3+2 및 아래 2개 중앙 정렬, 태블릿 2열, 모바일 1열 검증을 통과했습니다. 프로젝트 보기 문구는 기본 표시되며 호버 후 카드 높이 변화가 없습니다. 키보드 포커스 외곽선 및 강조 테두리·아이콘도 확인했습니다.
- 반응형 화면: 1440/1280/834/390/360px. 화면 자료는 output/playwright/home-about-v2-{1440,360}.png와 home-skills-v2-{1440,360}.png입니다. 긴 섹션 캡처에서는 고정 헤더와 건너뛰기 링크를 캡처 중에만 숨겨 문서 중간에 끼어드는 현상을 방지했습니다.
- 다섯 카드의 키보드 Enter와 터치 에뮬레이션 탭으로 각각 지정된 단일 태그에 이동했습니다. 선택 버튼·실제 프로젝트 id 목록·건수 일치, 새로고침, 전체 초기화, 뒤로/앞으로 복원을 통과했습니다. 기존 projects.js와 프로젝트 데이터는 이번 UI 변경에서 수정하지 않았습니다.
- Chromium Headless Shell에서 scripts/validate-home.cjs 통과, JavaScript 페이지 오류 0건입니다. 외부 폰트 CDN은 차단하고 시스템 폰트로 확인했습니다. 실제 모바일 기기/Safari/Firefox 검증은 포함하지 않습니다.
- 변경 파일: index.html, assets/css/layout.css·components.css·responsive.css, scripts/validate-home.cjs, README.md, docs/design-guide.md·validation.md·about-images.md. 추가 자산: assets/images/about/*.webp 및 assets/images/icons/lucide의 SVG 5개와 LICENSE/README.md.

## 2026-11-09 About 축소·교차 배치 및 Skills inline SVG

- 기존 About 라벨·제목·본문과 다섯 Skills 태그 링크는 유지했습니다. PC에서는 둘째 행만 이미지가 오른쪽, 모바일에서는 세 행 모두 이미지가 먼저 오는 것을 좌표 검사 및 실제 캡처로 확인했습니다.
- PC 이미지는 최대 400×280px, 모바일은 최대 400px/원본 4:3이며 열 안에서 중앙 정렬됩니다. 본문 중앙 정렬, keep-all 줄바꿈, 행 사이 약 57px 여백, 섹션 패딩 64px/모바일 48px을 적용했습니다. 행 높이는 고정하지 않습니다.
- 심리학과 스마트팜 이미지 파일은 그대로 유지하고 업무 이미지만 about-web-planning-collage.webp로 교체했습니다. 도식·화면설계서·차트 중심의 회색/파란색 콜라주로 심리학 책상 사진과 구분됩니다. 원본은 1200×900 WebP입니다. 프롬프트는 docs/about-images.md에 기록했습니다.
- Skills는 CSS mask를 제거하고 실제 inline SVG 5개를 표시합니다. 모두 선 두께 1.5/둥근 끝처리, 아이콘 52px/배경 영역 72px입니다. SVG 경로 5개가 서로 다르고 브라우저에서 52×52px로 표시되는 것을 검사하고 화면으로 확인했습니다. 뇌는 Lucide 경로, 나머지는 요청한 복합 형태로 직접 구성했습니다. 기존 Lucide 라이선스는 보존했습니다.
- 1440/1280/834/390/360px에서 교차 배치·이미지 크기·본문 원문·카드 동일 크기·3+2 중앙/2열/1열 배치를 통과했습니다. 호버 및 키보드 포커스 시 translateY(-4px), 모션 감소 시 transform:none을 확인했습니다. 링크 키보드/터치 이동, 단일 태그·목록·건수, 새로고침·초기화·뒤로/앞으로도 통과했습니다. JavaScript 페이지 오류와 페이지 가로 넘침은 없었습니다.
- 화면 자료: output/playwright/home-about-v3-{1440,360}.png, home-skills-v3-{1440,360}.png. Chromium Headless Shell/시스템 폰트 기준이며 실제 모바일 기기와 Safari/Firefox는 포함하지 않았습니다.
- 수정 파일: index.html, assets/css/layout.css·components.css·responsive.css, scripts/validate-home.cjs, docs/design-guide.md·validation.md·about-images.md. 신규 이미지: assets/images/about/about-web-planning-collage.webp. 이전 작업 중 변경사항은 보존했습니다.

## 2026-11-09 Skills 가로 헤더·축소 카드

Skills 영역만 개선했습니다. 카드 최소 높이 200px/패딩 24px/간격 24px, PC 3+2 중앙 배치·태블릿 2열·모바일 1열을 유지합니다. Lucide 원본 경로의 단순 뇌·화면·막대차트·칩·새싹 SVG를 30px/선 두께 1.5로 통일하고 회색 아이콘 배경을 제거했습니다. 아이콘과 22px 제목은 12px 간격으로 중앙 정렬합니다. 설명 14px은 상단에서 16px 아래, 프로젝트 보기와 화살표는 카드 하단 좌우에 고정합니다. 밝은 흰색 배경과 얇은 테두리를 사용하며 호버·포커스에는 색만 변경합니다.

scripts/validate-home.cjs로 1440/1280/834/390/360px에서 PC 높이 190–210px, 전체 동일 크기, 아이콘·제목 중앙 및 간격, SVG 5개 표시, 하단 정렬, 포커스, 태그별 프로젝트/건수, 새로고침·히스토리, 키보드·터치 이동 검증을 통과했습니다. Chromium Headless Shell/시스템 폰트 기준이고 페이지 오류·가로 넘침은 없습니다. 실제 화면 캡처 home-skills-v4-1440.png와 home-skills-v4-360.png를 확인했습니다. About·프로젝트 데이터·필터 코드는 이번 변경에서 수정하지 않았습니다.

변경 파일: index.html의 Skills 마크업, assets/css/components.css의 Skills 규칙, scripts/validate-home.cjs, docs/design-guide.md·validation.md, assets/images/icons/lucide/README.md. 추가 파일: assets/images/icons/lucide/chart-column.svg.

## 2026-11-09 Contact 이메일과 GNB 모달

PORTFOLIO.email에 cksfl0214@gmail.com을 등록했습니다. Home Contact는 mailto 링크로 표시하고 GNB Contact는 Email/GitHub를 담은 공통 dialog를 엽니다. 모바일 메뉴를 먼저 닫고 모달을 열며 배경 스크롤을 잠급니다.

scripts/validate-contact.cjs로 Home·Projects·상세 페이지 × 1440/834/390/360px 총 12개 화면에서 이메일/GitHub href, 모달 열기 시 URL 유지, 초점 진입·배경 포커스 차단·닫은 뒤 포커스 복귀, Escape/버튼/바깥 클릭 닫기, 스크롤 잠금 해제, 가로 넘침 없음을 확인했습니다. 추가로 모바일 터치 에뮬레이션에서 메뉴→Contact→닫기를 통과했습니다. 페이지 오류는 0건입니다. Chromium Headless Shell/시스템 폰트 기준이며 메일 발송은 실행하지 않고 mailto 주소만 확인했습니다. 실제 모바일 장치/Safari/Firefox 검증은 포함하지 않습니다.

캡처: output/playwright/contact-modal-1440.png, contact-modal-360.png. 수정 파일: assets/js/projects-data.js·main.js, assets/css/components.css·responsive.css, docs/design-guide.md·validation.md. 추가 검증 스크립트: scripts/validate-contact.cjs.
