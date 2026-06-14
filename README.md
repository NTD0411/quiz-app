# 📝 Ôn Thi Trắc Nghiệm - Quiz Application

Ứng dụng ôn tập trắc nghiệm trực tuyến, thiết kế tối ưu cho thiết bị di động.

## 🌟 Tính năng

✅ **20 bài kiểm tra** - TEST 01 đến TEST 20
✅ **30 câu hỏi mỗi bài** - Trắc nghiệm 4 đáp án
✅ **Chấm điểm tự động** - Kết quả tức thời
✅ **Giao diện đẹp mắt** - Gradient, smooth animation
✅ **Responsive design** - Hoạt động trên mobile, tablet, desktop
✅ **Điều hướng nhanh** - Click câu để chuyển nhanh
✅ **Thanh tiến trình** - Theo dõi tiến độ làm bài

## 🚀 Cách chạy

### Option 1: Chạy trên máy local (Python)
```bash
cd c:\FPT\ÔnThi
python -m http.server 8000
```
Sau đó mở trình duyệt: `http://localhost:8000`

### Option 2: Chạy với Node.js
```bash
npm install -g live-server
cd c:\FPT\ÔnThi
live-server
```

### Option 3: Mở trực tiếp file
Nhấp đúp vào `index.html` để mở trong trình duyệt

## 📁 Cấu trúc dự án

```
ÔnThi/
├── index.html          # File chính - Ứng dụng web
├── package.json        # Metadata dự án
├── README.md           # File này
├── data.json           # Dữ liệu câu hỏi (tuỳ chọn)
└── .gitignore          # Ignore files cho GitHub
```

## 📊 Dữ liệu đáp án

Các đáp án đúng cho 20 bài kiểm tra:

| TEST | Đáp án (1-30) |
|------|--------------|
| 01 | 1A, 2B, 3B, 4B, 5C, 6D, 7A, 8A, 9A, 10A, 11A, 12B, 13B, 14A, 15A, 16A, 17A, 18C, 19A, 20C, 21A, 22B, 23A, 24A, 25C, 26C, 27D, 28A, 29A, 30A |
| 02 | 1D, 2A, 3A, 4C, 5B, 6A, 7A, 8A, 9A, 10A, 11B, 12A, 13B, 14A, 15C, 16C, 17A, 18B, 19A, 20A, 21A, 22B, 23D, 24A, 25B, 26A, 27D, 28B, 29C, 30A |
| 03 | 1C, 2B, 3B, 4C, 5A, 6C, 7A, 8A, 9A, 10A, 11A, 12A, 13C, 14A, 15C, 16A, 17B, 18A, 19C, 20C, 21A, 22C, 23B, 24D, 25A, 26C, 27D, 28A, 29B, 30C |
| ... | ... |

## 🎯 Hướng dẫn sử dụng

1. **Chọn đề thi**: Click vào button bài tập (TEST 01 - TEST 20)
2. **Trả lời câu hỏi**: Chọn A, B, C, hoặc D
3. **Điều hướng**: 
   - Dùng nút "Câu trước" / "Câu sau" 
   - Click số câu hỏi để chuyển nhanh
4. **Nộp bài**: Click nút "Nộp bài" để xem kết quả
5. **Xem điểm**: Hệ thống sẽ tính điểm tự động

## 📈 Thang điểm

- **80-100%**: 🎉 Xuất sắc
- **60-79%**: 👍 Tốt
- **40-59%**: 📚 Cần cải thiện
- **0-39%**: 💪 Cố gắng thêm

## 🔧 Thêm câu hỏi

Để thêm câu hỏi cụ thể, chỉnh sửa hàm `generateQuestionData()` trong `index.html`:

```javascript
function generateQuestionData(testNum) {
    const questions = {};
    if (testNum === 1) {
        questions[1] = {
            text: "I laughed a lot because the movie was________",
            options: [
                "A. funny",
                "B. excited", 
                "C. frightening",
                "D. boring"
            ]
        };
        // ... thêm các câu khác
    }
    return questions;
}
```

## 🌐 Deploy lên GitHub Pages

1. **Tạo repository** trên GitHub (ví dụ: `quiz-app`)
2. **Clone repository**:
```bash
git clone https://github.com/username/quiz-app.git
cd quiz-app
```

3. **Copy các file** vào thư mục
4. **Commit và push**:
```bash
git add .
git commit -m "Initial commit: Quiz application"
git push origin main
```

5. **Bật GitHub Pages**:
   - Vào Settings → Pages
   - Chọn "main branch" làm source
   - Lưu thay đổi

6. **Truy cập**: `https://username.github.io/quiz-app/`

## 💡 Mẹo sử dụng

- **Trên điện thoại**: Swipe để chuyển câu hoặc dùng nút điều hướng
- **Lưu tiến độ**: Trang sẽ tự lưu trạng thái (dùng localStorage)
- **Xem lại**: Có thể quay lại câu trước để kiểm tra

## 🐛 Troubleshooting

**Q: Trang không tải?**
A: Kiểm tra file `index.html` có trong thư mục không, hoặc thử mở lại trình duyệt

**Q: Điểm không chính xác?**
A: Kiểm tra đáp án trong mảng `testAnswers` có khớp không

**Q: Không chuyển được câu?**
A: Đảm bảo JavaScript được kích hoạt trong trình duyệt

## 📱 Tương thích

- ✅ Chrome, Firefox, Safari, Edge
- ✅ iOS Safari, Chrome Mobile
- ✅ Android Chrome
- ✅ Tablet: iPad, Android Tablet

## 📝 Ghi chú

- Test 16, Câu 21 có dữ liệu trống (lỗi gốc)
- Có thể mở rộng để thêm bài tập, phần kiểm tra
- Dữ liệu được lưu trong JavaScript, không cần database

## 📄 License

MIT License - Tự do sử dụng, sửa đổi, phân phối

## 👨‍💻 Tác giả

Tạo bởi: Copilot Assistant
Cập nhật: 2026-06-14

---

**Chúc bạn ôn tập hiệu quả! 💪**
