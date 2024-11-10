
import json
from pathlib import Path

_menus_path = Path(r"arduinoC\_menus")

with open(r"arduinoC\_menus\esp32.json", encoding='utf-8') as f:
    base_menu = json.load(f)

for file in _menus_path.rglob("*.json"):
    if file.stem == "esp32":
        continue
    with open(file, encoding='utf-8') as f:
        menu = json.load(f)
    MODE = menu["MODE"]

    output = base_menu.copy()
    output["MODE"] = MODE
    with open(file, "w", encoding='utf-8') as f:
        json.dump(output, f, indent=4, ensure_ascii=False)