CREATE DATABASE IF NOT EXISTS sample_db
CHARACTER SET utf8mb4
COLLATE utf8mb4_unicode_ci;

USE sample_db;

CREATE TABLE IF NOT EXISTS sample_table (
    id INT AUTO_INCREMENT PRIMARY KEY,
    sei VARCHAR(255) CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci NOT NULL,
    mei VARCHAR(255) CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci NOT NULL,
    email VARCHAR(255) CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci,
    phone_number VARCHAR(255) CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci,
    address VARCHAR(255) CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci,
    city VARCHAR(255) CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP
);


-- 初期データの挿入
INSERT INTO sample_table (sei, mei, email, phone_number, address, city) VALUES
('Yamada', 'Taro', 'taro.yamada@example.com', '090-1234-5678', '1-1-1 Chiyoda, Tokyo, Tokyo', 'Tokyo'),
('Suzuki', 'Hanako', 'hanako.suzuki@example.com', '090-2345-6789', '2-2-2 Minato, Tokyo, Tokyo', 'Tokyo'),
('Sato', 'Ichiro', 'ichiro.sato@example.com', '090-3456-7890', '3-3-3 Chuo, Osaka, Osaka', 'Osaka'),
('Takahashi', 'Momoko', 'momoko.takahashi@example.com', '090-4567-8901', '4-4-4 Naka, Nagoya, Aichi', 'Nagoya'),
('Tanaka', 'Jiro', 'jiro.tanaka@example.com', '090-5678-9012', '5-5-5 Kita, Sapporo, Hokkaido', 'Sapporo'),
('Inoue', 'Sakura', 'sakura.inoue@example.com', '090-6789-0123', '6-6-6 Chuo, Fukuoka, Fukuoka', 'Fukuoka'),
('Kobayashi', 'Taichi', 'taichi.kobayashi@example.com', '090-7890-1234', '7-7-7 Sakyo, Kyoto, Kyoto', 'Kyoto'),
('Nakamura', 'Saki', 'saki.nakamura@example.com', '090-8901-2345', '8-8-8 Chuo, Kobe, Hyogo', 'Kobe'),
('Hayashi', 'Makoto', 'makoto.hayashi@example.com', '090-9012-3456', '9-9-9 Naka, Hiroshima, Hiroshima', 'Hiroshima'),
('Yamamoto', 'Nana', 'nana.yamamoto@example.com', '090-0123-4567', '10-10-10 Aoba, Sendai, Miyagi', 'Sendai');