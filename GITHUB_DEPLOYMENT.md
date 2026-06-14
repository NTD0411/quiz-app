# Hướng dẫn Deploy lên GitHub

## 📋 Các bước chuẩn bị

### 1. Cài đặt Git
- Tải từ: https://git-scm.com/
- Sau khi cài đặt, mở PowerShell hoặc Command Prompt
- Cấu hình tên người dùng:
```powershell
git config --global user.name "Tên của bạn"
git config --global user.email "email@example.com"
```

### 2. Tạo Repository trên GitHub
1. Đăng nhập vào https://github.com
2. Click "New" (nút xanh)
3. Đặt tên repository: `quiz-app` (hoặc tên khác)
4. Chọn "Public" để mọi người có thể truy cập
5. Click "Create repository"
6. Sao chép URL (ví dụ: `https://github.com/username/quiz-app.git`)

## 🚀 Push lên GitHub

### Option 1: Nếu repository rỗng (lần đầu)

```powershell
cd c:\FPT\ÔnThi

# Khởi tạo git
git init

# Thêm tất cả file
git add .

# Tạo commit đầu tiên
git commit -m "Initial commit: Quiz application v1.0"

# Thêm remote repository
git remote add origin https://github.com/username/quiz-app.git

# Push lên main branch
git branch -M main
git push -u origin main
```

### Option 2: Nếu repository đã tồn tại

```powershell
cd c:\FPT\ÔnThi

# Liên kết với repository
git remote add origin https://github.com/username/quiz-app.git

# Push lên
git push -u origin main
```

## 📱 Kích hoạt GitHub Pages

1. Vào repository của bạn trên GitHub
2. Click tab "Settings"
3. Click "Pages" ở menu bên trái
4. Phần "Source", chọn:
   - Branch: `main`
   - Folder: `/ (root)`
5. Click "Save"
6. Chờ vài phút, trang sẽ tạo ra link: `https://username.github.io/quiz-app/`

## 🔄 Cập nhật sau này

Khi bạn muốn thêm câu hỏi hoặc sửa lỗi:

```powershell
cd c:\FPT\ÔnThi

# Xem file thay đổi
git status

# Thêm tất cả thay đổi
git add .

# Tạo commit
git commit -m "Mô tả thay đổi"

# Push lên
git push
```

## 💡 Các lệnh git hữu ích

```powershell
# Xem lịch sử commit
git log

# Xem trạng thái hiện tại
git status

# Xem file thay đổi
git diff

# Hủy thay đổi (trước khi commit)
git checkout -- tên-file

# Xóa file khỏi git
git rm --cached tên-file

# Đổi tên commit gần nhất (trước khi push)
git commit --amend -m "Commit message mới"
```

## 🐛 Troubleshooting

### "fatal: not a git repository"
Đảm bảo bạn ở đúng thư mục:
```powershell
cd c:\FPT\ÔnThi
git init
```

### "Permission denied (publickey)"
Cần setup SSH key:
1. Tạo SSH key: https://docs.github.com/en/authentication/connecting-to-github-with-ssh/generating-a-new-ssh-key-and-adding-it-to-the-ssh-agent
2. Thêm vào GitHub account
3. Đổi URL: `git remote set-url origin git@github.com:username/quiz-app.git`

### File không push lên được
Kiểm tra file nằm trong .gitignore chứ?
```powershell
cat .gitignore
```

### GitHub Pages không hoạt động
- Kiểm tra Settings → Pages đã setup đúng chưa
- Chờ 2-3 phút sau khi push
- Xóa cache trình duyệt (Ctrl+Shift+Delete)

## 📊 Structure sau khi push

```
quiz-app/
├── index.html
├── data.json
├── package.json
├── README.md
├── GITHUB_DEPLOYMENT.md (file này)
└── .gitignore
```

## 🌐 Truy cập ứng dụng

Sau khi setup xong:
- **Link local**: `http://localhost:8000/index.html`
- **Link GitHub Pages**: `https://username.github.io/quiz-app/index.html`

## ✨ Tùy chọn bổ sung

### 1. Thêm domain riêng
Nếu có domain tên miền riêng:
1. Settings → Pages → Custom domain
2. Nhập domain
3. Cấu hình DNS của domain

### 2. Tự động deploy
Tạo file `.github/workflows/deploy.yml` để tự động deploy khi push

### 3. Thêm GitHub Actions
Để tự động test hoặc validate code

---

**Cần giúp?** Hỏi ở GitHub Issues hoặc xem thêm: https://docs.github.com/en/pages
