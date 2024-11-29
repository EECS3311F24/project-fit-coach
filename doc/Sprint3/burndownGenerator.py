import matplotlib.pyplot as plt
import numpy as np
import os
from fpdf import FPDF

# Data for the burndown chart
days = np.arange(1, 11)  # 10-day sprint
planned_effort = np.linspace(38, 0, 10)  # Planned effort linearly decreasing to 0
actual_effort = [38, 36, 32, 28, 25, 22, 15, 10, 5, 0]  # Actual effort logged

# Generate the burndown chart
plt.figure(figsize=(10, 6))
plt.plot(days, planned_effort, label="Planned Effort", marker='o')
plt.plot(days, actual_effort, label="Actual Effort", marker='o', linestyle='--')
plt.title("Sprint Burndown Chart")
plt.xlabel("Day")
plt.ylabel("Effort (Story Points)")
plt.legend()
plt.grid(True)
plt.tight_layout()

# Save the chart as an image
chart_path = "charts/burndown_chart.png"
os.makedirs(os.path.dirname(chart_path), exist_ok=True)
plt.savefig(chart_path)
plt.close()

# Create the PDF document
pdf = FPDF()
pdf.add_page()
pdf.set_font("Arial", size=12)

# Add comments about the burndown chart
pdf.cell(0, 10, "Burndown Chart Analysis", ln=True, align='C')
pdf.ln(10)
pdf.multi_cell(0, 10, (
    "The sprint burndown chart compares the planned velocity with the actual progress. "
    "The planned velocity is consistent over the sprint duration, assuming a linear reduction "
    "in effort. However, the actual velocity fluctuated slightly.\n\n"
    "Notable observations:\n"
    "- The team started strong but lagged mid-sprint (days 4-6).\n"
    "- Adjustments were made, leading to an acceleration in story point completion towards the sprint's end.\n\n"
    "Comparison with Previous Sprint:\n"
    "The planned velocity was similar to the last sprint, but actual velocity improved in this sprint due to "
    "better task prioritization and team collaboration. Challenges in mid-sprint were tackled effectively, "
    "resulting in a successful completion of the sprint.\n\n"
    "Velocity Change Analysis:\n"
    "Improved velocity stems from refined processes and increased focus on high-priority tasks. "
    "These improvements highlight areas for continued development."


))

# Add the chart to the PDF
pdf.image(chart_path, x=10, y=80, w=190)

# Save the PDF document
pdf_path = "burndown.pdf"
pdf.output(pdf_path)

pdf_path
