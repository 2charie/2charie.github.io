# Project 04 구현 및 원본 대조 기록

2026-11-09. 현재 로컬 포트폴리오의 project-004를 해충 이미지 분류 사례로 교체했습니다. 이후 사용자가 당시 사용한 파일로 지정한 Baseline_for_Colab_ipynb의_사본의_사본.ipynb만 읽어 콘텐츠를 수정했습니다. 다른 프로젝트 파일인 h_i_2_catboost_xgb_logistic_svc_blend.ipynb는 열거나 사용하지 않았습니다.

## 최신 구성 개선

사용자가 제공한 초안은 내용 전개를 참고하되 그대로 복사하지 않았습니다. 문제 → 모델 구성 → 학습 범위 조정 → 검증 결과 비교의 흐름으로 재작성하고, 세부 구현 판단을 개발 영역에 집중했습니다. 부제는 ‘딥러닝 기반 해충 이미지 분류 모델 개발’로 정리했습니다.

- 대표 SVG를 작은 해충 형태·트랩 격자·분석 영역·특징점 중심으로 교체했습니다. 텍스트·순서도·실제 대회 이미지는 포함하지 않았습니다.
- assets/js/project-vision.js의 trainingStages 블록으로 두 단계 학습 범위를 HTML/CSS로 시각화했습니다. ResNet50 앞부분·마지막 30개 계층·3종 분류층을 구분하고, 1단계는 분류층만, 2단계는 마지막 30개 계층과 분류층을 학습하도록 표시했습니다. 고정 상태는 패턴과 문구, 학습 상태는 어두운 면과 문구를 함께 사용합니다.
- 최고 검증 정확도 그래프와 0~100% 공통 축을 유지했습니다. 개별 Fold의 최고값과 전체 교차검증·외부 점수의 차이는 그래프 주석에 명시했습니다.
- 원본 완료 범위에 관한 설명은 회고·한계로 모아 개발 경험의 흐름을 유지했습니다.

PC 1280px 및 모바일 390px에서 학습 영역 두 행·6개 블록, 그래프 가독성·가로 넘침 없음과 콘솔 error/warn 없음을 확인했습니다. 데이터 수정 직전과 비교해 Project 01~03 객체 동일 확인, JS 문법 및 전용 렌더러의 다른 블록 무시 동작을 검사했습니다.

화면 기록: output/playwright/project-004-development-desktop.png, project-004-development-mobile.png, project-004-cover-updated.png. 첫 화면들은 학습 시각 자료를 보여주는 뷰포트 캡처입니다.

## 원본에서 확인한 내용

노트북은 26개 셀이며 코드를 실행하지 않고 코드와 저장된 출력을 대조했습니다. execution_count가 비어 있어 재현 실행 시점·환경 버전은 확정하지 않았습니다. 일부 한글 주석은 원본에서 깨져 있으므로 클래스의 한글 명칭은 사용자가 제공한 요청서를 따릅니다.

- 셀 3: Python, TensorFlow/Keras, NumPy, pandas, scikit-learn 사용.
- 셀 10·14·15: 학습 표 1500행·2열, 유효 학습 이미지 1500장·3클래스. 앞부분의 216×216·배치 4는 탐색용 로더이며, 최종 학습 호출의 설정과 구분.
- 셀 19: ImageNet 가중치 ResNet50, include_top=False, pooling=avg, Dense(3, softmax).
- 셀 20: 특징 추출부 고정·Adam 0.001·최대 50epoch 후 마지막 30계층 미세조정·Adam 0.00001·최대 30epoch. 두 단계 모두 val_accuracy 기준 patience=5, restore_best_weights=True. 실제 epoch 수는 조기 종료에 따라 다름.
- 셀 22·24·25: 실제 학습 입력 224×224·배치 32·ResNet preprocess_input, StratifiedKFold(n_splits=5, shuffle=True, random_state=42). Fold별 학습 1200장·검증 300장 출력 확인.
- 셀 24: Fold별 테스트 확률 합산 후 5로 나누고 argmax로 분류. CSV 저장 코드가 있으나 저장 완료 출력은 없음.
- 셀 25: Fold 1~3 학습·모델 저장·테스트 예측 완료 로그. Fold 4는 첫 단계 epoch 5 학습 도중까지 저장. Fold 5 로그 및 전체 fold_scores 요약은 없음.

| 완료된 Fold | 고정 단계 최고 검증 정확도 | 부분 미세조정 단계 최고 검증 정확도 |
| --- | --- | --- |
| 1 | 87.00% | 92.3333% |
| 2 | 83.00% | 94.00% |
| 3 | 80.3333% | 90.00% |

공개 그래프는 미세조정 단계 값만 소수 둘째 자리로 표시합니다. 각 Fold의 300장 검증셋에서 학습 중 얻은 최고값이며, 5-Fold 평균·OOF 정확도·테스트 정확도·제출 정확도가 아닙니다. 코드의 구현과 실행 완료 사실을 구분했습니다. 일부 완료 Fold의 개선을 전체 앙상블 성과로 확대하지 않았습니다.

## 과거 기록과의 구분

현재 노트북에는 EfficientNetB0, MobileNetV3Large, 3×3 패치 분할 구현이 없습니다. 이들을 확인된 실험 본문과 주요 기술 목록에서 제외했습니다. 과거 대화의 92.89%·92.26%·91.52% 및 제출 약 90.27%는 이번 원본에서 확인되지 않아 게시하지 않았습니다. 클래스별 이미지 수, 최종 5개 모델의 완성 여부, 최종 제출 파일·점수, 비교 모델의 조건도 확인되지 않았습니다. 추가 자료 요청은 하지 않습니다.

## 콘텐츠 및 시각 자료

개요·문제 정의·모델 개발·결과·회고의 다섯 영역, ‘~했습니다’ 문체로 구성했습니다. 원본에서 확인한 ResNet50 전이학습, 두 단계 학습, Stratified 5-Fold 및 확률 평균 코드를 중심으로 설명합니다.

대표 이미지 pest-classification-cover.svg는 텍스트 없는 독립 제작 개념 그래픽입니다. 실제 대회 이미지를 사용하지 않았습니다. 초기 제작한 pest-patch-example.svg는 직접 제작한 설명용 이미지이며 원본 대조 후 현재 본문에서는 사용하지 않습니다. 실제 노트북·내장 이미지·대회 링크·데이터 다운로드 주소는 사이트에 복사하지 않았습니다.

## 수정 파일 및 검증

- assets/js/projects-data.js: project-004 데이터와 본문. 변경 직전과 비교해 Project 01~03 데이터 객체 동일 확인.
- assets/css/project-vision.css: Project 04에만 적용되는 본문·그래프 반응형 스타일.
- projects/detail.html: Project 04 CSS·전용 렌더러 연결 추가. assets/js/project-detail.js에서 선택적인 VisionUI 블록 렌더러를 호출하며 타 프로젝트 블록은 그대로 처리.
- assets/images/projects/pest-classification-cover.svg 및 초기 pest-patch-example.svg.
- README.md 및 이 검수 기록.

Node 문법 검사 통과. 원본 출력의 정확도와 그래프 수치 대조 통과. PC 1280px·모바일 390px에서 가로 넘침 없이 정상 표시, 콘솔 error/warn 없음. 홈 카드·인공지능 필터 1개 결과·상세 이동·Project 03과 이전/다음 이동을 초기 구현에서 검수했습니다. 원본 대조 후에는 본문·그래프·도구 목록을 재검수했습니다.

화면 기록: output/playwright/project-004-verified-desktop.png, output/playwright/project-004-verified-mobile.png.

모델 재학습·정확도 재현 검증은 수행하지 않았습니다. 실제 모바일 하드웨어·Safari·Firefox 검수, Git 커밋·푸시·배포는 수행하지 않았습니다.
