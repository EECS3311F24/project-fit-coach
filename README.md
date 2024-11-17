# Project Fit Coach

## Motivation
In today's fitness-driven world, a platform that tracks nutrition and workout progress is critical for fitness enthusiasts. Many existing solutions lack either advanced workout tracking or comprehensive nutrition logging, limiting their usefulness for serious athletes and fitness coaches. Our app is designed to fill this gap, providing bodybuilders, powerlifters, CrossFitters, beginners, and fitness coaches with a versatile tool that integrates detailed nutrition tracking, progressive overload systems, and customizable workout plans. This website aims to help users achieve their fitness goals more efficiently by offering precise tracking, personalized workout routines, and nutrition suggestions. 

It's a one-stop solution for improving health, fitness, and overall performance.

## Demo Video
The Demo video for sprint1: [video](doc/Sprint1/sprint1demo.mp4) or [youtube link](https://www.youtube.com/watch?v=T9BlZoKfMPM)
The Demo video for sprint2: [video](doc/Sprint2/sprint2demo.mp4)
NOTE: to view the video as an mp4 file, it should be downloaded

## Current Features
- Main page which contains some information about our project and a button to the login page.
- Login page which allows the users to log in if they have an existing account or register if they're new to the website.
- Ability for each user to view a customized calendar as well as input for weight and height.

## Installation
At the current time, the only way to access our webpage is by running the index.html under the Main-page, and user.html under the User-page.

## Contribution

We welcome contributions from the community! Follow these guidelines to get involved:

### Workflow
1. **Fork the repository** and create your own branch:
    ```bash
    git checkout -b feature/your-feature-name
    ```
   
2. **Follow Git Flow:**
    - Name branches according to the feature you're working on (e.g., `feature/progressive-overload`, `bugfix/ui-fix`).
    - Always create pull requests into the `develop` branch before merging into `main`.
    - We follow the [Git Flow branching model](https://nvie.com/posts/a-successful-git-branching-model/).

3. **Create issues**: We use [GitHub Issues](https://github.com/EECS3311F24/project-fit-coach/issues) to track tasks, bugs, and feature requests. Please check existing issues before creating a new one.

4. **Pull Requests**: When you're ready to submit your changes, open a pull request (PR) with a description of the feature or fix. Assign a team member to review your PR.

5. **Code Review**: All contributions must be reviewed by at least one team member before being merged.

6. **Testing**: Ensure that your code passes all tests and doesn't break existing functionality.

### Branching Strategy
- **feature/branch-name**: New features and enhancements.
- **bugfix/branch-name**: Bug fixes and minor improvements.
- **hotfix/branch-name**: Urgent fixes for issues in production.
- **development**: The main development branch. All new features are merged here before being released to `main`.
- **main**: Production-ready code only. Releases are tagged here.
