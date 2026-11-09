(() => {
  const { escape } = PortfolioUI;
  const demos = new Map();
  const number = value => new Intl.NumberFormat('ko-KR').format(value);
  const amount = company => company.contracts.reduce((sum, contract) => sum + contract.amount, 0);

  function companyDetail(company) {
    return '<div class="planning-demo-detail-heading"><div><p class="planning-demo-label">선택한 예시 기업</p><h4>' + escape(company.name) + '</h4></div><span class="planning-demo-state">' + escape(company.state) + '</span></div>' +
      '<dl class="planning-demo-metrics"><div><dt>누적 계약 건수</dt><dd>' + company.contracts.length + '<small>건</small></dd></div><div><dt>누적 계약 금액</dt><dd>' + number(amount(company)) + '<small>만 원</small></dd></div></dl>' +
      '<div class="planning-demo-review"><p class="planning-demo-label">확인할 정보 · ' + escape(company.signal) + '</p><p>' + escape(company.explanation) + '</p></div>' +
      '<div class="planning-demo-contracts"><h5>관련 계약</h5><ul>' + company.contracts.map(contract => '<li><div><span>' + escape(contract.name) + '</span><small>' + escape(contract.department) + '</small></div><strong>' + number(contract.amount) + '만 원</strong></li>').join('') + '</ul></div>';
  }

  function renderDemo(block) {
    demos.set(block.id, block);
    const companies = block.companies;
    const count = companies.reduce((sum, company) => sum + company.contracts.length, 0);
    const total = companies.reduce((sum, company) => sum + amount(company), 0);
    return '<figure class="planning-demo" data-planning-demo="' + escape(block.id) + '">' +
      '<figcaption>' + escape(block.caption) + '</figcaption><div class="planning-demo-notice"><div class="planning-demo-notice-labels"><strong>예시 화면</strong><strong>가상 데이터</strong></div><p>포트폴리오 설명용으로 제작한 화면이며, 실제 운영 시스템이 아닙니다.</p></div>' +
      '<div class="planning-demo-screen"><div class="planning-demo-overview"><span>가상 계약 현황</span><strong>' + companies.length + '개 기업 · ' + count + '건 · ' + number(total) + '만 원</strong></div>' +
      '<p class="planning-demo-path">전체 현황 <span aria-hidden="true">→</span> 기업별 현황 <span aria-hidden="true">→</span> 근거 계약</p>' +
      '<div class="planning-demo-workspace"><div class="planning-demo-selector" role="group" aria-label="예시 기업 선택"><p class="planning-demo-selector-label">예시 기업 선택</p><div class="planning-demo-company-list">' + companies.map((company, index) => '<button type="button" class="planning-demo-company" data-demo-company="' + escape(company.id) + '" aria-pressed="' + (index === 0) + '"><strong>' + escape(company.name) + '</strong><span>' + company.contracts.length + '건 · ' + number(amount(company)) + '만 원</span></button>').join('') + '</div></div><div class="planning-demo-detail" data-demo-detail aria-live="polite" aria-label="선택한 예시 기업의 현황">' + companyDetail(companies[0]) + '</div></div>' +
      '<p class="planning-demo-rule">표시 상태는 설명을 위해 부여한 예시이며, 실제 위험 판정 규칙을 적용하지 않았습니다.</p></div>' +
      '<p class="planning-demo-disclaimer">기획 개념을 설명하기 위해 새롭게 제작한 예시 화면이며, 실제 운영 시스템의 디자인 및 데이터와 다릅니다.</p></figure>';
  }

  function renderBlock(block) {
    if (block.type === 'planningSteps') {
      return '<ol class="planning-steps">' + block.items.map((item, index) => '<li><span class="planning-step-number">' + String(index + 1).padStart(2, '0') + '</span><div class="planning-step-body"><h3>' + escape(item.title) + '</h3><p>' + escape(item.text) + '</p></div></li>').join('') + '</ol>';
    }
    if (block.type === 'planningOutcome') {
      return '<p class="planning-outcome"><strong>' + escape(block.label) + '</strong><span>' + escape(block.text) + '</span></p>';
    }
    if (block.type === 'planningFlow') {
      return '<figure class="planning-flow"><figcaption>' + escape(block.caption) + '</figcaption><ol>' + block.items.map((item, index) => '<li><span>' + String(index + 1).padStart(2, '0') + '</span><div><h4>' + escape(item.title) + '</h4><p>' + escape(item.text) + '</p></div></li>').join('') + '</ol></figure>';
    }
    if (block.type === 'planningDemo') return renderDemo(block);
    return null;
  }

  function init(host) {
    if (!host.querySelector('[data-planning-demo]')) return;
    host.addEventListener('click', event => {
      const button = event.target.closest('[data-demo-company]');
      if (!button) return;
      const panel = button.closest('[data-planning-demo]');
      const block = demos.get(panel.dataset.planningDemo);
      const company = block?.companies.find(item => item.id === button.dataset.demoCompany);
      if (!company) return;
      panel.querySelectorAll('[data-demo-company]').forEach(item => item.setAttribute('aria-pressed', String(item === button)));
      panel.querySelector('[data-demo-detail]').innerHTML = companyDetail(company);
    });
  }

  window.PlanningUI = { renderBlock, init };
})();
