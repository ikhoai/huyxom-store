const LOCAL_STORAGE_KEY = 'store_items';

// Helper to get initial data or saved data from localStorage
const getInitialItems = () => {
  const savedItems = localStorage.getItem(LOCAL_STORAGE_KEY);
  if (savedItems) {
    return JSON.parse(savedItems);
  }
  
  // Sample data for initial testing with Vietnamese items
  const sampleItems = [
    {
      id: '1',
      number: 'A001',
      userid: 'user123',
      name: 'Áo Khoác Da Vintage',
      type: 'Quần Áo',
      notes: 'Tình trạng tốt, hơi sờn ở cổ tay',
      picture: 'https://example.com/jacket.jpg',
      price: 89.99, // Lưu trữ giá gốc USD, hiển thị theo VND
      sold: false,
      paid: false
    },
    {
      id: '2',
      number: 'A002',
      userid: 'user123',
      name: 'Đèn Bàn Cổ Điển',
      type: 'Trang Trí Nhà',
      notes: 'Hoạt động tốt, dây điện nguyên bản',
      picture: 'https://example.com/lamp.jpg',
      price: 45.50,
      sold: true,
      paid: true
    },
    {
      id: '3',
      number: 'B001',
      userid: 'user456',
      name: 'Đĩa Than Cổ Điển',
      type: 'Âm Nhạc',
      notes: 'Bản gốc, vỏ đĩa hơi cũ',
      picture: 'https://example.com/vinyl.jpg',
      price: 25.00,
      sold: true,
      paid: false
    }
  ];
  
  localStorage.setItem(LOCAL_STORAGE_KEY, JSON.stringify(sampleItems));
  return sampleItems;
};

// Get all items
export const getAllItems = async () => {
  // Simulate network delay
  await new Promise(resolve => setTimeout(resolve, 500));
  
  return getInitialItems();
};

// Add a new item
export const addItem = async (item) => {
  const items = getInitialItems();
  
  // Create a new item with a unique ID
  const newItem = {
    ...item,
    id: Date.now().toString()
  };
  
  const updatedItems = [...items, newItem];
  localStorage.setItem(LOCAL_STORAGE_KEY, JSON.stringify(updatedItems));
  
  return newItem;
};

// Update an existing item
export const updateItem = async (updatedItem) => {
  const items = getInitialItems();
  
  const updatedItems = items.map(item => 
    item.id === updatedItem.id ? updatedItem : item
  );
  
  localStorage.setItem(LOCAL_STORAGE_KEY, JSON.stringify(updatedItems));
  
  return updatedItem;
};

// Delete an item
export const deleteItem = async (id) => {
  const items = getInitialItems();
  
  const updatedItems = items.filter(item => item.id !== id);
  localStorage.setItem(LOCAL_STORAGE_KEY, JSON.stringify(updatedItems));
  
  return id;
};

// Search items by user ID
export const searchItemsByUserId = async (userId) => {
  // Simulate network delay
  await new Promise(resolve => setTimeout(resolve, 800));
  
  const items = getInitialItems();
  return items.filter(item => 
    item.userid.toLowerCase() === userId.toLowerCase()
  );
};