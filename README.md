# gregleeform.github.io

이명훈(Greg Lee)의 개인 홈페이지. GitHub Pages로 <https://gregleeform.github.io/> 에 배포됩니다.

2000년대에 HTML을 손으로 짜던 개인 홈페이지 느낌을 따릅니다. 한 줄로 쭉 읽히는 글, 게시판 모양의 표,
미색 바탕(솔라라이즈드 라이트 계열)에 나눔명조.

## 페이지

| 페이지 | 용도 |
| --- | --- |
| `index.html` | 홈페이지. 소개 · 만든 것들 · 다루는 것 · 새 소식 · 연락처 |
| `maps.html` | 네이버 지도 API로 만들어 본 자전거길 지도 |

## 파일

- `style.css` — 홈페이지 스타일. 색은 맨 위 `:root`에서만 고치면 됩니다.
- `assets/` — 사진(`profile.jpg`)과 유튜브 영상 썸네일
- `maps.html`, `script_map.js`, `style_maps.css`, `img_maps/` — 지도 페이지

빌드 도구가 없는 정적 사이트입니다. 로컬에서 보려면:

```sh
python3 -m http.server 8000
# http://localhost:8000/
```

## 고치는 법

- **새 소식** — `index.html`의 `#news` 표 맨 위에 `<tr>`을 하나 더하고 번호를 1 올립니다.
  새 글에는 `<span class="new" title="새 글">N</span>`을 붙이고, 오래되면 떼어 냅니다.
- **만든 것들** — `#works` 표에서 알맞은 묶음(`tr.group`) 아래에 행을 더합니다.
  상태 표시는 `badge--live`(서비스 중) · `badge--dev`(개발 중) · `badge--personal`(개인용) ·
  `badge--private`(프라이빗 저장소) · `badge--video`(유튜브) 중에서 고릅니다.
- **최종 수정** — 바닥의 `최종 수정: ○○○○년 ○월`을 바꿉니다.

## 알아 둘 점

- **서체** — 본문은 네이버 나눔명조(SIL 오픈 폰트 라이선스)를 구글 폰트에서 불러옵니다(`index.html`의 `<head>`).
  서체 파일을 저장소에 두지 않으니 따로 챙길 라이선스 문서도 없고, 글을 고쳐도 서체 쪽은 손댈 일이 없습니다.
  구글 폰트가 막힌 곳에서는 기기에 깔린 명조·바탕체로 보입니다.
- **이메일이 소스에 그대로 노출됩니다.** 개발자용 주소(`gregleeform@gmail.com`)만 씁니다.
- **네이버 지도 클라이언트 키**가 `maps.html`에 들어 있습니다. 클라이언트 키라 노출 자체는 정상이지만,
  네이버 클라우드 플랫폼 콘솔에서 **웹 서비스 URL이 `https://gregleeform.github.io` 로 제한**되어 있는지
  확인해 두는 편이 좋습니다.
- 앱을 스토어에 올릴 때 개인정보처리방침 주소가 필요하면 `privacy.html`을 따로 만들어 바닥에 링크하세요.
