# gregleeform.github.io

이명훈(Greg Lee)의 개인 홈페이지. GitHub Pages로 <https://gregleeform.github.io/> 에 배포됩니다.

2000년대에 HTML을 손으로 짜던 개인 홈페이지 느낌을 따릅니다. 한 줄로 쭉 읽히는 글, 게시판 모양의 표,
미색 바탕(솔라라이즈드 라이트 계열)에 KoPubWorld바탕체.

## 페이지

| 페이지 | 용도 |
| --- | --- |
| `index.html` | 홈페이지. 소개 · 만든 것들 · 다루는 것 · 새 소식 · 연락처 |
| `maps.html` | 네이버 지도 API로 만들어 본 자전거길 지도 |

## 파일

- `style.css` — 홈페이지 스타일. 색은 맨 위 `:root`에서만 고치면 됩니다.
- `fonts/` — 본문 서체. KoPubWorld바탕체를 페이지에 쓰인 글자만 남겨 줄인 파일과 라이선스(`LICENSE-KoPub.md`).
- `assets/` — 사진(`profile.jpg`)과 유튜브 영상 썸네일
- `tools/subset_font.py` — 서체를 다시 줄이는 스크립트 (아래 참고)
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

### 글을 고친 뒤 서체 다시 줄이기

`fonts/`의 서체에는 지금 페이지에 쓰인 글자만 들어 있습니다. 새 글자가 들어가면 그 글자만 시스템 바탕체로 보이니,
글을 고친 뒤에는 서체를 다시 줄여 주세요.

```sh
pip install fonttools brotli
npm pack font-kopubworld && tar -xzf font-kopubworld-*.tgz   # package/fonts/ 에 원본 OTF
python3 tools/subset_font.py package/fonts
rm -rf package font-kopubworld-*.tgz
```

## 알아 둘 점

- **서체 라이선스** — KoPubWorld바탕체는 문화체육관광부·한국출판인회의의 서체로, 무료로 쓰고 고쳐서 배포할 수 있습니다.
  다만 줄인 파일(수정본)에는 'KoPub' 이름을 쓸 수 없어 `GL Batang Web`으로 이름을 바꿨고,
  배포할 때는 라이선스를 함께 둬야 해서 `fonts/LICENSE-KoPub.md`를 넣어 두었습니다.
- **이메일이 소스에 그대로 노출됩니다.** 개발자용 주소(`gregleeform@gmail.com`)만 씁니다.
- **네이버 지도 클라이언트 키**가 `maps.html`에 들어 있습니다. 클라이언트 키라 노출 자체는 정상이지만,
  네이버 클라우드 플랫폼 콘솔에서 **웹 서비스 URL이 `https://gregleeform.github.io` 로 제한**되어 있는지
  확인해 두는 편이 좋습니다.
- 앱을 스토어에 올릴 때 개인정보처리방침 주소가 필요하면 `privacy.html`을 따로 만들어 바닥에 링크하세요.
