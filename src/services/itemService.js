// API URL, read from environment variable or use default
const API_URL = process.env.REACT_APP_API_URL || 'http://localhost:5000/api';

// Common fetch options for all requests
const fetchOptions = {
  credentials: 'include', // Include cookies for cross-site requests
  headers: {
    'Content-Type': 'application/json',
    'Accept': 'application/json'
  }
};

// Get all items
export const getAllItems = async () => {
  try {
    const response = await fetch(`${API_URL}/items`, {
      ...fetchOptions,
      method: 'GET'
    });
    
    if (!response.ok) {
      throw new Error('Failed to fetch items');
    }
    return await response.json();
  } catch (error) {
    console.error('Error fetching items:', error);
    throw error;
  }
};

// Add a new item
export const addItem = async (item) => {
  try {
    const response = await fetch(`${API_URL}/items`, {
      ...fetchOptions,
      method: 'POST',
      body: JSON.stringify(item),
    });
    
    if (!response.ok) {
      throw new Error('Failed to add item');
    }
    
    return await response.json();
  } catch (error) {
    console.error('Error adding item:', error);
    throw error;
  }
};

// Update an existing item
export const updateItem = async (updatedItem) => {
  try {
    const response = await fetch(`${API_URL}/items/${updatedItem.id}`, {
      ...fetchOptions,
      method: 'PUT',
      body: JSON.stringify(updatedItem),
    });
    
    if (!response.ok) {
      throw new Error('Failed to update item');
    }
    
    return await response.json();
  } catch (error) {
    console.error('Error updating item:', error);
    throw error;
  }
};

// Delete an item
export const deleteItem = async (id) => {
  try {
    const response = await fetch(`${API_URL}/items/${id}`, {
      ...fetchOptions,
      method: 'DELETE',
    });
    
    if (!response.ok) {
      throw new Error('Failed to delete item');
    }
    
    const data = await response.json();
    return data.id;
  } catch (error) {
    console.error('Error deleting item:', error);
    throw error;
  }
};

// Search items by user ID or phone number
export const searchItems = async (searchTerm) => {
  try {
    const response = await fetch(`${API_URL}/items/search?searchTerm=${encodeURIComponent(searchTerm)}`, {
      ...fetchOptions,
      method: 'GET'
    });
    
    if (!response.ok) {
      throw new Error('Failed to search items');
    }
    
    return await response.json();
  } catch (error) {
    console.error('Error searching items:', error);
    throw error;
  }
};

// Legacy function for backward compatibility
export const searchItemsByUserId = async (userId) => {
  return searchItems(userId);
};