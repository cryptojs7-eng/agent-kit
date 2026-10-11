# Team administration panel

| | |
|---|---|
| **Area** | `admin` |
| **Where in TIKALGO** | Admin → users & roles (Owner/Admin/Editor/Viewer → map to TIKALGO roles) |
| **Before using** | Read [`README.md`](./README.md) → "TIKALGO adaptation rules" and paste them after the prompt |

## Prompt (original)
```text
Create a team administration panel with Tailwind CSS. The header holds a title, a muted seat counter reading how many of the licensed seats are in use, a search field and a dark "Invite people" button. The table lists six members with columns for member, role, last active and status: the member cell pairs an avatar circle with a name and email stacked; the role cell is a small bordered select with Owner, Admin, Editor and Viewer; last active is muted relative text; status is a pill reading Active, Invited or Suspended in appropriate tints, and each row ends with a three-dot menu button. Show a checkbox column with a header checkbox, and above the table a bulk-action bar that appears only when rows are selected, showing the count and two ghost buttons. Then add JavaScript that wires the select-all checkbox, keeps the bulk bar and its count in sync, and warns with an inline note when the last Owner role is changed away.
```
