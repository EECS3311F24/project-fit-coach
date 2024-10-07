# Fitness Coach App

## Motivation
In today's fitness-driven world, the need for a platform that tracks both nutrition and workout progress is critical for fitness enthusiasts. Many existing solutions lack either advanced workout tracking or comprehensive nutrition logging, limiting their usefulness for serious athletes and fitness coaches. Our app is designed to fill this gap, providing bodybuilders, powerlifters, CrossFitters, beginners, and fitness coaches with a versatile tool that integrates detailed nutrition tracking, progressive overload systems, and customizable workout plans.

This app aims to help users achieve their fitness goals more efficiently by offering precise tracking, personalized workout routines, and nutrition suggestions. It's a one-stop solution for anyone looking to improve health, fitness, and overall performance.

## Features
- **Detailed Nutrition Tracking:** Track food intake, macronutrients, and calories consumed.
- **Progressive Overload System:** Automatically suggest weight and rep adjustments for optimal strength gains.
- **Customizable Workouts:** Create and log custom exercises and routines.
- **Comprehensize Features:** Provide beginners with easy-to-follow plans tailored to their fitness goals.

## Installation
To run the project locally, follow these steps:

### Prerequisites
- [Node.js](https://nodejs.org/) (v14.0.0 or later)
- [Flutter SDK](https://flutter.dev/docs/get-started/install)
- [Dart](https://dart.dev/get-dart) (version 2.12.0 or later)
- [Firebase CLI](https://firebase.google.com/docs/cli) (for backend integration)
- Code editor (such as [VSCode](https://code.visualstudio.com/))
  
### Setup

1. **Clone the repository:**
    ```bash
    git clone https://github.com/your-username/fitness-coach-app.git
    cd fitness-coach-app
    ```

2. **Install dependencies:**
    For Flutter:
    ```bash
    flutter pub get
    ```

3. **Set up Firebase:**
    Follow [Firebase setup instructions](https://firebase.google.com/docs/flutter/setup) for Flutter, and ensure you add your Firebase project configuration files (`google-services.json` for Android and `GoogleService-Info.plist` for iOS).

4. **Run the app:**
    ```bash
    flutter run
    ```

Your app should now be running locally on your device or emulator.

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

3. **Create issues**: We use [GitHub Issues](https://github.com/your-username/fitness-coach-app/issues) to track tasks, bugs, and feature requests. Please check existing issues before creating a new one.

4. **Pull Requests**: When you're ready to submit your changes, open a pull request (PR) with a description of the feature or fix. Assign a team member to review your PR.

5. **Code Review**: All contributions must be reviewed by at least one team member before being merged.

6. **Testing**: Ensure that your code passes all tests and doesn't break existing functionality.

### Branching Strategy
- **feature/branch-name**: New features and enhancements.
- **bugfix/branch-name**: Bug fixes and minor improvements.
- **hotfix/branch-name**: Urgent fixes for issues in production.
- **development**: The main development branch. All new features are merged here before being released to `main`.
- **main**: Production-ready code only. Releases are tagged here.
