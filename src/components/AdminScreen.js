import React, { useState, useEffect } from 'react';
import ItemModal from './ItemModal';
import ItemList from './ItemList';
import SoldAndPaidItemsList from './SoldAndPaidItemsList';
import { getAllItems, addItem, updateItem, deleteItem } from '../services/itemService';

function AdminScreen() {
  const [items, setItems] = useState([]);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [currentItem, setCurrentItem] = useState(null);
  const [isLoading, setIsLoading] = useState(true);
  const [filterActive, setFilterActive] = useState(true); // Set to true by default to show the filter

  useEffect(() => {
    loadItems();
  }, []);

  const loadItems = async () => {
    setIsLoading(true);
    try {
      const data = await getAllItems();
      setItems(data);
    } catch (error) {
      console.error('Lỗi khi tải danh sách sản phẩm:', error);
    } finally {
      setIsLoading(false);
    }
  };

  const handleAddItem = () => {
    setCurrentItem(null);
    setIsModalOpen(true);
  };

  const handleEditItem = (item) => {
    setCurrentItem(item);
    setIsModalOpen(true);
  };

  const handleSaveItem = async (item) => {
    try {
      // Nếu là sản phẩm mới được đánh dấu là đã bán, thêm ngày bán
      if (item.sold && !item.soldDate) {
        item.soldDate = new Date().toLocaleDateString('vi-VN');
      }
      
      if (item.id) {
        // Cập nhật sản phẩm hiện có
        await updateItem(item);
      } else {
        // Thêm sản phẩm mới
        await addItem(item);
      }
      setIsModalOpen(false);
      loadItems(); // Tải lại danh sách sau khi lưu
    } catch (error) {
      console.error('Lỗi khi lưu sản phẩm:', error);
    }
  };

  const handleDeleteItem = async (id) => {
    if (window.confirm('Bạn có chắc chắn muốn xóa sản phẩm này?')) {
      try {
        await deleteItem(id);
        loadItems();
      } catch (error) {
        console.error('Lỗi khi xóa sản phẩm:', error);
      }
    }
  };

  const handleCloseModal = () => {
    setIsModalOpen(false);
  };

  const toggleFilter = () => {
    setFilterActive(!filterActive);
  };

  // Lọc các mục cho danh sách đầu tiên (loại bỏ các mục đã bán và đã thanh toán)
  const mainListItems = items.filter(item => !(item.sold && item.paid));
  
  // Lọc mục cho danh sách thứ hai (chỉ các mục đã bán và đã thanh toán)
  const soldAndPaidItems = items.filter(item => item.sold && item.paid);

  return (
    <div className="admin-screen">
      <div className="admin-header">
        <h2>Bảng Điều Khiển Quản Trị</h2>
        <div className="admin-actions">
          <button 
            className={`filter-button ${filterActive ? 'active' : ''}`} 
            onClick={toggleFilter}
          >
            {filterActive ? 'Ẩn Bộ Lọc' : 'Hiện Bộ Lọc'}
          </button>
          <button className="add-button" onClick={handleAddItem}>
            + Thêm Sản Phẩm Mới
          </button>
        </div>
      </div>

      {isLoading ? (
        <div className="loading">Đang tải danh sách sản phẩm...</div>
      ) : (
        <>
          <div className="section-title">Sản Phẩm Hiện Tại</div>
          <ItemList 
            items={mainListItems} 
            onEdit={handleEditItem} 
            onDelete={handleDeleteItem} 
          />
          
          {filterActive && soldAndPaidItems.length > 0 && (
            <div className="filtered-section">
              <SoldAndPaidItemsList items={soldAndPaidItems} />
            </div>
          )}
        </>
      )}

      {isModalOpen && (
        <ItemModal
          item={currentItem}
          onSave={handleSaveItem}
          onClose={handleCloseModal}
        />
      )}
    </div>
  );
}

export default AdminScreen;