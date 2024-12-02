from fpdf import FPDF

# Create a PDF document
class PDF(FPDF):
    def header(self):
        self.set_font('Arial', 'B', 12)
        self.cell(0, 10, 'Sprint Schedule Report', border=0, ln=1, align='C')
        self.ln(10)

    def chapter_title(self, title):
        self.set_font('Arial', 'B', 12)
        self.cell(0, 10, title, ln=1, align='L')
        self.ln(5)

    def chapter_body(self, body):
        self.set_font('Arial', '', 11)
        self.multi_cell(0, 10, body)
        self.ln()

# Initialize PDF
pdf = PDF()
pdf.add_page()

# Add title and content
pdf.set_font('Arial', 'B', 16)
pdf.cell(0, 10, "Sprint 3 Schedule Analysis", ln=True, align='C')
pdf.ln(10)

# Chapter 1: Dependencies and Network Diagram
pdf.chapter_title("Dependencies and Network Diagram")
pdf.chapter_body("""
The tasks for each feature were analyzed to identify dependencies and create a logical sequence of actions. 
The network diagram illustrates these relationships and helps to visualize task flow across the sprint.

Features and dependencies:
1. Saving Workout Routines: Save exercises -> Store in DB.
2. Recording Calories and Macronutrients: Input values -> Counters -> Difference Calculation -> Pie Chart.
3. Preset Workout Routines: Buttons -> Integrate preset plans.
4. Page Customization: Color change button -> Template customization.

Critical Path:
The critical path consists of Feature 2 tasks, as it has the most dependencies and longest sequence."""
)

# Add the network diagram
pdf.add_page()
pdf.chapter_title("Network Diagram")
diagram_path = "charts/network_diagram"
pdf.image(f"{diagram_path}.pdf", x=10, y=30, w=190)

# Add findings and recommendations
pdf.add_page()
pdf.chapter_title("Findings and Recommendations")
pdf.chapter_body("""
To keep the sprint on schedule:
1. Prioritize high-priority features like Feature 1 and Feature 2.
2. Allocate additional resources to the critical path tasks.
3. Schedule buffer time for integration and testing.

If delays occur:
- Use the network diagram to identify bottlenecks.
- For example, delays in Feature 2's pie chart implementation could affect sprint closure. Adjust priorities to resolve critical path issues first.

Learnings:
This approach highlights the importance of early dependency analysis and clear task assignment."""
)

# Save the PDF document
pdf_output_path = "charts/schedule.pdf"
pdf.output(pdf_output_path)

