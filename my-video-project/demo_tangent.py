from manim import *

class TangentExplanation(Scene):
    def construct(self):
        # 1. Plain Text Title
        title = Text("Geometric Intuition of a Derivative", font_size=36, color=BLUE)
        title.to_edge(UP)
        self.play(Write(title))
        self.wait(0.5)

        # 2. Axes - explicit label_constructor=Text stops LaTeX from being called
        axes = Axes(
            x_range=[-3, 3, 1],
            y_range=[-1, 5, 1],
            axis_config={
                "color": GREY,
                "label_constructor": Text,  # Uses system fonts for numbers
            },
        ).add_coordinates()

        curve = axes.plot(lambda x: 0.5 * x**2, color=YELLOW)
        
        curve_label = Text("f(x) = 0.5 * x^2", font_size=24, color=YELLOW)
        curve_label.next_to(axes.c2p(2, 2), UR)

        self.play(Create(axes), Create(curve), Write(curve_label))
        self.wait(1)

        # 3. Dynamic Tangent Point and Secant/Tangent Line
        t = ValueTracker(-2.0)
        dot = always_redraw(lambda: Dot(axes.c2p(t.get_value(), 0.5 * t.get_value()**2), color=RED))
        
        tangent_line = always_redraw(
            lambda: axes.get_secant_slope_group(
                x=t.get_value(),
                graph=curve,
                dx=0.001,
                secant_line_length=4,
                secant_line_color=GREEN,
            )
        )

        slope_label = always_redraw(
            lambda: Text(
                f"Slope at x = {t.get_value():.1f}  ->  f'(x) = {t.get_value():.1f}",
                font_size=22
            ).to_corner(DR)
        )

        self.play(FadeIn(dot), Create(tangent_line), Write(slope_label))
        
        # 4. Animate tangent line moving across the parabola
        self.play(t.animate.set_value(2.0), run_time=5, rate_func=linear)
        self.wait(1)

        conclusion = Text(
            "The derivative represents the instantaneous rate of change.",
            font_size=24,
            color=YELLOW
        ).to_edge(DOWN)
        
        self.play(Transform(slope_label, conclusion))
        self.wait(2)