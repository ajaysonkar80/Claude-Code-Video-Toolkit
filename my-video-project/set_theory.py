from manim import *

class SetTheoryExplanation(Scene):
    def construct(self):
        # -----------------------------------------------------------
        # 1. Title Sequence
        # -----------------------------------------------------------
        title = Text("Fundamentals of Set Theory", font_size=40, weight=BOLD)
        title.to_edge(UP, buff=0.5)
        self.play(Write(title))
        self.wait(0.5)

        # -----------------------------------------------------------
        # 2. Define Sets Symbolically
        # -----------------------------------------------------------
        set_defs = VGroup(
            MathTex(r"A = \{1, 2, 3, 4\}", color=BLUE_D),
            MathTex(r"B = \{3, 4, 5, 6\}", color=RED_D),
        ).arrange(RIGHT, buff=1.2).next_to(title, DOWN, buff=0.5)

        self.play(FadeIn(set_defs, shift=UP * 0.3))
        self.wait(0.8)

        # -----------------------------------------------------------
        # 3. Build Venn Diagram Shapes
        # -----------------------------------------------------------
        circle_a = Circle(radius=1.8, color=BLUE, stroke_width=4).shift(LEFT * 1.1 + DOWN * 0.3)
        circle_b = Circle(radius=1.8, color=RED, stroke_width=4).shift(RIGHT * 1.1 + DOWN * 0.3)

        label_a = MathTex("A", color=BLUE, font_size=38).next_to(circle_a, UP, buff=0.2)
        label_b = MathTex("B", color=RED, font_size=38).next_to(circle_b, UP, buff=0.2)

        self.play(
            Create(circle_a),
            Create(circle_b),
            Write(label_a),
            Write(label_b),
        )

        # -----------------------------------------------------------
        # 4. Map Individual Elements into Regions
        # -----------------------------------------------------------
        # Elements exclusive to A
        elem_1 = MathTex("1").move_to(circle_a.get_center() + LEFT * 0.7 + UP * 0.35)
        elem_2 = MathTex("2").move_to(circle_a.get_center() + LEFT * 0.7 + DOWN * 0.35)

        # Elements shared by both (A ∩ B)
        elem_3 = MathTex("3").move_to(DOWN * 0.3 + UP * 0.35)
        elem_4 = MathTex("4").move_to(DOWN * 0.3 + DOWN * 0.35)

        # Elements exclusive to B
        elem_5 = MathTex("5").move_to(circle_b.get_center() + RIGHT * 0.7 + UP * 0.35)
        elem_6 = MathTex("6").move_to(circle_b.get_center() + RIGHT * 0.7 + DOWN * 0.35)

        elements = VGroup(elem_1, elem_2, elem_3, elem_4, elem_5, elem_6)
        
        # Ensure numbers always stay rendered on top of shaded regions
        elements.set_z_index(10)

        self.play(LaggedStartMap(FadeIn, elements, lag_ratio=0.15))
        self.wait(1)

        # -----------------------------------------------------------
        # 5. Operation 1: Intersection (A ∩ B)
        # -----------------------------------------------------------
        intersection_fill = Intersection(
            circle_a, circle_b,
            color=YELLOW,
            fill_opacity=0.5,
            stroke_width=0
        )

        label_inter = Text("Intersection", font_size=28, color=YELLOW).to_edge(DOWN, buff=1.2)
        formula_inter = MathTex(r"A \cap B = \{3, 4\}", font_size=34, color=YELLOW).next_to(label_inter, DOWN, buff=0.2)

        self.play(
            FadeIn(intersection_fill),
            Write(label_inter),
            Write(formula_inter),
            Indicate(elem_3, color=YELLOW, scale_factor=1.2),
            Indicate(elem_4, color=YELLOW, scale_factor=1.2),
        )
        self.wait(2)

        # -----------------------------------------------------------
        # 6. Operation 2: Union (A ∪ B)
        # -----------------------------------------------------------
        union_fill = Union(
            circle_a, circle_b,
            color=GREEN_C,
            fill_opacity=0.45,
            stroke_width=0
        )

        label_union = Text("Union", font_size=28, color=GREEN_C).to_edge(DOWN, buff=1.2)
        formula_union = MathTex(r"A \cup B = \{1, 2, 3, 4, 5, 6\}", font_size=34, color=GREEN_C).next_to(label_union, DOWN, buff=0.2)

        self.play(
            ReplacementTransform(intersection_fill, union_fill),
            ReplacementTransform(label_inter, label_union),
            ReplacementTransform(formula_inter, formula_union),
            Circumscribe(elements, color=GREEN_C, time_width=1.5),
        )
        self.wait(2)

        # -----------------------------------------------------------
        # 7. Operation 3: Set Difference (A \ B)
        # -----------------------------------------------------------
        diff_fill = Difference(
            circle_a, circle_b,
            color=ORANGE,
            fill_opacity=0.5,
            stroke_width=0
        )

        label_diff = Text("Relative Complement (A \\ B)", font_size=28, color=ORANGE).to_edge(DOWN, buff=1.2)
        formula_diff = MathTex(r"A \setminus B = \{1, 2\}", font_size=34, color=ORANGE).next_to(label_diff, DOWN, buff=0.2)

        self.play(
            ReplacementTransform(union_fill, diff_fill),
            ReplacementTransform(label_union, label_diff),
            ReplacementTransform(formula_union, formula_diff),
            Indicate(elem_1, color=ORANGE, scale_factor=1.2),
            Indicate(elem_2, color=ORANGE, scale_factor=1.2),
        )
        self.wait(2)

        # -----------------------------------------------------------
        # 8. Summary Table / Outro
        # -----------------------------------------------------------
        self.play(
            FadeOut(diff_fill),
            FadeOut(label_diff),
            FadeOut(formula_diff),
        )

        summary = MathTex(
            r"A \cap B &= \{3, 4\} \\",
            r"A \cup B &= \{1, 2, 3, 4, 5, 6\} \\",
            r"A \setminus B &= \{1, 2\}",
            font_size=32
        ).to_edge(DOWN, buff=0.6)

        box = SurroundingRectangle(summary, color=WHITE, buff=0.25, stroke_width=1.5)

        self.play(Write(summary), Create(box))
        self.wait(3)