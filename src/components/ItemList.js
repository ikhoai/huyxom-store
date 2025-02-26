import React from 'react';

function ItemList({ items, onEdit, onDelete }) {
  // Hàm để định dạng giá tiền theo kiểu Việt Nam (VND)
  const formatCurrency = (price) => {
    return new Intl.NumberFormat('vi-VN', { 
      style: 'currency', 
      currency: 'VND' 
    }).format(price * 23000); // Giả định tỷ giá USD sang VND
  };

  return (
    <div className="item-list">
      <table>
        <thead>
          <tr>
            <th>Mã Số</th>
            <th>Mã Người Dùng</th>
            <th>Tên Sản Phẩm</th>
            <th>Loại</th>
            <th>Giá</th>
            <th>Trạng Thái</th>
            <th>Thanh Toán</th>
            <th>Thao Tác</th>
          </tr>
        </thead>
        <tbody>
          {items.length > 0 ? (
            items.map(item => (
              <tr key={item.id}>
                <td>{item.number}</td>
                <td>{item.userid}</td>
                <td>{item.name}</td>
                <td>{item.type}</td>
                <td>{formatCurrency(item.price)}</td>
                <td>
                  <span className={`status ${item.sold ? 'sold' : 'available'}`}>
                    {item.sold ? 'Đã Bán' : 'Còn Hàng'}
                  </span>
                </td>
                <td>
                  <span className={`status ${item.paid ? 'paid' : 'unpaid'}`}>
                    {item.paid ? 'Đã Thanh Toán' : 'Chưa Thanh Toán'}
                  </span>
                </td>
                <td>
                  <div className="action-buttons">
                    <button 
                      className="edit-button" 
                      onClick={() => onEdit(item)}
                    >
                      Sửa
                    </button>
                    <button 
                      className="delete-button" 
                      onClick={() => onDelete(item.id)}
                    >
                      Xóa
                    </button>
                  </div>
                </td>
              </tr>
            ))
          ) : (
            <tr>
              <td colSpan="8" className="no-items">
                Không có sản phẩm nào.
              </td>
            </tr>
          )}
        </tbody>
      </table>
    </div>
  );
}

export default ItemList;