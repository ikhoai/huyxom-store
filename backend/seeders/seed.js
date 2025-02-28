const { sequelize, Item } = require('../models');

// Sample data matching the frontend's initial data
const sampleItems = [
  {
    number: 'A001',
    userid: 'user123',
    name: 'Áo Khoác Da Vintage',
    type: 'Quần Áo',
    notes: 'Tình trạng tốt, hơi sờn ở cổ tay',
    picture: 'https://example.com/jacket.jpg',
    phone: '0912345678',
    price: 89.99,
    sold: false,
    paid: false
  },
  {
    number: 'A002',
    userid: 'user123',
    name: 'Đèn Bàn Cổ Điển',
    type: 'Trang Trí Nhà',
    notes: 'Hoạt động tốt, dây điện nguyên bản',
    picture: 'https://example.com/lamp.jpg',
    phone: '0923456789',
    price: 45.50,
    sold: true,
    paid: true
  },
  {
    number: 'B001',
    userid: 'user456',
    name: 'Đĩa Than Cổ Điển',
    type: 'Âm Nhạc',
    notes: 'Bản gốc, vỏ đĩa hơi cũ',
    picture: 'https://example.com/vinyl.jpg',
    phone: '0934567890',
    price: 25.00,
    sold: true,
    paid: false
  }
];

// Function to seed the database
const seedDatabase = async () => {
  try {
    // Sync database (force: true will drop tables if they exist)
    await sequelize.sync({ force: true });
    console.log('Database synced');

    // Insert sample items
    await Item.bulkCreate(sampleItems);
    console.log('Sample items inserted successfully');

    console.log('Database seeded successfully');
    process.exit(0);
  } catch (error) {
    console.error('Error seeding database:', error);
    process.exit(1);
  }
};

// Run the seeder
seedDatabase(); 