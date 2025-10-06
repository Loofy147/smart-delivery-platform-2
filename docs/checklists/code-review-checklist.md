# Code Review Checklist

This checklist is designed to ensure that all code reviews are thorough, consistent, and adhere to the quality standards of the Smart Delivery Platform. Both the author and the reviewer should use this guide.

---

### For the Pull Request (PR) Author:

Before requesting a review, ensure you have completed the following:

-   [ ] **Self-Review:** Have you reviewed your own code first, looking for typos, logical errors, and areas for improvement?
-   [ ] **Clear Title & Description:** Is the PR title clear and concise? Does the description explain the "what" and "why" of the changes and link to the relevant ticket(s)?
-   [ ] **Builds & Tests Pass:** Does the code build successfully, and have all unit and integration tests passed in the CI/CD pipeline?
-   [ ] **Manual Verification:** Have you manually tested your changes in a local environment to confirm they work as expected?
-   [ ] **New Tests Added:** Have you added appropriate tests for the new functionality or bug fixes?
-   [ ] **Documentation Updated:** Have you updated all relevant documentation (e.g., system architecture, API docs, user guides)?
-   [ ] **Keep it Focused:** Does the PR address a single concern? If not, consider splitting it into multiple smaller PRs.

---

### For the Reviewer:

When reviewing a pull request, consider the following aspects:

#### 1. Correctness & Logic

-   [ ] **Functionality:** Does the code do what it's supposed to do? Does it meet the requirements of the ticket?
-   [ ] **Edge Cases:** Are there any edge cases or potential failure modes that haven't been handled?
-   [ ] **Logic:** Is the logic sound and free of bugs? Could it be simplified?
-   [ ] **Concurrency & Race Conditions:** If the code involves concurrency, are there any potential race conditions or deadlocks?

#### 2. Readability & Maintainability

-   [ ] **Clarity:** Is the code easy to understand? Are variable and function names clear and descriptive?
-   [ ] **Simplicity:** Is the code overly complex? Can it be written in a simpler, more direct way? (Follow the KISS principle: "Keep It Simple, Stupid").
-   [ ] **Consistency:** Does the code adhere to the project's established coding style and patterns?
-   [ ] **Comments:** Is the code well-commented where necessary? Are the comments clear and helpful, explaining the "why," not just the "what"?

#### 3. Security & Performance

-   [ ] **Security Vulnerabilities:** Does the code introduce any potential security risks (e.g., SQL injection, XSS, insecure handling of credentials)? Is user input properly sanitized?
-   [ ] **Performance:** Could this code negatively impact performance? Are there any inefficient queries, loops, or algorithms?
-   [ ] **Resource Management:** Are resources like database connections or file handles properly managed and released?

#### 4. Testing

-   [ ] **Test Coverage:** Are the tests thorough and meaningful? Do they cover the main logic and important edge cases?
-   [ ] **Test Quality:** Are the tests well-written, readable, and easy to maintain?

#### 5. Documentation

-   [ ] **Documentation Match:** Does the associated documentation accurately reflect the changes in the code?

---

### Review Etiquette

*   **Be Kind and Constructive:** Frame feedback as suggestions, not commands.
*   **Explain Your Reasoning:** If you suggest a change, explain why it's better.
*   **Ask Questions:** If you don't understand something, ask for clarification.
*   **Balance Idealism and Pragmatism:** Strive for high-quality code, but be mindful of project deadlines and constraints.
*   **Acknowledge Good Work:** If you see something you like, say so! Positive feedback is valuable.