(() => {
  const { escape } = PortfolioUI;
  const format = value => new Intl.NumberFormat('ko-KR').format(value);
  const sum = (rows, key) => rows.reduce((total, row) => total + row[key], 0);
  const heading = (caption, label) => '<figcaption><strong>' + escape(caption) + '</strong><span class="analytics-example-label">' + label + '</span></figcaption>';

  function renderDashboard(block) {
    const sessions = sum(block.days, 'sessions');
    const metrics = [['사용자 수', block.users], ['세션', sessions], ['페이지 조회', sum(block.days, 'views')], ['신청 진입 클릭', sum(block.days, 'clicks')]];
    const chartAlt = block.days.map(day => day.label + '요일 세션 ' + day.sessions + ', 참여 세션 ' + day.engaged).join('; ');
    const trend = block.days.map(day => '<li><div class="analytics-series"><span class="analytics-session-bar" style="height:' + day.sessions / 240 * 100 + '%"><b>' + day.sessions + '</b></span><span class="analytics-engaged-bar" style="height:' + day.engaged / 240 * 100 + '%"></span></div><span class="analytics-day-name">' + escape(day.label) + '</span></li>').join('');
    return '<figure class="analytics-dashboard">' + heading(block.caption, '설명용 가상 데이터') + '<p class="analytics-example-context">' + escape(block.context) + ' · 실제 운영 데이터가 아닙니다.</p><div class="analytics-dashboard-body">' +
      '<dl class="analytics-kpis">' + metrics.map(([name, value]) => '<div><dt>' + name + '</dt><dd>' + format(value) + '</dd></div>').join('') + '</dl>' +
      '<div class="analytics-trend-heading"><h3>일별 이용 추이</h3><div class="analytics-trend-key"><span><i></i>세션</span><span><i class="is-outline"></i>참여 세션</span></div></div>' +
      '<div class="analytics-trend" role="img" aria-label="설명용 가상 데이터. 단위 세션. ' + escape(chartAlt) + '"><div class="analytics-y-axis" aria-hidden="true"><span>240</span><span>120</span><span>0</span></div><div class="analytics-trend-plot" aria-hidden="true"><div class="analytics-grid"><i></i><i></i><i></i></div><ol class="analytics-days">' + trend + '</ol></div></div>' +
      '<div class="analytics-breakdowns"><section><h3>유입 채널 <small>세션</small></h3><ul>' + block.channels.map(channel => '<li><div><span>' + escape(channel.name) + '</span><b>' + format(channel.value) + '</b></div><span class="analytics-channel-track" aria-hidden="true"><span style="width:' + channel.value / sessions * 100 + '%"></span></span></li>').join('') + '</ul></section><section><h3>주요 페이지 <small>조회</small></h3><ul class="analytics-page-list">' + block.pages.map(page => '<li><span>' + escape(page.name) + '</span><b>' + format(page.value) + '</b></li>').join('') + '</ul></section></div>' +
      '<p class="analytics-review-note"><strong>검토 관점</strong> ' + escape(block.note) + '</p></div></figure>';
  }

  function renderBlock(block) {
    if (block.type === 'taggingExample') {
      return '<figure class="analytics-spec">' + heading(block.caption, '설명용 가상 예시') + '<p class="analytics-example-context">' + escape(block.context) + '</p><table aria-label="가상 공공 교육 서비스 이벤트 수집 설계"><tbody>' + block.rows.map(row => '<tr><th scope="row">' + escape(row.label) + '</th><td>' + (row.code ? row.value.map(value => '<code>' + escape(value) + '</code>').join(' · ') : escape(row.value)) + '</td></tr>').join('') + '</tbody></table><p class="analytics-example-note">' + escape(block.note) + '</p></figure>';
    }
    if (block.type === 'analyticsDashboard') return renderDashboard(block);
    if (block.type === 'improvementExample') {
      return '<figure class="analytics-improvement">' + heading(block.caption, '개선 방향 예시 · 가상 사례') + '<table aria-label="분석 근거와 개선 방향의 가상 예시"><thead><tr><th scope="col">확인할 근거</th><th scope="col">판단과 개선 방향</th></tr></thead><tbody>' + block.rows.map(row => '<tr><th scope="row">' + escape(row.evidence) + '</th><td><span class="analytics-check">' + escape(row.check) + '</span><strong>' + escape(row.proposal) + '</strong></td></tr>').join('') + '</tbody></table><p class="analytics-example-note">' + escape(block.note) + '</p></figure>';
    }
    return null;
  }

  window.AnalyticsUI = { renderBlock };
})();
