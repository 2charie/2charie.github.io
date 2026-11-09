// image 경로는 사이트 루트를 기준으로 입력합니다. 빈 콘텐츠는 상세 화면에서 생략됩니다.
window.PORTFOLIO = {
  email: '',
  github: 'https://github.com/2charie',
  categories: ['심리학','조사·연구','통계 분석','서비스 기획','UX/UI 설계','서비스 개선','웹 분석','데이터 수집·태깅','데이터 시각화','검색 최적화','인공지능','IoT·임베디드','클라우드','인프라','스마트팜','로봇·자동화'],
  projects: [
    {
      "id": "project-001",
      "title": "사람들은 성격 검사에 얼마나 솔직하게 응답할까?",
      "subtitle": "긍정·부정 유형의 성격 검사에서 나타나는 긍정 왜곡과 사회적 바람직성의 관계",
      "summary": "검사 유형별 응답 왜곡을 비교하고, 사회적 바람직성의 설명력을 검토한 심리학 연구.",
      "categories": [
        "심리학",
        "조사·연구",
        "통계 분석"
      ],
      "image": "assets/images/projects/personality-research.svg",
      "imageAlt": "응답 선택지와 검사 간 비교를 연결한 성격 검사 연구의 개념 그래픽. 실제 관측 자료를 나타내지 않음.",
      "placeholder": false,
      "featured": true,
      "period": "",
      "type": "학부 심리학 연구 · 통계 분석",
      "role": "",
      "tools": [
        "R 3.6.0",
        "독립표본 t-test",
        "회귀분석",
        "조절효과 분석"
      ],
      "sections": [
        {
          "title": "Research Overview — 연구 배경과 질문",
          "content": [
            "자기보고식 성격 검사는 자신을 더 긍정적으로 보이게 하려는 응답에 영향을 받을 수 있습니다. 긍정적 자동적 사고(ATQ-P)와 부정적 자동적 사고(ATQ-N)를 측정하는 검사에서 왜곡의 크기를 비교하고, 사회적 바람직성(SDS-24)의 예측력을 검토했습니다.",
            {
              "type": "list",
              "ordered": true,
              "items": [
                "긍정 유형과 부정 유형의 검사에서 긍정 왜곡의 정도가 다른가?",
                "사회적 바람직성이 긍정 왜곡을 예측할 수 있는가?",
                "검사 유형이 사회적 바람직성과 긍정 왜곡 사이의 관계를 조절하는가?"
              ]
            }
          ]
        },
        {
          "title": "Methodology — 연구 설계 및 분석 방법",
          "content": [
            {
              "type": "flow",
              "items": [
                {
                  "title": "01 / 검사 실시",
                  "text": "표준 지시문과 긍정적 인상관리 지시문으로 총 2회기 검사"
                },
                {
                  "title": "02 / 자료 처리",
                  "text": "대학생 40명 중 극단값 자료 3부 제외 → 최종 37명"
                },
                {
                  "title": "03 / 왜곡 점수 산출",
                  "text": "두 지시문에서 얻은 응답 점수의 차이 계산"
                },
                {
                  "title": "04 / 통계 분석",
                  "text": "독립표본 t-test → 회귀분석 → 검사 유형의 조절효과 검증"
                }
              ]
            },
            {
              "type": "table",
              "caption": "측정 도구",
              "compact": true,
              "headers": [
                "검사",
                "측정 내용"
              ],
              "rows": [
                [
                  "ATQ-P",
                  "긍정적 자동적 사고의 빈도 · 30문항, 5점 척도"
                ],
                [
                  "ATQ-N",
                  "부정적 자동적 사고의 빈도 · 30문항, 5점 척도"
                ],
                [
                  "SDS-24",
                  "사회적 바람직성 · 자기기만 16문항, 인상관리 8문항"
                ]
              ]
            },
            "분석에는 R 3.6.0을 사용했습니다. 단순 회귀(모델 1)에 검사 유형을 추가한 모델 2, 상호작용항을 추가한 모델 3을 차례로 비교했습니다."
          ]
        },
        {
          "title": "Key Findings — 주요 연구 결과",
          "content": [
            {
              "type": "finding",
              "title": "Finding 01. 검사 유형에 따라 왜곡의 크기가 달랐습니다",
              "content": [
                {
                  "type": "barChart",
                  "caption": "검사 유형별 평균 긍정 왜곡 점수",
                  "unit": "단위: 점 · 최종 전체 분석 N = 37",
                  "max": 30,
                  "ticks": [
                    0,
                    10,
                    20,
                    30
                  ],
                  "rows": [
                    {
                      "label": "ATQ-P",
                      "detail": "긍정적 자동적 사고",
                      "value": 24.78
                    },
                    {
                      "label": "ATQ-N",
                      "detail": "부정적 자동적 사고",
                      "value": 11.9
                    }
                  ],
                  "note": "t = 6.13, p < .001 · 표준편차: ATQ-P 6.84 / ATQ-N 5.87. 막대는 평균을 나타내며 신뢰구간은 표시하지 않았습니다."
                },
                "ATQ-P의 긍정 왜곡 평균이 ATQ-N보다 높았으며, 검사 유형 간 차이는 통계적으로 유의했습니다. 다만 두 척도의 측정 특성이 달라 검사 유형 자체의 인과효과로 단정할 수는 없습니다.",
                {
                  "type": "details",
                  "summary": "지시문별 평균과 점수 처리 확인 사항",
                  "content": [
                    {
                      "type": "table",
                      "caption": "지시문별 평균과 표준편차",
                      "headers": [
                        "항목",
                        "ATQ-P",
                        "ATQ-N"
                      ],
                      "rows": [
                        [
                          "표준 지시문 M (SD)",
                          "106.78 (9.10)",
                          "129.00 (10.30)"
                        ],
                        [
                          "긍정적 인상관리 지시문 M (SD)",
                          "131.56 (9.86)",
                          "140.89 (6.98)"
                        ]
                      ]
                    },
                    "ATQ-N은 인상관리 조건에서 점수가 증가했습니다. 역채점 여부가 확인되지 않아 보고된 점수 방향을 유지했습니다. 표시 평균의 차는 11.89점이고 보고된 왜곡 평균은 11.90점으로, 반올림 여부는 추가 확인이 필요합니다."
                  ]
                }
              ]
            },
            {
              "type": "finding",
              "title": "Finding 02. 검사 유형을 고려하면 예측 관계는 유지되지 않았습니다",
              "content": [
                {
                  "type": "modelComparison",
                  "models": [
                    {
                      "name": "모델 1",
                      "variables": "사회적 바람직성",
                      "b": "1.062",
                      "r2": "0.204",
                      "significant": true,
                      "significance": "유의함 · p < .01"
                    },
                    {
                      "name": "모델 2",
                      "variables": "+ 검사 유형",
                      "b": "0.225",
                      "r2": "0.510",
                      "significant": false,
                      "significance": "유의하지 않음 · p = .506"
                    },
                    {
                      "name": "모델 3",
                      "variables": "+ 상호작용항",
                      "b": "0.166",
                      "r2": "0.510",
                      "significant": false,
                      "significance": "유의하지 않음"
                    }
                  ]
                },
                "사회적 바람직성은 단순 회귀에서 긍정 왜곡을 유의하게 예측했지만, 검사 유형을 포함한 모델에서는 유의미한 예측 관계를 확인하지 못했습니다. 이를 확정적인 허위 상관이나 인과관계로 해석하지 않았습니다.",
                {
                  "type": "details",
                  "summary": "회귀분석 상세 통계 보기",
                  "content": [
                    {
                      "type": "table",
                      "caption": "회귀분석 전체 결과 · N = 37",
                      "headers": [
                        "변수 / 지표",
                        "모델 1",
                        "모델 2",
                        "모델 3"
                      ],
                      "rows": [
                        [
                          "포함한 변수",
                          "사회적 바람직성",
                          "+ 검사 유형",
                          "+ 상호작용항"
                        ],
                        [
                          "상수 B / t",
                          "9.015 / 2.645",
                          "22.310 / 5.634",
                          "22.957 / 3.709"
                        ],
                        [
                          "사회적 바람직성 B",
                          "1.062 · p < .01",
                          "0.225 · p = .506",
                          "0.166 · 유의하지 않음"
                        ],
                        [
                          "사회적 바람직성 β / t",
                          "0.452 / 3.000",
                          "0.096 / 0.673",
                          "0.091 / 0.303"
                        ],
                        [
                          "검사 유형 B",
                          "미포함",
                          "−11.403 · p < .001",
                          "−12.307 · 유의하지 않음"
                        ],
                        [
                          "검사 유형 β / t",
                          "미포함",
                          "−0.658 / −4.609",
                          "−0.660 / −1.748"
                        ],
                        [
                          "상호작용 B",
                          "미포함",
                          "미포함",
                          "0.096 · 유의하지 않음"
                        ],
                        [
                          "상호작용 β / t",
                          "미포함",
                          "미포함",
                          "0.021 / 0.138"
                        ],
                        [
                          "R²",
                          "0.204",
                          "0.510",
                          "0.510"
                        ],
                        [
                          "수정된 R²",
                          "0.182",
                          "0.482",
                          "0.466"
                        ],
                        [
                          "ΔR²",
                          "—",
                          "0.306 · p < .001",
                          "0.00 · 유의하지 않음"
                        ],
                        [
                          "F",
                          "9 · p < .01",
                          "17.72 · p < .001",
                          "11.48 · p < .001"
                        ]
                      ]
                    },
                    "B는 비표준화 회귀계수, β는 표준화 회귀계수입니다. 모델 3의 정확한 p값과 검사 유형의 더미 코딩 기준은 확인되지 않아 추정하지 않았습니다. 모형 전체 F의 유의성과 개별 계수의 유의성은 서로 다른 검정입니다."
                  ]
                }
              ]
            },
            {
              "type": "finding",
              "title": "Finding 03. 검사 유형의 조절효과는 확인되지 않았습니다",
              "content": [
                {
                  "type": "image",
                  "src": "assets/images/projects/personality-moderation.png",
                  "alt": "사회적 바람직성을 가로축, 긍정 왜곡 점수를 세로축으로 한 산점도. ATQ-P의 검정 실선과 ATQ-N의 붉은 점선은 완만한 기울기를 보임.",
                  "caption": "사회적 바람직성과 긍정 왜곡 점수에 대한 검사 유형의 조절효과",
                  "naturalWidth": 2136,
                  "naturalHeight": 1272
                },
                {
                  "type": "legend",
                  "items": [
                    {
                      "label": "ATQ-P · 검정 실선",
                      "style": "solid"
                    },
                    {
                      "label": "ATQ-N · 붉은 점선",
                      "style": "dashed"
                    }
                  ]
                },
                "두 검사 유형의 회귀선은 유사한 기울기를 보입니다. 상호작용항 B = 0.096, t = 0.138로 통계적으로 유의하지 않았으며, ΔR²는 0.00으로 보고되었습니다. 이 표본에서 검사 유형에 따른 관계의 차이를 뒷받침하는 근거를 얻지 못했습니다."
              ]
            }
          ]
        },
        {
          "title": "Limitations & Reflection — 연구 한계 및 성찰",
          "content": [
            {
              "type": "list",
              "items": [
                {
                  "title": "표본의 범위",
                  "text": "한 지역의 대학생 표본으로, 다른 연령·직업·상황으로 일반화하는 데 한계가 있습니다."
                },
                {
                  "title": "척도의 정서가와 측정 특성",
                  "text": "두 검사의 정서가 차이를 충분히 통제하지 못해 응답 왜곡 패턴만의 차이로 해석하기 어렵습니다."
                },
                {
                  "title": "측정 개념과 기간",
                  "text": "자동적 사고는 지난 일주일의 빈도를 묻습니다. 사회적 바람직성과 측정 개념·시간 범위가 달라 예측력에 영향을 주었을 가능성이 있습니다."
                }
              ]
            },
            "후속 연구에서는 표본을 다양화하고 문항 정서가와 측정 기간을 정합적으로 설계할 필요가 있습니다. 유의하지 않은 결과를 곧바로 관계의 부재로 단정하지 않는 것이 해석의 핵심입니다."
          ]
        }
      ]
    },
    {id:'project-002',title:'Project 02',summary:'프로젝트 소개를 준비하고 있습니다.',categories:['서비스 기획','UX/UI 설계','서비스 개선'],image:'assets/images/projects/placeholder-02.svg',imageAlt:'단색 임시 프로젝트 이미지',placeholder:true,featured:true,period:'',type:'',role:'',tools:[],overview:'실제 프로젝트 내용으로 교체할 임시 페이지입니다.',problem:'',process:[],results:'',reflection:''},
    {id:'project-003',title:'Project 03',summary:'프로젝트 소개를 준비하고 있습니다.',categories:['웹 분석','데이터 수집·태깅','데이터 시각화'],image:'assets/images/projects/placeholder-03.svg',imageAlt:'단색 임시 프로젝트 이미지',placeholder:true,featured:true,period:'',type:'',role:'',tools:[],overview:'실제 프로젝트 내용으로 교체할 임시 페이지입니다.',problem:'',process:[],results:'',reflection:''},
    {id:'project-004',title:'Project 04',summary:'프로젝트 소개를 준비하고 있습니다.',categories:['인공지능','IoT·임베디드','스마트팜'],image:'assets/images/projects/placeholder-04.svg',imageAlt:'단색 임시 프로젝트 이미지',placeholder:true,featured:true,period:'',type:'',role:'',tools:[],overview:'실제 프로젝트 내용으로 교체할 임시 페이지입니다.',problem:'',process:[],results:'',reflection:''}
  ]
};
