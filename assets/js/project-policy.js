(() => {
  const { escape } = PortfolioUI;
  const won = new Intl.NumberFormat('ko-KR');

  function renderBudget({ caption, rows, source }) {
    const total = rows.reduce((sum, { amount }) => sum + amount, 0);
    const shares = rows.map(({ amount }) => amount / total * 100);
    const segments = shares.map(share => '<span style="width:' + share + '%"></span>').join('');
    const legend = rows.map(({ label, amount, basis }, index) =>
      '<li><div class="policy-budget-item"><span class="policy-budget-swatch" aria-hidden="true"></span>' +
      '<strong>' + escape(label) + '</strong><span class="policy-budget-value">' +
      won.format(amount) + '원 · ' + shares[index].toFixed(1) + '%</span></div>' +
      '<p>' + escape(basis) + '</p></li>'
    ).join('');

    return '<figure class="policy-budget"><figcaption>' + escape(caption) + '</figcaption>' +
      '<p class="policy-budget-total">합계 <strong>' + won.format(total) + '원</strong></p>' +
      '<div class="policy-budget-bar" aria-hidden="true">' + segments + '</div>' +
      '<ul>' + legend + '</ul><p class="research-chart-note">' + escape(source) + '</p></figure>';
  }

  function renderBlock(block) {
    if (block.type === 'policyBudget') return renderBudget(block);
    return null;
  }

  window.PolicyUI = { renderBlock };
})();
