import React, { useState } from 'react';
import { searchItems } from '../services/itemService';
import ItemList from './ItemList';

function UserScreen() {
  const [searchTerm, setSearchTerm] = useState('');
  const [searchResults, setSearchResults] = useState([]);
  const [hasSearched, setHasSearched] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [searchType, setSearchType] = useState('');
  // Add state to track if we're in mobile view
  const [isMobileView, setIsMobileView] = useState(window.innerWidth <= 768);

  // Monitor window resize to update mobile view state
  React.useEffect(() => {
    const handleResize = () => {
      setIsMobileView(window.innerWidth <= 768);
    };
    
    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, []);

  const handleSearch = async (e) => {
    e.preventDefault();
    if (!searchTerm.trim()) return;

    setIsLoading(true);
    setHasSearched(true);
    
    try {
      const results = await searchItems(searchTerm);
      setSearchResults(results);
      
      // Determine the type of search based on the results found
      if (results.length > 0) {
        const firstMatch = results[0];
        if (firstMatch.userid.toLowerCase() === searchTerm.toLowerCase()) {
          setSearchType('userid');
        } else if (firstMatch.phone && firstMatch.phone.includes(searchTerm)) {
          setSearchType('phone');
        } else {
          setSearchType('both');
        }
      }
      
      // Scroll to results on mobile after search completes
      if (isMobileView) {
        setTimeout(() => {
          document.querySelector('.results-container')?.scrollIntoView({ 
            behavior: 'smooth',
            block: 'start'
          });
        }, 300);
      }
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

  // Get appropriate search result text based on search type
  const getSearchResultText = () => {
    if (searchType === 'userid') {
      return (
        <>
          <span className="search-icon-result">👤</span> Sản phẩm của người dùng:
        </>
      );
    } else if (searchType === 'phone') {
      return (
        <>
          <span className="search-icon-result">📞</span> Sản phẩm với số điện thoại:
        </>
      );
    }
    return (
      <>
        <span className="search-icon-result">🔍</span> Kết quả tìm kiếm cho:
      </>
    );
  };

  return (
    <div className="user-screen mobile-friendly">
      <div className="search-container">
        <h2>Tìm Kiếm Sản Phẩm Của Bạn</h2>
        <p className="search-instruction">Nhập mã người dùng hoặc số điện thoại để tìm kiếm</p>
        <form onSubmit={handleSearch} className="mobile-search-form">
          <div className="search-bar">
            <input
              type="text"
              placeholder={isMobileView ? "Nhập mã hoặc số điện thoại..." : "Nhập mã người dùng hoặc số điện thoại..."}
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              autoComplete="off"
            />
            <button type="submit">
              <span className="search-icon">&#128269;</span>
              {!isMobileView && " Tìm Kiếm"}
            </button>
          </div>
        </form>
        <div className="search-examples">
          <p>Ví dụ: <code>user123</code> hoặc <code>0912345678</code></p>
        </div>
      </div>

      <div className="results-container">
        {isLoading ? (
          <div className="loading">Đang tìm kiếm...</div>
        ) : hasSearched ? (
          searchResults.length > 0 ? (
            <div className="item-results">
              <div className="results-header">
                <h3>{getSearchResultText()}<span className="highlight-text">{searchTerm}</span></h3>
                <div className="results-count">{searchResults.length} sản phẩm được tìm thấy</div>
              </div>
              <ItemList 
                items={searchResults} 
                onEdit={handleEditItem} 
                onDelete={handleDeleteItem}
                viewMode="user"
              />
            </div>
          ) : (
            <div className="no-results">
              <div className="empty-state">
                <div className="empty-icon">🔍</div>
                <div>Không tìm thấy sản phẩm nào cho "{searchTerm}".</div>
                <small>Thử tìm kiếm bằng mã người dùng hoặc số điện thoại khác.</small>
              </div>
            </div>
          )
        ) : null}
      </div>
    </div>
  );
}

export default UserScreen;