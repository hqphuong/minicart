# ==========================================
# STAGE 1: BUILDER (Người thợ xây)
# Nhiệm vụ: Tải thư viện và chuyển đổi code React Native sang Web thuần
# ==========================================
FROM node:22-alpine AS builder

# Tạo thư mục làm việc trong thế giới ảo của Docker
WORKDIR /app

# Copy 2 file quản lý thư viện vào trước để tận dụng Cache
COPY package*.json ./

# Cài đặt toàn bộ thư viện
RUN npm install

# Copy toàn bộ code của bạn (trừ những thứ trong .dockerignore) vào
COPY . .

# Ra lệnh cho Expo đóng gói dự án thành phiên bản Web (nó sẽ tạo ra thư mục /dist)
RUN npx expo export

# ==========================================
# STAGE 2: PRODUCTION SERVER (Người phục vụ)
# Nhiệm vụ: Dùng Nginx để chạy bản Web siêu nhẹ vừa được xây xong
# ==========================================
FROM nginx:alpine

# Xóa trang web mặc định của Nginx
RUN rm -rf /usr/share/nginx/html/*

# Lấy "thành phẩm" (thư mục dist) từ ông thợ xây (builder) ở trên đem qua đây
COPY --from=builder /app/dist /usr/share/nginx/html

# Mở cổng 80 để giao tiếp
EXPOSE 80

# Chạy Nginx liên tục
CMD ["nginx", "-g", "daemon off;"]