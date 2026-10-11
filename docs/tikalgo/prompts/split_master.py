#!/usr/bin/env python3
"""Split ../TIKALGO_MASTER_PROMPT.md into one file per section under master/.
The master file stays the source of truth: edit it, then run `python3 split_master.py`."""
import os, re
HERE = os.path.dirname(os.path.abspath(__file__))
SRC = os.path.join(HERE, '..', 'TIKALGO_MASTER_PROMPT.md')
NAMES = {
    '1': '01_BOOTSTRAP', '2': '02_RESUME_SESSION', '3': '03_PHASE_A_AUDIT', '4': '04_PHASE_B_COMPARE_PLAN',
    '5': '05_PHASE_C_AI_ACTIVE_SIGNALS', '5T': '05T_PHASE_T_TERMINAL_UI', '6': '06_PHASE_D_SUPER_PROJECT',
    '7': '07_SAVE_STATE', '8': '08_HELPER_PROMPTS', '9': '09_CONNECTOR_CATALOG', '10': '10_SETTINGS_PAPER_LIVE',
    '11': '11_SAFE_VENDORING', '12': '12_TRADER_KNOWLEDGE_SKILLS', '13': '13_DEPLOY_AND_COMMIT',
    '14': '14_TIKA_VOICE_ASSISTANT', '15': '15_DECISION_MODELS', '16': '16_LBANK_FUTURES',
    '17': '17_QUANT_INTELLIGENCE_TIKALGO_AI', 'Z': 'Z_PROJECTS_AND_INSTALL',
}
text = open(SRC, encoding='utf-8').read()
parts = re.split(r'(?m)^(## .+)$', text)
os.makedirs(os.path.join(HERE, 'master'), exist_ok=True)
for old in os.listdir(os.path.join(HERE, 'master')):
    if old.endswith('.md'):
        os.remove(os.path.join(HERE, 'master', old))
written = []
for k in range(1, len(parts), 2):
    head, body = parts[k], parts[k + 1]
    m = re.match(r'## (\d+T?)\.', head)
    key = m.group(1) if m else ('Z' if 'پیوست Z' in head else None)
    if key not in NAMES:
        continue
    fn = NAMES[key] + '.md'
    note = ('> Extracted from [`TIKALGO_MASTER_PROMPT.md`](../../TIKALGO_MASTER_PROMPT.md). That file is the source of truth; '
            'after editing it, run `python3 docs/tikalgo/prompts/split_master.py`.\n\n')
    open(os.path.join(HERE, 'master', fn), 'w', encoding='utf-8').write(note + head + body.rstrip().rstrip('-').rstrip() + '\n')
    written.append(fn)
print('\n'.join(written))
