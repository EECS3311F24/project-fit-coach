from matplotlib import pyplot as plt
import networkx as nx

# Create a directed graph
G = nx.DiGraph()

# Define tasks and dependencies
tasks = {
    "Account Creation": [],
    "Password Reset": ["Account Creation"],
    "Login Error Handling": ["Account Creation"],
    "Customize Page": ["Account Creation"],
    "Weight System": ["Account Creation"],
    "Workout Routines": ["Account Creation", "Weight System"],
    "Beginner Plan": ["Workout Routines"],
    "Recommendations": ["Workout Routines"],
    "Calorie Tracking": ["Account Creation"],
    "Macronutrient Tracking": ["Calorie Tracking"],
    "Protein/Carb/Fat Goals": ["Macronutrient Tracking"],
    "Appropriate Workout Plan": ["Workout Routines", "Protein/Carb/Fat Goals"],
    "Navigation Improvements": ["Account Creation"],
    "Badges": ["Workout Routines"],
    "Social Features": ["Account Creation"],
}

# Add nodes and edges based on dependencies
for task, dependencies in tasks.items():
    G.add_node(task)
    for dep in dependencies:
        G.add_edge(dep, task)

# Draw the network diagram
# pos = nx.planar_layout(G)  # Planar layout for better visualization
pos = nx.spring_layout(G, k=10, iterations=10)  # Spring layout for more spacing
plt.figure(figsize=(12,6))
nx.draw(G, pos, with_labels=True, node_color="skyblue", node_size=3000, font_size=10, font_weight="bold", arrowsize=5)
plt.title("Task Dependency Network Diagram", fontsize=14, fontweight="bold")
# plt.tight_layout()

# Save the diagram as an image
plt.savefig("charts/network_diagram.png")

# Display the diagram
plt.show()
