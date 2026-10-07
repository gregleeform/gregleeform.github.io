"""본문 서체(KoPubWorld바탕체)를 페이지에 쓰인 글자만 남긴 woff2로 줄인다.

index.html의 글을 고쳐 새 글자가 들어가면 이 스크립트를 다시 돌린다.
돌리지 않으면 새 글자만 시스템 바탕체로 보인다.

준비:
    pip install fonttools brotli
    npm pack font-kopubworld && tar -xzf font-kopubworld-*.tgz   # package/fonts/ 에 원본 OTF

실행:
    python3 tools/subset_font.py package/fonts

KoPub 라이선스 제4조 ②에 따라, 줄인 파일(수정본)에는 'KoPub' 이름을 쓰지 않는다.
"""

import sys
from pathlib import Path

from fontTools import subset
from fontTools.ttLib import TTFont

ROOT = Path(__file__).resolve().parent.parent
PAGES = [ROOT / "index.html"]
OUT_DIR = ROOT / "fonts"
FAMILY = "GL Batang Web"

# 원본 굵기 → 내보낼 파일 이름
WEIGHTS = {"Medium": "regular", "Bold": "bold"}


def page_text():
    chars = {chr(c) for c in range(0x20, 0x7F)}
    for page in PAGES:
        chars |= set(page.read_text(encoding="utf-8"))
    return "".join(sorted(c for c in chars if c.isprintable()))


def rename(font, style):
    ps_name = f"GLBatangWeb-{style.capitalize()}"
    full_name = f"{FAMILY} {style.capitalize()}"
    new_names = {1: FAMILY, 16: FAMILY, 4: full_name, 6: ps_name, 20: ps_name, 3: f"{ps_name}-subset"}
    kept = []
    for record in font["name"].names:
        try:
            value = record.toUnicode()
        except UnicodeDecodeError:
            value = ""
        if "kopub" in value.lower():
            if record.nameID not in new_names:
                # 상표 문구(nameID 7) 등 원래 서체명이 든 나머지 기록은 바꿔 쓰지 않고 뺀다.
                # 저작권 문구(nameID 0)에는 서체명이 없어 그대로 남는다.
                continue
            record.string = new_names[record.nameID]
        kept.append(record)
    font["name"].names = kept
    if "CFF " in font:
        cff = font["CFF "].cff
        cff.fontNames = [ps_name]
        top = cff.topDictIndex[0]
        if hasattr(top, "FullName"):
            top.FullName = full_name
        if hasattr(top, "FamilyName"):
            top.FamilyName = FAMILY


def main():
    if len(sys.argv) != 2:
        sys.exit(__doc__)
    src = Path(sys.argv[1])
    text = page_text()
    OUT_DIR.mkdir(exist_ok=True)
    for weight, style in WEIGHTS.items():
        font = TTFont(src / f"KoPubWorld-Batang-{weight}.otf")
        options = subset.Options()
        options.flavor = "woff2"
        options.layout_features = ["*"]
        options.name_IDs = ["*"]
        options.notdef_outline = True
        subsetter = subset.Subsetter(options)
        subsetter.populate(text=text)
        subsetter.subset(font)
        rename(font, style)
        out = OUT_DIR / f"gl-batang-{style}.woff2"
        font.save(out)
        print(f"{out.relative_to(ROOT)}  {out.stat().st_size // 1024} KB  ({len(text)}자)")


if __name__ == "__main__":
    main()
