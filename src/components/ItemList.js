import React, { useState, useEffect } from 'react';

function ItemList({ items, onEdit, onDelete, viewMode = 'admin' }) {
  // State to track mobile view
  const [isMobileView, setIsMobileView] = useState(window.innerWidth <= 768);

  // Monitor window resize to update mobile view state
  useEffect(() => {
    const handleResize = () => {
      setIsMobileView(window.innerWidth <= 768);
    };
    
    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, []);

  // Hàm để định dạng giá tiền theo kiểu Việt Nam (VND)
  const formatCurrency = (price) => {
    return new Intl.NumberFormat('vi-VN', { 
      style: 'currency', 
      currency: 'VND' 
    }).format(price * 23000); // Giả định tỷ giá USD sang VND
  };

  // Separate items into two categories
  const activeItems = items.filter(item => !(item.sold && item.paid));
  const completedItems = items.filter(item => item.sold && item.paid);

  // Render a mobile card for user view (simplified)
  const renderUserMobileCard = (item) => (
    <div 
      key={item.id} 
      className={`mobile-item-card user-view ${item.sold && item.paid ? 'completed' : ''}`}
    >
      <div className="mobile-item-name">{item.name}</div>
      <div className="mobile-item-userid">Mã người dùng: {item.userid}</div>
      
      <div className="mobile-item-price user-view">{formatCurrency(item.price)}</div>
      
      <div className="mobile-item-status user-view">
        <span className={`status ${item.sold ? 'sold' : 'available'}`}>
          {item.sold ? (
            <>
              <span className="status-icon">●</span> Đã Bán
            </>
          ) : (
            <>
              <span className="status-icon">●</span> Còn Hàng
            </>
          )}
        </span>
        
        <span className={`status ${item.paid ? 'paid' : 'unpaid'}`}>
          {item.paid ? (
            <>
              <span className="status-icon">●</span> Đã Thanh Toán
            </>
          ) : (
            <>
              <span className="status-icon">●</span> Chưa Thanh Toán
            </>
          )}
        </span>
      </div>
    </div>
  );

  // Render a mobile card for admin view (full details)
  const renderMobileItemCard = (item) => (
    <div 
      key={item.id} 
      className={`mobile-item-card ${item.sold && item.paid ? 'completed' : ''}`}
    >
      <div className="mobile-item-header">
        <span className="id-badge">{item.number}</span>
        <div className="mobile-item-actions">
          <button 
            className="edit-button mobile-button" 
            onClick={() => onEdit(item)}
            title="Sửa sản phẩm"
          >
            <span className="button-icon">✎</span>
          </button>
          <button 
            className="delete-button mobile-button" 
            onClick={() => onDelete(item.id)}
            title="Xóa sản phẩm"
          >
            <span className="button-icon">×</span>
          </button>
        </div>
      </div>
      
      <div className="mobile-item-name">{item.name}</div>
      <div className="mobile-item-userid">Mã người dùng: {item.userid}</div>
      
      <div className="mobile-item-details">
        <div className="mobile-item-type">
          <span className="type-badge">{item.type || 'Không có loại'}</span>
        </div>
        <div className="mobile-item-price">{formatCurrency(item.price)}</div>
      </div>
      
      {item.phone && (
        <div className="mobile-item-phone">
          <span className="phone-label">SĐT:</span> {item.phone}
        </div>
      )}
      
      <div className="mobile-item-status">
        <span className={`status ${item.sold ? 'sold' : 'available'}`}>
          {item.sold ? (
            <>
              <span className="status-icon">●</span> Đã Bán
            </>
          ) : (
            <>
              <span className="status-icon">●</span> Còn Hàng
            </>
          )}
        </span>
        
        <span className={`status ${item.paid ? 'paid' : 'unpaid'}`}>
          {item.paid ? (
            <>
              <span className="status-icon">●</span> Đã Thanh Toán
            </>
          ) : (
            <>
              <span className="status-icon">●</span> Chưa Thanh Toán
            </>
          )}
        </span>
      </div>
    </div>
  );

  // Render a table of items
  const renderItemTable = (itemsToRender, tableTitle, isCompleted = false) => (
    <div className={`item-table-container ${isCompleted ? 'completed-table' : ''}`}>
      {tableTitle && (
        <div className="table-header">
          <h3 className="table-title">
            {isCompleted ? (
              <span className="table-icon completed-icon">✓</span>
            ) : (
              <span className="table-icon active-icon">⚡</span>
            )}
            {tableTitle}
          </h3>
          {isCompleted ? (
            <div className="table-count">{itemsToRender.length} sản phẩm</div>
          ) : (
            <div className="table-count">{itemsToRender.length} sản phẩm đang hoạt động</div>
          )}
        </div>
      )}
      <div className="table-responsive">
        <table>
          <thead>
            <tr>
              {/* {viewMode === 'admin' && <th>Mã Số</th>} */}
              <th>Mã Người Dùng</th>
              <th>Tên Sản Phẩm</th>
              {viewMode === 'admin' && <th>Loại</th>}
              {viewMode === 'admin' && <th>Số Điện Thoại</th>}
              <th>Giá</th>
              <th>Trạng Thái</th>
              <th>Thanh Toán</th>
              {viewMode === 'admin' && <th>Thao Tác</th>}
            </tr>
          </thead>
          <tbody>
            {itemsToRender.length > 0 ? (
              itemsToRender.map(item => (
                <tr 
                  key={item.id} 
                  className={item.sold && item.paid ? 'greyed-out-item' : ''}
                >
                  {/* {viewMode === 'admin' && <td><span className="id-badge">{item.number}</span></td>} */}
                  <td>{item.userid}</td>
                  <td>
                    <div className="item-name">{item.name}</div>
                  </td>
                  {viewMode === 'admin' && <td><span className="type-badge">{item.type}</span></td>}
                  {viewMode === 'admin' && <td className="phone-cell">{item.phone || '-'}</td>}
                  <td className="price-cell">{formatCurrency(item.price)}</td>
                  <td>
                    <span className={`status ${item.sold ? 'sold' : 'available'}`}>
                      {item.sold ? (
                        <>
                          <span className="status-icon">●</span> Đã Bán
                        </>
                      ) : (
                        <>
                          <span className="status-icon">●</span> Còn Hàng
                        </>
                      )}
                    </span>
                  </td>
                  <td>
                    <span className={`status ${item.paid ? 'paid' : 'unpaid'}`}>
                      {item.paid ? (
                        <>
                          <span className="status-icon">●</span> Đã Thanh Toán
                        </>
                      ) : (
                        <>
                          <span className="status-icon">●</span> Chưa Thanh Toán
                        </>
                      )}
                    </span>
                  </td>
                  {viewMode === 'admin' && (
                    <td>
                      <div className="action-buttons">
                        <button 
                          className="edit-button" 
                          onClick={() => onEdit(item)}
                          title="Sửa sản phẩm"
                        >
                          <span className="button-icon">✎</span> Sửa
                        </button>
                        <button 
                          className="delete-button" 
                          onClick={() => onDelete(item.id)}
                          title="Xóa sản phẩm"
                        >
                          <span className="button-icon">×</span> Xóa
                        </button>
                      </div>
                    </td>
                  )}
                </tr>
              ))
            ) : (
              <tr>
                <td colSpan={viewMode === 'admin' ? 9 : 5} className="no-items">
                  <div className="empty-state">
                    <div className="empty-icon">📦</div>
                    <div>Không có sản phẩm nào.</div>
                  </div>
                </td>
              </tr>
            )}
          </tbody>
        </table>
      </div>
    </div>
  );

  // Render mobile cards section
  const renderMobileCards = (itemsToRender, sectionTitle, isCompleted = false) => (
    <div className={`mobile-items-section ${isCompleted ? 'completed-section' : ''}`}>
      {sectionTitle && (
        <div className="mobile-section-header">
          <h3 className="section-title">
            {isCompleted ? (
              <span className="table-icon completed-icon">✓</span>
            ) : (
              <span className="table-icon active-icon">⚡</span>
            )}
            {sectionTitle}
          </h3>
          <div className="section-count">
            {isCompleted 
              ? `${itemsToRender.length} sản phẩm` 
              : `${itemsToRender.length} sản phẩm đang hoạt động`
            }
          </div>
        </div>
      )}
      
      {itemsToRender.length > 0 ? (
        <div className="mobile-items-grid">
          {viewMode === 'user' 
            ? itemsToRender.map(item => renderUserMobileCard(item))
            : itemsToRender.map(item => renderMobileItemCard(item))
          }
        </div>
      ) : (
        <div className="empty-state mobile-empty-state">
          <div className="empty-icon">📦</div>
          <div>Không có sản phẩm nào.</div>
        </div>
      )}
    </div>
  );

  return (
    <div className="item-list">
      {isMobileView ? (
        // Mobile view with cards
        <>
          {renderMobileCards(activeItems, "Sản Phẩm Đang Hoạt Động")}
          
          {completedItems.length > 0 && (
            <div className="completed-items-section">
              {renderMobileCards(completedItems, "Sản Phẩm Đã Bán & Đã Thanh Toán", true)}
            </div>
          )}
        </>
      ) : (
        // Desktop view with tables
        <>
          {renderItemTable(activeItems, "Sản Phẩm Đang Hoạt Động")}
          
          {completedItems.length > 0 && (
            <div className="completed-items-section">
              {renderItemTable(completedItems, "Sản Phẩm Đã Bán & Đã Thanh Toán", true)}
            </div>
          )}
        </>
      )}
    </div>
  );
}

export default ItemList;