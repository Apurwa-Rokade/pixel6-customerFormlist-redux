# Customer Management Application

## Overview

This project is a customer management application built with React, Redux, and TypeScript. It allows users to add, edit, and manage customer information, including multiple addresses. It uses UUIDs for generating unique customer IDs and integrates form validation and API interactions.

## Features

- **Add/Edit Customers**: Users can add new customers or edit existing ones.
- **Unique IDs**: Each customer has a unique ID generated using UUIDs.
- **Address Management**: Customers can have multiple addresses (up to 10). Addresses include address lines, postcode, city, and state.
- **PAN Verification**: The form checks the validity of the PAN (Permanent Account Number) before submission.
- **Postcode Lookup**: The postcode field can be searched to prefill city and state based on API responses.
- **Local Storage/Redux State Management**: Customer data is saved in Redux state, and the application navigates to the customer list page upon submission.
- **Customer List**: Displays all customers with options to edit or delete.

## Technologies

- **React**: Frontend library for building the user interface.
- **Redux**: State management library for handling application state.
- **TypeScript**: JavaScript with type safety.
- **Formik**: Form library for managing form state and validation.
- **Yup**: Validation library used with Formik.
- **UUID**: Library for generating unique IDs.

## Setup

### Prerequisites

- Node.js and npm installed.

### Installation

1. Clone the repository:

   ```bash
   git clone https://github.com/your-repo/customer-management-app.git
   cd customer-management-app
   ```

2. Install dependencies:

```bash
  npm install
  npm run dev
```
