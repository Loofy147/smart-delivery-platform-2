# Project Decisions Log

## 2023-11-20: Mobile App Technology

**Decision:** Use React Native for the driver mobile application.

**Rationale:**

*   Larger pool of available developers, potentially leading to faster team assembly.
*   Potential for code sharing with the customer web application (built with React/Next.js).
*   Faster onboarding for developers familiar with React.
*   Suitable open-source templates available.

**Considerations:**

*   Potential performance limitations compared to native apps or Flutter (less of a concern for the MVP).

## 2023-11-20: Final Template Selections

**Decision:** The following templates have been selected for the MVP:

*   **Customer App:** Next.js E-commerce Template by Strapi ([https://github.com/strapi/nextjs-ecommerce-template](https://github.com/strapi/nextjs-ecommerce-template))
    *   **Rationale:** Strong foundation for e-commerce, good product display and shopping cart features, integrates with Strapi (optional content management), good documentation and community.
*   **Driver App:** Food Delivery UI Kit by Instamobile (React Native) ([https://github.com/instamobile/react-native-food-delivery-app-template](https://github.com/instamobile/react-native-food-delivery-app-template))
    *   **Rationale:** Specifically designed for food delivery, relevant screens for order management and driver tasks, clean and modern design.
*   **Admin Dashboard:** React Admin Dashboard by Devias IO ([https://github.com/devias-io/material-kit-react](https://github.com/devias-io/material-kit-react))
    *   **Rationale:** Well-designed admin interface, Material UI components, data tables and forms suitable for managing core entities.
