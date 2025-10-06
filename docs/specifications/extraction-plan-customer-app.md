# Extraction Plan: Customer App (Next.js E-commerce Template by Strapi)

**Template:** Next.js E-commerce Template by Strapi ([https://github.com/strapi/nextjs-ecommerce-template](https://github.com/strapi/nextjs-ecommerce-template))

**Goal:** Extract and adapt key components to build the customer-facing web application for our delivery platform MVP.

## Key Components

*   **Product Listing/Grid:** Displays products in a visually appealing manner.
*   **Product Detail Page:** Shows detailed information about a specific product.
*   **Shopping Cart:** Allows users to add/remove products and view their selections.
*   **Checkout Form:** Collects user information and processes orders.
*   **User Authentication (Login/Register):** Handles user login and registration.
*   **Navigation Bar:** Provides navigation between different sections of the app.
*   **Footer:** Contains copyright information and links.
*   **Order History View:** Allows users to view their past orders.

## Extraction Steps

1.  **Project Setup:**
    *   Clone the template repository: `git clone https://github.com/strapi/nextjs-ecommerce-template.git`
    *   Explore the project structure to understand the organization of components, pages, and API routes.

2.  **Component Identification:**
    *   Locate the relevant component files within the template's codebase. Key directories to examine include:
        *   `components/`: For reusable UI components.
        *   `pages/`: For page-level components (e.g., product listing, product detail, cart, checkout).
        *   `lib/` or `utils/`: For utility functions and API client logic.

3.  **Dependency Analysis:**
    *   Identify any external libraries or dependencies used by the target components. Pay close attention to:
        *   UI component libraries (if any).
        *   Data fetching libraries (likely using Strapi's API).
        *   State management solutions (if any).
        *   Styling approaches (CSS modules, styled-components, etc.).

4.  **Extraction & Refactoring:**
    *   Copy the component files into our `packages/ui` directory, organizing them into subdirectories as appropriate (e.g., `packages/ui/components/product-listing`, `packages/ui/components/cart`).
    *   Rename files and components to follow our project's naming conventions.
    *   Refactor the code to:
        *   Remove Strapi-specific data fetching or API calls. Replace them with placeholder data or prepare for integration with our Supabase backend.
        *   Adapt styling to align with our design system, ideally using Tailwind CSS. This might involve:
            *   Removing CSS modules or styled-components.
            *   Converting styles to Tailwind classes.
            *   Adjusting class names to avoid conflicts.
        *   Ensure components are well-documented with clear prop definitions and usage examples.
        *   Remove any unnecessary features or code not relevant to our MVP.

5.  **Testing:**
    *   Write unit tests for the extracted components using Jest and React Testing Library. Focus on testing:
        *   Component rendering with different props.
        *   Key interactions and event handling.
        *   Data display logic.

6.  **Integration (Ongoing):**
    *   As components are extracted and refactored, integrate them into our Next.js application (`apps/web`). This will involve:
        *   Importing components from `packages/ui`.
        *   Connecting components to our Supabase API for data fetching and mutations.
        *   Adapting page layouts and routing to incorporate the new components.

## Potential Challenges

*   **Styling Conflicts:** Integrating the template's styling (which might use CSS modules or styled-components) with our Tailwind CSS setup could require careful refactoring and conflict resolution.
*   **Strapi Integration:** Replacing Strapi's data handling with our Supabase integration will be a significant task, requiring us to:
    *   Define our data models in Supabase.
    *   Create API functions (using serverless functions) to interact with Supabase.
    *   Adapt the components to use these new API functions.
*   **Routing & Navigation:** The template's routing and navigation might need adjustments to fit our Next.js project structure and desired user flows.
*   **Feature Overload:** The template might include more features than we need for our MVP. We'll need to carefully remove or disable unnecessary parts.
