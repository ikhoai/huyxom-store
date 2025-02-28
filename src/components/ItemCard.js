import React from 'react';

function ItemCard({ item }) {
  // Hàm để định dạng giá tiền theo kiểu Việt Nam (VND)
  const formatCurrency = (price) => {
    return new Intl.NumberFormat('vi-VN', { 
      style: 'currency', 
      currency: 'VND' 
    }).format(price * 23000); // Giả định tỷ giá USD sang VND
  };

  return (
    <div className="item-card">
      <div className="item-card-header">
        <span className="item-number">#{item.number}</span>
        <span className={`item-status ${item.sold ? 'sold' : 'available'}`}>
          {item.sold ? 'Đã Bán' : 'Còn Hàng'}
        </span>
      </div>
      
      <div className="item-image">
        {item.picture ? (
          <img src={item.picture} alt={item.name} />
        ) : (
          <div className="no-image">Không Có Hình</div>
        )}
      </div>
      
      <div className="item-details">
        <h3>{item.name}</h3>
        <p className="item-type">{item.type}</p>
        <p className="item-price">{formatCurrency(item.price)}</p>
        
        {item.phone && (
          <p className="item-phone">
            <span className="phone-icon">📞</span> {item.phone}
          </p>
        )}
        
        {item.notes && (
          <div className="item-notes">
            <h4>Ghi Chú</h4>
            <p>{item.notes}</p>
          </div>
        )}
        
        <div className="item-status-row">
          <span className={`payment-status ${item.paid ? 'paid' : 'unpaid'}`}>
            {item.paid ? 'Đã Thanh Toán' : 'Đang Chờ Thanh Toán'}
          </span>
        </div>
      </div>
    </div>
  );
}

export default ItemCard;