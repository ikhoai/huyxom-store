import React, { useState } from 'react';
import { searchItemsByUserId } from '../services/itemService';
import ItemCard from './ItemCard';

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
            <button type="submit">Tìm Kiếm</button>
          </div>
        </form>
      </div>

      <div className="results-container">
        {isLoading ? (
          <div className="loading">Đang tìm kiếm...</div>
        ) : hasSearched ? (
          searchResults.length > 0 ? (
            <div className="item-results">
              <h3>Sản phẩm của người dùng: {userId}</h3>
              <div className="item-grid">
                {searchResults.map(item => (
                  <ItemCard key={item.id} item={item} />
                ))}
              </div>
            </div>
          ) : (
            <div className="no-results">
              Không tìm thấy sản phẩm nào cho mã người dùng này.
            </div>
          )
        ) : null}
      </div>
    </div>
  );
}

export default UserScreen;