module.exports = {
  // Lighthouse 점수 색상 기준
  // https://developer.chrome.com/docs/lighthouse/performance/performance-scoring?hl=ko#color-coding 참고
  // Lighthouse의 점수 기준을 따름
  // 0 ~ 49 (빨간색): 나쁨
  // 50 ~ 89 (주황색): 개선 필요
  // 90 ~ 100 (녹색): 좋음
  LHCI_GREEN_MIN_SCORE: 90,
  LHCI_ORANGE_MIN_SCORE: 50,
  LHCI_RED_MIN_SCORE: 0,

  // lighthouse 성능 측정할 페이지 이름 목록
  // PR Comment에 페이지 url이 아닌 페이지 이름을 노출시키기 위해 필요함
  // 페이지 url이 짧다면 괜찮지만, 길다면 가독성이 떨어질 수 있기 때문에 페이지 이름을 보여주는 것을 추천
  //현재는 임시 코드임
  LHCI_MONITORING_PAGE_NAMES: ['/'],

  // lighthouse 성능 측정할 페이지 이름 - url 매핑
  LHCI_PAGE_NAME_TO_URL: {
    // 페이지A: '/page/typeA',
    // 페이지B: '/page/typeB',
    // 페이지C: '/page/typeC',
    // 페이지D: '/page/typeD',
    // 페이지E: '/page/typeE',
  },

  // 페이지 이름을 받아서 페이지 url을 리턴해주는 함수
  getLhciPageNameFromUrl: (url) => {
    for (const [name, path] of Object.entries(
      module.exports.LHCI_PAGE_NAME_TO_URL
    )) {
      if (decodeURIComponent(path) === decodeURIComponent(url)) return name;
    }
  },

  // 페이지 url을 받아서 페이지 이름을 리턴해주는 함수
  getLhciUrlFromPageName: (name) => {
    return module.exports.LHCI_PAGE_NAME_TO_URL[name];
  },
};
