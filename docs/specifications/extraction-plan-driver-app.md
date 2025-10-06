# Extraction Plan: Driver App (Food Delivery UI Kit by Instamobile - React Native)

**Template:** Food Delivery UI Kit by Instamobile ([https://github.com/instamobile/react-native-food-delivery-app-template](https://github.com/instamobile/react-native-food-delivery-app-template))

**Goal:** Extract and adapt key components to build the driver-facing mobile application for our delivery platform MVP.

## Key Components

*   **Order List View (Available Orders):** Displays a list of available orders for drivers to accept.
*   **Order Detail View:** Shows detailed information about a specific order, including customer details, delivery address, and order items.
*   **Order Acceptance/Rejection UI:** Provides UI elements for drivers to accept or reject an order.
*   **Order Status Update UI (Picked Up, Delivered):** Allows drivers to update the status of an order during the delivery process.
*   **Driver Profile Screen:** Displays driver information and potentially settings.
*   **Navigation Components:** Handles navigation between different screens within the app.
*   **Map Integration:** If the template includes a map, assess its suitability. Otherwise, plan to integrate Leaflet or another mapping library.

## Extraction Steps

1.  **Project Setup:**
    *   Download or clone the template: (Assuming it's a public repo, otherwise follow provided instructions)
    *   Explore the project structure to understand the organization of screens, components, and API integration (if any).

2.  **Component Identification:**
    *   Identify the key components within the React Native project. Look for directories and files related to:
        *   `screens/` or `views/`: For top-level screens.
        *   `components/`: For reusable UI components.
        *   `navigation/`: For navigation setup and components.
        *   `api/` or `services/`: For API client logic (if any).

3.  **Dependency Analysis:**
    *   Analyze the project's dependencies, paying attention to:
        *   UI component libraries (e.g., React Native Paper, NativeBase).
        *   Navigation libraries (e.g., React Navigation).
        *   Mapping libraries (if any).
        *   Any libraries used for API communication or state management.

4.  **Extraction & Refactoring:**
    *   Copy the relevant components into our `apps/mobile` project, organizing them into appropriate directories.
    *   Rename files and components to match our project's conventions.
    *   Refactor the code to:
        *   Replace any placeholder data or API calls with our Supabase integration. This will likely involve:
            *   Creating API functions in our project to interact with Supabase.
            *   Adapting the components to use these new functions.
        *   Adapt styling as needed to align with our overall design, while respecting the conventions of the chosen UI library (if any).
        *   Ensure components are well-documented.
        *   Remove any unnecessary features or code not required for our MVP.

5.  **Map Integration:**
    *   If the template includes a map component, evaluate its suitability. Consider:
        *   Which mapping library is used (e.g., Google Maps, Mapbox, Leaflet).
        *   Ease of customization and integration with our order data.
        *   Licensing and cost considerations (especially for commercial libraries).
    *   If the template's map is not suitable or doesn't exist, plan to integrate Leaflet (or another appropriate library) in a separate step.

6.  **Testing:**
    *   Implement basic component tests using a testing library like Jest. Focus on testing:
        *   Component rendering and data display.
        *   User interactions (e.g., button presses, list interactions).
        *   Navigation logic (if applicable to the component).

## Potential Challenges

*   **Navigation Integration:** Integrating the template's navigation with our project's overall navigation structure might require careful planning and adaptation.
*   **Styling Consistency:** Ensuring the driver app's styling aligns with the customer and admin interfaces might require effort, especially if the template uses a different UI library or styling approach.
*   **Map Integration:** If we need to replace or integrate a new mapping library, this could add complexity and time to the development process.
*   **Feature Set Alignment:** The template might have more features than we need for the MVP. We'll need to carefully identify and remove extraneous functionality.
