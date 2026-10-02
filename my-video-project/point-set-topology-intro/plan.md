# Axiomatic Foundations: From Sets to Limit Points

## Overview
- **Topic**: Point-set topology foundations — metric balls, open sets, interior/boundary points, and limit points in $\mathbb{R}^2$
- **Hook**: "What does it actually mean for a set to be *open*? And why must a limit point be approached by points *other than itself*?"
- **Target Audience**: Mathematics professors and undergraduate students studying Point-Set / General Topology (Munkres / Rudin level)
- **Estimated Length**: ~75 seconds
- **Key Insight**: Every abstract $\forall \epsilon > 0$ condition has a concrete picture: a shrinking circle that must always satisfy a containment or intersection test
- **Resolution**: 480p (default)
- **Aspect Ratio**: 16:9 (default)

## Narrative Arc
The video begins in the ambient metric space $\mathbb{R}^2$, building the primitive notion of an open $\epsilon$-ball. It then raises the bar: a set is open only if *every* one of its points sits strictly inside a ball contained in the set — boundary points break this test. This naturally splits points into interior vs. boundary classes, and the climax upgrades "every ball contains the point" to the far stronger "every *punctured* ball still hits the set," which is precisely what a limit point is — contrasted against an isolated point where the test fails.

---

## Scene 1: The Ambient Set $X$ and Metric Ball $B_\epsilon(x)$
**Duration**: ~16 seconds
**Purpose**: Establish the ambient space and the primitive open-ball gadget that every later definition reuses.

### Visual Elements
- Top banner: `MathTex` definition of $X = \mathbb{R}^2$ and $B_\epsilon(x)$
- Faint coordinate axes (GREY_B, low opacity) as the ambient plane
- Yellow point $x \in X$ at the origin
- `always_redraw` translucent TEAL disk (fill opacity 0.25) with `DashedVMobject` rim — the open ball
- Dynamic radius `Line` from $x$ to the rim with floating $\epsilon$ label, driven by a `ValueTracker`

### Content
Definition appears; axes fade in; $x$ pops in; the ball expands from $\epsilon \approx 0$ to $\epsilon \approx 1.7$ while the radius line and $\epsilon$ label track the growth. Hold, then fade out.

### Voiceover
- **Text**: "Fix the ambient space X equal to R squared. An epsilon-ball about x is every point y whose distance to x is less than epsilon — an *open* disk, boundary excluded."
- **Sync Points**: "expands" → ValueTracker animation grows the disk; "boundary excluded" → dashed rim emphasis

### Technical Notes
- `ValueTracker` + `always_redraw` returning `VGroup(filled Circle, DashedVMobject(Circle), radius Line, epsilon label)`
- Start tracker at `0.02` (never exactly 0) to keep `DashedVMobject` well-defined
- `add_subcaption()` before each `play`

---

## Scene 2: Open Sets and Neighborhoods
**Duration**: ~24 seconds
**Purpose**: Turn the ball gadget into the universal quantifier definition of openness; show why boundary points disqualify a set.

### Visual Elements
- Top banner: the $\forall x \in U, \exists \epsilon$ definition
- Arbitrary blob $S$ (polar `ParametricFunction` curve), soft WHITE fill + TEAL dashed perimeter
- Case A: interior point $x_1$ + small ball fully inside $S$ + green ✓ "$B_\epsilon(x_1) \subseteq S$"
- Case B: boundary point $x_2$ + ball (ValueTracker) that always spills outside; red "$B_\epsilon(x_2) \not\subseteq S$"
- Closing banner: neighborhood definition

### Content
Definition → blob $S$ appears → Case A check passes with green tick → Case A fades, Case B runs: ball shrinks but half of it lives in $X \setminus S$ at every radius → conclusion: an open set cannot contain boundary points → neighborhood definition line.

### Voiceover
- **Text**: "U is open iff every point of U has some ball completely trapped inside U. An interior point passes... a boundary point never passes — no matter how small epsilon gets, its ball leaks outside. And any open set containing x is called a neighborhood of x."
- **Sync Points**: "passes" → green ✓ flash; "never passes" → ball spill highlight; "neighborhood" → bottom definition

### Technical Notes
- Blob: `r(θ) = R(1 + 0.22 sin 3θ + 0.12 cos 5θ)`; boundary point at angle θ computed from the same formula so $x_2$ lies exactly on the curve
- Case-B spill made visible by giving the shrinking ball a RED fill at low opacity
- Dashed perimeter via `DashedVMobject(curve, num_dashes=48)`

---

## Scene 3: Interior Point vs. Boundary Point
**Duration**: ~13 seconds
**Purpose**: Formalize the classification that Scene 2 demonstrated ad hoc.

### Visual Elements
- Two stacked `MathTex` definitions: $\operatorname{int}(S)$ and $\partial S$
- Interior of blob shaded BLUE (opacity 0.45); perimeter stroked thick RED
- Labels $\operatorname{int}(S)$ (blue) and $\partial S$ (red)

### Content
Both definitions write on; the blob's interior fills blue while its rim turns red; subtitle: "An open set satisfies $S = \operatorname{int}(S)$."

### Voiceover
- **Text**: "This yields the standard split: the interior, points with a ball inside; and the boundary, points every ball meets both S and its complement. Open sets are exactly those equal to their interior."
- **Sync Points**: "interior" → blue fill; "boundary" → red rim; "equal to their interior" → subtitle

### Technical Notes
- Reuse the same blob generator (module-level helper) for visual continuity across scenes
- Definitions scaled to ~0.5 to fit above the figure

---

## Scene 4: The Climax — Limit Point (Accumulation Point)
**Duration**: ~26 seconds
**Purpose**: Upgrade "ball contains $p$" to "punctured ball still meets $S$" and contrast with an isolated point.

### Visual Elements
- Top banner: limit-point definition with $(B_\epsilon(p)\setminus\{p\}) \cap S \neq \emptyset$
- Blob $S$ with a dense cluster of dots accumulating at boundary point $p$
- $p$ drawn as a **hollow ring** (the puncture), TEAL dashed ball whose radius shrinks via `ValueTracker`
- Isolated $q \in S$ far from the cluster, with its own shrinking punctured ball $\delta$
- Red verdict: $(B_\delta(q)\setminus\{q\}) \cap S = \emptyset \implies q$ is NOT a limit point

### Content
Definition → intuition line about accumulation → Demo A: ball around $p$ shrinks $1.3 \to 0.4$ and cluster dots remain inside at every instant → Demo B: $q$ appears alone; $\delta$ shrinks; intersection empties; red verdict.

### Voiceover
- **Text**: "Now the key upgrade: p is a limit point if every punctured ball about p still catches points of S. Watch epsilon shrink to zero — the cluster never empties. But an isolated point q fails: shrink delta enough and the punctured ball is empty."
- **Sync Points**: "shrinks to zero" → ValueTracker animation; "never empties" → green check; "empty" → red verdict

### Technical Notes
- Puncture rendered as a small ring (`Annulus`-style: circle with background-colored fill + stroke) at $p$ and $q$
- Cluster points at $r_n = 1.15 \cdot 0.62^n$ along alternating angles so they hug the boundary from inside
- Two independent `ValueTracker`s, each inside its own `always_redraw`

---

## Transitions & Flow
- Every scene opens with its formal definition banner at the top and closes with a full `FadeOut`, so scenes concatenate cleanly
- The dashed-boundary disk gadget recurs in every scene (ball → containment test → shrinking tests → punctured ball)
- Subcaptions narrate continuously, providing audio-less guidance via the generated `.srt`

## Shared Elements
- Coordinate axes (Scene 1 only, faint) — the ambient space is implied afterwards
- Blob $S$: identical shape in Scenes 2, 3, 4
- TEAL dashed circle = $\epsilon$-ball in all four scenes
- YELLOW = named center point ($x$, $p$, $q$); WHITE = generic points of $S$
- Definition banners: `MathTex` at top, scale ≈ 0.55–0.62

## Color Palette
- Primary: TEAL - open balls, dashed rims, radius lines
- Secondary: BLUE - interior shading, $\operatorname{int}(S)$ label
- Accent: RED - boundary rim, failure messages, $\partial S$ label
- Success: GREEN - satisfied checks
- Highlight: YELLOW - the point under examination ($x$, $p$, $q$)
- Background: BLACK (default)
