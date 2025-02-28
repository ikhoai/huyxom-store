import React, { useState } from 'react';
import { searchItemsByUserId } from '../services/itemService';
import ItemList from './ItemList';

function UserScreen() {
  const [userId, setUserId] = useState('');
  const [searchResults, setSearchResults] = useState([]);
  const [hasSearched, setHasSearched] = useState(false);
  const [isLoading, setIsLoading] = useState(false);

  const handleSearch = async (e) => {
    e.preventDefault();
    if (!userId.trim()) return;

    setIsLoading(true);
    setHasSearched(true);
    
    try {
      const results = await searchItemsByUserId(userId);
      setSearchResults(results);
    } catch (error) {
      console.error('Lỗi khi tìm kiếm sản phẩm:', error);
      setSearchResults([]);
    } finally {
      setIsLoading(false);
    }
  };

  // Dummy handlers for edit/delete - we won't implement these functions
  // in the user screen, but ItemList component requires them
  const handleEditItem = () => {};
  const handleDeleteItem = () => {};

  return (
    <div className="user-screen">
      <div className="search-container">
        <h2>Tìm Kiếm Sản Phẩm Của Bạn</h2>
        <form onSubmit={handleSearch}>
          <div className="search-bar">
            <input
              type="text"
              placeholder="Nhập mã người dùng của bạn..."
              value={userId}
              onChange={(e) => setUserId(e.target.value)}
            />
            <button type="submit">
              <span className="search-icon">&#128269;</span> Tìm Kiếm
            </button>
          </div>
        </form>
      </div>

      <div className="results-container">
        {isLoading ? (
          <div className="loading">Đang tìm kiếm...</div>
        ) : hasSearched ? (
          searchResults.length > 0 ? (
            <div className="item-results">
              <div className="results-header">
                <h3>Sản phẩm của người dùng: <span className="highlight-text">{userId}</span></h3>
                <div className="results-count">{searchResults.length} sản phẩm được tìm thấy</div>
              </div>
              <ItemList 
                items={searchResults} 
                onEdit={handleEditItem} 
                onDelete={handleDeleteItem} 
              />
            </div>
          ) : (
            <div className="no-results">
              <div className="empty-state">
                <div className="empty-icon">🔍</div>
                <div>Không tìm thấy sản phẩm nào cho mã người dùng này.</div>
              </div>
            </div>
          )
        ) : null}
      </div>
    </div>
  );
}

export default UserScreen;