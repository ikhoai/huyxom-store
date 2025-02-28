import React from 'react';

function ItemList({ items, onEdit, onDelete }) {
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
              <th>Mã Số</th>
              <th>Mã Người Dùng</th>
              <th>Tên Sản Phẩm</th>
              <th>Loại</th>
              <th>Số Điện Thoại</th>
              <th>Giá</th>
              <th>Trạng Thái</th>
              <th>Thanh Toán</th>
              <th>Thao Tác</th>
            </tr>
          </thead>
          <tbody>
            {itemsToRender.length > 0 ? (
              itemsToRender.map(item => (
                <tr 
                  key={item.id} 
                  className={item.sold && item.paid ? 'greyed-out-item' : ''}
                >
                  <td><span className="id-badge">{item.number}</span></td>
                  <td>{item.userid}</td>
                  <td>
                    <div className="item-name">{item.name}</div>
                  </td>
                  <td><span className="type-badge">{item.type}</span></td>
                  <td className="phone-cell">{item.phone || '-'}</td>
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
                </tr>
              ))
            ) : (
              <tr>
                <td colSpan="9" className="no-items">
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

  return (
    <div className="item-list">
      {renderItemTable(activeItems, "Sản Phẩm Đang Hoạt Động")}
      
      {completedItems.length > 0 && (
        <div className="completed-items-section">
          {renderItemTable(completedItems, "Sản Phẩm Đã Bán & Đã Thanh Toán", true)}
        </div>
      )}
    </div>
  );
}

export default ItemList;