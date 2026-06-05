# Test Layout Project (Wezom Test Task)

An archival frontend project originally developed in 2022 as a technical test task. In 2026, I revived, refactored, and updated the codebase to clean up the architecture and improve repository presentation.

## Key Updates & Refactoring (2026)
* **Mobile Responsiveness:** Fixed critical mobile navigation bugs below 768px. Extracted the catalog component (`.catalog__items`) from nested layouts and migrated the mobile menu to solid fixed positioning.
* **JavaScript Scope Optimization:** Resolved memory and context leaks within the dynamic rating components. Isolated inner variables (`ratingActive`, `ratingValue`) within clean local functional scopes.
* **Advanced Component Logic:** Refactored the product rating widget to handle complex UX requirements. It now locks the SVG stars to the user's explicit interaction while simultaneously computing the overall dynamic average score in the data fields.
* **DOM Cleanup:** Discarded legacy and redundant interactive elements (e.g., hidden `<input type="radio">` arrays) from static HTML components and dynamic JSON-generated feeds.

## Tech Stack
* **Markup & Styles:** HTML5, SCSS (BEM methodology)
* **Scripting:** Modern JavaScript (ES6+)
* **Build Tools:** Webpack 5, Babel, Browserslist (automated compilation and development watcher)

## How to Run
1. Install dependencies: `npm install`
2. Run the compiler with active watcher: `npm run watch`
3. Serve the directory locally (e.g., using VS Code Live Server extension)
