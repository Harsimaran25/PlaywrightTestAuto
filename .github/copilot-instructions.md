# Copilot Instructions for PlaywrightTestAuto

## Project Overview
- This project is a Playwright-based end-to-end and API testing framework for web applications.
- Test files are located in the `tests/` directory and use Playwright's test runner with JavaScript.
- Feature files for Cucumber-style BDD tests are in `features/`, with step definitions in `features/step_definitions/`.
- Page Object Model (POM) is used; page abstractions are in `PageObj/` (e.g., `LoginPage.js`).
- Utility functions and shared logic are in `Utils/`.

## Key Workflows
- **Run all tests:** Use Playwright's CLI: `npx playwright test` (ensure dependencies are installed via `npm install`).
- **Run specific test:** `npx playwright test tests/Example.spec.js` or similar.
- **Generate HTML report:** After running tests, open `playwright-report/index.html`.
- **Cucumber BDD tests:** Feature files (`.feature`) are mapped to step definitions in `features/step_definitions/`.
- **Screenshots:** Saved in `CucumberScreenshots/` on failure or as configured in hooks.

## Project Conventions
- **Test Naming:** Test files end with `.spec.js` and are grouped by feature or API in `tests/`.
- **Step Definitions:** Each `.feature` file has a corresponding step definition JS file.
- **Page Objects:** Encapsulate selectors and actions for a page; import and use in step definitions and tests.
- **Utils:** Shared helpers (e.g., API utilities, test base setup) are in `Utils/`.
- **Reports:** Cucumber and Playwright reports are generated as `.json` and `.html` in the root or `playwright-report/`.

## Integration Points
- **Playwright:** Main test runner and browser automation tool.
- **Cucumber:** BDD support via feature files and step definitions.
- **Node.js:** All scripts and tests are JavaScript (ES6+).

## Examples
- To add a new login test:
  1. Add a scenario to `features/Login.feature`.
  2. Implement steps in `features/step_definitions/stepdefs.js` or a new file.
  3. Use `PageObj/LoginPage.js` for page actions.

## Tips for AI Agents
- Prefer using existing page objects and utils for new tests.
- Follow the directory structure for new features/tests.
- Reference `playwright.config.js` for custom config (e.g., timeouts, baseURL).
- Check `README.md` for any project-specific notes (currently minimal).

---
If any conventions or workflows are unclear, ask for clarification or examples from the user.
