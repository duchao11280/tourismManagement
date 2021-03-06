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

 Date: 31/05/2022 22:19:40
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
  `vote` int NULL DEFAULT NULL,
  `placeID` int NULL DEFAULT NULL,
  `time` datetime NULL DEFAULT NULL,
  PRIMARY KEY (`id`) USING BTREE,
  INDEX `userID`(`userID` ASC) USING BTREE,
  CONSTRAINT `fk_user_cmt` FOREIGN KEY (`userID`) REFERENCES `user` (`userID`) ON DELETE RESTRICT ON UPDATE RESTRICT
) ENGINE = InnoDB AUTO_INCREMENT = 13 CHARACTER SET = utf8 COLLATE = utf8_unicode_ci ROW_FORMAT = DYNAMIC;

-- ----------------------------
-- Records of comment
-- ----------------------------
INSERT INTO `comment` VALUES (12, 1, 'Nơi này mát lắm\n', 3, 1, '2022-04-04 12:28:00');

-- ----------------------------
-- Table structure for detailtrip
-- ----------------------------
DROP TABLE IF EXISTS `detailtrip`;
CREATE TABLE `detailtrip`  (
  `id` int NOT NULL AUTO_INCREMENT,
  `tripID` int NOT NULL,
  `placeID` int NULL DEFAULT NULL,
  `serviceID` int NULL DEFAULT NULL,
  `type` tinyint NULL DEFAULT 0 COMMENT '0 is place, 1 is service',
  `note` text CHARACTER SET utf8 COLLATE utf8_unicode_ci NULL,
  `day` int NULL DEFAULT NULL,
  `timeClock` time NULL DEFAULT NULL,
  `createAt` datetime NULL DEFAULT current_timestamp,
  `updateAt` datetime NULL DEFAULT current_timestamp ON UPDATE CURRENT_TIMESTAMP,
  PRIMARY KEY (`id`) USING BTREE,
  INDEX `serviceID`(`serviceID` ASC) USING BTREE,
  INDEX `placeID`(`placeID` ASC) USING BTREE,
  INDEX `fk_detailtrip_trip`(`tripID` ASC) USING BTREE,
  CONSTRAINT `fk_detailtrip_place` FOREIGN KEY (`placeID`) REFERENCES `place` (`placeID`) ON DELETE RESTRICT ON UPDATE RESTRICT,
  CONSTRAINT `fk_detailtrip_service` FOREIGN KEY (`serviceID`) REFERENCES `services` (`serviceID`) ON DELETE RESTRICT ON UPDATE RESTRICT,
  CONSTRAINT `fk_detailtrip_trip` FOREIGN KEY (`tripID`) REFERENCES `trip` (`tripID`) ON DELETE RESTRICT ON UPDATE RESTRICT
) ENGINE = InnoDB AUTO_INCREMENT = 44 CHARACTER SET = utf8 COLLATE = utf8_unicode_ci ROW_FORMAT = Dynamic;

-- ----------------------------
-- Records of detailtrip
-- ----------------------------
INSERT INTO `detailtrip` VALUES (1, 8, 74, NULL, 0, 'Xe khởi hành sớm từ TP.HCM đến ban Quản Lý Vườn Quốc Gia làm thủ tục vào rừng.', 1, '10:31:00', '2022-05-20 23:21:06', '2022-05-31 17:59:36');
INSERT INTO `detailtrip` VALUES (3, 8, 78, NULL, 0, '  Ra bến thuyền thuê dịch vụ trải nghiệm để thăm quan Thác Trời, Thác Dựng.', 2, '10:00:00', '2022-05-20 23:21:06', '2022-05-31 18:41:21');
INSERT INTO `detailtrip` VALUES (7, 8, NULL, 3, 1, 'Nhận phòng, nghỉ ngơi và ăn trưa.', 1, '11:30:00', '2022-05-22 13:14:11', '2022-05-31 18:36:32');
INSERT INTO `detailtrip` VALUES (19, 8, NULL, 4, 1, 'Về thành phố', 2, '12:45:00', '2022-05-23 13:39:24', '2022-05-29 10:59:25');
INSERT INTO `detailtrip` VALUES (28, 8, 74, NULL, 0, 'Tản bộ thăm rừng bằng lăng đặc trưng, thăm cây bằng lăng 6 ngọn, cây tùng có rễ nổi trên mặt đất, cây thiên tuế.', 1, '14:00:00', '2022-05-31 18:36:22', '2022-05-31 18:36:22');
INSERT INTO `detailtrip` VALUES (29, 8, NULL, 3, 1, 'Về phòng nghỉ ngơi, ăn tối.', 1, '16:30:00', '2022-05-31 18:37:08', '2022-05-31 18:37:19');
INSERT INTO `detailtrip` VALUES (30, 8, 79, NULL, 0, 'Khởi đầu ngày thứ hai bằng việc thăm suối Bến Cự, một địa điểm hấp dẫn.', 2, '08:00:00', '2022-05-31 18:41:07', '2022-05-31 18:42:04');
INSERT INTO `detailtrip` VALUES (31, 8, NULL, 3, 1, 'Ăn trưa, nghỉ ngơi và trả phòng. Về lại TP. Hồ Chí Minh', 2, '11:45:00', '2022-05-31 18:43:59', '2022-05-31 18:43:59');
INSERT INTO `detailtrip` VALUES (32, 11, 77, NULL, 0, 'Tham quan Dinh Thống Nhất, đây là cơ quan đầu não của chính phủ thời chiến.', 1, '08:15:00', '2022-05-31 21:02:03', '2022-05-31 21:02:03');
INSERT INTO `detailtrip` VALUES (33, 11, 76, NULL, 0, NULL, 1, '09:00:00', '2022-05-31 21:02:03', '2022-05-31 21:02:03');
INSERT INTO `detailtrip` VALUES (34, 11, 80, NULL, 0, NULL, 1, '09:30:00', '2022-05-31 21:02:03', '2022-05-31 21:02:03');
INSERT INTO `detailtrip` VALUES (35, 11, 81, NULL, 0, 'Thứ 2 không mở cửa', 1, '10:15:00', '2022-05-31 21:02:03', '2022-05-31 21:02:03');
INSERT INTO `detailtrip` VALUES (36, 11, 83, NULL, 0, NULL, 1, '15:30:00', '2022-05-31 21:02:03', '2022-05-31 21:02:03');
INSERT INTO `detailtrip` VALUES (37, 11, NULL, 14, 1, 'Trẻ em dưới 6 tuổi được phục vụ miễn phí.\nCó mặt lúc 18h30 để lên thuyền. Thuyền sẽ khởi hành vào lúc 19h15 và ăn tối tới 21h.', 1, '18:30:00', '2022-05-31 21:02:03', '2022-05-31 21:02:03');
INSERT INTO `detailtrip` VALUES (38, 11, NULL, 15, 1, 'Ghé chợ mua đồ lưu niệm', 1, '14:00:00', '2022-05-31 21:24:32', '2022-05-31 21:24:32');
INSERT INTO `detailtrip` VALUES (39, 11, NULL, 16, 1, 'Về khách sạn nghỉ ngơi', 1, '21:30:00', '2022-05-31 21:33:49', '2022-05-31 21:33:49');
INSERT INTO `detailtrip` VALUES (40, 11, NULL, 16, 1, 'Trả phòng, lên xe di chuyển tới địa điểm tiếp theo', 2, '07:00:00', '2022-05-31 21:39:18', '2022-05-31 21:39:18');
INSERT INTO `detailtrip` VALUES (41, 11, 84, NULL, 0, 'Có thể đi ô tô hoặc bus\nBạn đi xe bus số 13 (Bến Thành – Củ Chi) hoặc số 94 (Chợ Lớn – Củ Chi) để đến bến xe Củ Chi, rồi từ đây nhảy bus số 79 (Củ Chi – Dầu Tiếng) để đến địa đạo Bến Dược.', 2, '09:00:00', '2022-05-31 22:09:42', '2022-05-31 22:09:42');
INSERT INTO `detailtrip` VALUES (42, 11, 85, NULL, 0, '', 2, '10:30:00', '2022-05-31 22:10:41', '2022-05-31 22:10:41');
INSERT INTO `detailtrip` VALUES (43, 11, NULL, 17, 1, 'Ăn trưa, nghỉ ngơi và kết thúc hành trình.', 2, '23:15:00', '2022-05-31 22:11:24', '2022-05-31 22:11:24');

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
  INDEX `fk_feedback_place`(`userID` ASC) USING BTREE,
  CONSTRAINT `fk_feedback_user` FOREIGN KEY (`userID`) REFERENCES `user` (`userID`) ON DELETE RESTRICT ON UPDATE RESTRICT
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
  CONSTRAINT `fk_image_place` FOREIGN KEY (`placeID`) REFERENCES `place` (`placeID`) ON DELETE RESTRICT ON UPDATE RESTRICT,
  CONSTRAINT `fk_image_service` FOREIGN KEY (`serviceID`) REFERENCES `services` (`serviceID`) ON DELETE RESTRICT ON UPDATE RESTRICT
) ENGINE = InnoDB AUTO_INCREMENT = 62 CHARACTER SET = utf8mb4 COLLATE = utf8mb4_general_ci ROW_FORMAT = DYNAMIC;

-- ----------------------------
-- Records of image
-- ----------------------------
INSERT INTO `image` VALUES (11, '1650619782276_giangdien4.jpg', 1, NULL, 0);
INSERT INTO `image` VALUES (12, '1650619782283_giangdien5.jpg', 1, NULL, 1);
INSERT INTO `image` VALUES (13, '1650619879638_giangdien.jpg', 1, NULL, 0);
INSERT INTO `image` VALUES (16, '1650893279651_Thac-Mai-1.jpg', 73, NULL, 0);
INSERT INTO `image` VALUES (17, '1650893279657_746_thac_mai.jpg', 73, NULL, 0);
INSERT INTO `image` VALUES (18, '1650893279669_khu-du-lich-thac-mai.png', 73, NULL, 0);
INSERT INTO `image` VALUES (19, '1650894886344_images.jpg', 74, NULL, 0);
INSERT INTO `image` VALUES (20, '1650894886345_1629348197-vuon-quoc-gia-cat-tien4-width670height486.jpg', 74, NULL, 0);
INSERT INTO `image` VALUES (21, '1650894886347_download.jpg', 74, NULL, 0);
INSERT INTO `image` VALUES (22, '1650895559230_chua-buu-phong-2.jpg', 75, NULL, 0);
INSERT INTO `image` VALUES (23, '1650895559236_chua-buu-long-ivivu-1.jpg', 75, NULL, 0);
INSERT INTO `image` VALUES (24, '1650895559237_887681_ZmaVWyRBAYcA1b3bPUBzWdfw3jMbYQwHLDqR-PZHHcc.jpg', 75, NULL, 0);
INSERT INTO `image` VALUES (25, '1650895980538_download (1).jpg', 76, NULL, 0);
INSERT INTO `image` VALUES (26, '1650895980538_download.jpg', 76, NULL, 0);
INSERT INTO `image` VALUES (27, '1650895980539_images.jpg', 76, NULL, 0);
INSERT INTO `image` VALUES (29, '1650975699042_homestay-nam-cat-tien-dong-nai-13.jpg', NULL, 4, 0);
INSERT INTO `image` VALUES (33, '1650976423303_homestay-nam-cat-tien-dong-nai-13.jpg', NULL, 3, 0);
INSERT INTO `image` VALUES (34, '1651018963806_guest.jpg', NULL, 7, 0);
INSERT INTO `image` VALUES (35, '1651018963811_lake.jpg', NULL, 7, 0);
INSERT INTO `image` VALUES (36, '1651018963817_s-nh-don-khanh-du-c-thi.jpg', NULL, 7, 0);
INSERT INTO `image` VALUES (37, '1651019148822_230230109.jpg', NULL, 8, 0);
INSERT INTO `image` VALUES (38, '1651019148823_230232309.jpg', NULL, 8, 0);
INSERT INTO `image` VALUES (39, '1651019148824_235171017.jpg', NULL, 8, 0);
INSERT INTO `image` VALUES (40, '1651019349752_230230109.jpg', NULL, 9, 0);
INSERT INTO `image` VALUES (41, '1651019349756_334378968.jpg', NULL, 9, 0);
INSERT INTO `image` VALUES (42, '1651019349758_334378970.jpg', NULL, 9, 0);
INSERT INTO `image` VALUES (43, '1651019643452_334378970.jpg', NULL, 10, 0);
INSERT INTO `image` VALUES (44, '1651019912357_download (1).jpg', 77, NULL, 0);
INSERT INTO `image` VALUES (45, '1651019912357_download (2).jpg', 77, NULL, 0);
INSERT INTO `image` VALUES (46, '1651019912358_download.jpg', 77, NULL, 0);
INSERT INTO `image` VALUES (47, '1651020262349_quan-ca-phe-bien-hoa-1.jpg', NULL, 12, 0);
INSERT INTO `image` VALUES (48, '1651020488935_download (1).jpg', NULL, 13, 0);
INSERT INTO `image` VALUES (49, '1651020488935_download.jpg', NULL, 13, 0);
INSERT INTO `image` VALUES (50, '1653993890123_thactroi1.jpg', 78, NULL, 0);
INSERT INTO `image` VALUES (51, '1653994401811_ghenhBenCu1.jpg', 79, NULL, 0);
INSERT INTO `image` VALUES (52, '1654005984980_Ben_Thanh_market_2.jpg', NULL, 15, 0);
INSERT INTO `image` VALUES (53, '1654007570444_TheOdysBoutiqueHotel1.jpg', NULL, 16, 0);
INSERT INTO `image` VALUES (54, '1654008893074_dia-dao-cu-chi1.jpg', 84, NULL, 0);
INSERT INTO `image` VALUES (55, '1654009364962_Ben_Duoc_CuChi.jpg', 85, NULL, 0);
INSERT INTO `image` VALUES (56, '1654009648152_NH_BENDUOC.jpg', NULL, 17, 0);
INSERT INTO `image` VALUES (57, '1654009975426_bennharong.jpg', 83, NULL, 0);
INSERT INTO `image` VALUES (58, '1654010039494_buu-dien-sai-gon.jpg', 80, NULL, 0);
INSERT INTO `image` VALUES (59, '1654010101602_btlsvn.jpg', 81, NULL, 0);
INSERT INTO `image` VALUES (60, '1654010149138_btcdhcm.jpg', 82, NULL, 0);
INSERT INTO `image` VALUES (61, '1654010260299_SaigonPrincess.jpg', NULL, 14, 0);

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
  `tips` text CHARACTER SET utf8mb4 COLLATE utf8mb4_general_ci NULL COMMENT 'meo khi di du lich tai dia diem',
  `city` varchar(255) CHARACTER SET utf8mb4 COLLATE utf8mb4_general_ci NULL DEFAULT NULL,
  `address` varchar(255) CHARACTER SET utf8mb4 COLLATE utf8mb4_general_ci NULL DEFAULT NULL,
  `latitude` varchar(255) CHARACTER SET utf8mb4 COLLATE utf8mb4_general_ci NULL DEFAULT NULL,
  `longitude` varchar(255) CHARACTER SET utf8mb4 COLLATE utf8mb4_general_ci NULL DEFAULT NULL,
  `isDeleted` tinyint(1) NULL DEFAULT NULL,
  PRIMARY KEY (`placeID`) USING BTREE
) ENGINE = InnoDB AUTO_INCREMENT = 86 CHARACTER SET = utf8mb4 COLLATE = utf8mb4_general_ci ROW_FORMAT = DYNAMIC;

-- ----------------------------
-- Records of place
-- ----------------------------
INSERT INTO `place` VALUES (1, 'Thác Giang Điền', 'Thác Giang Điền là địa điểm thu hút rất nhiều bạn trẻ và các hộ gia đình kéo nhau về đây tổ chức cắm trại, tắm thác và tổ chức ăn uống. Với khung cảnh hoang sơ được bao bọc...', 'Mang theo đồ để cắm trại như: Thảm,  than, bếp nướng,...', 'Đồng Nai', '104/4 Khu Công Nghiệp Giang Điền, Giang Điền, Trảng Bom, Đồng Nai', '10.91835231762526', '106.99170559686634', 0);
INSERT INTO `place` VALUES (3, 'Núi Chứa Chan', 'Ngọn núi cao thứ hai ở Đông Nam Bộ có nhiều rừng rậm, vách đá dựng đứng... được các bạn trẻ chọn để khám phá khi rảnh rỗi.', '', 'Đồng Nai', NULL, NULL, NULL, 1);
INSERT INTO `place` VALUES (4, 'Vườn Xoài', 'Đây là một địa điểm du lịch ưa thích đối với các bạn trẻ thích một nơi cắm trại vui vẻ. Noi nay that dep\n', 'Many hinh\n', 'Đồng Nai', NULL, NULL, NULL, 1);
INSERT INTO `place` VALUES (5, 'Công viên Văn hóa Đầm Sen', 'Nơi đây được ví là “ốc đảo xanh” với 36 thiết bị dưới nước hiện đại cùng nhiều trò chơi cảm giác mạnh đến nhẹ, phù hợp với mọi lứa tuổi. Vì vậy, bạn có thể vui chơi cả ngày mà không thấy chán.', 'Nên tắm sơ trước khi bơi để hạn chế khả năng hấp thu nước Clo trong hồ bơi.\nNgăn chặn tình trạng sạm da bằng cách dùng kem dưỡng ẩm, lotion và kem chống nắng.\nKhi tham gia máng trượt bạn nên mặc quần áo gọn gàng, không mang các vật dụng sắc nhọn để tránh ', 'Thành phố Hồ Chí Minh', NULL, NULL, NULL, 1);
INSERT INTO `place` VALUES (6, 'Thác Đá Hàn', 'Khu du lịch thác Đá Hàn là một trong những điểm mới lạ để cho các bạn trẻ tới khám phá. Với vẻ đẹp thiên nhiên hoang sơ và hùng vĩ khó cưỡng, thác nước hữu tình điểm thêm vườn trái cây trĩu quả. Với những bạn yêu thích đi phượt thì địa điểm này hứa hẹn sẽ là điểm đến lý tưởng để dã ngoại, cắm trại những ngày cuối tuần.', 'Hãy mặc trang phục thoải mái, đi giày thể thao để bảo vệ sức khỏe trong thời gian di chuyển.\nCần mang thuốc xịt đề phòng côn trùng cắn', 'Đồng Nai', NULL, '11.054820078965946', '107.40045249717184', 1);
INSERT INTO `place` VALUES (73, 'Thác Mai', 'Thác Mai hay còn gọi đầy đủ là khu du lịch sinh thái bàu nước sôi – Thác Mai. Nằm trên địa phận xã Gia Canh, huyện Định Quán, tỉnh Đồng Nai và nằm cách thành phố Hồ Chí Minh tầm 130km. Đây là điểm du lịch nằm sâu trong rừng nguyên sinh bạt ngạt sẽ rất thích hợp với những bạn mê phượt.\nTrên ranh giới giữa hai tỉnh Bình Thuận, Đồng Nai, Thác Mai là một địa điểm thiên nhiên kỳ thú, còn lưu giữ được vẻ hoang sơ.\nThác rất lớn, có chiều dài khoảng 2 km, được hợp thành từ vô số dòng suối, thác và sông con. Thác Mai gai góc, lởm chởm và bí hiểm. Nước nối tiếp nhau xô vào đá, đá nối tiếp nhau trùng điệp, như dòng thác không có chỗ tận cùng.\n', 'Nếu bạn nào định tìm đường tới Thác Mai bằng Google Map thì cần phải hết sức lưu ý. Bởi vì bản đồ sẽ hướng dẫn chúng ta đi con đường ngắn hơn, tuy nhiên điểm đến lại là đường cụt ngay bờ sông và thác Mai lại ở bên kia sông. Chính vì vậy bạn cần phải có một hướng dẫn viên có kinh nghiệm đầy đặn.\nKhi đi Thác Mai, bạn nên đi theo nhóm nhiều người, vì bạn sẽ đi trong đường rừng, vắng hoe. Nhớ mang theo sẵn các vật dụng, thực phẩm, thuốc và trang bị y tế phòng những tình huống không may mắn xảy ra.\nTrong quá trình vui chơi, nên tránh xa các bảng cảnh báo vì tại suối có nhiều điểm nước xoáy rất nguy hiểm.\n Khi về, nên về sớm trước 16h vì đường rừng tắt nắng rất nhanh khá nguy hiểm, dễ lạc đường, sóng điện thoại tại đây rất yếu. \n', 'Đồng Nai', 'Gia Canh, Định Quán, Đồng Nai', '11.11443506990068', '107.47065662485295', 0);
INSERT INTO `place` VALUES (74, 'Rừng Quốc Gia Nam Cát Tiên', 'Nam Cát Tiên là tên gọi một vùng đất nằm trọn trong đoạn uốn khúc của sông Đồng Nai, tọa lạc ngay trên ranh giới của cả ba tỉnh Đồng Nai, Bình Phước và Lâm Đồng. Khu rừng cấm Nam Cát Tiên có diện tích 36.000ha, đại diện cho cả hệ thực vật và động vật Nam Bộ.\r\nNơi đây có cảnh thiên nhiên đa dạng: Vừa có đồi, vừa có bãi ven sông, vừa có các trảng rộng lớn bằng phẳng, lại có các dòng chảy dốc. \r\nRừng ở đây có nhiều cây cổ thụ như bằng lăng, gỗ đỏ và hơn 600 loài thực vật.\r\nVề động vật có 240 loài chim, có những loài chim quý hiếm như trĩ lông đỏ, cò quắm xanh, tê giác một sừng,...', 'Thời điểm thích hợp để du lịch từ là vào khoảng tháng 12 – tháng 5. Bởi vì trong thời gian, tại rừng Nam Cát Tiên ít mưa, rừng khô ráo.\nVới những bạn thích đi phượt và có kinh phí hạn hẹp thì có thể lựa chọn mang theo lều trại để cắm trại trong rừng, chắn chắn sẽ đỡ tốn chi phí hơn nhiều', 'Đồng Nai', 'Nam Cát Tiên, Tân Phú, Đồng Nai', '11.423294791892964', '107.43066356749813', 0);
INSERT INTO `place` VALUES (75, 'Chùa Bửu Phong', '      Chùa Bửu Phòng nằm trên núi Bửu Long, thuộc xã Tân Bửu, Tỉnh Đồng Nai, cách thành phố Biên Hòa 6km.\r\n       Chùa được xây dựng vào thế kỷ XVII, lúc đầu chùa chỉ là thảo am nhỏ, sau đó trùng tu mở rộng vào năm 1829 và các năm gần đây. Đây là ngôi chùa cổ kính có những pho tượng với những nét điêu khắc đặc biệt Á Đông', '    Chùa rất rộng nên phải đi bộ nhiều, bạn nên mặc đồ mỏng, có chất liệu thoáng mát và nên sử dụng giày dép đế thấp tiện cho việc di chuyển.\n\n', 'Đồng Nai', 'B31, Huỳnh Văn Nghệ, Khu Phố 5, P, Thành phố Biên Hòa, Đồng Nai', '10.96774591813126', '106.79999308283477', 0);
INSERT INTO `place` VALUES (76, 'Nhà Thờ Đức Bà', '    Nhà thờ Đức Bà là công trình kiến trúc lớn ở Quảng trường Công xã Pari, trung tâm thành phố, với hai tháp chuông cao 40m.\r\n    Ngày 7/10/1877, một cha cố người pháp tên là Colombert đã đặt viên đá đầu tiên và đến ngày 11/4/1880 thì khánh thành. Bản đồ án thiết kế vẽ từ bên Pháp, do kỹ sư người Pháp chỉ huy thực hiện với tổng số tiền là hai triệu rưỡi quan lúc bấy giờ. Ngày 7 và 8 tháng 12 năm 1959, theo sự chấp thuận của tòa thánh Vaticang, nhà thờ đã làm lễ xúc dầu, đặt tên là Vương Cung thánh đường', '    Nếu đến thăm nhà thờ, bạn hãy chuẩn bị sẵn một chút vụn bánh mì hoặc hạt. Bởi ở đây sẽ có những chú chim bồ câu cực “hiếu khách”, sẵn sàng tới chào bạn và nhảy lên tay chơi đùa cùng bạn đó.\r\n', 'Thành phố Hồ Chí Minh', '01 Công xã Paris, Bến Nghé, Quận 1, Thành phố Hồ Chí Minh, Vietnam', '10.779911966388712', '106.69905108283332', 0);
INSERT INTO `place` VALUES (77, 'Dinh Thống Nhất', '    Khi nói đến Sài Gòn, không ai không liên tưởng đến dinh Thống Nhất với vai trò lịch sử đối với dân tộc Việt Nam, vị trí được xác lập trong giao lưu kinh tế, trính trị, xã hội đối với toàn vùng Đông Nam Á cũng như trên thế giới.\r\n    Mặt tiền của dinh Thống Nhất nằm trên ngã ba đường Nam Kỳ Khởi Nghĩa và đường Lê Duẩn, khuôn viên rộng 15ha.\r\n    Sau chiến dịch Hồ Chí Minh, Dinh Độc Lập là nơi làm việc của ủy ban Quân Quản thành phố Sài Gòn. Tháng 12/1975 tại đây diễn ra hội nghị Hiệp thương thống nhất đất nước. Cũng tại nơi đây đã diễn ra những cuộc họp quan trọng của Trung ương Đảng Công sản Việt Nam và một số đoàn thể để bàn việc thống nhất các tổ chức. Với ý nghĩa lịch sử đó dinh Độc Lập đổi tên thành Hội trường Thống Nhất', '    Giá vé vào Dinh Độc Lập 2021: 40.000đ/ người lớn. Nếu tham quan thêm nhà trưng bày, bạn cần mua thêm vé 25.000đ nữa. Mình muốn đi cả hai nên tổng vé vào cửa của mình là 65.000đ. Có thẻ sinh viên được giảm giá nên nếu có hãy mang theo nhé!', 'Thành phố Hồ Chí Minh', '135 Đ. Nam Kỳ Khởi Nghĩa, Phường Bến Thành, Quận 1, Tp.HCM', '10.777836883913713', '106.69526516749279', 0);
INSERT INTO `place` VALUES (78, 'Thác Trời', 'Thác Trời có cảnh quan thiên nhiên khá đẹp, được ví như một bức tranh hùng vĩ, hoang sơ của núi rừng. Trong những ngày nắng sau mưa, nước chảy mạnh qua màn hơi nước tạo thành vô số cầu vồng nhấp nhô giữa rừng cây làm thành bức tranh tuyệt đẹp. Không khí ở Thác Trời khá mát mẻ và trong lành, đến với Thác Trời du khách có thể tham quan, dã ngoại cắm trại cùng gia đình và bạn bè, tận hưởng nét hoang sơ, thuần khiết nơi dòng suối trong mát như đưa du khách thưởng lãm vào một thế giới thiên nhiên vô tận. Nguồn: ttxtdldongnai.vn', 'Nếu đã đi du lịch đến Vườn Quốc Gia Nam Cát Tiên thì thác Trời là một điểm không thể thiếu, chúng ta nên thuê ca nô để trải nghiệm nơi đây.', 'Đồng Nai', 'Tân Phú, Đồng Nai', '11.450264336833643', '107.44278303761051', 0);
INSERT INTO `place` VALUES (79, 'Ghềnh Bến Cự', 'Khu vực này trước đây là nơi tập kết để vận chuyển lương thực, thuốc men và nhu yếu phẩm của bộ đội ta trong thời kỳ kháng chiến. Cũng là nơi xây dựng Hạt kiểm lâm đầu tiên của khu rừng Cấm Nam bãi Cát Tiên vào năm 1978. Đây là điểm cắm trại dã ngoại lý tưởng, bởi bạn có thể thư giãn dưới tán cây, vừa trò chuyện, vừa có thể ngắm nhìn những con thú nô đùa trên cây hoặc đi bộ trên những tảng đá. Nguồn: triphunter.vn', '', 'Đồng Nai', 'Tân Phú, Đồng Nai', '11.435298558548437', '107.42920352335004', 0);
INSERT INTO `place` VALUES (80, 'Bưu Điện Thành Phố Hồ Chí Minh', '   Bưu điện trung tâm Sài Gòn nằm đối diện với nhà thờ Đức Bà nên việc di chuyển rất thuận tiện cho du khách. \n   Đây là một trong những công trình kiến trúc độc đáo nhất của thành phố, bưu điện chính là địa điểm du lịch hấp dẫn mà du khách nên ghé đến trong chuyến du lịch Sài Gòn. \n     Đặc biệt thiết kế hình mái vòm tạo cảm giác hoài cổ và rộng lớn cho du khách. Bưu điện vẫn giữ những hòm thư cổ, bốt điện thoại, các đồ lưu niệm như tem hay thư xưa. Ngay giữa lòng một Sài Gòn hoa lệ mà lại có một công trình kiến trúc kết hợp giữa châu Âu và châu Á đầy độc đáo như vậy. \n', 'Bạn có thể đi xe máy, ô tô hay sử dụng các phương tiện công cộng như xe buýt đều được. Một số tuyến xe buýt sẽ dừng lại ở gần bưu điện như: 03, 14, 30,15. ', 'Thành phố Hồ Chí Minh', '125 Hai Bà Trưng, Bến Nghé, Quận 1, Thành phố Hồ Chí Minh, Việt Nam', '10.779994031244872', '106.70000985282955', 0);
INSERT INTO `place` VALUES (81, 'Bảo tàng Lịch sử Việt Nam', '       Bảo tàng Lịch sử Thành phố Hồ Chí Minh là một bảo tàng lớn và có lịch sử phát triển lâu đời ở khu vực phía Nam Việt Nam. Tọa lạc tại trung tâm thành phố, Bảo tàng là điểm đến thu hút đông đảo công chúng trong nước và quốc tế. \r\n       Bảo tàng được xây theo lối kiến trúc \"Đông Dương cách tân\" (styleindochinois), do kiến trúc sư người Pháp Delaval thiết kế, và do hãng thầu Etablissements Lamorte Saigon thực hiện trong ba năm: 1926-1927-1928.\r\n      ', '', 'Thành phố Hồ Chí Minh', '2 Nguyễn Bỉnh Khiêm, Bến Nghé, Quận 1, Thành phố Hồ Chí Minh', '10.787936394093864', '106.70469018830812', 0);
INSERT INTO `place` VALUES (82, 'Bảo tàng Chiến dịch Hồ Chí Minh', '      Đây là loại hình bảo tàng lịch sử Quân sự. Bảo tàng này trưng bày các hiện vật, hình ảnh, sa bàn liên quan đến cuộc tổng tiến công và nổi dậy mùa xuân năm 1975, kết thúc bằn Chiến dịch Hồ Chí Minh toàn thắng. Bảo tàng được thành lập vào ngày 27/7/1987, trong tòa nhà được xây đầu thế kỷ 20 theo thiết kế của một kiến trúc sư người Pháp. \r\n      Ngoài trời, nơi đây lưu giữ các hiện vật lớn như: xe tăng T54 mang số hiệu 848, máy bay F5E, pháo các loại A37, 57, 76, 105, 130mm, máy bay A37, xe thiết giáp M113...\r\n     Bên trong toà nhà, Bảo tàng trưng bày các hiện vật, hình ảnh, sa bàn liên quan đến cuộc Tổng tiến công và nổi dậy mùa xuân năm 1975, kết thúc bằng Chiến dịch Hồ Chí Minh toàn thắng, Nam - Bắc thống nhất một nhà.', '', 'Thành phố Hồ Chí Minh', 'Số 2 Đ. Lê Duẩn, Bến Nghé, Quận 1, Thành phố Hồ Chí Minh, Việt Nam', '10.786984953067217', '106.70418721031459', 0);
INSERT INTO `place` VALUES (83, 'Bến Nhà Rồng', '      Bến Nhà Rồng, tên chính thức là Bảo tàng Hồ Chí Minh - Chi nhánh Thành phố Hồ Chí Minh, là tên gọi thông dụng để chỉ cụm di tích kiến trúc - bảo tàng nằm bên sông Sài Gòn, thuộc quận 4, Thành phố Hồ Chí Minh. Nơi đây từng là trụ sở của hãng vận tải Messageries maritimes tại Sài Gòn từ năm 1864 đến năm 1955. Tuy nhiên, địa danh này được biết đến nhiều do tại đây có cụm di tích kiến trúc đánh dấu sự kiện ngày 5 tháng 6 năm 1911, người thanh niên Nguyễn Tất Thành (sau này được biết với tên gọi Hồ Chí Minh) đã xuống con tàu Amiral Latouche Tréville làm phụ bếp để có điều kiện sang châu Âu, mở đầu hành trình cách mạng của mình. Do đó, từ 1975, cụm di tích kiến trúc của thương cảng Nhà Rồng đã được Nhà nước Việt Nam xây dựng lại thành khu lưu niệm Hồ Chí Minh, và ngày 5 tháng 6 được chọn là Ngày Bác Hồ ra đi tìm đường cứu nước ở Việt Nam. Nguồn: Wikipedia', '', 'Thành phố Hồ Chí Minh', '01 Nguyễn Tất Thành, Phường 12, Quận 4, Thành phố Hồ Chí Minh ', '10.768423350596883', '106.70668086613391', 0);
INSERT INTO `place` VALUES (84, 'Khu di tích lịch sử Địa đạo Củ Chi', ' - Củ Chi cách trung tâm Tp. Hồ Chí Minh hơn 30km về phía tây bắc nằm giữa hai con sông Sài Gòn và sông Vàm Cỏ Đông, có diện tích 43.000 ha.\r\n - Nổi tiếng ở Củ Chi đất thép là những đường hầm, làng hầm. Từ năm 1930, nơi đây đã có những căn hầm bí mật che giấu các chiến sĩ cách mạng. Đường hầm bí mật được phát triển trong kháng chiến chống Mỹ. Địa đạo Củ Chi trở thành một công trình đánh giặc độc đáo. Hệ thống đường hầm dài 200km chằng chịt mấy tầng dưới đất gồm một hệ thống trục chính và nhiều nhánh phụ, thông với các hầm bí mật, hầm trú ẩn, hoặc lối lên mặt đất. Bề ngang đường trục khoảng 60-70 cm, cao khoảng 80-90 cm, vừa đủ cho một người đi khom lưng. Cũng có đoạn cao rộng cho phép 2 người tránh nhau. Nóc hầm là đỉnh tam giác hoặc vòng cung, bề dày nóc hầm từ 3-4m chịu được xe tăng 50 tấn và bom 100kg. \r\n - Trong địa đạo cũng có những nơi rộng rãi để họp, biểu diễn văn nghệ, có chỗ cho bệnh nhân nằm, có bếp Hoàng Cầm cải tiến, có nhà vệ sinh, cống thoát nước,..', ' Đi địa đạo Bến Dược: Bạn đi xe bus số 13 (Bến Thành – Củ Chi) hoặc số 94 (Chợ Lớn – Củ Chi) để đến bến xe Củ Chi, rồi từ đây nhảy bus số 79 (Củ Chi – Dầu Tiếng) để đến địa đạo Bến Dược.', 'Thành phố Hồ Chí Minh', 'Đ. Tỉnh Lộ 15, Phú Hiệp, Củ Chi, Thành phố Hồ Chí Minh', '11.142838840751484', '106.46284652408228', 0);
INSERT INTO `place` VALUES (85, 'Đền tưởng niệm Bến Dược - Củ Chi', ' - Đền Bến Dược tọa lạc trên vùng đất rộng khoảng 7ha, trong quần thể của khu di tích lịch sử Củ Chi thuộc xã Phú Mỹ Hưng, huyện Củ Chi.\r\n - Đền Bến Được khởi công xây dựng vào ngày 19 - 5 - 1993, khánh thành giai đoạn 1 vào ngày 19-12-1995, gồm có: cổng tam quan, nhà văn bia, tháp 9 tầng( cao khoảng 40m), ngôi điện chính và hoa viên. Tấm bia đá cao 3m, nặng 3,7 tấn, đặt giữa nhà văn bia, khắc bài văn \"Đời đời ghi nhớ\" của nhà văn Viễn Phương.\r\n - Trong ngôi điện chính, điện thờ được bài trí tôn nghiêm. Chính giữa là tượng Chủ tịch Hồ Chí Minh, ba mặt chung quanh có họ tên của các anh hùng, liệt sĩ được khắc vào bia đá hoa cương, chữ mạ vàng. Tầng dưới đền là noi trưng bày những hình ảnh, hiện vật mô hình, sa bàn với chủ đề \"Củ Chi đất thép thành đồng\"', '', 'Thành phố Hồ Chí Minh', ' 6, Phú Mỹ Hưng, Củ Chi, Thành phố Hồ Chí Minh', '11.146572869182558', '106.45980034137465', 0);

-- ----------------------------
-- Table structure for role
-- ----------------------------
DROP TABLE IF EXISTS `role`;
CREATE TABLE `role`  (
  `role` int NOT NULL,
  `roleName` varchar(255) CHARACTER SET utf8 COLLATE utf8_unicode_ci NULL DEFAULT NULL,
  PRIMARY KEY (`role`) USING BTREE,
  CONSTRAINT `fk_role_users` FOREIGN KEY (`role`) REFERENCES `user` (`role`) ON DELETE RESTRICT ON UPDATE RESTRICT
) ENGINE = InnoDB CHARACTER SET = utf8 COLLATE = utf8_unicode_ci ROW_FORMAT = DYNAMIC;

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
  `description` longtext CHARACTER SET utf8 COLLATE utf8_unicode_ci NULL,
  `placeID` int NULL DEFAULT NULL,
  `address` varchar(255) CHARACTER SET utf8 COLLATE utf8_unicode_ci NULL DEFAULT NULL,
  `hotline` varchar(255) CHARACTER SET utf8 COLLATE utf8_unicode_ci NULL DEFAULT NULL,
  `latitude` varchar(255) CHARACTER SET utf8 COLLATE utf8_unicode_ci NULL DEFAULT NULL COMMENT 'vi do',
  `longitude` varchar(255) CHARACTER SET utf8 COLLATE utf8_unicode_ci NULL DEFAULT NULL COMMENT 'kinh do',
  `isDisabled` tinyint(1) NULL DEFAULT NULL,
  PRIMARY KEY (`serviceID`) USING BTREE,
  INDEX `typeID`(`typeID` ASC) USING BTREE,
  INDEX `fk_services_place`(`placeID` ASC) USING BTREE,
  CONSTRAINT `fk_services_place` FOREIGN KEY (`placeID`) REFERENCES `place` (`placeID`) ON DELETE RESTRICT ON UPDATE RESTRICT,
  CONSTRAINT `fk_typeservice_service` FOREIGN KEY (`typeID`) REFERENCES `typeservice` (`typeID`) ON DELETE RESTRICT ON UPDATE RESTRICT
) ENGINE = InnoDB AUTO_INCREMENT = 18 CHARACTER SET = utf8 COLLATE = utf8_unicode_ci ROW_FORMAT = DYNAMIC;

-- ----------------------------
-- Records of services
-- ----------------------------
INSERT INTO `services` VALUES (3, 'Nam Cát Tiên Homestay', 1, 'Tọa lạc tại huyện Cát Tiên, \n    Nam Cat Tien Homestay có tầm nhìn ra khu vườn, nhà hàng, quầy lễ tân 24 giờ, quầy bar, khu vườn, sân chơi trẻ em và sân hiên tắm nắng. Homestay này có cả WiFi lẫn chỗ đỗ xe riêng miễn phí.\n    Mỗi phòng nghỉ tại đây đều đư', 1, '825 Ấp 1 Xã Nam Cát Tiên, huyện Tân Phú, Vườn Quốc Gia Cát Tiên, Đồng Nai, Vietnam', '0977468492', '11.425475737926927', '107.43513511066607', 0);
INSERT INTO `services` VALUES (4, 'Green Hope Lodge', 1, '    Green Hope Lodge cung cấp chỗ nghỉ mộc mạc, giản dị với phòng tắm riêng và khu vực tiếp khách tiện nghi. Chỗ nghỉ này có nhà hàng và lễ tân 24 giờ trong khuôn viên. Khách có thể truy cập WiFi miễn phí trong toàn bộ lodge.\r\n    Tọa lạc bên Sông Đồng Na', 74, 'Cát Tiên Hamlet 1, Đồng Nai, Vietnam', '0972184683', '11.426663402268858', '107.43440091066603', 1);
INSERT INTO `services` VALUES (7, 'Spring Garden Hotel', 1, 'Phòng ốc hiện đại, thoáng mát. Nhân viên lịch sự. Nơi đây có đầy đủ nhà hàng, karaoke, cafe nên khách không phải đi ra ngoài.', 73, 'Spring Garden Hotel', '0394952996', '10.91727948487271', '107.25910896515734', 0);
INSERT INTO `services` VALUES (8, 'Khách sạn Ngọc Mai', 1, 'Tọa lạc tại huyện Xuân Lộc, Ngoc Mai Hotel có khu vườn. Chỗ nghỉ có lễ tân 24 giờ, dịch vụ đưa đón sân bay, dịch vụ phòng và WiFi miễn phí trong toàn bộ khuôn viên.', 73, '01 Nguyễn Huệ, 241 Trần Phú, khu phố 5, Xuân Lộc, Đồng Nai , Vietnam', '0916763344', '10.924471908365554', '107.40870425484307', 0);
INSERT INTO `services` VALUES (9, 'HAPPYSON Hotel', 1, '    Hapyson cung cấp phòng nghỉ gắn máy điều hòa ở thành phố Long Khánh. Khách sạn này có dịch vụ phòng và sân hiên. Chỗ nghỉ cũng có trung tâm thể dục, lễ tân 24 giờ và WiFi miễn phí.\r\n    Phòng nghỉ của khách sạn được bố trí khu vực ghế ngồi. Tại Hapyso', 73, '50 Phạm Thế Hiển, Khu Phố 4, Long Khánh, Đồng Nai', '0251 3787 797', '10.933262308284721', '107.25682381251522', 0);
INSERT INTO `services` VALUES (10, 'Quán cơm Bà Cành', 2, 'Quán cơm bình dân với giá rẻ, thích hợp cho các bạn du lịch tiết kiệm chi phí', 73, '29GF+QR4, Chà Rang Suối CaoXuân Lộc,Đồng Nai, Suối Cao, Xuân Lộc, Đồng Nai, Vietnam', '01228987948', '11.02704102268979', '107.37456573949953', 0);
INSERT INTO `services` VALUES (12, 'Quán Trà Sữa Chỗ Cũ', 2, 'Quán trà sữa ngon, rẻ. Phục vụ tận tình và giá bình dân, khi du lịch ở Thác Mai bạn không nên bỏ lỡ', 73, ' Xuân Trường, Xuân Lộc District, Dong Nai', '0382336185', '11.023913426017161', '107.44528428465588', 0);
INSERT INTO `services` VALUES (13, 'Quán ăn Út Thảo', 2, 'Quán ăn với nhiều món ngon, bạn không nên bỏ lỡ khi du lịch thác mai', 73, '1246 ĐT766, Xuân Thành, Xuân Lộc, Đồng Nai', '0934164220', '11.020698418821128', '107.44079748182747', 0);
INSERT INTO `services` VALUES (14, 'Saigon Princess', 2, '     Trải nghiệm du thuyền 5 sao trên sống Sài Gòn\r\n     Du khách lên tàu du ngoạn trên sông Sài Gòn sẽ được phục vụ những món ăn Việt Nam hoặc Á - Âu kết hợp. Các món ăn được bài trí tinh tế, bắt mắt để tăng thêm phần sang trọng cho món ăn, cùng với phong cách phục vụ thân thiện, chuyên nghiệp.\r\n     Thực đơn đa dạng, bao gồm từ 4 đến 5 món, phục vụ mọi đối tượng, bao gồm cả những người ăn chay và trẻ em.', 83, 'Nha Rong Port, Phường 12, Quận 4, Thành phố Hồ Chí Minh', '0888901068', '10.76747940682261', '106.70767209277908', 0);
INSERT INTO `services` VALUES (15, 'Chợ Bến Thành', 2, 'Chợ nổi tiếng để mua đồ thủ công, lưu niệm, quần áo & hàng hóa khác đồng thời thưởng thức ẩm thực địa phương.', 5, ' Đường Lê Lợi, Phường Bến Thành, Quận 1, Thành phố Hồ Chí Minh', '', '10.772052490723826', '106.69827357930362', 0);
INSERT INTO `services` VALUES (16, 'The Odys Boutique Hotel', 1, 'Tọa lạc tại quận 1, thành phố Hồ Chí Minh, The Odys Hotel cách Chợ Bến Thành và Nhà hát lớn 5 phút lái xe. Khách sạn có nhà hàng và cung cấp WiFi miễn phí.\r\n\r\nKhách sạn cách các điểm tham quan như Dinh Thống Nhất và Nhà thờ Đức Bà 10 phút đi xe. Sân bay quốc tế Tân Sơn Nhất cách đó 30 phút lái xe.\r\n\r\nĐược trang bị sàn gỗ, các phòng hiện đại có máy điều hòa, TV màn hình phẳng với các kênh truyền hình cáp, két an toàn cá nhân và minibar. Phòng tắm riêng đi kèm bồn tắm, máy sấy tóc và đồ vệ sinh cá nhân.\r\n\r\nCung cấp dịch vụ phòng, nhà hàng cũng phục vụ bữa sáng tự chọn quốc tế hàng ngày.', 83, '67 - 69 Nguyễn Thái Bình, Phường Nguyễn Thái Bình, Quận 1, Thành phố Hồ Chí Minh', '02838216915', '10.76948068259002', '106.70014025775038', 0);
INSERT INTO `services` VALUES (17, 'Nhà hàng Bến Dược Củ Chi', 2, ' - Nhà hàng Bến Dược được xây dựng trên bờ sông Sài Gòn với phong cảnh thiên nhiên hữu tình, thoáng mát hứa hẹn sẽ mang lại cho thực khách một không gian trong lành để vừa thư giãn vừa thưởng thức các món ăn đặc sản sau những giờ tham quan đầy lý thú. Đến Nhà hàng Địa Đạo Củ Chi quý khách sẽ được thưởng thức những món ăn mang đậm hương vị đồng quê đặc trưng của vùng đất Đông Nam Bộ như: Canh chua lá giang, cá kho tộ, bánh tráng cá con, bánh xèo, bò tơ 7 món…với giá cả bình dân và cung cách phục vụ lịch sự, ân cần, chu đáo. Đặc biệt, nhà hàng còn có nhiều chế độ ưu đãi cho khách đi theo đoàn và đặt trước.', 85, 'ấp Phú Hiệp – xã Phú Mỹ Hưng – huyện Củ Chi – TP. Hồ Chí Minh.', '02837948822', '11.148810623876916', '106.45925493547735', 0);

-- ----------------------------
-- Table structure for trip
-- ----------------------------
DROP TABLE IF EXISTS `trip`;
CREATE TABLE `trip`  (
  `tripID` int NOT NULL AUTO_INCREMENT,
  `tripName` varchar(255) CHARACTER SET utf8 COLLATE utf8_unicode_ci NULL DEFAULT NULL,
  `city` varchar(255) CHARACTER SET utf8 COLLATE utf8_unicode_ci NULL DEFAULT NULL,
  `numberOfDays` int NULL DEFAULT 1,
  `isDisabled` tinyint NULL DEFAULT 0,
  `userID` int NULL DEFAULT NULL,
  `createAt` datetime NULL DEFAULT current_timestamp,
  `updateAt` datetime NULL DEFAULT current_timestamp ON UPDATE CURRENT_TIMESTAMP,
  PRIMARY KEY (`tripID`) USING BTREE
) ENGINE = InnoDB AUTO_INCREMENT = 12 CHARACTER SET = utf8 COLLATE = utf8_unicode_ci ROW_FORMAT = Dynamic;

-- ----------------------------
-- Records of trip
-- ----------------------------
INSERT INTO `trip` VALUES (8, 'Hành trình 2 ngày 1 đêm TP. HCM - Đồng Nai (Vườn Quốc Gia)', 'Đồng Nai', 2, 0, 1, '2022-05-20 23:21:06', '2022-05-31 18:37:32');
INSERT INTO `trip` VALUES (11, 'Trải nghiệm TP HCM 2 ngày 1 đêm', 'Thành phố Hồ Chí Minh', 2, 0, 1, '2022-05-31 21:02:03', '2022-05-31 21:02:03');

-- ----------------------------
-- Table structure for typeservice
-- ----------------------------
DROP TABLE IF EXISTS `typeservice`;
CREATE TABLE `typeservice`  (
  `typeID` int NOT NULL,
  `typeService` varchar(255) CHARACTER SET utf8 COLLATE utf8_unicode_ci NULL DEFAULT NULL,
  PRIMARY KEY (`typeID`) USING BTREE
) ENGINE = InnoDB CHARACTER SET = utf8 COLLATE = utf8_unicode_ci ROW_FORMAT = DYNAMIC;

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
  `role` int NULL DEFAULT 0 COMMENT '0 la nguoi dung, 1 la admin',
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
