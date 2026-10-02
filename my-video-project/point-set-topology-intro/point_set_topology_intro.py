from manim import *
import numpy as np

# ---------------------------------------------------------------------------
# Shared helpers
# ---------------------------------------------------------------------------

BLOB_R = 2.1
BLOB_CENTER = DOWN * 0.5
DASHES = 40  # fixed dash count keeps always_redraw substructure stable


def blob_radius(theta, R=BLOB_R):
    """Polar radius of the arbitrary subset S's smooth boundary."""
    return R * (1.0 + 0.22 * np.sin(3 * theta + 0.5) + 0.12 * np.cos(5 * theta))


def blob_boundary_point(theta, center=BLOB_CENTER, R=BLOB_R):
    """Exact point on the boundary of S at polar angle theta (relative to center)."""
    r = blob_radius(theta, R)
    return center + np.array([r * np.cos(theta), r * np.sin(theta), 0.0])


def make_blob(center=BLOB_CENTER, R=BLOB_R, fill_color=WHITE, fill_opacity=0.12,
              rim_color=TEAL, rim_width=3, num_dashes=54, dashed=True):
    """Arbitrary continuous subset S: soft fill + dashed perimeter."""
    curve = ParametricFunction(
        lambda t: np.array([blob_radius(t, R) * np.cos(t),
                            blob_radius(t, R) * np.sin(t), 0.0]),
        t_range=[0, TAU],
        use_smoothing=True,
    )
    curve.shift(center)
    curve.set_fill(fill_color, opacity=fill_opacity)
    curve.set_stroke(width=0)
    if dashed:
        rim = DashedVMobject(
            curve.copy().set_fill(opacity=0).set_stroke(color=rim_color, width=rim_width),
            num_dashes=num_dashes,
            color=rim_color,
        )
    else:
        rim = curve.copy().set_fill(opacity=0).set_stroke(color=rim_color, width=rim_width)
    return VGroup(curve, rim)


def fit_width(mob, max_width=13.2, scale=0.62):
    """Scale a definition banner so it never overflows the frame."""
    mob.scale(scale)
    if mob.width > max_width:
        mob.scale_to_fit_width(max_width)
    return mob


def blob_interior_point(theta, t, center=BLOB_CENTER, R=BLOB_R):
    """Point at fraction t (t < 1) of the radius: strictly inside S."""
    r = blob_radius(theta, R) * t
    return center + np.array([r * np.cos(theta), r * np.sin(theta), 0.0])


def hollow_marker(pos, radius=0.12, color=YELLOW):
    """A punctured center: black disc punched through, yellow ring on top."""
    disc = Circle(radius=radius, stroke_width=0).set_fill(BLACK, 1).move_to(pos)
    ring = Circle(radius=radius, color=color, stroke_width=3.5).move_to(pos)
    return VGroup(disc, ring)


def dashed_ball(pos, radius, fill_color=TEAL, fill_opacity=0.25,
                stroke_color=TEAL, stroke_width=3):
    """Open epsilon-ball: translucent fill + dashed rim."""
    disk = Circle(radius=radius, stroke_width=0).set_fill(fill_color, fill_opacity).move_to(pos)
    rim = DashedVMobject(
        Circle(radius=radius, color=stroke_color, stroke_width=stroke_width),
        num_dashes=DASHES,
        color=stroke_color,
    ).move_to(pos)
    return VGroup(disk, rim)


# ---------------------------------------------------------------------------
# Scene 1: The Ambient Set X and Metric Ball B_eps(x)
# ---------------------------------------------------------------------------

class Scene1_AmbientSetAndBall(Scene):
    def construct(self):
        ## Scene1_AmbientSetAndBall.definition
        definition = MathTex(
            r"\text{Underlying Set } X = \mathbb{R}^2,",
            r"\quad B_\epsilon(x) = \{y \in X : d(x,y) < \epsilon\}",
        )
        fit_width(definition, scale=0.6).to_edge(UP, buff=0.3)

        axes = Axes(
            x_range=[-7, 7, 1],
            y_range=[-4, 4, 1],
            x_length=13.4,
            y_length=6.4,
            axis_config={
                "color": GREY_B,
                "stroke_width": 2,
                "include_ticks": True,
                "tick_size": 0.05,
            },
            tips=False,
        ).set_opacity(0.4)

        center = ORIGIN

        ## Scene1_AmbientSetAndBall.show_definition
        self.add_subcaption(
            "Fix the underlying set X: the metric space of the plane, R squared.",
            duration=2.4,
        )
        self.play(FadeIn(definition, shift=DOWN * 0.25), run_time=2.4)

        ## Scene1_AmbientSetAndBall.show_axes
        self.add_subcaption("Work inside the ambient coordinate plane.", duration=1.6)
        self.play(FadeIn(axes), run_time=1.6)

        x_dot = Dot(center, radius=0.07, color=YELLOW)
        x_label = MathTex(r"x \in X", color=YELLOW).scale(0.8).next_to(x_dot, DOWN, buff=0.2)

        ## Scene1_AmbientSetAndBall.show_point
        self.add_subcaption("Pick a point x in X.", duration=1.4)
        self.play(GrowFromCenter(x_dot), Write(x_label), run_time=1.4)

        eps_tracker = ValueTracker(0.02)

        def ball_group():
            r = max(eps_tracker.get_value(), 0.02)
            disk = Circle(radius=r, stroke_width=0).set_fill(TEAL, 0.25).move_to(center)
            rim = DashedVMobject(
                Circle(radius=r, color=TEAL, stroke_width=3),
                num_dashes=DASHES,
                color=TEAL,
            ).move_to(center)
            radius_line = Line(center, center + r * RIGHT, color=TEAL, stroke_width=4)
            eps_label = MathTex(r"\epsilon", color=TEAL).scale(0.75).move_to(
                center + (r * 0.5) * RIGHT + UP * 0.28
            )
            return VGroup(disk, rim, radius_line, eps_label)

        ball = always_redraw(ball_group)
        self.add(ball)

        ## Scene1_AmbientSetAndBall.expand_ball
        self.add_subcaption(
            "The epsilon-ball about x is every point y whose distance to x is less than epsilon.",
            duration=3.0,
        )
        self.play(eps_tracker.animate.set_value(1.6), run_time=3.0)

        ## Scene1_AmbientSetAndBall.open_boundary
        self.add_subcaption(
            "The dashed rim marks an open boundary: distances are strictly less than epsilon.",
            duration=3.5,
        )
        self.wait(3.5)

        ## Scene1_AmbientSetAndBall.fadeout
        ball.suspend_updating()
        self.add_subcaption("With the ball gadget in hand, we can define open sets.", duration=1.2)
        self.play(
            FadeOut(definition), FadeOut(axes), FadeOut(x_dot),
            FadeOut(x_label), FadeOut(ball),
            run_time=1.2,
        )


# ---------------------------------------------------------------------------
# Scene 2: Open Sets and Neighborhoods
# ---------------------------------------------------------------------------

class Scene2_OpenSetsAndNeighborhoods(Scene):
    def construct(self):
        ## Scene2_OpenSetsAndNeighborhoods.definition
        definition = MathTex(
            r"U \subseteq X \text{ is open} \iff",
            r"\forall x \in U,\ \exists \epsilon > 0 \text{ such that } B_\epsilon(x) \subseteq U",
        )
        fit_width(definition, scale=0.55).to_edge(UP, buff=0.28)

        ## Scene2_OpenSetsAndNeighborhoods.show_definition
        self.add_subcaption(
            "A subset U of X is open when every one of its points sits inside a smaller ball, still contained in U.",
            duration=2.8,
        )
        self.play(FadeIn(definition, shift=DOWN * 0.25), run_time=2.8)

        s_group = make_blob()
        s_label = MathTex(r"S = U", color=WHITE).scale(0.8).next_to(s_group, RIGHT, buff=0.15)

        ## Scene2_OpenSetsAndNeighborhoods.show_S
        self.add_subcaption("Render an arbitrary open candidate S.", duration=1.8)
        self.play(Create(s_group), FadeIn(s_label), run_time=1.8)

        # ---- Case A: strictly interior point --------------------------------
        x1 = BLOB_CENTER + LEFT * 0.7 + UP * 0.2
        x1_dot = Dot(x1, radius=0.06, color=YELLOW)
        x1_label = MathTex(r"x_1", color=YELLOW).scale(0.75).next_to(x1, UP, buff=0.14)
        ball1 = dashed_ball(x1, 0.5)

        check = VGroup(
            MathTex(r"B_\epsilon(x_1) \subseteq S", color=GREEN).scale(0.7),
            MathTex(r"\checkmark", color=GREEN).scale(0.85),
        ).arrange(RIGHT, buff=0.22)
        check.next_to(ball1, LEFT, buff=0.35)

        ## Scene2_OpenSetsAndNeighborhoods.case_interior
        self.add_subcaption(
            "Case A: an interior point x one. Some ball about it fits entirely inside S. Test satisfied.",
            duration=3.7,
        )
        self.play(GrowFromCenter(x1_dot), Write(x1_label), run_time=0.9)
        self.play(Create(ball1), run_time=1.0)
        self.play(FadeIn(check, scale=1.2), run_time=0.8)
        self.wait(1.0)

        ## Scene2_OpenSetsAndNeighborhoods.case_boundary
        self.add_subcaption(
            "Case B: put x two exactly on the boundary of S.",
            duration=1.5,
        )
        self.play(FadeOut(x1_dot), FadeOut(x1_label), FadeOut(ball1), FadeOut(check), run_time=0.7)

        theta2 = 0.0
        x2 = blob_boundary_point(theta2)
        x2_dot = Dot(x2, radius=0.06, color=YELLOW)
        x2_label = MathTex(r"x_2", color=YELLOW).scale(0.75).next_to(x2, UP, buff=0.14)

        self.play(GrowFromCenter(x2_dot), Write(x2_label), run_time=0.8)

        delta = ValueTracker(1.15)

        def spill_ball():
            r = max(delta.get_value(), 0.05)
            disk = Circle(radius=r, stroke_width=0).set_fill(RED, 0.35).move_to(x2)
            rim = DashedVMobject(
                Circle(radius=r, color=RED, stroke_width=3),
                num_dashes=DASHES,
                color=RED,
            ).move_to(x2)
            return VGroup(disk, rim)

        spill = always_redraw(spill_ball)
        self.add(spill)
        spill.set_z_index(-1)
        s_group.set_z_index(0)
        x2_dot.set_z_index(1)
        x2_label.set_z_index(1)

        spill_note = MathTex(
            r"B_\epsilon(x_2) \cap (X \setminus S) \neq \emptyset",
            color=RED,
        ).scale(0.7).to_edge(DOWN, buff=0.35)

        ## Scene2_OpenSetsAndNeighborhoods.spill
        self.add_subcaption(
            "No matter how small epsilon becomes, the ball about x two always spills outside S into the complement.",
            duration=4.2,
        )
        self.play(delta.animate.set_value(0.4), run_time=2.6)
        self.play(FadeIn(spill_note, shift=UP * 0.2), run_time=0.8)
        self.wait(0.8)

        spill.suspend_updating()

        ## Scene2_OpenSetsAndNeighborhoods.boundary_excluded
        self.add_subcaption(
            "So a boundary point never satisfies the open-set test: an open set cannot contain its own boundary.",
            duration=3.2,
        )
        fail = MathTex(r"B_\epsilon(x_2) \not\subseteq S \ \text{ for every } \epsilon > 0",
                       color=RED).scale(0.72)
        fail.next_to(x2_label, UP, buff=0.25)
        self.play(Write(fail), run_time=1.2)
        self.wait(2.0)

        ## Scene2_OpenSetsAndNeighborhoods.neighborhood
        self.add_subcaption(
            "Finally, any open set U containing x is called a neighborhood of x.",
            duration=3.5,
        )
        self.play(
            FadeOut(spill), FadeOut(x2_dot), FadeOut(x2_label),
            FadeOut(fail), FadeOut(spill_note),
            run_time=0.7,
        )
        hood = MathTex(
            r"\text{Neighborhood of } x \iff \text{open } U \text{ with } x \in U",
        )
        fit_width(hood, scale=0.7).to_edge(DOWN, buff=0.3)
        self.play(FadeIn(hood, shift=UP * 0.2), run_time=1.2)
        self.wait(1.6)

        ## Scene2_OpenSetsAndNeighborhoods.fadeout
        self.play(FadeOut(definition), FadeOut(s_group), FadeOut(s_label), FadeOut(hood),
                  run_time=1.0)


# ---------------------------------------------------------------------------
# Scene 3: Interior Point vs. Boundary Point
# ---------------------------------------------------------------------------

class Scene3_InteriorVsBoundary(Scene):
    def construct(self):
        ## Scene3_InteriorVsBoundary.definitions
        d1 = MathTex(
            r"\operatorname{int}(S) = \{x \in S : \exists \epsilon > 0,\ B_\epsilon(x) \subseteq S\}",
        )
        d2 = MathTex(
            r"\partial S = \{x \in X : \forall \epsilon > 0,\ B_\epsilon(x) \cap S \neq \emptyset",
            r"\text{ and } B_\epsilon(x) \cap (X \setminus S) \neq \emptyset\}",
        )
        fit_width(d1, scale=0.55)
        fit_width(d2, scale=0.5)
        defs = VGroup(d1, d2).arrange(DOWN, buff=0.28).to_edge(UP, buff=0.25)

        ## Scene3_InteriorVsBoundary.show_definitions
        self.add_subcaption(
            "This splits the space in two: the interior, points with a ball fully inside S.",
            duration=2.0,
        )
        self.play(FadeIn(d1, shift=DOWN * 0.2), run_time=2.0)
        self.add_subcaption(
            "and the boundary, points whose every ball meets both S and its complement.",
            duration=2.0,
        )
        self.play(FadeIn(d2, shift=DOWN * 0.2), run_time=2.0)

        center = DOWN * 0.95
        interior_fill = make_blob(
            center=center, fill_color=BLUE, fill_opacity=0.45,
            rim_color=RED, rim_width=6, dashed=False,
        )

        ## Scene3_InteriorVsBoundary.shade
        self.add_subcaption(
            "Shade the interior blue, and highlight the boundary circle in red.",
            duration=1.8,
        )
        self.play(FadeIn(interior_fill), run_time=1.8)

        int_label = MathTex(r"\operatorname{int}(S)", color=BLUE_B).scale(0.8)
        int_label.move_to(center + DOWN * 0.3)
        bd_label = MathTex(r"\partial S", color=RED).scale(0.8)
        bd_label.next_to(blob_boundary_point(1.0, center), UR, buff=0.18)

        self.add_subcaption("The blue region is the interior; the red rim is the boundary.",
                            duration=2.5)
        self.play(Write(int_label), run_time=0.9)
        self.play(Write(bd_label), run_time=0.9)
        self.wait(0.7)

        ## Scene3_InteriorVsBoundary.open_equals_interior
        self.add_subcaption(
            "An open set satisfies S equals its interior: the boundary contributes nothing to it.",
            duration=3.4,
        )
        badge = MathTex(r"S \text{ open} \iff S = \operatorname{int}(S)", color=GREEN_C)
        fit_width(badge, scale=0.75).to_edge(DOWN, buff=0.3)
        self.play(FadeIn(badge, shift=UP * 0.2), run_time=1.2)
        self.wait(2.2)

        ## Scene3_InteriorVsBoundary.fadeout
        self.play(
            FadeOut(defs), FadeOut(interior_fill), FadeOut(int_label),
            FadeOut(bd_label), FadeOut(badge),
            run_time=1.0,
        )


# ---------------------------------------------------------------------------
# Scene 4: The Climax — Limit Point (Accumulation Point)
# ---------------------------------------------------------------------------

class Scene4_LimitPoint(Scene):
    def construct(self):
        ## Scene4_LimitPoint.definition
        definition = MathTex(
            r"p \text{ is a limit point of } S \iff",
            r"\forall \epsilon > 0,\ \big(B_\epsilon(p) \setminus \{p\}\big) \cap S \neq \emptyset",
        )
        fit_width(definition, scale=0.55).to_edge(UP, buff=0.28)

        ## Scene4_LimitPoint.show_definition
        self.add_subcaption(
            "Now the key upgrade. p is a limit point of S if every punctured ball about p still meets S.",
            duration=2.4,
        )
        self.play(FadeIn(definition, shift=DOWN * 0.25), run_time=2.4)

        center = LEFT * 1.6 + DOWN * 0.2
        s_group = make_blob(center=center, R=2.0)
        s_label = MathTex(r"S", color=WHITE).scale(0.85).next_to(s_group, LEFT, buff=0.2)

        ## Scene4_LimitPoint.show_S
        self.add_subcaption("Here is our set S.", duration=1.4)
        self.play(Create(s_group), FadeIn(s_label), run_time=1.4)

        # Dense cluster of points of S accumulating at boundary point p
        theta_p = 0.1
        p_pos = blob_boundary_point(theta_p, center, R=2.0)
        radial = np.array([np.cos(theta_p), np.sin(theta_p), 0.0])
        tangential = np.array([-np.sin(theta_p), np.cos(theta_p), 0.0])

        cluster = VGroup()
        step = 0.9
        for i in range(8):
            sign = 1.0 if i % 2 == 0 else -1.0
            pos = p_pos - radial * step + tangential * (sign * step * 0.45)
            cluster.add(Dot(pos, radius=0.05, color=WHITE))
            step *= 0.62
        # a couple of extra points hugging the rim near p
        cluster.add(
            Dot(blob_interior_point(theta_p + 0.16, 0.93, center, 2.0),
                radius=0.05, color=WHITE),
            Dot(blob_interior_point(theta_p - 0.2, 0.93, center, 2.0),
                radius=0.05, color=WHITE),
        )

        p_marker = hollow_marker(p_pos, radius=0.12, color=YELLOW)
        p_label = MathTex(r"p", color=YELLOW).scale(0.85).next_to(p_marker, UR, buff=0.1)

        ## Scene4_LimitPoint.cluster
        self.add_subcaption(
            "Points of S accumulate arbitrarily close to p, distinct from p itself.",
            duration=2.2,
        )
        self.play(LaggedStartMap(GrowFromCenter, cluster, lag_ratio=0.15), run_time=1.4)
        self.play(FadeIn(p_marker, scale=1.4), Write(p_label), run_time=0.8)

        eps_t = ValueTracker(1.3)

        def punctured_ball_p():
            r = max(eps_t.get_value(), 0.05)
            disk = Circle(radius=r, stroke_width=0).set_fill(TEAL, 0.2).move_to(p_pos)
            rim = DashedVMobject(
                Circle(radius=r, color=TEAL, stroke_width=3),
                num_dashes=DASHES,
                color=TEAL,
            ).move_to(p_pos)
            return VGroup(disk, rim)

        punctured = always_redraw(punctured_ball_p)
        self.add(punctured)
        punctured.set_z_index(-1)
        s_group.set_z_index(0)
        cluster.set_z_index(1)
        p_marker.set_z_index(1)
        p_label.set_z_index(2)

        ## Scene4_LimitPoint.shrink_epsilon
        self.add_subcaption(
            "Watch epsilon shrink towards zero inside this punctured ball: p itself is removed.",
            duration=2.4,
        )
        self.play(eps_t.animate.set_value(0.8), run_time=2.4)

        ## Scene4_LimitPoint.never_empty
        self.add_subcaption(
            "At every instant, other points of S remain inside the punctured ball.",
            duration=2.4,
        )
        self.play(eps_t.animate.set_value(0.45), run_time=2.4)

        verdict_ok = MathTex(
            r"\big(B_\epsilon(p) \setminus \{p\}\big) \cap S \neq \emptyset",
            color=GREEN,
        ).scale(0.72).move_to(LEFT * 2.2 + DOWN * 3.45)

        ## Scene4_LimitPoint.verdict_p
        self.add_subcaption(
            "So p is a limit point of S, for every positive epsilon.",
            duration=2.5,
        )
        self.play(FadeIn(verdict_ok, shift=UP * 0.2), run_time=0.9)
        self.wait(1.6)

        # ---- Demonstration B: isolated point --------------------------------
        q_pos = RIGHT * 4.7 + DOWN * 1.7
        q_marker = hollow_marker(q_pos, radius=0.12, color=YELLOW)
        q_label = MathTex(r"q \in S", color=YELLOW).scale(0.8).next_to(q_pos, DOWN, buff=0.2)
        q_note = Text("(isolated)", font_size=26, color=GREY_B).next_to(q_label, DOWN, buff=0.12)

        ## Scene4_LimitPoint.isolated_point
        self.add_subcaption(
            "Contrast: an isolated point q of S, standing completely apart from the cluster.",
            duration=1.8,
        )
        self.play(FadeIn(q_marker, scale=1.4), Write(q_label), FadeIn(q_note), run_time=1.8)

        delta_t = ValueTracker(1.1)

        def punctured_ball_q():
            r = max(delta_t.get_value(), 0.05)
            disk = Circle(radius=r, stroke_width=0).set_fill(TEAL, 0.2).move_to(q_pos)
            rim = DashedVMobject(
                Circle(radius=r, color=TEAL, stroke_width=3),
                num_dashes=DASHES,
                color=TEAL,
            ).move_to(q_pos)
            return VGroup(disk, rim)

        punctured_q = always_redraw(punctured_ball_q)
        self.add(punctured_q)
        punctured_q.set_z_index(-1)
        q_marker.set_z_index(1)
        q_label.set_z_index(2)
        q_note.set_z_index(2)

        ## Scene4_LimitPoint.shrink_delta
        self.add_subcaption(
            "Shrink delta until the punctured ball about q holds no other point of S.",
            duration=2.6,
        )
        self.play(delta_t.animate.set_value(0.35), run_time=2.6)

        verdict_fail = VGroup(
            MathTex(r"\big(B_\delta(q) \setminus \{q\}\big) \cap S = \emptyset",
                    color=RED).scale(0.66),
            MathTex(r"q \text{ is NOT a limit point}", color=RED).scale(0.72),
        ).arrange(DOWN, buff=0.22)
        fit_width(verdict_fail, max_width=5.0, scale=1.0)
        verdict_fail.move_to(RIGHT * 4.4 + DOWN * 3.35)

        ## Scene4_LimitPoint.verdict_q
        self.add_subcaption(
            "The intersection is empty, so q is not a limit point. That is the whole distinction.",
            duration=3.4,
        )
        self.play(FadeIn(verdict_fail, shift=UP * 0.2), run_time=1.0)
        self.wait(2.4)

        ## Scene4_LimitPoint.fadeout
        punctured.suspend_updating()
        punctured_q.suspend_updating()
        self.add_subcaption("Open sets, boundaries, and limit points: all one shrinking-circle test.",
                            duration=1.6)
        self.play(
            FadeOut(definition), FadeOut(s_group), FadeOut(s_label),
            FadeOut(cluster), FadeOut(p_marker), FadeOut(p_label),
            FadeOut(punctured), FadeOut(verdict_ok),
            FadeOut(q_marker), FadeOut(q_label), FadeOut(q_note),
            FadeOut(punctured_q), FadeOut(verdict_fail),
            run_time=1.6,
        )
