# Huyxom Store Management System

A modern, elegant React application for managing a store inventory with Vietnamese interfaces. This application provides a complete solution for tracking products, sales, and payments.

## Overview

Huyxom Store Management System is designed to help store owners and staff manage their inventory through a dual-interface approach:

- **Admin Interface**: Comprehensive inventory management with full CRUD operations
- **User Interface**: Simple search functionality for regular users to find their products

The system tracks products along with their sales and payment status, providing clear visual differentiation between active inventory and completed transactions.

## Features

### Admin Features
- View complete inventory in a well-organized tabular format
- Add new products with detailed information
- Edit existing product details
- Delete products
- Visual separation of active vs. sold & paid items

### User Features
- Search for products by user ID
- View products in a tabular list view
- See product details including status and payment information

### Product Management
- Track product details: ID, user ID, name, type, price, etc.
- Track sales status (sold/available)
- Track payment status (paid/unpaid)
- Automatic currency formatting (USD to VND)

## Technical Implementation

### Technology Stack
- **Frontend Framework**: React (v19.0.0)
- **Routing**: React Router DOM (v7.2.0)
- **State Management**: React Hooks
- **Data Persistence**: Browser localStorage
- **Styling**: Custom CSS with CSS variables
- **Testing**: Jest and React Testing Library

### Key Components
- `AdminScreen`: Main interface for administrators
- `UserScreen`: Interface for regular users to search products
- `ItemList`: Displays products in a tabular format
- `ItemCard`: Card representation of individual products (used in some views)
- `ItemModal`: Form for adding/editing product details
- `SoldAndPaidItemsList`: Alternative component for showing sold & paid items

### Data Structure
Products are stored with the following properties:
- `id`: Unique identifier
- `number`: Product reference number
- `userid`: Owner/user ID associated with the product
- `name`: Product name
- `type`: Product category/type
- `notes`: Additional product information
- `picture`: URL to product image
- `phone`: Contact phone number for the product
- `price`: Base price in USD (displayed in VND)
- `sold`: Boolean indicating whether the item is sold
- `paid`: Boolean indicating whether payment is received

## Project Structure

```
huyxom-store/
├── public/
├── src/
│   ├── components/
│   │   ├── AdminScreen.js     # Admin interface
│   │   ├── UserScreen.js      # User interface
│   │   ├── ItemList.js        # Table display of items
│   │   ├── ItemCard.js        # Card display of items
│   │   ├── ItemModal.js       # Form for adding/editing items
│   │   └── SoldAndPaidItemsList.js # Alternative listing component
│   ├── services/
│   │   └── itemService.js     # Data management and CRUD operations
│   ├── styles/
│   ├── App.js                 # Main application component with routing
│   ├── App.css                # Application styles
│   └── index.js               # Application entry point
└── package.json               # Project dependencies and scripts
```

## Design Philosophy

The application employs a modern, clean design with:
- Consistent color scheme using CSS variables
- Clear visual hierarchy with proper spacing
- Interactive elements with subtle animations and hover effects
- Responsive design that works on various devices
- Clear status indicators with color-coding

## Data Management

The application uses browser localStorage for data persistence:
- Products are stored in a local storage key: `store_items`
- Sample data is automatically loaded if no existing data is found
- All CRUD operations manipulate this localStorage data
- Simulated network delays provide a realistic API experience

## Getting Started

### Installation
1. Clone the repository
2. Install dependencies with `npm install`
3. Start the development server with `npm start`
4. Access the application at http://localhost:3000

### Usage
1. **Admin View** (`/admin`): Manage all inventory items
   - Add new products
   - Edit existing products
   - Delete products
   - View products organized by active and completed status

2. **User View** (`/`): Search for products by user ID
   - Enter a user ID in the search bar
   - View matching products in a tabular list
   - See detailed status information

## Currency Conversion

The application stores prices in USD but displays them in VND with the following conversion:
- 1 USD = 23,000 VND (fixed conversion rate)
- Formatting follows Vietnamese currency standards

## Future Enhancements

Potential areas for expansion:
- Backend integration with a real database
- User authentication system
- Advanced filtering and sorting options
- Reporting features
- Mobile application version

## License

This project is developed for internal use at Huyxom Store.
