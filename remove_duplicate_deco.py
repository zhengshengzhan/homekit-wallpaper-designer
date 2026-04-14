from pathlib import Path

path = Path('index.html')
text = path.read_text(encoding='utf-8')
start = '    <div class="section">\n      <div class="section-label" data-i18n="decoSection">房间装饰</div>'
end = '    </div>\n    <div class="section" id="image-control-section">'
idx = text.find(start)
if idx == -1:
    raise SystemExit('start not found')
idx2 = text.find(end, idx)
if idx2 == -1:
    raise SystemExit('end not found')
new_text = text[:idx] + end + text[idx2 + len(end):]
path.write_text(new_text, encoding='utf-8')
print('removed duplicate deco section')
