# Pre-Deployment Checklist

This checklist must be completed before deploying any changes to the production environment. Its purpose is to minimize the risk of release-related incidents and ensure a smooth deployment process.

---

### 1. Code & Feature Readiness

-   [ ] **All Code Merged:** All feature branches and bug fixes for this release have been merged into the `develop` branch.
-   [ ] **`develop` Merged to `main`:** The `develop` branch has been successfully merged into the `main` branch, which is the source for this deployment.
-   [ ] **CI/CD Pipeline Green:** All automated builds, tests (unit and integration), and quality checks are passing on the `main` branch.
-   [ ] **No High-Priority Bugs:** There are no open, high-priority bugs related to the features being deployed.

### 2. Testing & Quality Assurance

-   [ ] **QA Sign-off:** The QA team has completed testing in the staging environment and has formally signed off on the release.
-   [ ] **Regression Testing Complete:** A full regression test suite has been run on the staging environment to ensure no existing functionality has been broken.
-   [ ] **Manual Spot-Checks:** Key user flows have been manually spot-checked in the staging environment one last time.

### 3. Documentation & Configuration

-   [ ] **Documentation Updated:** All relevant documentation (system architecture, user guides, API docs) has been updated to reflect the changes in this release.
-   [ ] **Environment Variables:** All necessary environment variables and configuration settings are in place for the production environment.
-   [ ] **Database Migrations Prepared:** Any required database schema migrations have been reviewed, tested, and are ready to be run.
-   [ ] **Release Notes Drafted:** Release notes have been drafted, detailing the new features, bug fixes, and any known issues.

### 4. Communication & Rollback Plan

-   [ ] **Stakeholders Notified:** Key stakeholders and the wider team have been notified of the planned deployment window.
-   [ ] **Rollback Plan:** A clear rollback plan is in place in case of a critical failure during or after deployment.
    -   [ ] The previous stable version/commit has been identified.
    -   [ ] The process for redeploying the previous version is documented and understood.
    -   [ ] The process for rolling back database migrations (if applicable) is understood.
-   [ ] **Monitoring Plan:** The team responsible for monitoring the release is prepared.
    -   [ ] Key dashboards and monitoring tools are open and ready.
    -   [ ] The on-call engineer is aware of the deployment and is on standby.

### 5. Final Go/No-Go

-   [ ] **Final Approval:** The project manager or release manager has given the final "Go" for the deployment.

---

**Only after all checkboxes are ticked should the deployment to production proceed.**