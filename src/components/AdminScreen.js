import React, { useState, useEffect } from 'react';
import ItemModal from './ItemModal';
import ItemList from './ItemList';
import { getAllItems, addItem, updateItem, deleteItem, searchItems } from '../services/itemService';

function AdminScreen() {
  const [items, setItems] = useState([]);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [currentItem, setCurrentItem] = useState(null);
  const [isLoading, setIsLoading] = useState(true);
  const [searchTerm, setSearchTerm] = useState('');
  const [searchResults, setSearchResults] = useState([]);
  const [isSearching, setIsSearching] = useState(false);
  const [hasSearched, setHasSearched] = useState(false);
  const [isMobileView, setIsMobileView] = useState(window.innerWidth <= 768);

  useEffect(() => {
    loadItems();
    
    const handleResize = () => {
      setIsMobileView(window.innerWidth <= 768);
    };
    
    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, []);

  const loadItems = async () => {
    setIsLoading(true);
    try {
      const data = await getAllItems();
      setItems(data);
      setSearchResults([]);
      setHasSearched(false);
    } catch (error) {
      console.error('Lỗi khi tải danh sách sản phẩm:', error);
    } finally {
      setIsLoading(false);
    }
  };

  const handleSearch = async (e) => {
    e.preventDefault();
    if (!searchTerm.trim()) {
      loadItems();
      return;
    }

    setIsSearching(true);
    setHasSearched(true);
    
    try {
      const results = await searchItems(searchTerm);
      setSearchResults(results);
      
      if (isMobileView) {
        setTimeout(() => {
          document.querySelector('.item-list')?.scrollIntoView({ 
            behavior: 'smooth',
            block: 'start'
          });
        }, 300);
      }
    } catch (error) {
      console.error('Lỗi khi tìm kiếm sản phẩm:', error);
      setSearchResults([]);
    } finally {
      setIsSearching(false);
    }
  };

  const handleResetSearch = () => {
    setSearchTerm('');
    setHasSearched(false);
    setSearchResults([]);
    loadItems();
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
        await updateItem(item);
      } else {
        await addItem(item);
      }
      setIsModalOpen(false);
      loadItems();
    } catch (error) {
      console.error('Lỗi khi lưu sản phẩm:', error);
    }
  };

  const handleDeleteItem = async (id) => {
    if (window.confirm('Bạn có chắc chắn muốn xóa sản phẩm này?')) {
      try {
        await deleteItem(id);
        if (hasSearched && searchTerm) {
          handleSearch(new Event('submit'));
        } else {
          loadItems();
        }
      } catch (error) {
        console.error('Lỗi khi xóa sản phẩm:', error);
      }
    }
  };

  const handleCloseModal = () => {
    setIsModalOpen(false);
  };

  const displayItems = hasSearched ? searchResults : items;

  return (
    <div className="admin-screen mobile-friendly">
      <div className="admin-header">
        <h2>Bảng Điều Khiển Quản Trị</h2>
        <div className="admin-actions">
          <button className="add-button" onClick={handleAddItem}>
            Thêm Sản Phẩm Mới
          </button>
        </div>
      </div>

      <div className="">
        <form onSubmit={handleSearch} className="search-bar">
          <input
            type="text"
            placeholder={isMobileView ? "Tìm mã hoặc SĐT..." : "Tìm kiếm theo mã người dùng hoặc số điện thoại..."}
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
          />
          <button type="submit">
            <span className="search-icon">&#128269;</span>
            {!isMobileView && " Tìm Kiếm"}
          </button>
          {hasSearched && (
            <button type="button" className="reset-button" onClick={handleResetSearch}>
              ↺ {!isMobileView && "Đặt Lại"}
            </button>
          )}
        </form>
      </div>

      {hasSearched && searchResults.length > 0 && (
        <div className="results-header">
          <h3>
            <span className="search-icon-result">🔍</span> 
            Kết quả tìm kiếm cho: <span className="highlight-text">{searchTerm}</span>
          </h3>
          <div className="results-count">{searchResults.length} sản phẩm được tìm thấy</div>
        </div>
      )}

      {isLoading || isSearching ? (
        <div className="loading">Đang {isSearching ? 'tìm kiếm' : 'tải'} sản phẩm...</div>
      ) : displayItems.length > 0 ? (
        <ItemList 
          items={displayItems} 
          onEdit={handleEditItem} 
          onDelete={handleDeleteItem} 
        />
      ) : hasSearched ? (
        <div className="no-results">
          <div className="empty-state">
            <div className="empty-icon">🔍</div>
            <div>Không tìm thấy sản phẩm nào cho "{searchTerm}".</div>
            <small>Thử tìm kiếm bằng mã người dùng hoặc số điện thoại khác.</small>
          </div>
        </div>
      ) : (
        <div className="no-results">
          <div className="empty-state">
            <div className="empty-icon">📦</div>
            <div>Không có sản phẩm nào trong hệ thống.</div>
            <small>Hãy thêm sản phẩm đầu tiên bằng cách nhấn "Thêm Sản Phẩm Mới".</small>
          </div>
        </div>
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