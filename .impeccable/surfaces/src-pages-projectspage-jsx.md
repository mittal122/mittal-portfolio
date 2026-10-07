---
version: 1
slug: "src-pages-projectspage-jsx"
primary_target: "src/pages/ProjectsPage.jsx"
related_targets: []
---

# Surface brief: /projects

Scope: the projects route only. World inherited from the site brief (src-app-jsx): shader portal, void/lilac/ember, Antonio + Schibsted Grotesk + Martian Mono.
Mode: Experience. A recruiter answers "what has he built, with what?" in seconds; an engineer drills into one project and its repo.

## Direction contract

THESIS: The projects page is a living system map. The tools sit at the centre as hubs; the seven projects ring them as subsystems, wired only to the tools each one really uses. It refuses stacked project cards and invented links between projects: every wire is a fact from the project's stack.

OWN-WORLD: Inherited. Hairline lilac wires on the void; Martian Mono tool hubs as outlined pills; Antonio project names; ember rings on the three featured AI-infra projects; packets of light travelling hub → project; the shader field behind.

STORY: The visitor sees the whole body of work and its stack at once, hovers a tool to see which projects use it, selects a project, the camera dives into that project's slice of the map, and the full entry with its drawn mechanism and repo link opens below.

FIRST VIEWPORT: Title PROJECTS with one line of intro. Below it the full map (desktop around 1000×560; portrait on phones), with an index of the 7 projects beside it on xl and below it on smaller screens. The selected entry (Helmsman by default, or #slug) starts at the fold.

FORM: system map (surface seed bc8be4a8, re-roll 1, dealt candidate 1 of my re-rolled list). Motion thesis. Focal: a camera dive (viewBox tween, 700ms expo-out) framing the selected project and its hubs, then the entry's mechanism diagram draws itself stroke by stroke. Supporting: on load, wires draw once and the nodes settle; hover/focus lights the connected wires and dims the rest; packets flow continuously but pause offscreen or when the tab is hidden. Reduced motion: no packets, no camera tween (instant reframe), no draw-on; highlight state changes stay. Recorded deviation: the entry diagram reveals with a left-to-right clip wipe (a plotter pass) instead of a per-stroke dash draw, because the diagrams mix dashed strokes and text, which a pathLength dash animation would break.

FINISH: unreviewed and undocumented is unfinished; this build ends with the finish review, the verdict, DESIGN.md, and every shipping raster carrying its provenance
