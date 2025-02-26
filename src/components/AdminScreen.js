import React, { useState, useEffect } from 'react';
import ItemModal from './ItemModal';
import ItemList from './ItemList';
import { getAllItems, addItem, updateItem, deleteItem } from '../services/itemService';

function AdminScreen() {
  const [items, setItems] = useState([]);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [currentItem, setCurrentItem] = useState(null);
  const [isLoading, setIsLoading] = useState(true);

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

  return (
    <div className="admin-screen">
      <div className="admin-header">
        <h2>Bảng Điều Khiển Quản Trị</h2>
        <button className="add-button" onClick={handleAddItem}>
          Thêm Sản Phẩm Mới
        </button>
      </div>

      {isLoading ? (
        <div className="loading">Đang tải danh sách sản phẩm...</div>
      ) : (
        <ItemList 
          items={items} 
          onEdit={handleEditItem} 
          onDelete={handleDeleteItem} 
        />
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