# 🚦 SmartFlow — AI Traffic Management System
### Jaipur City Grid · Frontend Dashboard

A fully client-side, zero-dependency dashboard for monitoring and controlling
an AI-powered smart city traffic system.

---

## 📁 Project Structure

```
smartflow/
│
├── index.html                  ← Main HTML shell (structure only, no logic)
│
├── css/
│   ├── reset.css               ← Browser normalisation
│   ├── variables.css           ← Design tokens (colours, spacing, fonts …)
│   ├── layout.css              ← Page skeleton: header, hero bar, grids, footer
│   ├── components.css          ← All reusable UI components (cards, tables …)
│   └── animations.css          ← @keyframes and animation utility classes
│
├── js/
│   ├── app.js                  ← Bootstrap: init order, live-update loop, App object
│   ├── map.js                  ← SVG city-grid map, car animation, layer toggles
│   ├── signals.js              ← Signal countdown timers, junction detail panel
│   ├── charts.js               ← 30-min forecast bar chart renderer
│   ├── zones.js                ← Zone traffic flow bars + live jitter updates
│   ├── alerts.js               ← Live alert feed renderer
│   ├── emergency.js            ← Ambulance / fire vehicle tracker tab
│   ├── ai.js                   ← AI Brain tab renderer + decision counter
│   ├── health.js               ← System Health tab renderer
│   └── violations.js           ← Violations table renderer + filter logic
│
└── data/
    ├── violations.js           ← Violation records dataset
    ├── junctions.js            ← Junction metadata & directional loads
    ├── zones.js                ← City corridor zone definitions
    ├── alerts.js               ← Alert messages dataset
    └── ai-modules.js           ← AI sub-system definitions & health metrics
```

---

## 🚀 How to Run

**No build tool, no server, no npm install required.**

Simply open `index.html` in any modern browser:

```bash
# macOS
open index.html

# Windows
start index.html

# Linux
xdg-open index.html

# Or use VS Code Live Server extension for hot reload
```

> ⚠️ If you see blank sections, make sure all file paths are intact.
> The files must be served from the **same folder** — do not move
> individual files without updating the `<link>` and `<script>` paths
> in `index.html`.

---

## 🧩 Architecture

### Separation of concerns

| Layer        | Files                | Responsibility                              |
|--------------|----------------------|---------------------------------------------|
| **Structure**| `index.html`         | DOM skeleton, semantic HTML, script/CSS refs|
| **Tokens**   | `css/variables.css`  | Single source of truth for all design values|
| **Style**    | `css/*.css`          | Visual presentation, animations             |
| **Data**     | `data/*.js`          | Static datasets (replace with API calls)    |
| **Modules**  | `js/*.js`            | Feature logic, DOM rendering                |
| **Boot**     | `js/app.js`          | Wires everything together, runs intervals   |

### Script load order (enforced in index.html)

```
data/violations.js   }
data/junctions.js    }  ← Data first (no dependencies)
data/zones.js        }
data/alerts.js       }
data/ai-modules.js   }

js/map.js            }
js/charts.js         }
js/signals.js        }  ← Feature modules (depend on data globals)
js/zones.js          }
js/alerts.js         }
js/emergency.js      }
js/ai.js             }
js/health.js         }
js/violations.js     }

js/app.js            ← Bootstrap last (depends on all modules)
```

### Module pattern

Every JS file exposes a single **IIFE module object**:

```js
const SomeModule = (() => {
  // private state & helpers

  function init() { /* called once by app.js */ }
  function somePublicMethod() { /* … */ }

  return { init, somePublicMethod };
})();
```

The global `App` object in `app.js` is the only object wired to
HTML `onclick` attributes — keeping markup decoupled from module internals.

---

## 🔌 Connecting a Real Backend

All data currently lives in `data/*.js` as plain JS objects.
To connect a live API, replace those files with `fetch()` calls:

```js
// Example: replace data/violations.js content with:
let ViolationData = [];

async function loadViolations() {
  const res  = await fetch('https://api.smartflow.city/violations');
  ViolationData = await res.json();
}
```

Call `await loadViolations()` in `app.js` before `ViolationsModule.init()`.

---

## 🎨 Customisation

- **Colours** — edit `css/variables.css` only; all components inherit via CSS custom properties
- **Fonts** — change the Google Fonts `<link>` in `index.html` + update `--font-body` / `--font-mono` in `variables.css`
- **City zones** — add/remove entries in `data/zones.js`; the UI regenerates automatically
- **Junctions** — add entries to `data/junctions.js` and matching cards in `index.html`
- **Alerts** — push new objects into `AlertData` in `data/alerts.js`

---

## 🛠️ Tech Stack

| Technology     | Usage                            |
|----------------|----------------------------------|
| HTML5          | Semantic page structure          |
| CSS3           | Custom properties, Grid, Flexbox, `@keyframes` |
| Vanilla JS ES6 | IIFE modules, DOM manipulation   |
| SVG            | Interactive city map             |
| Google Fonts   | Outfit + Space Mono              |

**Zero frameworks. Zero dependencies. Zero build steps.**

---

*SmartFlow · Jaipur City Grid · © 2025*
