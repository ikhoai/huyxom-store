import React, { useState, useEffect } from 'react';

function ItemModal({ item, onSave, onClose }) {
  const [formData, setFormData] = useState({
    number: '',
    userid: '',
    name: '',
    type: '',
    notes: '',
    picture: '',
    phone: '',
    price: 0,
    sold: false,
    paid: false
  });

  // Hàm chuyển đổi giá tiền từ USD sang VND và ngược lại
  const usdToVnd = (usd) => usd * 23000;
  const vndToUsd = (vnd) => vnd / 23000;

  useEffect(() => {
    if (item) {
      // Hiển thị giá tiền theo VND trong modal
      setFormData({
        ...item,
        priceVND: usdToVnd(item.price)
      });
    }
  }, [item]);

  const handleChange = (e) => {
    const { name, value, type, checked } = e.target;
    
    if (name === 'priceVND') {
      // Khi thay đổi giá tiền VND, cập nhật lại giá USD
      setFormData({
        ...formData,
        priceVND: value,
        price: vndToUsd(value)
      });
    } else {
      setFormData({
        ...formData,
        [name]: type === 'checkbox' ? checked : value
      });
    }
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    // Đảm bảo gửi dữ liệu với giá USD
    const submittingData = {
      ...formData,
      price: parseFloat(formData.price) || 0
    };
    delete submittingData.priceVND; // Loại bỏ trường tạm thời
    onSave(submittingData);
  };

  // Định dạng giá tiền VND
  const formatVND = (price) => {
    return new Intl.NumberFormat('vi-VN').format(price);
  };

  return (
    <div className="modal-backdrop">
      <div className="modal">
        <div className="modal-header">
          <h2>{item ? 'Sửa Sản Phẩm' : 'Thêm Sản Phẩm Mới'}</h2>
          <button className="close-button" onClick={onClose}>×</button>
        </div>
        <form onSubmit={handleSubmit}>
          <div className="form-group">
            <label htmlFor="number">Mã Sản Phẩm</label>
            <input
              type="text"
              id="number"
              name="number"
              value={formData.number}
              onChange={handleChange}
              required
            />
          </div>
          
          <div className="form-group">
            <label htmlFor="userid">Mã Người Dùng</label>
            <input
              type="text"
              id="userid"
              name="userid"
              value={formData.userid}
              onChange={handleChange}
              required
            />
          </div>
          
          <div className="form-group">
            <label htmlFor="name">Tên Sản Phẩm</label>
            <input
              type="text"
              id="name"
              name="name"
              value={formData.name}
              onChange={handleChange}
              required
            />
          </div>
          
          <div className="form-group">
            <label htmlFor="type">Loại</label>
            <input
              type="text"
              id="type"
              name="type"
              value={formData.type}
              onChange={handleChange}
            />
          </div>
          
          <div className="form-group">
            <label htmlFor="notes">Ghi Chú</label>
            <textarea
              id="notes"
              name="notes"
              value={formData.notes}
              onChange={handleChange}
              rows="3"
            ></textarea>
          </div>
          
          <div className="form-group">
            <label htmlFor="picture">Đường Dẫn Hình Ảnh</label>
            <input
              type="text"
              id="picture"
              name="picture"
              value={formData.picture}
              onChange={handleChange}
            />
          </div>
          
          <div className="form-group">
            <label htmlFor="phone">Số Điện Thoại</label>
            <input
              type="tel"
              id="phone"
              name="phone"
              value={formData.phone || ''}
              onChange={handleChange}
              placeholder="Nhập số điện thoại liên hệ"
            />
          </div>
          
          <div className="form-group">
            <label htmlFor="priceVND">Giá (VNĐ)</label>
            <input
              type="number"
              id="priceVND"
              name="priceVND"
              value={formData.priceVND || ''}
              onChange={handleChange}
              min="0"
              step="1000"
              required
            />
            <small className="form-text">
              Tương đương: {formatVND(formData.priceVND || 0)} VNĐ
            </small>
          </div>
          
          <div className="form-row">
            <div className="form-group checkbox">
              <input
                type="checkbox"
                id="sold"
                name="sold"
                checked={formData.sold}
                onChange={handleChange}
              />
              <label htmlFor="sold">Đã Bán</label>
            </div>
            
            <div className="form-group checkbox">
              <input
                type="checkbox"
                id="paid"
                name="paid"
                checked={formData.paid}
                onChange={handleChange}
              />
              <label htmlFor="paid">Đã Thanh Toán</label>
            </div>
          </div>
          
          <div className="form-actions">
            <button type="button" className="cancel-button" onClick={onClose}>
              Hủy
            </button>
            <button type="submit" className="save-button">
              Lưu Sản Phẩm
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}

export default ItemModal;