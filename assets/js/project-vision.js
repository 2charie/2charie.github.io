(() => {
  const { escape } = PortfolioUI;
  function renderBlock(block) {
    if (block.type !== 'trainingStages') return null;
    const stages = [
      { title: '01. 분류층 학습', rate: '학습률 0.001', states: [false, false, true] },
      { title: '02. 부분 미세조정', rate: '학습률 0.00001', states: [false, true, true] }
    ];
    const labels = ['앞부분 계층', '마지막 30개 계층', '3종 분류층'];
    return '<figure class="vision-training"><figcaption>' + escape(block.caption) + '</figcaption><div class="vision-training-key"><span><i class="is-frozen"></i>고정</span><span><i class="is-trained"></i>학습</span></div><ol>' + stages.map(stage => '<li><div class="vision-stage-title"><h3>' + stage.title + '</h3><span>' + stage.rate + '</span></div><div class="vision-model-groups"><span>ResNet50 특징 추출부</span><span>새 출력 계층</span></div><div class="vision-model-blocks">' + stage.states.map((active, i) => '<div class="' + (active ? 'is-trained' : 'is-frozen') + '"><span>' + labels[i] + '</span><strong>' + (active ? '학습' : '고정') + '</strong></div>').join('') + '</div></li>').join('') + '</ol><p class="vision-training-note">' + escape(block.note) + '</p></figure>';
  }
  window.VisionUI = { renderBlock };
})();
