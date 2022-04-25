/*
 Navicat Premium Data Transfer

 Source Server         : Duchao
 Source Server Type    : MySQL
 Source Server Version : 100414
 Source Host           : localhost:3306
 Source Schema         : tourismmanagement

 Target Server Type    : MySQL
 Target Server Version : 100414
 File Encoding         : 65001

 Date: 25/04/2022 18:47:19
*/

SET NAMES utf8mb4;
SET FOREIGN_KEY_CHECKS = 0;

-- ----------------------------
-- Table structure for comment
-- ----------------------------
DROP TABLE IF EXISTS `comment`;
CREATE TABLE `comment`  (
  `id` int NOT NULL AUTO_INCREMENT,
  `userID` int NULL DEFAULT NULL,
  `content` varchar(1000) CHARACTER SET utf8 COLLATE utf8_unicode_ci NULL DEFAULT NULL,
  `placeID` int NULL DEFAULT NULL,
  `time` datetime NULL DEFAULT NULL,
  PRIMARY KEY (`id`) USING BTREE
) ENGINE = InnoDB AUTO_INCREMENT = 13 CHARACTER SET = utf8 COLLATE = utf8_unicode_ci ROW_FORMAT = DYNAMIC;

-- ----------------------------
-- Records of comment
-- ----------------------------
INSERT INTO `comment` VALUES (12, 1, 'Nơi này mát lắm\n', 1, '2022-04-04 12:28:00');

-- ----------------------------
-- Table structure for feedback
-- ----------------------------
DROP TABLE IF EXISTS `feedback`;
CREATE TABLE `feedback`  (
  `feedbackID` int NOT NULL AUTO_INCREMENT,
  `content` varchar(255) CHARACTER SET utf8mb4 COLLATE utf8mb4_general_ci NULL DEFAULT NULL,
  `userID` int NULL DEFAULT NULL,
  `title` varchar(40) CHARACTER SET utf8mb4 COLLATE utf8mb4_general_ci NULL DEFAULT NULL,
  `userName` varchar(255) CHARACTER SET utf8mb4 COLLATE utf8mb4_general_ci NULL DEFAULT NULL,
  PRIMARY KEY (`feedbackID`) USING BTREE,
  INDEX `fk_feedback_place`(`userID` ASC) USING BTREE
) ENGINE = InnoDB AUTO_INCREMENT = 25 CHARACTER SET = utf8mb4 COLLATE = utf8mb4_general_ci ROW_FORMAT = DYNAMIC;

-- ----------------------------
-- Records of feedback
-- ----------------------------

-- ----------------------------
-- Table structure for image
-- ----------------------------
DROP TABLE IF EXISTS `image`;
CREATE TABLE `image`  (
  `id` int NOT NULL AUTO_INCREMENT,
  `image` varchar(255) CHARACTER SET utf8mb4 COLLATE utf8mb4_general_ci NULL DEFAULT NULL,
  `placeID` int NULL DEFAULT NULL,
  `serviceID` int NULL DEFAULT NULL,
  `isDeleted` tinyint(1) NULL DEFAULT NULL,
  PRIMARY KEY (`id`) USING BTREE,
  INDEX `fk_image_place`(`placeID` ASC) USING BTREE,
  INDEX `fk_image_contribute`(`serviceID` ASC) USING BTREE,
  CONSTRAINT `fk_image_place` FOREIGN KEY (`placeID`) REFERENCES `place` (`placeID`) ON DELETE RESTRICT ON UPDATE RESTRICT
) ENGINE = InnoDB AUTO_INCREMENT = 16 CHARACTER SET = utf8mb4 COLLATE = utf8mb4_general_ci ROW_FORMAT = DYNAMIC;

-- ----------------------------
-- Records of image
-- ----------------------------
INSERT INTO `image` VALUES (7, '1650089335776_giangdien3.jpg', 30, NULL, 0);
INSERT INTO `image` VALUES (8, '1650089335779_giangdien4.jpg', 30, NULL, 0);
INSERT INTO `image` VALUES (11, '1650619782276_giangdien4.jpg', 1, NULL, 0);
INSERT INTO `image` VALUES (12, '1650619782283_giangdien5.jpg', 1, NULL, 1);
INSERT INTO `image` VALUES (13, '1650619879638_giangdien.jpg', 1, NULL, 0);
INSERT INTO `image` VALUES (14, '1650813957819_Desktop1.png', NULL, 2, 0);
INSERT INTO `image` VALUES (15, '1650814774026_stretched-1366-768-613924.jpg', NULL, 1, 0);

-- ----------------------------
-- Table structure for notification
-- ----------------------------
DROP TABLE IF EXISTS `notification`;
CREATE TABLE `notification`  (
  `notificationID` int NOT NULL AUTO_INCREMENT,
  `title` varchar(255) CHARACTER SET utf8mb4 COLLATE utf8mb4_general_ci NULL DEFAULT NULL,
  `content` varchar(255) CHARACTER SET utf8mb4 COLLATE utf8mb4_general_ci NULL DEFAULT NULL,
  `time` datetime(6) NULL DEFAULT NULL,
  PRIMARY KEY (`notificationID`) USING BTREE
) ENGINE = InnoDB AUTO_INCREMENT = 1 CHARACTER SET = utf8mb4 COLLATE = utf8mb4_general_ci ROW_FORMAT = DYNAMIC;

-- ----------------------------
-- Records of notification
-- ----------------------------

-- ----------------------------
-- Table structure for place
-- ----------------------------
DROP TABLE IF EXISTS `place`;
CREATE TABLE `place`  (
  `placeID` int NOT NULL AUTO_INCREMENT,
  `placeName` varchar(255) CHARACTER SET utf8mb4 COLLATE utf8mb4_general_ci NULL DEFAULT NULL,
  `description` text CHARACTER SET utf8mb4 COLLATE utf8mb4_general_ci NULL,
  `tips` varchar(255) CHARACTER SET utf8mb4 COLLATE utf8mb4_general_ci NULL DEFAULT NULL COMMENT 'meo khi di du lich tai dia diem',
  `city` varchar(255) CHARACTER SET utf8mb4 COLLATE utf8mb4_general_ci NULL DEFAULT NULL,
  `address` varchar(255) CHARACTER SET utf8mb4 COLLATE utf8mb4_general_ci NULL DEFAULT NULL,
  `latitude` varchar(255) CHARACTER SET utf8mb4 COLLATE utf8mb4_general_ci NULL DEFAULT NULL,
  `longitude` varchar(255) CHARACTER SET utf8mb4 COLLATE utf8mb4_general_ci NULL DEFAULT NULL,
  `isDeleted` tinyint(1) NULL DEFAULT NULL,
  PRIMARY KEY (`placeID`) USING BTREE
) ENGINE = InnoDB AUTO_INCREMENT = 73 CHARACTER SET = utf8mb4 COLLATE = utf8mb4_general_ci ROW_FORMAT = DYNAMIC;

-- ----------------------------
-- Records of place
-- ----------------------------
INSERT INTO `place` VALUES (1, 'Thác Giang Điền', 'Thác Giang Điền là địa điểm thu hút rất nhiều bạn trẻ và các hộ gia đình kéo nhau về đây tổ chức cắm trại, tắm thác và tổ chức ăn uống. Với khung cảnh hoang sơ được bao bọc...', 'Mang theo đồ để cắm trại như: Thảm,  than, bếp nướng,...', 'Đồng Nai', '104/4 Khu Công Nghiệp Giang Điền, Giang Điền, Trảng Bom, Đồng Nai', '10.917393', '106.988355', 0);
INSERT INTO `place` VALUES (2, 'Quảng trường Ba Đình', 'Quảng trường Ba Đình là quảng trường lớn nhất Việt Nam, nằm trên đường Hùng Vương, quận Ba Đình và là nơi Lăng Chủ tịch Hồ Chí Minh được xây dựng.', 'Đi cùng bạn bè', 'Hà Nội', NULL, NULL, NULL, 0);
INSERT INTO `place` VALUES (3, 'Núi Chứa Chan', 'Ngọn núi cao thứ hai ở Đông Nam Bộ có nhiều rừng rậm, vách đá dựng đứng... được các bạn trẻ chọn để khám phá khi rảnh rỗi.', '', 'Đồng Nai', NULL, NULL, NULL, 0);
INSERT INTO `place` VALUES (4, 'Vườn Xoài', 'Đây là một địa điểm du lịch ưa thích đối với các bạn trẻ thích một nơi cắm trại vui vẻ. Noi nay that dep\n', 'Many hinh\n', 'Đồng Nai', NULL, NULL, NULL, 0);
INSERT INTO `place` VALUES (5, 'Công viên Văn hóa Đầm Sen', 'Nơi đây được ví là “ốc đảo xanh” với 36 thiết bị dưới nước hiện đại cùng nhiều trò chơi cảm giác mạnh đến nhẹ, phù hợp với mọi lứa tuổi. Vì vậy, bạn có thể vui chơi cả ngày mà không thấy chán.', 'Nên tắm sơ trước khi bơi để hạn chế khả năng hấp thu nước Clo trong hồ bơi.\nNgăn chặn tình trạng sạm da bằng cách dùng kem dưỡng ẩm, lotion và kem chống nắng.\nKhi tham gia máng trượt bạn nên mặc quần áo gọn gàng, không mang các vật dụng sắc nhọn để tránh ', 'Tp.Hồ Chí Minh', NULL, NULL, NULL, 0);
INSERT INTO `place` VALUES (6, 'Thác Đá Hàn', 'Khu du lịch thác Đá Hàn là một trong những điểm mới lạ để cho các bạn trẻ tới khám phá. Với vẻ đẹp thiên nhiên hoang sơ và hùng vĩ khó cưỡng, thác nước hữu tình điểm thêm vườn trái cây trĩu quả. Với những bạn yêu thích đi phượt thì địa điểm này hứa hẹn sẽ là điểm đến lý tưởng để dã ngoại, cắm trại những ngày cuối tuần.', 'Hãy mặc trang phục thoải mái, đi giày thể thao để bảo vệ sức khỏe trong thời gian di chuyển.\nCần mang thuốc xịt đề phòng côn trùng cắn', 'Đồng Nai', NULL, NULL, NULL, 0);
INSERT INTO `place` VALUES (30, 'Thác Yên tĩnh', 'Thác Nước Thác Nước', 'Thác NướcThác Nước Thác Nước', 'An Giang', NULL, NULL, NULL, 1);

-- ----------------------------
-- Table structure for role
-- ----------------------------
DROP TABLE IF EXISTS `role`;
CREATE TABLE `role`  (
  `role` tinyint NOT NULL,
  `roleName` varchar(255) CHARACTER SET utf8 COLLATE utf8_unicode_ci NULL DEFAULT NULL,
  PRIMARY KEY (`role`) USING BTREE
) ENGINE = InnoDB CHARACTER SET = utf8 COLLATE = utf8_unicode_ci ROW_FORMAT = Dynamic;

-- ----------------------------
-- Records of role
-- ----------------------------
INSERT INTO `role` VALUES (0, 'Người dùng');
INSERT INTO `role` VALUES (1, 'Admin');

-- ----------------------------
-- Table structure for services
-- ----------------------------
DROP TABLE IF EXISTS `services`;
CREATE TABLE `services`  (
  `serviceID` int NOT NULL AUTO_INCREMENT,
  `serviceName` varchar(255) CHARACTER SET utf8 COLLATE utf8_unicode_ci NULL DEFAULT NULL,
  `typeID` int NULL DEFAULT NULL,
  `description` varchar(255) CHARACTER SET utf8 COLLATE utf8_unicode_ci NULL DEFAULT NULL,
  `placeID` int NULL DEFAULT NULL,
  `address` varchar(255) CHARACTER SET utf8 COLLATE utf8_unicode_ci NULL DEFAULT NULL,
  `hotline` varchar(255) CHARACTER SET utf8 COLLATE utf8_unicode_ci NULL DEFAULT NULL,
  `latitude` varchar(255) CHARACTER SET utf8 COLLATE utf8_unicode_ci NULL DEFAULT NULL COMMENT 'vi do',
  `longitude` varchar(255) CHARACTER SET utf8 COLLATE utf8_unicode_ci NULL DEFAULT NULL COMMENT 'kinh do',
  `isDisabled` tinyint(1) NULL DEFAULT NULL,
  PRIMARY KEY (`serviceID`) USING BTREE
) ENGINE = InnoDB AUTO_INCREMENT = 3 CHARACTER SET = utf8 COLLATE = utf8_unicode_ci ROW_FORMAT = Dynamic;

-- ----------------------------
-- Records of services
-- ----------------------------
INSERT INTO `services` VALUES (1, 'L\'indochine Cafe', 2, 'Một nơi uống cafe yên tĩnh, thích hợp để thư giãn.', 6, '3/7A Đồng Khởi, Tam Hiệp, Tp. Biên Hòa, Đồng Nai', '0911758140', '10.956512', '106.860789', 0);
INSERT INTO `services` VALUES (2, '1', 2, '3', 4, '5', '6', '10.8745', '108.7555', 0);

-- ----------------------------
-- Table structure for typeservice
-- ----------------------------
DROP TABLE IF EXISTS `typeservice`;
CREATE TABLE `typeservice`  (
  `typeID` int NOT NULL,
  `typeService` varchar(255) CHARACTER SET utf8 COLLATE utf8_unicode_ci NULL DEFAULT NULL,
  PRIMARY KEY (`typeID`) USING BTREE
) ENGINE = InnoDB CHARACTER SET = utf8 COLLATE = utf8_unicode_ci ROW_FORMAT = Dynamic;

-- ----------------------------
-- Records of typeservice
-- ----------------------------
INSERT INTO `typeservice` VALUES (1, 'Nơi ở');
INSERT INTO `typeservice` VALUES (2, 'Dịch vụ khác');

-- ----------------------------
-- Table structure for user
-- ----------------------------
DROP TABLE IF EXISTS `user`;
CREATE TABLE `user`  (
  `userID` int NOT NULL AUTO_INCREMENT COMMENT 'moi user co 1 id rieng de phan biet',
  `userName` varchar(255) CHARACTER SET utf8 COLLATE utf8_unicode_ci NULL DEFAULT NULL,
  `password` varchar(255) CHARACTER SET utf8 COLLATE utf8_unicode_ci NULL DEFAULT NULL,
  `fullName` varchar(255) CHARACTER SET utf8 COLLATE utf8_unicode_ci NULL DEFAULT NULL,
  `email` varchar(255) CHARACTER SET utf8 COLLATE utf8_unicode_ci NULL DEFAULT NULL,
  `phonenumber` varchar(255) CHARACTER SET utf8 COLLATE utf8_unicode_ci NULL DEFAULT NULL,
  `role` int NULL DEFAULT NULL COMMENT '0 la nguoi dung, 1 la admin, 2 la khach san, 3 la nha hang ',
  `isDisabled` tinyint(1) NULL DEFAULT NULL COMMENT 'Tai khoan co bi vo hieu hoa hay khong?',
  `lastUpdate` datetime NULL DEFAULT current_timestamp ON UPDATE CURRENT_TIMESTAMP,
  PRIMARY KEY (`userID`) USING BTREE,
  INDEX `role`(`role` ASC) USING BTREE
) ENGINE = InnoDB AUTO_INCREMENT = 11 CHARACTER SET = utf8 COLLATE = utf8_unicode_ci ROW_FORMAT = DYNAMIC;

-- ----------------------------
-- Records of user
-- ----------------------------
INSERT INTO `user` VALUES (1, 'admin', '$2a$14$kZSuw2csvSw.dMtBsA0p7O4e7xEOPj6bLFaILeorXLfxPSasZGWJG', 'Admin', 'duchao3003@gmail.com', '0799792465', 1, 0, '2022-03-27 21:39:20');
INSERT INTO `user` VALUES (2, 'duchao111', '$2a$14$4U/phSn3BvzVxThRoqJiMu2y2ctLepQlGqKSh/CJqrCQo54tMqeQ6', 'Đức Hảo', 'duchao3003@gmail.com', '0799792465', 0, 0, '2022-03-31 21:50:22');
INSERT INTO `user` VALUES (3, 'duchao112', '$2a$14$Kndy5W9C0LWs59WEO1LmEumTAfzSlKjd07H19TF6ijYUD2cWAYAUW', 'Đức Hảo', 'haond3003@gmail.com', '0799792465', 0, 0, '2022-03-31 21:52:40');
INSERT INTO `user` VALUES (4, 'duchao113', '$2a$14$3UdWVH7aNYgkyOi23x.dg.bAc/MrMVkqwQIBuF2hdOlbVbCEWXeEy', 'Đức Hảo', 'haond3003@gmail.com', '0799792465', 0, 1, '2022-04-22 22:30:18');
INSERT INTO `user` VALUES (5, 'hotel111', '$2a$14$/nrKt1AQBBPLTgU5IdWvGu/wSTN2X3tO94ZKmHkPPsVoSBY7WJlTq', 'Nguyen Hao', 'lilynguyen11280@gmail.com', '0799792465', 0, 0, '2022-04-24 14:23:11');
INSERT INTO `user` VALUES (6, 'nhhao111', '$2a$14$Mf1x5VVobfzgkBTkTFvaIuPM8BiJOXeY5tvWKjsLz.dhV7gHOaqEy', 'NH Hao', 'hao@gmail.com', '0799792465', 0, 0, '2022-04-24 14:27:08');

SET FOREIGN_KEY_CHECKS = 1;
