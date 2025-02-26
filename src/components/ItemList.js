import React from 'react';

function ItemList({ items }) {
  // Lọc các sản phẩm đã bán và đã thanh toán
  const soldAndPaidItems = items.filter(item => item.sold && item.paid);

  // Hàm để định dạng giá tiền theo kiểu Việt Nam (VND)
  const formatCurrency = (price) => {
    return new Intl.NumberFormat('vi-VN', { 
      style: 'currency', 
      currency: 'VND' 
    }).format(price * 23000); // Giả định tỷ giá USD sang VND
  };

  return (
    <div className="sold-paid-list">
      <h3 className="list-title">Danh Sách Sản Phẩm Đã Bán & Đã Thanh Toán</h3>
      
      {soldAndPaidItems.length === 0 ? (
        <div className="empty-list">Không có sản phẩm nào đã bán và thanh toán.</div>
      ) : (
        <table>
          <thead>
            <tr>
              <th>Mã Số</th>
              <th>Mã Người Dùng</th>
              <th>Tên Sản Phẩm</th>
              <th>Loại</th>
              <th>Giá</th>
              <th>Ngày Bán</th>
            </tr>
          </thead>
          <tbody>
            {soldAndPaidItems.map(item => (
              <tr key={`sold-paid-${item.id}`}>
                <td>{item.number}</td>
                <td>{item.userid}</td>
                <td>{item.name}</td>
                <td>{item.type}</td>
                <td>{formatCurrency(item.price)}</td>
                <td>{item.soldDate || 'N/A'}</td>
              </tr>
            ))}
          </tbody>
        </table>
      )}
    </div>
  );
}
export default ItemList;