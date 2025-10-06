# Developer Onboarding Guide

Welcome to the Smart Delivery Platform team! This guide will walk you through the process of setting up your development environment and making your first contribution.

---

### Day 1: Setup & Introduction

**Goal:** Get your local development environment up and running and gain a high-level understanding of the project.

-   [ ] **Access Granted:**
    -   [ ] Confirm you have access to the project's GitHub repository.
    -   [ ] Confirm you have access to the team's communication channels (e.g., Slack, Discord).
    -   [ ] Confirm you have access to the project management tool (e.g., Trello, Jira).
    -   [ ] Confirm you have been invited to the Supabase project.

-   [ ] **Initial Reading:**
    -   [ ] Read the [Project Charter](../project-management/project-charter.md) to understand the project's vision, scope, and goals.
    -   [ ] Read the [System Architecture Overview](../architecture/system-architecture.md) to understand the high-level design of the platform.
    -   [ ] Review the [Technology Stack](../specifications/tech-stack.md) to familiarize yourself with the tools and frameworks we use.

-   [ ] **Local Environment Setup:**
    -   [ ] Clone the project repository to your local machine.
    -   [ ] Install the required version of Node.js (see `package.json` engines).
    -   [ ] Install `pnpm` (our preferred package manager).
    -   [ ] Run `pnpm install` at the root of the monorepo to install all dependencies.
    -   [ ] Create a `.env.local` file for the relevant application (e.g., `apps/web`) and populate it with the necessary environment variables (ask a team member for the required Supabase keys).

-   [ ] **Run the Applications:**
    -   [ ] Run the customer web application locally.
    -   [ ] Run the store dashboard locally.
    -   [ ] (If applicable) Set up your environment for React Native development and run the driver app in an emulator.

---

### First Week: Your First Contribution

**Goal:** Make a small, meaningful contribution to the project to get familiar with the development workflow.

-   [ ] **Pick Your First Ticket:**
    -   [ ] Find a small, well-defined ticket labeled "good first issue" in the project management tool.
    -   [ ] Assign the ticket to yourself and notify the team that you've started working on it.

-   [ ] **Understand the Workflow:**
    -   [ ] Create a new feature branch for your ticket from the `develop` branch.
    -   [ ] Follow the [New Feature Checklist](../checklists/new-feature-checklist.md) for the development process.

-   [ ] **Write Some Code:**
    -   [ ] Implement the required changes.
    -   [ ] Don't hesitate to ask questions! The team is here to help.

-   [ ] **Submit a Pull Request (PR):**
    -   [ ] Once your code is ready, push your branch and open a pull request targeting the `develop` branch.
    -   [ ] Follow the PR template and complete the [Code Review Checklist](../checklists/code-review-checklist.md).
    -   [ ] Request a review from one or more team members.

-   [ ] **Merge and Celebrate:**
    -   [ ] Once your PR is approved and passes all checks, merge it.
    -   [ ] Congratulations on your first contribution! 🎉

---

### Ongoing Learning

*   **Explore the Codebase:** Take time to read through different parts of the codebase to understand how they work.
*   **Pair Programming:** Schedule time to pair program with other developers. It's a great way to learn and share knowledge.
*   **Join Discussions:** Participate in team discussions about architecture, new features, and process improvements. Your perspective is valuable!