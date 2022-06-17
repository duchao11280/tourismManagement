/*
 Navicat Premium Data Transfer

 Source Server         : dulich
 Source Server Type    : MySQL
 Source Server Version : 100421
 Source Host           : localhost:3306
 Source Schema         : tourismmanagement

 Target Server Type    : MySQL
 Target Server Version : 100421
 File Encoding         : 65001

 Date: 17/06/2022 20:33:58
*/

SET NAMES utf8mb4;
SET FOREIGN_KEY_CHECKS = 0;

-- ----------------------------
-- Table structure for comment
-- ----------------------------
DROP TABLE IF EXISTS `comment`;
CREATE TABLE `comment`  (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `userID` int(11) NULL DEFAULT NULL,
  `content` varchar(1000) CHARACTER SET utf8 COLLATE utf8_unicode_ci NULL DEFAULT NULL,
  `vote` int(11) NULL DEFAULT NULL,
  `placeID` int(11) NULL DEFAULT NULL,
  `time` datetime(0) NULL DEFAULT NULL,
  PRIMARY KEY (`id`) USING BTREE,
  INDEX `userID`(`userID`) USING BTREE,
  CONSTRAINT `fk_user_cmt` FOREIGN KEY (`userID`) REFERENCES `user` (`userID`) ON DELETE RESTRICT ON UPDATE RESTRICT
) ENGINE = InnoDB AUTO_INCREMENT = 14 CHARACTER SET = utf8 COLLATE = utf8_unicode_ci ROW_FORMAT = Dynamic;

-- ----------------------------
-- Records of comment
-- ----------------------------
INSERT INTO `comment` VALUES (12, 1, 'Nơi này mát lắm\n', 3, 1, '2022-04-04 12:28:00');
INSERT INTO `comment` VALUES (13, 1, 'Cho minh hoi la khi di Dinh Doc Lap co the chup anh duoc khong a', 4, 77, '2022-06-14 20:08:00');

-- ----------------------------
-- Table structure for detailtrip
-- ----------------------------
DROP TABLE IF EXISTS `detailtrip`;
CREATE TABLE `detailtrip`  (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `tripID` int(11) NOT NULL,
  `placeID` int(11) NULL DEFAULT NULL,
  `serviceID` int(11) NULL DEFAULT NULL,
  `type` tinyint(4) NULL DEFAULT 0 COMMENT '0 is place, 1 is service',
  `note` text CHARACTER SET utf8 COLLATE utf8_unicode_ci NULL,
  `day` int(11) NULL DEFAULT NULL,
  `timeClock` time(0) NULL DEFAULT NULL,
  `createAt` datetime(0) NULL DEFAULT current_timestamp(0),
  `updateAt` datetime(0) NULL DEFAULT current_timestamp(0) ON UPDATE CURRENT_TIMESTAMP(0),
  PRIMARY KEY (`id`) USING BTREE,
  INDEX `serviceID`(`serviceID`) USING BTREE,
  INDEX `placeID`(`placeID`) USING BTREE,
  INDEX `fk_detailtrip_trip`(`tripID`) USING BTREE,
  CONSTRAINT `fk_detailtrip_place` FOREIGN KEY (`placeID`) REFERENCES `place` (`placeID`) ON DELETE RESTRICT ON UPDATE RESTRICT,
  CONSTRAINT `fk_detailtrip_service` FOREIGN KEY (`serviceID`) REFERENCES `services` (`serviceID`) ON DELETE RESTRICT ON UPDATE RESTRICT,
  CONSTRAINT `fk_detailtrip_trip` FOREIGN KEY (`tripID`) REFERENCES `trip` (`tripID`) ON DELETE RESTRICT ON UPDATE RESTRICT
) ENGINE = InnoDB AUTO_INCREMENT = 50 CHARACTER SET = utf8 COLLATE = utf8_unicode_ci ROW_FORMAT = Dynamic;

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
INSERT INTO `detailtrip` VALUES (31, 8, NULL, 3, 1, 'Ăn trưa, nghỉ ngơi và trả phòng. Về lại TP. Hồ Chí Minh.', 2, '11:45:00', '2022-05-31 18:43:59', '2022-06-10 10:06:54');
INSERT INTO `detailtrip` VALUES (32, 11, 77, NULL, 0, 'Tham quan Dinh Thống Nhất, đây là cơ quan đầu não của chính phủ thời chiến.', 1, '08:15:00', '2022-05-31 21:02:03', '2022-05-31 21:02:03');
INSERT INTO `detailtrip` VALUES (33, 11, 76, NULL, 0, 'Khi đi nhà Thờ Đức Bà nhớ mang theo máy ảnh và những bộ trang phục đẹp để lên hình nhé', 1, '09:00:00', '2022-05-31 21:02:03', '2022-06-14 20:15:08');
INSERT INTO `detailtrip` VALUES (34, 11, 80, NULL, 0, NULL, 1, '09:30:00', '2022-05-31 21:02:03', '2022-05-31 21:02:03');
INSERT INTO `detailtrip` VALUES (35, 11, 81, NULL, 0, 'Thứ 2 không mở cửa', 1, '10:15:00', '2022-05-31 21:02:03', '2022-05-31 21:02:03');
INSERT INTO `detailtrip` VALUES (36, 11, 83, NULL, 0, NULL, 1, '15:30:00', '2022-05-31 21:02:03', '2022-05-31 21:02:03');
INSERT INTO `detailtrip` VALUES (37, 11, NULL, 14, 1, 'Trẻ em dưới 6 tuổi được phục vụ miễn phí.\nCó mặt lúc 18h30 để lên thuyền. Thuyền sẽ khởi hành vào lúc 19h15 và ăn tối tới 21h.', 1, '18:30:00', '2022-05-31 21:02:03', '2022-05-31 21:02:03');
INSERT INTO `detailtrip` VALUES (38, 11, NULL, 15, 1, 'Ghé chợ mua đồ lưu niệm', 1, '14:00:00', '2022-05-31 21:24:32', '2022-05-31 21:24:32');
INSERT INTO `detailtrip` VALUES (39, 11, NULL, 16, 1, 'Về khách sạn nghỉ ngơi', 1, '21:30:00', '2022-05-31 21:33:49', '2022-05-31 21:33:49');
INSERT INTO `detailtrip` VALUES (40, 11, NULL, 16, 1, 'Trả phòng, lên xe di chuyển tới địa điểm tiếp theo', 2, '07:00:00', '2022-05-31 21:39:18', '2022-05-31 21:39:18');
INSERT INTO `detailtrip` VALUES (41, 11, 84, NULL, 0, 'Có thể đi ô tô hoặc bus\nBạn đi xe bus số 13 (Bến Thành – Củ Chi) hoặc số 94 (Chợ Lớn – Củ Chi) để đến bến xe Củ Chi, rồi từ đây nhảy bus số 79 (Củ Chi – Dầu Tiếng) để đến địa đạo Bến Dược.', 2, '09:00:00', '2022-05-31 22:09:42', '2022-05-31 22:09:42');
INSERT INTO `detailtrip` VALUES (42, 11, 85, NULL, 0, '', 2, '10:30:00', '2022-05-31 22:10:41', '2022-05-31 22:10:41');
INSERT INTO `detailtrip` VALUES (43, 11, NULL, 17, 1, 'Ăn trưa, nghỉ ngơi và kết thúc hành trình.', 2, '11:15:00', '2022-05-31 22:11:24', '2022-06-14 16:37:12');
INSERT INTO `detailtrip` VALUES (44, 12, 77, NULL, 0, 'Bắt xe bus số 04, 152, 30, 36, 52, 93.', 1, '08:00:00', '2022-06-14 15:23:58', '2022-06-14 15:23:58');
INSERT INTO `detailtrip` VALUES (45, 12, 76, NULL, 0, 'Chụp hình ở đài ', 1, '09:00:00', '2022-06-14 15:23:58', '2022-06-14 15:23:58');
INSERT INTO `detailtrip` VALUES (46, 12, 80, NULL, 0, 'Tham quan bưu điện', 1, '09:30:00', '2022-06-14 15:23:58', '2022-06-14 15:23:58');
INSERT INTO `detailtrip` VALUES (47, 12, 97, NULL, 0, 'Mua sách, thưởng thức cafe và kết thúc hành trình.', 1, '10:00:00', '2022-06-14 15:23:58', '2022-06-14 16:34:54');
INSERT INTO `detailtrip` VALUES (48, 13, 5, NULL, 0, 'Các tuyến xe Bus tới Đầm Sen: 11, 15, 38, 64, 69. Đi sớm để chơi được nhiều trò chơi', 1, '08:00:00', '2022-06-14 15:45:38', '2022-06-14 15:45:38');
INSERT INTO `detailtrip` VALUES (49, 13, NULL, 33, 1, 'Kết thúc một ngày vui chơi bằng một bữa Buffet', 1, '16:00:00', '2022-06-14 15:45:38', '2022-06-14 15:45:38');

-- ----------------------------
-- Table structure for feedback
-- ----------------------------
DROP TABLE IF EXISTS `feedback`;
CREATE TABLE `feedback`  (
  `feedbackID` int(11) NOT NULL AUTO_INCREMENT,
  `content` varchar(255) CHARACTER SET utf8mb4 COLLATE utf8mb4_general_ci NULL DEFAULT NULL,
  `userID` int(11) NULL DEFAULT NULL,
  `title` varchar(40) CHARACTER SET utf8mb4 COLLATE utf8mb4_general_ci NULL DEFAULT NULL,
  `userName` varchar(255) CHARACTER SET utf8mb4 COLLATE utf8mb4_general_ci NULL DEFAULT NULL,
  PRIMARY KEY (`feedbackID`) USING BTREE,
  INDEX `fk_feedback_place`(`userID`) USING BTREE,
  CONSTRAINT `fk_feedback_user` FOREIGN KEY (`userID`) REFERENCES `user` (`userID`) ON DELETE RESTRICT ON UPDATE RESTRICT
) ENGINE = InnoDB AUTO_INCREMENT = 25 CHARACTER SET = utf8mb4 COLLATE = utf8mb4_general_ci ROW_FORMAT = Dynamic;

-- ----------------------------
-- Table structure for image
-- ----------------------------
DROP TABLE IF EXISTS `image`;
CREATE TABLE `image`  (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `image` varchar(255) CHARACTER SET utf8mb4 COLLATE utf8mb4_general_ci NULL DEFAULT NULL,
  `placeID` int(11) NULL DEFAULT NULL,
  `serviceID` int(11) NULL DEFAULT NULL,
  `isDeleted` tinyint(1) NULL DEFAULT NULL,
  PRIMARY KEY (`id`) USING BTREE,
  INDEX `fk_image_place`(`placeID`) USING BTREE,
  INDEX `fk_image_contribute`(`serviceID`) USING BTREE,
  CONSTRAINT `fk_image_place` FOREIGN KEY (`placeID`) REFERENCES `place` (`placeID`) ON DELETE RESTRICT ON UPDATE RESTRICT,
  CONSTRAINT `fk_image_service` FOREIGN KEY (`serviceID`) REFERENCES `services` (`serviceID`) ON DELETE RESTRICT ON UPDATE RESTRICT
) ENGINE = InnoDB AUTO_INCREMENT = 119 CHARACTER SET = utf8mb4 COLLATE = utf8mb4_general_ci ROW_FORMAT = Dynamic;

-- ----------------------------
-- Records of image
-- ----------------------------
INSERT INTO `image` VALUES (11, '1650619782276_giangdien4.jpg', 1, NULL, 1);
INSERT INTO `image` VALUES (12, '1650619782283_giangdien5.jpg', 1, NULL, 1);
INSERT INTO `image` VALUES (13, '1650619879638_giangdien.jpg', 1, NULL, 1);
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
INSERT INTO `image` VALUES (34, '1651018963806_guest.jpg', NULL, 7, 1);
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
INSERT INTO `image` VALUES (54, '1654008893074_dia-dao-cu-chi1.jpg', 84, NULL, 1);
INSERT INTO `image` VALUES (55, '1654009364962_Ben_Duoc_CuChi.jpg', 85, NULL, 0);
INSERT INTO `image` VALUES (56, '1654009648152_NH_BENDUOC.jpg', NULL, 17, 0);
INSERT INTO `image` VALUES (57, '1654009975426_bennharong.jpg', 83, NULL, 0);
INSERT INTO `image` VALUES (58, '1654010039494_buu-dien-sai-gon.jpg', 80, NULL, 0);
INSERT INTO `image` VALUES (59, '1654010101602_btlsvn.jpg', 81, NULL, 0);
INSERT INTO `image` VALUES (60, '1654010149138_btcdhcm.jpg', 82, NULL, 0);
INSERT INTO `image` VALUES (61, '1654010260299_SaigonPrincess.jpg', NULL, 14, 0);
INSERT INTO `image` VALUES (62, '1654670344601_nui_chua_chan.jpg', 3, NULL, 0);
INSERT INTO `image` VALUES (63, '1654671771615_Khu_du_lich_vuon_xoai.jpg', 4, NULL, 0);
INSERT INTO `image` VALUES (64, '1654672030569_Dam_sen.jpg', 5, NULL, 0);
INSERT INTO `image` VALUES (65, '1654672440727_Dia-Dao-Cu-Chi-003.jpg', 84, NULL, 0);
INSERT INTO `image` VALUES (66, '1654672658098_thac_da_han.png', 6, NULL, 0);
INSERT INTO `image` VALUES (80, '1654685912549_pho_di_bo.png', 89, NULL, 0);
INSERT INTO `image` VALUES (81, '1654685912552_pho_di_bo2.png', 89, NULL, 0);
INSERT INTO `image` VALUES (82, '1654686170938_cafe_thinker.png', NULL, 22, 0);
INSERT INTO `image` VALUES (83, '1654686170940_cafe_thinker2.png', NULL, 22, 0);
INSERT INTO `image` VALUES (84, '1654686494087_sh_garden.jpg', NULL, 23, 0);
INSERT INTO `image` VALUES (85, '1654686494088_sh_garden2.jpg', NULL, 23, 0);
INSERT INTO `image` VALUES (86, '1654686772670_AU_lac_charner.png', NULL, 24, 0);
INSERT INTO `image` VALUES (87, '1654686772670_AU_lac_charner2.png', NULL, 24, 0);
INSERT INTO `image` VALUES (88, '1654687362736_HaTrinhHotel.jpg', NULL, 25, 0);
INSERT INTO `image` VALUES (89, '1654687362738_HaTrinhHotel2.jpg', NULL, 25, 0);
INSERT INTO `image` VALUES (90, '1654757215016_dao_o2.jpg', 90, NULL, 0);
INSERT INTO `image` VALUES (91, '1654757215013_dao_o.jpg', 90, NULL, 0);
INSERT INTO `image` VALUES (92, '1654757770263_Nha_hang_dao_o.jpg', NULL, 26, 0);
INSERT INTO `image` VALUES (93, '1654760963489_Nguyen_Tram_hotel.jpg', NULL, 27, 0);
INSERT INTO `image` VALUES (94, '1654760963492_Nguyen_Tram_hotel2.jpg', NULL, 27, 0);
INSERT INTO `image` VALUES (95, '1654761436098_Khach_san_anPhu.jpg', NULL, 28, 0);
INSERT INTO `image` VALUES (96, '1654761436099_Khach_san_anPhu2.jpg', NULL, 28, 0);
INSERT INTO `image` VALUES (97, '1654761813972_hoasonquan.png', NULL, 29, 0);
INSERT INTO `image` VALUES (98, '1654761813972_hoasonquan2.png', NULL, 29, 0);
INSERT INTO `image` VALUES (99, '1654762105517_tre-xanh-hotel-giang.jpg', NULL, 30, 0);
INSERT INTO `image` VALUES (100, '1654762105518_tre-xanh-hotel-giang2.jpg', NULL, 30, 0);
INSERT INTO `image` VALUES (101, '1654762105520_tre-xanh-hotel-giang3.jpg', NULL, 30, 0);
INSERT INTO `image` VALUES (102, '1654832657699_DaBaChong.png', 91, NULL, 0);
INSERT INTO `image` VALUES (103, '1654832657700_DaBaChong2.png', 91, NULL, 0);
INSERT INTO `image` VALUES (104, '1654832878853_Van-mieu-Tran-Bien.png', 92, NULL, 0);
INSERT INTO `image` VALUES (105, '1654832878855_Van-mieu-Tran-Bien2.png', 92, NULL, 0);
INSERT INTO `image` VALUES (106, '1654833175274_UtTieuLongKhanh.png', 93, NULL, 0);
INSERT INTO `image` VALUES (107, '1654833175276_UtTieuLongKhanh2.png', 93, NULL, 0);
INSERT INTO `image` VALUES (108, '1654850187203_kdlsuoitien1.jpg', 94, NULL, 0);
INSERT INTO `image` VALUES (109, '1654851760473_chuamotcottd1.jpg', 95, NULL, 0);
INSERT INTO `image` VALUES (110, '1654851760476_chuamotcottd2.jpg', 95, NULL, 0);
INSERT INTO `image` VALUES (111, '1654852051332_vincomtd1.jpg', NULL, 31, 0);
INSERT INTO `image` VALUES (112, '1654852365517_chotd1.jpg', NULL, 32, 0);
INSERT INTO `image` VALUES (113, '1654853073441_kdlbcr1.jpg', 96, NULL, 0);
INSERT INTO `image` VALUES (114, '1655194132796_duongsach1.jpg', 97, NULL, 0);
INSERT INTO `image` VALUES (115, '1655194132802_duongsach2.jpg', 97, NULL, 0);
INSERT INTO `image` VALUES (116, '1655194132812_duongsach3.jpg', 97, NULL, 0);
INSERT INTO `image` VALUES (117, '1655195879343_KingBBQBuffet1.jpg', NULL, 33, 0);
INSERT INTO `image` VALUES (118, '1655197108521_sasin1.jpg', NULL, 34, 0);

-- ----------------------------
-- Table structure for notification
-- ----------------------------
DROP TABLE IF EXISTS `notification`;
CREATE TABLE `notification`  (
  `notificationID` int(11) NOT NULL AUTO_INCREMENT,
  `title` varchar(255) CHARACTER SET utf8mb4 COLLATE utf8mb4_general_ci NULL DEFAULT NULL,
  `content` text CHARACTER SET utf8mb4 COLLATE utf8mb4_general_ci NULL,
  `time` datetime(6) NULL DEFAULT NULL,
  PRIMARY KEY (`notificationID`) USING BTREE
) ENGINE = InnoDB AUTO_INCREMENT = 2 CHARACTER SET = utf8mb4 COLLATE = utf8mb4_general_ci ROW_FORMAT = Dynamic;

-- ----------------------------
-- Records of notification
-- ----------------------------
INSERT INTO `notification` VALUES (1, 'Hè 2022, Đầm Sen miễn vé vào cổng cho học sinh giỏi, cháu ngoan Bác Hồ', 'Theo đó, từ ngày 28.5, để miễn phí vé vào cổng, học sinh giỏi hoặc cháu ngoan Bác Hồ cần đem theo giấy khen của năm học 2021 - 2022 đến bàn tiếp nhận (trước cổng nội bộ sau khu bán vé). Mỗi giấy khen được nhận 1 vé hè 2022. Không áp dụng cho người đi cùng và không giải quyết bản photo.', '2022-06-14 16:47:00.000000');

-- ----------------------------
-- Table structure for place
-- ----------------------------
DROP TABLE IF EXISTS `place`;
CREATE TABLE `place`  (
  `placeID` int(11) NOT NULL AUTO_INCREMENT,
  `placeName` varchar(255) CHARACTER SET utf8mb4 COLLATE utf8mb4_general_ci NULL DEFAULT NULL,
  `description` text CHARACTER SET utf8mb4 COLLATE utf8mb4_general_ci NULL,
  `tips` text CHARACTER SET utf8mb4 COLLATE utf8mb4_general_ci NULL COMMENT 'meo khi di du lich tai dia diem',
  `city` varchar(255) CHARACTER SET utf8mb4 COLLATE utf8mb4_general_ci NULL DEFAULT NULL,
  `address` varchar(255) CHARACTER SET utf8mb4 COLLATE utf8mb4_general_ci NULL DEFAULT NULL,
  `latitude` varchar(255) CHARACTER SET utf8mb4 COLLATE utf8mb4_general_ci NULL DEFAULT NULL,
  `longitude` varchar(255) CHARACTER SET utf8mb4 COLLATE utf8mb4_general_ci NULL DEFAULT NULL,
  `isDeleted` tinyint(1) NULL DEFAULT NULL,
  PRIMARY KEY (`placeID`) USING BTREE
) ENGINE = InnoDB AUTO_INCREMENT = 98 CHARACTER SET = utf8mb4 COLLATE = utf8mb4_general_ci ROW_FORMAT = Dynamic;

-- ----------------------------
-- Records of place
-- ----------------------------
INSERT INTO `place` VALUES (1, 'Thác Giang Điền', 'Thác Giang Điền là địa điểm thu hút rất nhiều bạn trẻ và các hộ gia đình kéo nhau về đây tổ chức cắm trại, tắm thác và tổ chức ăn uống. Với khung cảnh hoang sơ được bao bọc...', 'Mang theo đồ để cắm trại như: Thảm,  than, bếp nướng,...', 'Đồng Nai', '104/4 Khu Công Nghiệp Giang Điền, Giang Điền, Trảng Bom, Đồng Nai', '10.91835231762526', '106.99170559686634', 0);
INSERT INTO `place` VALUES (3, 'Núi Chứa Chan', 'Ngọn núi cao thứ hai ở Đông Nam Bộ có nhiều rừng rậm, vách đá dựng đứng... được các bạn trẻ chọn để khám phá khi rảnh rỗi.', '    Thời điểm lý tưởng để đi leo núi Chứa Chan là từ tháng 10 đến tháng 4 năm sau. Bởi đây là lúc bước vào mùa khô, nên có thể dễ dàng hơn khi di chuyển. \r\n\r\n    Mặc dù thời tiết quanh năm nắng nóng thế nhưng khi lên tới đỉnh núi Chứa Chan tuy nhiên vào buổi đêm tại đây còn se lạnh một chút nên đừng quên chuẩn bị một chiếc áo khoác để không bị lạnh nhé!\r\n    Bên cạnh việc chuẩn bị đồ ăn thì bạn cũng nên mang theo nước uống đảm bảo trong suốt hành trình. Vì trên đường leo núi Chứa Chan theo hướng cột điện bạn sẽ không gặp hàng quán nào trong suốt quá trình di chuyển. ', 'Đồng Nai', 'Xuân Lộc, Đồng Nai, Việt Nam', '10.937724886779066', ' 107.37653504621149', 1);
INSERT INTO `place` VALUES (4, 'Vườn Xoài', 'Khu Du Lịch Sinh Thái Vườn Xoài hoàn toàn gần gũi với thiên nhiên đất trời cỏ cây hoa lá. Chỉ cách thành phố Hồ Chí Minh chưa đầy 40km, nằm trên đường Võ Nguyên Giáp (đường tránh thành phố Biên Hòa). Tọa lạc tại số 537 đường Đinh Quang Ân, khu phố Tân Cang, phường Phước Tân, thành phố Biên Hòa, tỉnh Đồng Nai nhưng nơi đây lại có không gian yên bình xa rời với thành thị ồn ào náo nhiệt. Không khí trong lành của một miền xanh mướt rộng lớn trên 50ha. Vườn Xoài là điểm đến lý tưởng cho du khách “Tham quan sở thú, dã ngoại, giải trí, nghỉ dưỡng, ẩm thực & tổ chức sự kiện”.\n', 'Du khách có thể tự mình đi xe đạp, đi xe điện dạo quanh Hồ Hương Giang, Hồ Mẫu Tử, Hồ Hoài Nam... để cảm nhận làn gió mát cùng bầu không khí trong lành, ngắm những chú cá đùa nhau tinh nghịch, ngắm vườn hoa lan, vườn tre, các chậu cây bonsai, thảm cỏ xanh non, quảng trường Thảo Nguyên, đặc biệt các em nhỏ sẽ rất thích thú tham quan, chụp hình với những loài thú quý hiếm của Sở Thú Vườn Xoài được nhập về từ khắp nơi trên thế giới', 'Đồng Nai', '537 Đinh Quang Ân, Phước Tân, Tan Cang Hamlet, Đồng Nai, Việt Nam', '10.922729225747766', '106.93530863130263', 1);
INSERT INTO `place` VALUES (5, 'Công viên nước Đầm Sen', 'Nơi đây được ví là “ốc đảo xanh” với 36 thiết bị dưới nước hiện đại cùng nhiều trò chơi cảm giác mạnh đến nhẹ, phù hợp với mọi lứa tuổi. Vì vậy, bạn có thể vui chơi cả ngày mà không thấy chán.', 'Nên tắm sơ trước khi bơi để hạn chế khả năng hấp thu nước Clo trong hồ bơi.\nNgăn chặn tình trạng sạm da bằng cách dùng kem dưỡng ẩm, lotion và kem chống nắng.\nKhi tham gia máng trượt bạn nên mặc quần áo gọn gàng, không mang các vật dụng sắc nhọn để tránh bị thương\n\nCác tuyến xe bus đi đến đầm sen:\n- Số 15: Khởi hành từ Trường Nguyễn Thị Định đến Đầm Sen ( thời gian đi 45p)\n- Số 38: Khởi hành từ đầu bến Tân Quy đến Đầm Sen ( thời gian đi 46p)\n- Số 64: Khởi hành từ bến xe Miền Đòng đến Đầm Sen ( Thời gian đi 50p)\n', 'Thành phố Hồ Chí Minh', 'Phường 3, Quận 11, Thành phố Hồ Chí Minh', '10.769043256154914', '106.63598079453665', 0);
INSERT INTO `place` VALUES (6, 'Thác Đá Hàn', 'Khu du lịch thác Đá Hàn là một trong những điểm mới lạ để cho các bạn trẻ tới khám phá. Với vẻ đẹp thiên nhiên hoang sơ và hùng vĩ khó cưỡng, thác nước hữu tình điểm thêm vườn trái cây trĩu quả. Với những bạn yêu thích đi phượt thì địa điểm này hứa hẹn sẽ là điểm đến lý tưởng để dã ngoại, cắm trại những ngày cuối tuần.', 'Hãy mặc trang phục thoải mái, đi giày thể thao để bảo vệ sức khỏe trong thời gian di chuyển.\nCần mang thuốc xịt đề phòng côn trùng cắn', 'Đồng Nai', 'Tổ 15, Ấp 5, Sông Trầu, Trảng Bom, Đồng Nai, Việt Nam', '11.054820078965946', '107.40045249717184', 1);
INSERT INTO `place` VALUES (73, 'Thác Mai', 'Thác Mai hay còn gọi đầy đủ là khu du lịch sinh thái bàu nước sôi – Thác Mai. Nằm trên địa phận xã Gia Canh, huyện Định Quán, tỉnh Đồng Nai và nằm cách thành phố Hồ Chí Minh tầm 130km. Đây là điểm du lịch nằm sâu trong rừng nguyên sinh bạt ngạt sẽ rất thích hợp với những bạn mê phượt.\nTrên ranh giới giữa hai tỉnh Bình Thuận, Đồng Nai, Thác Mai là một địa điểm thiên nhiên kỳ thú, còn lưu giữ được vẻ hoang sơ.\nThác rất lớn, có chiều dài khoảng 2 km, được hợp thành từ vô số dòng suối, thác và sông con. Thác Mai gai góc, lởm chởm và bí hiểm. Nước nối tiếp nhau xô vào đá, đá nối tiếp nhau trùng điệp, như dòng thác không có chỗ tận cùng.\n', 'Nếu bạn nào định tìm đường tới Thác Mai bằng Google Map thì cần phải hết sức lưu ý. Bởi vì bản đồ sẽ hướng dẫn chúng ta đi con đường ngắn hơn, tuy nhiên điểm đến lại là đường cụt ngay bờ sông và thác Mai lại ở bên kia sông. Chính vì vậy bạn cần phải có một hướng dẫn viên có kinh nghiệm đầy đặn.\nKhi đi Thác Mai, bạn nên đi theo nhóm nhiều người, vì bạn sẽ đi trong đường rừng, vắng hoe. Nhớ mang theo sẵn các vật dụng, thực phẩm, thuốc và trang bị y tế phòng những tình huống không may mắn xảy ra.\nTrong quá trình vui chơi, nên tránh xa các bảng cảnh báo vì tại suối có nhiều điểm nước xoáy rất nguy hiểm.\n Khi về, nên về sớm trước 16h vì đường rừng tắt nắng rất nhanh khá nguy hiểm, dễ lạc đường, sóng điện thoại tại đây rất yếu. \n', 'Đồng Nai', 'Gia Canh, Định Quán, Đồng Nai', '11.054672233752195', '107.40044211059971', 0);
INSERT INTO `place` VALUES (74, 'Rừng Quốc Gia Nam Cát Tiên', 'Nam Cát Tiên là tên gọi một vùng đất nằm trọn trong đoạn uốn khúc của sông Đồng Nai, tọa lạc ngay trên ranh giới của cả ba tỉnh Đồng Nai, Bình Phước và Lâm Đồng. Khu rừng cấm Nam Cát Tiên có diện tích 36.000ha, đại diện cho cả hệ thực vật và động vật Nam Bộ.\r\nNơi đây có cảnh thiên nhiên đa dạng: Vừa có đồi, vừa có bãi ven sông, vừa có các trảng rộng lớn bằng phẳng, lại có các dòng chảy dốc. \r\nRừng ở đây có nhiều cây cổ thụ như bằng lăng, gỗ đỏ và hơn 600 loài thực vật.\r\nVề động vật có 240 loài chim, có những loài chim quý hiếm như trĩ lông đỏ, cò quắm xanh, tê giác một sừng,...', 'Thời điểm thích hợp để du lịch từ là vào khoảng tháng 12 – tháng 5. Bởi vì trong thời gian, tại rừng Nam Cát Tiên ít mưa, rừng khô ráo.\nVới những bạn thích đi phượt và có kinh phí hạn hẹp thì có thể lựa chọn mang theo lều trại để cắm trại trong rừng, chắn chắn sẽ đỡ tốn chi phí hơn nhiều', 'Đồng Nai', 'Nam Cát Tiên, Tân Phú, Đồng Nai', '11.423294791892964', '107.43066356749813', 0);
INSERT INTO `place` VALUES (75, 'Chùa Bửu Phong', '      Chùa Bửu Phòng nằm trên núi Bửu Long, thuộc xã Tân Bửu, Tỉnh Đồng Nai, cách thành phố Biên Hòa 6km.\r\n       Chùa được xây dựng vào thế kỷ XVII, lúc đầu chùa chỉ là thảo am nhỏ, sau đó trùng tu mở rộng vào năm 1829 và các năm gần đây. Đây là ngôi chùa cổ kính có những pho tượng với những nét điêu khắc đặc biệt Á Đông', '    Chùa rất rộng nên phải đi bộ nhiều, bạn nên mặc đồ mỏng, có chất liệu thoáng mát và nên sử dụng giày dép đế thấp tiện cho việc di chuyển.\n\n', 'Đồng Nai', 'B31, Huỳnh Văn Nghệ, Khu Phố 5, P, Thành phố Biên Hòa, Đồng Nai', '10.96774591813126', '106.79999308283477', 0);
INSERT INTO `place` VALUES (76, 'Nhà Thờ Đức Bà', '    Nhà thờ Đức Bà là công trình kiến trúc lớn ở Quảng trường Công xã Pari, trung tâm thành phố, với hai tháp chuông cao 40m.\r\n    Ngày 7/10/1877, một cha cố người pháp tên là Colombert đã đặt viên đá đầu tiên và đến ngày 11/4/1880 thì khánh thành. Bản đồ án thiết kế vẽ từ bên Pháp, do kỹ sư người Pháp chỉ huy thực hiện với tổng số tiền là hai triệu rưỡi quan lúc bấy giờ. Ngày 7 và 8 tháng 12 năm 1959, theo sự chấp thuận của tòa thánh Vaticang, nhà thờ đã làm lễ xúc dầu, đặt tên là Vương Cung thánh đường', '    Nếu đến thăm nhà thờ, bạn hãy chuẩn bị sẵn một chút vụn bánh mì hoặc hạt. Bởi ở đây sẽ có những chú chim bồ câu cực “hiếu khách”, sẵn sàng tới chào bạn và nhảy lên tay chơi đùa cùng bạn đó.\r\n', 'Thành phố Hồ Chí Minh', '01 Công xã Paris, Bến Nghé, Quận 1, Thành phố Hồ Chí Minh, Vietnam', '10.779911966388712', '106.69905108283332', 0);
INSERT INTO `place` VALUES (77, 'Dinh Thống Nhất', '    Khi nói đến Sài Gòn, không ai không liên tưởng đến dinh Thống Nhất với vai trò lịch sử đối với dân tộc Việt Nam, vị trí được xác lập trong giao lưu kinh tế, trính trị, xã hội đối với toàn vùng Đông Nam Á cũng như trên thế giới.\r\n    Mặt tiền của dinh Thống Nhất nằm trên ngã ba đường Nam Kỳ Khởi Nghĩa và đường Lê Duẩn, khuôn viên rộng 15ha.\r\n    Sau chiến dịch Hồ Chí Minh, Dinh Độc Lập là nơi làm việc của ủy ban Quân Quản thành phố Sài Gòn. Tháng 12/1975 tại đây diễn ra hội nghị Hiệp thương thống nhất đất nước. Cũng tại nơi đây đã diễn ra những cuộc họp quan trọng của Trung ương Đảng Công sản Việt Nam và một số đoàn thể để bàn việc thống nhất các tổ chức. Với ý nghĩa lịch sử đó dinh Độc Lập đổi tên thành Hội trường Thống Nhất', '    Giá vé vào Dinh Độc Lập 2021: 40.000đ/ người lớn. Nếu tham quan thêm nhà trưng bày, bạn cần mua thêm vé 25.000đ nữa. Mình muốn đi cả hai nên tổng vé vào cửa của mình là 65.000đ. Có thẻ sinh viên được giảm giá nên nếu có hãy mang theo nhé!\nCác tuyến bus đi đến Dinh Thống Nhất\n- Số 04: Khởi hành từ Bến xe An Sương đến Dinh Thống Nhất (thời gian đi 49 phút)\n- Số 14: \nKhởi hành từ Bến xe Miền Tây đến Dinh Thống Nhất (thời gian đi 47 phút)\nKhởi hành từ Bến xe Miền Đông đến Dinh Thống Nhất ( thời gian đi 30 phút)\n- Số 93: Khởi hành từ Bến xe Miền Đông đến Dinh Thống Nhất ( thời gian đi 26 phút)', 'Thành phố Hồ Chí Minh', '135 Đ. Nam Kỳ Khởi Nghĩa, Phường Bến Thành, Quận 1, Tp.HCM', '10.777836883913713', '106.69526516749279', 0);
INSERT INTO `place` VALUES (78, 'Thác Trời', 'Thác Trời có cảnh quan thiên nhiên khá đẹp, được ví như một bức tranh hùng vĩ, hoang sơ của núi rừng. Trong những ngày nắng sau mưa, nước chảy mạnh qua màn hơi nước tạo thành vô số cầu vồng nhấp nhô giữa rừng cây làm thành bức tranh tuyệt đẹp. Không khí ở Thác Trời khá mát mẻ và trong lành, đến với Thác Trời du khách có thể tham quan, dã ngoại cắm trại cùng gia đình và bạn bè, tận hưởng nét hoang sơ, thuần khiết nơi dòng suối trong mát như đưa du khách thưởng lãm vào một thế giới thiên nhiên vô tận. Nguồn: ttxtdldongnai.vn', 'Nếu đã đi du lịch đến Vườn Quốc Gia Nam Cát Tiên thì thác Trời là một điểm không thể thiếu, chúng ta nên thuê ca nô để trải nghiệm nơi đây.', 'Đồng Nai', 'Tân Phú, Đồng Nai', '11.450264336833643', '107.44278303761051', 0);
INSERT INTO `place` VALUES (79, 'Ghềnh Bến Cự', '    Khu vực này trước đây là nơi tập kết để vận chuyển lương thực, thuốc men và nhu yếu phẩm của bộ đội ta trong thời kỳ kháng chiến. Cũng là nơi xây dựng Hạt kiểm lâm đầu tiên của khu rừng Cấm Nam bãi Cát Tiên vào năm 1978. Đây là điểm cắm trại dã ngoại lý tưởng, bởi bạn có thể thư giãn dưới tán cây, vừa trò chuyện, vừa có thể ngắm nhìn những con thú nô đùa trên cây hoặc đi bộ trên những tảng đá. Nguồn: triphunter.vn', '     Bạn có thể mang theo một chút đồ ăn nhẹ và ngồi nghỉ tại đây. Vừa ăn uống vừa nhìn các loài động vật đi ngang qua đây là một trải nghiệm hết sức thú vị.', 'Đồng Nai', 'Tân Phú, Đồng Nai', '11.435298558548437', '107.42920352335004', 0);
INSERT INTO `place` VALUES (80, 'Bưu Điện Thành Phố Hồ Chí Minh', '   Bưu điện trung tâm Sài Gòn nằm đối diện với nhà thờ Đức Bà nên việc di chuyển rất thuận tiện cho du khách. \n   Đây là một trong những công trình kiến trúc độc đáo nhất của thành phố, bưu điện chính là địa điểm du lịch hấp dẫn mà du khách nên ghé đến trong chuyến du lịch Sài Gòn. \n     Đặc biệt thiết kế hình mái vòm tạo cảm giác hoài cổ và rộng lớn cho du khách. Bưu điện vẫn giữ những hòm thư cổ, bốt điện thoại, các đồ lưu niệm như tem hay thư xưa. Ngay giữa lòng một Sài Gòn hoa lệ mà lại có một công trình kiến trúc kết hợp giữa châu Âu và châu Á đầy độc đáo như vậy. \n', 'Bạn có thể đi xe máy, ô tô hay sử dụng các phương tiện công cộng như xe buýt đều được. Một số tuyến xe buýt sẽ dừng lại ở gần bưu điện như:\n- Số 06: Khởi hành từ trường ĐH Sài Gòn đến Bưu điện Thành phố (thời gian đi 18 phút)\n- Số 14: Khởi hành từ Chợ hoa Hồ Thị Kỷ đến Bưu điện Thành phố (thời gian 27 phút)\n- Số 18: Khởi hành từ Công viên Lê Văn Tám đến Bưu điện Thành phố (thời gian đi 10 phút)\n- Số 150: Khởi hành từ Bến xe Miền Đông đến Bưu điện Thành phố (thời gian đi 67 phút)\n', 'Thành phố Hồ Chí Minh', '125 Hai Bà Trưng, Bến Nghé, Quận 1, Thành phố Hồ Chí Minh, Việt Nam', '10.779994031244872', '106.70000985282955', 0);
INSERT INTO `place` VALUES (81, 'Bảo tàng Lịch sử Việt Nam', '       Bảo tàng Lịch sử Thành phố Hồ Chí Minh là một bảo tàng lớn và có lịch sử phát triển lâu đời ở khu vực phía Nam Việt Nam. Tọa lạc tại trung tâm thành phố, Bảo tàng là điểm đến thu hút đông đảo công chúng trong nước và quốc tế. \r\n       Bảo tàng được xây theo lối kiến trúc \"Đông Dương cách tân\" (styleindochinois), do kiến trúc sư người Pháp Delaval thiết kế, và do hãng thầu Etablissements Lamorte Saigon thực hiện trong ba năm: 1926-1927-1928.\r\n      ', '- Bạn có thể đăng ký trước để hướng dẫn viên thuyết minh hoặc yêu cầu khi mua vé. Nơi đây có đội ngũ hướng dẫn viên thông thạo tiếng Việt, Anh, Pháp và một số thứ tiếng khác, bạn hoàn toàn yên tâm nếu là du khách nước ngoài nhé. \nMột số tuyến xe buýt có đi đến Bảo tàng Lịch sử Việt Nam\n- Số 06: Khởi hành từ Bến xe Chợ Lớn đến Bảo tàng Chiến dịch Hồ Chí Minh (thời gian đi 29 phút)\n- Số 19: Khởi hành từ Trạm trung chuyển trên đường Hàm Nghi đến Bảo tàng Chiến dịch Hồ Chí Minh (thời gian đi 19 phút)\n- Số 30: Khởi hành từ Bệnh viện Thống Nhất đến Bảo tàng Chiến dịch Hồ Chí Minh (thời gian đi 28 phút)\n\n- Số 06: Khởi hành từ trường ĐH Sài Gòn đến Bảo tàng Lịch sử Việt Nam (thời gian đi 18 phút)\n- Số 30: Khởi hành từ Chợ Tân Hương (quận Tân phú) đến Bảo tàng Lịch sử Việt Nam (thời gian đi 37 phút)\n- Số 45: Khởi hành từ Chợ Hàng Xanh (quận Bình Thạnh) đến Bảo tàng Lịch sử Việt Nam (thời gian đi 13 phút)\n\n\n- Để đảm bảo tìm hiểu hết bản sắc 54 dân tộc, bạn nên tổ chức đoàn tham quan không quá đông. \n\n- Tuyệt đối không được mang những vật dụng dễ gây cháy nổ và thú cưng, đồ ăn vào trong bảo tàng.\n\n- Để tư trang cá nhân đúng nơi quy định và chỉ mang theo những vật dụng có giá trị như tiền, điện thoại trong lúc tham quan mà thôi.\n\n- Trong quá trình tham quan, tuyệt đối không được chạm vào hoặc di chuyển các sản phẩm trưng bày.\n\n- Bạn nhớ giữ gìn vệ sinh chung, không gây mất trật tự, ảnh hưởng đến những khách tham quan khác. ', 'Thành phố Hồ Chí Minh', '2 Nguyễn Bỉnh Khiêm, Bến Nghé, Quận 1, Thành phố Hồ Chí Minh', '10.787936394093864', '106.70469018830812', 0);
INSERT INTO `place` VALUES (82, 'Bảo tàng Chiến dịch Hồ Chí Minh', '      Đây là loại hình bảo tàng lịch sử Quân sự. Bảo tàng này trưng bày các hiện vật, hình ảnh, sa bàn liên quan đến cuộc tổng tiến công và nổi dậy mùa xuân năm 1975, kết thúc bằn Chiến dịch Hồ Chí Minh toàn thắng. Bảo tàng được thành lập vào ngày 27/7/1987, trong tòa nhà được xây đầu thế kỷ 20 theo thiết kế của một kiến trúc sư người Pháp. \r\n      Ngoài trời, nơi đây lưu giữ các hiện vật lớn như: xe tăng T54 mang số hiệu 848, máy bay F5E, pháo các loại A37, 57, 76, 105, 130mm, máy bay A37, xe thiết giáp M113...\r\n     Bên trong toà nhà, Bảo tàng trưng bày các hiện vật, hình ảnh, sa bàn liên quan đến cuộc Tổng tiến công và nổi dậy mùa xuân năm 1975, kết thúc bằng Chiến dịch Hồ Chí Minh toàn thắng, Nam - Bắc thống nhất một nhà.', '- Bạn có thể đăng ký trước để hướng dẫn viên thuyết minh hoặc yêu cầu khi mua vé. Nơi đây có đội ngũ hướng dẫn viên thông thạo tiếng Việt, Anh, Pháp và một số thứ tiếng khác, bạn hoàn toàn yên tâm nếu là du khách nước ngoài nhé. \n\n- Để đảm bảo tìm hiểu hết bản sắc 54 dân tộc, bạn nên tổ chức đoàn tham quan không quá đông. \n\n- Tuyệt đối không được mang những vật dụng dễ gây cháy nổ và thú cưng, đồ ăn vào trong bảo tàng.\n\n- Để tư trang cá nhân đúng nơi quy định và chỉ mang theo những vật dụng có giá trị như tiền, điện thoại trong lúc tham quan mà thôi.\n\n- Trong quá trình tham quan, tuyệt đối không được chạm vào hoặc di chuyển các sản phẩm trưng bày.\n\n- Bạn nhớ giữ gìn vệ sinh chung, không gây mất trật tự, ảnh hưởng đến những khách tham quan khác. ', 'Thành phố Hồ Chí Minh', 'Số 2 Đ. Lê Duẩn, Bến Nghé, Quận 1, Thành phố Hồ Chí Minh, Việt Nam', '10.786984953067217', '106.70418721031459', 0);
INSERT INTO `place` VALUES (83, 'Bến Nhà Rồng', '      Bến Nhà Rồng, tên chính thức là Bảo tàng Hồ Chí Minh - Chi nhánh Thành phố Hồ Chí Minh, là tên gọi thông dụng để chỉ cụm di tích kiến trúc - bảo tàng nằm bên sông Sài Gòn, thuộc quận 4, Thành phố Hồ Chí Minh. Nơi đây từng là trụ sở của hãng vận tải Messageries maritimes tại Sài Gòn từ năm 1864 đến năm 1955. Tuy nhiên, địa danh này được biết đến nhiều do tại đây có cụm di tích kiến trúc đánh dấu sự kiện ngày 5 tháng 6 năm 1911, người thanh niên Nguyễn Tất Thành (sau này được biết với tên gọi Hồ Chí Minh) đã xuống con tàu Amiral Latouche Tréville làm phụ bếp để có điều kiện sang châu Âu, mở đầu hành trình cách mạng của mình. Do đó, từ 1975, cụm di tích kiến trúc của thương cảng Nhà Rồng đã được Nhà nước Việt Nam xây dựng lại thành khu lưu niệm Hồ Chí Minh, và ngày 5 tháng 6 được chọn là Ngày Bác Hồ ra đi tìm đường cứu nước ở Việt Nam. Nguồn: Wikipedia', 'Một số lưu ý khi du khách tham quan Bến Nhà Rồng là:\n\n- Nếu đến Sài Gòn vào mùa mưa, du khách nên xem dự báo thời tiết trước khi đi tham quan Bến Nhà Rồng. Nơi này đẹp hơn vào những ngày trời nắng ráo.\n\n- Du khách lưu ý không nên chạm tay, tự ý cầm nắm các hiện vật được trưng bày trong Bảo tàng.\n\n- Ở cổng của Bến Nhà Rồng có khu vực gửi ba lô, túi xách. Du khách có thể gửi đồ đạc cá nhân ở đây để tiện cho việc tham quan.\n\n- Khi đi vào trong Bảo tàng, du khách lưu ý nên giữ trật tự, không nên gây ồn ào.\n-	Số 03: Khởi hành từ Bệnh viện Nhi Đồng 2 đến Bến Nhà Rồng (thời gian đi 20 phút).\nMột số tuyến xe buýt đi ngang bến nhà rồng:\n- Số 20: Khởi hành từ Trạm trung chuyển trên đường Hàm Nghi đến Bến Nhà Rồng ( thời gian đi 14 phút)\n- Số 36: Khởi hành từ Bãi hậu cần số 1 (quận Gò Vấp) đến Bến Nhà Rồng (thời gian đi 42 phút)\n- Số 56: Khởi hành từ Bến xe Chợ Lớn đến Bến Nhà Rồng (thời gian đi 33 phút)\n\n', 'Thành phố Hồ Chí Minh', '01 Nguyễn Tất Thành, Phường 12, Quận 4, Thành phố Hồ Chí Minh ', '10.768423350596883', '106.70668086613391', 0);
INSERT INTO `place` VALUES (84, 'Khu di tích lịch sử Địa đạo Củ Chi', ' - Củ Chi cách trung tâm Tp. Hồ Chí Minh hơn 30km về phía tây bắc nằm giữa hai con sông Sài Gòn và sông Vàm Cỏ Đông, có diện tích 43.000 ha.\r\n - Nổi tiếng ở Củ Chi đất thép là những đường hầm, làng hầm. Từ năm 1930, nơi đây đã có những căn hầm bí mật che giấu các chiến sĩ cách mạng. Đường hầm bí mật được phát triển trong kháng chiến chống Mỹ. Địa đạo Củ Chi trở thành một công trình đánh giặc độc đáo. Hệ thống đường hầm dài 200km chằng chịt mấy tầng dưới đất gồm một hệ thống trục chính và nhiều nhánh phụ, thông với các hầm bí mật, hầm trú ẩn, hoặc lối lên mặt đất. Bề ngang đường trục khoảng 60-70 cm, cao khoảng 80-90 cm, vừa đủ cho một người đi khom lưng. Cũng có đoạn cao rộng cho phép 2 người tránh nhau. Nóc hầm là đỉnh tam giác hoặc vòng cung, bề dày nóc hầm từ 3-4m chịu được xe tăng 50 tấn và bom 100kg. \r\n - Trong địa đạo cũng có những nơi rộng rãi để họp, biểu diễn văn nghệ, có chỗ cho bệnh nhân nằm, có bếp Hoàng Cầm cải tiến, có nhà vệ sinh, cống thoát nước,..', ' Các tuyến bus đi đến Địa đạo Củ Chi\n- Số 70: Khởi hành từ Bến xe Tân Quy đến Địa đạo Củ Chi (thời gian đi 28 phút)\n- Số 122: Khởi hành từ Bến xe An Sương đến Địa đạo Củ Chi (thời gian đi 3 giờ 15 phút)\n', 'Thành phố Hồ Chí Minh', 'Đ. Tỉnh Lộ 15, Phú Hiệp, Củ Chi, Thành phố Hồ Chí Minh', '11.142838840751484', '106.46284652408228', 0);
INSERT INTO `place` VALUES (85, 'Đền tưởng niệm Bến Dược - Củ Chi', ' - Đền Bến Dược tọa lạc trên vùng đất rộng khoảng 7ha, trong quần thể của khu di tích lịch sử Củ Chi thuộc xã Phú Mỹ Hưng, huyện Củ Chi.\r\n - Đền Bến Được khởi công xây dựng vào ngày 19 - 5 - 1993, khánh thành giai đoạn 1 vào ngày 19-12-1995, gồm có: cổng tam quan, nhà văn bia, tháp 9 tầng( cao khoảng 40m), ngôi điện chính và hoa viên. Tấm bia đá cao 3m, nặng 3,7 tấn, đặt giữa nhà văn bia, khắc bài văn \"Đời đời ghi nhớ\" của nhà văn Viễn Phương.\r\n - Trong ngôi điện chính, điện thờ được bài trí tôn nghiêm. Chính giữa là tượng Chủ tịch Hồ Chí Minh, ba mặt chung quanh có họ tên của các anh hùng, liệt sĩ được khắc vào bia đá hoa cương, chữ mạ vàng. Tầng dưới đền là noi trưng bày những hình ảnh, hiện vật mô hình, sa bàn với chủ đề \"Củ Chi đất thép thành đồng\"', 'Tuân thủ quy tắc 5k để bảo vệ mình và những người xung quanh.\nBảo vệ môi trường xung quanh: giữ gìn vệ sinh sạch sẽ, không xả rác bừa bãi.\nHãy mặc những trang phục thoải mái nhưng vẫn lịch sự để thể hiện sự tôn trọng của bạn với văn hoá nơi đây cũng như lịch sử dân tộc.\nCác tuyến bus đi đến Đền tưởng niệm Bến Dược – Củ Chi:\n-Số 70: Khởi hành từ Bến xe Tân Quy đến Đền tưởng niệm Bến Dược – Củ Chi (thời gian đi 1 giờ 7 phút)\n', 'Thành phố Hồ Chí Minh', ' 6, Phú Mỹ Hưng, Củ Chi, Thành phố Hồ Chí Minh', '11.146572869182558', '106.45980034137465', 0);
INSERT INTO `place` VALUES (89, 'Phố đi bộ Nguyễn Huệ', '     Phố đi bộ Nguyễn Huệ nằm ngay ở trung tâm quận 1, Thành phố Hồ Chí Minh. Đây là một trong những công trình mới nhất của thành phố được hoàn thành vào lễ kỉ niệm 40 năm ngày giải phóng hoàn toàn miền Nam thống nhất đất nước 30/4/2015.', 'Du khách có thể đến tham quan phố đi bộ Nguyễn Huệ vào bất cứ thời gian nào trong ngày đều được cả. Thế nhưng, thời điểm lý tưởng nhất để đi phố đi bộ Nguyễn Huệ vui chơi chính là lúc chiều tối. Vào thời gian này, cả phố đi bộ Nguyễn Huệ tràn ngập trong ánh đèn điện lung linh huyền ảo. Trên phố đi bộ Nguyễn Huệ còn diễn ra nhiều hoạt động vui chơi giải trí thú vị vào buổi tối.\nCác tuyến bus đi đến Phố đi bộ Nguyễn Huệ\n- Số 03: Khởi hành từ Công viên Lê Văn Tám đến Phố đi bộ Nguyễn Huệ (thời gian đi 16 phút)\n- Số 39: Khởi hành từ Tháp Mười đến Phố đi bộ Nguyễn Huệ (thời gian đi 33 phút)\n- Số 102: Khởi hành từ Cầu Thầy Tiêu (quận 7) đến Phố đi bộ Nguyễn Huệ (thời gian đi 39 phút)\n- Số 152: Khởi hành từ KTX Trần Hưng Đạo đến Phố đi bộ Nguyễn Huệ (thời gian đi 12 phút)\n', 'Thành phố Hồ Chí Minh', '22 Nguyễn Huệ, Bến Nghé, Quận 1, Thành phố Hồ Chí Minh 700000, Việt Nam', '10.774024668864694', '106.70382949717016', 0);
INSERT INTO `place` VALUES (90, 'Đảo Ó', '    Đảo Ó là nơi cư trú của rất nhiều loài chim cùng với khung cảnh thơ mộng, hoang sơ của núi rừng đã thu hút được rất nhiều giới trẻ đến đây dã ngoại. ', '    Sử dụng hình thức cắm trại hoặc thuê lều nghỉ ngơi ngay tại đảo du khách có thể trải nghiệm và cảm nhận được hết vẻ đẹp của thiên nhiên nơi đây, vừa có thể tổ chức những bữa tiệc nướng cùng bạn bè, quây quần vui chơi, ca hát cùng nhau.', 'Đồng Nai', 'Bến đò Đảo Ó, 01B Tôn Đức Thắng, Tổ 3B, Khu Phố 8, Vĩnh Cửu, Đồng Nai', '11.111842786096304', '107.1033954741561', 0);
INSERT INTO `place` VALUES (91, 'Đá Ba Chồng', '  Đá Ba Chồng thuộc vào nền văn hóa Óc Eo Phù Nam ở Đông Nam Bộ. Nổi bật trong quần thể này phải kể tới các cụm đá như hòn Ba Chồng, núi Đá Voi và hòn Dĩa.', '   Nếu di chuyển bằng phương tiện cá nhân, khi tới nơi, du khách có thể gửi xe tại Trung tâm Văn hóa huyện Định Quán và đi ra phía sau của dãy nhà.\r\n   Từ tháng 5 đến tháng 10 là mùa mưa, sẽ ảnh hưởng đến việc đi lại và vãn cảnh. Nếu muốn đi vào những tháng này, bạn nên xem kỹ dự báo thời tiết trước khi đi.\r\n', 'Đồng Nai', 'QL20, TT. Định Quán, Định Quán, Đồng Nai', '11.19104751361108', '107.34830288182856', 0);
INSERT INTO `place` VALUES (92, 'Văn miếu Trấn Biên', '    Văn miếu Trấn Biên là \"Văn miếu\" đầu tiên được xây dựng tại xứ Đàng Trong, để tôn vinh Khổng Tử, các danh nhân văn hóa nước Việt và là nơi đào tạo nhân tài phục vụ cho chế độ.', '   Bạn không chụp ảnh ở khu vực bên trong Văn miếu là một khu vực linh thiên ', 'Đồng Nai', 'Bửu Long, Thành phố Biên Hòa, Đồng Nai', '10.964682320931042', '106.80147229717123', 0);
INSERT INTO `place` VALUES (93, 'Vườn trái cây Út Tiêu long khánh', '    Vườn trái cây có diện tích rộng, với nhiều loại trái cây nhiệt đới như: sầu riêng, chôm chôm, ổi, măng cụt,… Du khách có cơ hội chụp ảnh, thưởng thức trái cây ngay tại vườn. ', '    Du khách nên tránh chuẩn bị trang phục rườm rà, mang theo thuốc bôi côn trùng cắn. Đặc biệt là nên đi vào dịp tháng 9,10,11 với thời tiết mát mẻ và là mùa có nhiều trái cây mát ', 'Đồng Nai', 'tổ 4, ấp cây da, Đồng Nai, Việt Nam', '11.027121376414069, ', '107.2615133873841', 0);
INSERT INTO `place` VALUES (94, 'Công viên văn hóa Suối Tiên', '     Công ty Cổ Phần Du lịch Văn hóa Suối Tiên phôi thai là một Lâm trại nuôi trăn và sản xuất hàng thủ công mỹ nghệ do ông Đinh Văn Vui - một người con quê hương Sóc Trăng bắt đầu xây dựng vào năm 1987. Lâm trại lúc đầu chỉ có 6.600 m² đất hoang hóa, có con suối chảy qua với huyền thoại 7 cô gái đồng trinh cùng tuổi Rồng quy tiên tại dòng suối nên dân trong vùng gọi là Suối Tiên.\n     Sau 25 năm phát triển, giờ đây Suối Tiên là một trung tâm giải trí, vui chơi hàng đầu của cả nước, đồng thời khẳng định được vị thế trong khu vực và trên thế giới. Với diện tích 105 ha, trên 150 công trình, vui chơi giải trí, đa dạng và phong phú, hơn 1000 lao động, hàng năm Suối Tiên đón hàng triệu lượt khách đến tham quan.\n     Suối Tiên là sự kết hợp đặc biệt của tinh hóa văn hóa và cội nguồn dân tộc nước ta. Có rất nhiều câu chuyện truyền thuyết đã được mô phỏng tại đây như: Âu Cơ – Lạc Long Quân, Sơn Tinh – Thủy Tinh, sự tích Mai An Tiêm, sự tích bánh chưng – bánh dày,…hứa hẹn mang đến cho quý du khách những trải nghiệm lý thú.\n', '   Những tuyến Xe buýt này dừng gần Khu Du Lịch Suối Tiên: 50, 10, 19, 76, 30, 150, 601, 602, 603, 604, 08, 99, 12, 52, 07, 33.\r\n   Hiện tại Khu Du Lịch Văn Hóa Suối Tiên áp dụng mức vé vào cổng như sau:\r\nGiá vé vào cổng người lớn: 120,000 đồng\r\nGiá vé vào cổng trẻ em: 60,000 đồng.\r\nVé người lớn dành cho khách có chiều cao trên 1,4 mét.', 'Thành phố Hồ Chí Minh', '120 XL Hà Nội, Thành Phố Thủ Đức, Thành phố Hồ Chí Minh', '10.866392448138534', '106.80287688465556', 0);
INSERT INTO `place` VALUES (95, 'Chùa Một Cột Thủ Đức - Nam Thiên Nhất Trụ', '   Ngôi chùa có cổng vào lộng lẫy và nhiều hồ sen mô phỏng theo Chùa Một Cột từ thế kỷ 11 ở Hà Nội.\r\n   Theo những tài liệu thuyết minh về chùa Một Cột Thủ Đức ghi chép lại, ngôi chùa đã được khởi công vào ngày 8 tháng 4 năm 1958 bởi Hòa thượng Thích Trí Dũng cùng với sự hỗ trợ của một Phật tử Đỗ Thị Vinh. Năm 1977, chùa Một Cột ở Thủ Đức đã hoàn thành sau gần 20 năm xây dựng và lấy tên là Nam Thiên Nhất Trụ như hiện nay.\r\n    Khuôn viên chùa Một Cột quận Thủ Đức có diện tích rộng khoảng 1ha. Kiến trúc tại đây được mô phỏng theo bản gốc ở Hà Nội. Tất cả các chi tiết rui kèo, xuyên, mái ngói cho đến những đường nét hoa văn bài trí cũng như cách bố trí thờ phụng đều giống hệt bản chính. \r\n   Tuy nhiên, thay vì dùng gỗ lim như phiên bản Hà Nội thì chùa Một Cột Thủ Đức lại sử dụng bê tông cốt thép là vật liệu chính. Nhưng không vì thế mà chùa mất đi vẻ đẹp tự nhiên, đặc trưng của kiến trúc hệ phái Bắc Tông. \r\n   Ngoài kiến trúc đặc sắc, chùa Nam Thiên Nhất Trụ còn gây ấn tượng với các du khách bằng cách bày trí cũng như những pho tượng đặc biệt được đặt trong khuôn viên. \r\n   Phía sau chùa Một Cột là chánh diện tôn nghiêm với kết cấu ba gian, gian giữa thờ Đức Thích Ca Mâu Ni Phật, hai gian bên thờ Đức Quán Thế Âm Bồ Tát và Đức Địa Tạng Bồ Tát. Sau chánh điện là nơi thờ Hòa thượng Thích Trí Dũng và có thêm bảo tháp Nam Thiên. Đây được xem là cách bày trí đậm nét miền Bắc. \r\n   Bên cạnh không gian bên trong thờ phụng uy nghiêm, khi đến chùa, mọi người còn được chiêm ngưỡng bức tượng Đức Địa Tạng Bồ Tát đúc bằng 61kg kim loại quý được đặt rất hoành tráng trong khuôn viên, tượng Phật A Di Đà đồ sộ và cả tượng Phật Thích Ca ngồi thiền dưới cội bồ đề cũng cực kỳ ấn tượng. Nguồn: vinpearl.com', '   Chùa Một Cột Thủ Đức nằm cách chợ Bến Thành khoảng 25 phút lái xe. Vì vậy, bạn có thể lựa chọn di chuyển bằng xe máy, hoặc phương tiện cá nhân đều rất thuận tiện. Tuy nhiên, nếu đang lưu trú tại Quận 1 thì du khách nên đi bằng ô tô hoặc taxi bởi quãng đường sẽ xa hơn. Hoặc bạn cũng có thể chọn di chuyển bằng xe buýt trên các tuyến 06 hoặc 56. Thời gian đi bằng xe buýt tuy lâu nhưng lại tiết kiệm được chi phí cũng như bạn không sợ bị lạc. \nCác tuyến bus đi đến Chùa Một Cột Thủ Đức:\n- Số 104: Khởi hành từ Đại học Nông Lâm đến Chùa Một Cột Thủ Đức (thời gian đi 32 phút)\n- Số 150: Khởi hành từ Bến xe Chợ Lớn đến Chùa Một Cột Thủ Đức (thời gian đi 69 phút)\n', 'Thành phố Hồ Chí Minh', '100 Đặng Văn Bi, Bình Thọ, Thủ Đức, Hồ Chí Minh', '10.843727035372657', '106.76324635821958', 0);
INSERT INTO `place` VALUES (96, 'Khu du lich BCR', '   Đây là một trong những địa điểm du lịch hấp dẫn, thu hút đông đảo khách du lịch. Với diện tích rộng lớn, thiên nhiên trong lành, The BCR là nơi lý tưởng được nhiều người lựa chọn các hoạt động dã ngoại, các buổi liên hoan, picnic cùng gia đình và bạn bè vào dịp cuối tuần.\r\n   The BCR là tổ hợp nghỉ dưỡng đa dạng các hoạt động vui chơi giải trí. Bên cạnh hồ bơi có diện tích siêu khủng thì du du lịch còn có các dịch vụ giải trí hấp dẫn khác như: Chèo thuyền Kayak, lướt ván, bắt cá không tay, bắn súng nước bằng súng sơn,…', 'Bạn có thể bắt xe 88 tại chợ Bến Thành và xuống tại bến chợ Long Trường, tại bến chợ Long Trường bắt xe 141 tới khu du lịch BCR.\nCác tuyến bus đi đến Khu du lịch BCR\n- Số 141: Khởi hành từ 4-6 Lê Văn Việt (quận 9) đến Khu du lịch BCR (thời gian đi 37 phút)\n\n', 'Thành phố Hồ Chí Minh', '68 Đ3, Trường Thạnh, Quận 9, Thành phố Hồ Chí Minh', '10.805576014057303', '106.84166305382384', 0);
INSERT INTO `place` VALUES (97, 'Đường sách Thành phố Hồ Chí Minh', 'Con phố đi bộ nhộn nhịp có các hiệu sách tiếng Việt và tiếng nước ngoài cùng địa điểm uống cà phê ngoài trời. Nơi đây cũng là một nơi mà các cặp đôi thường hay chụp ảnh cưới.', 'Đây là một địa điểm có nhiều góc chụp hình rất đẹp.\nCác tuyến bus đi đến Đường sách Thành phố Hồ Chí Minh\n- Số 03: Khởi hành từ Trường Cao đẳng Kinh Tế Đối Ngoại đến Đường sách Thành phố Hồ Chí Minh (thời gian đi 15 phút)\n- Số 06: Khởi hành từ Bến xe Chợ Lớn đến Đường sách Thành phố Hồ Chí Minh (thời gian đi 27 phút)\n- Số 19: Khởi hành từ Bến Bạch Đằng đến Đường sách Thành phố Hồ Chí Minh (thời gian đi 9 phút)\n- Số 42: Khởi hành từ Trạm trung chuyển trên đường Hàm Nghi đến Đường sách Thành phố Hồ Chí Minh (thời gian đi 12 phút)\n\n\n\n', 'Thành phố Hồ Chí Minh', 'Đường Nguyễn Văn Bình, Bến Nghé, Quận 1, Thành phố Hồ Chí Minh', '10.780957134610395', '106.70007664371835', 0);

-- ----------------------------
-- Table structure for role
-- ----------------------------
DROP TABLE IF EXISTS `role`;
CREATE TABLE `role`  (
  `role` int(11) NOT NULL,
  `roleName` varchar(255) CHARACTER SET utf8 COLLATE utf8_unicode_ci NULL DEFAULT NULL,
  PRIMARY KEY (`role`) USING BTREE,
  CONSTRAINT `fk_role_users` FOREIGN KEY (`role`) REFERENCES `user` (`role`) ON DELETE RESTRICT ON UPDATE RESTRICT
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
  `serviceID` int(11) NOT NULL AUTO_INCREMENT,
  `serviceName` varchar(255) CHARACTER SET utf8 COLLATE utf8_unicode_ci NULL DEFAULT NULL,
  `typeID` int(11) NULL DEFAULT NULL,
  `description` longtext CHARACTER SET utf8 COLLATE utf8_unicode_ci NULL,
  `placeID` int(11) NULL DEFAULT NULL,
  `address` varchar(255) CHARACTER SET utf8 COLLATE utf8_unicode_ci NULL DEFAULT NULL,
  `hotline` varchar(255) CHARACTER SET utf8 COLLATE utf8_unicode_ci NULL DEFAULT NULL,
  `latitude` varchar(255) CHARACTER SET utf8 COLLATE utf8_unicode_ci NULL DEFAULT NULL COMMENT 'vi do',
  `longitude` varchar(255) CHARACTER SET utf8 COLLATE utf8_unicode_ci NULL DEFAULT NULL COMMENT 'kinh do',
  `isDisabled` tinyint(1) NULL DEFAULT NULL,
  PRIMARY KEY (`serviceID`) USING BTREE,
  INDEX `typeID`(`typeID`) USING BTREE,
  INDEX `fk_services_place`(`placeID`) USING BTREE,
  CONSTRAINT `fk_services_place` FOREIGN KEY (`placeID`) REFERENCES `place` (`placeID`) ON DELETE RESTRICT ON UPDATE RESTRICT,
  CONSTRAINT `fk_typeservice_service` FOREIGN KEY (`typeID`) REFERENCES `typeservice` (`typeID`) ON DELETE RESTRICT ON UPDATE RESTRICT
) ENGINE = InnoDB AUTO_INCREMENT = 35 CHARACTER SET = utf8 COLLATE = utf8_unicode_ci ROW_FORMAT = Dynamic;

-- ----------------------------
-- Records of services
-- ----------------------------
INSERT INTO `services` VALUES (3, 'Nam Cát Tiên Homestay', 1, 'Tọa lạc tại huyện Cát Tiên, \n    Nam Cat Tien Homestay có tầm nhìn ra khu vườn, nhà hàng, quầy lễ tân 24 giờ, quầy bar, khu vườn, sân chơi trẻ em và sân hiên tắm nắng. Homestay này có cả WiFi lẫn chỗ đỗ xe riêng miễn phí.\n    Mỗi phòng nghỉ tại đây đều đư', 1, '825 Ấp 1 Xã Nam Cát Tiên, huyện Tân Phú, Vườn Quốc Gia Cát Tiên, Đồng Nai', '0977468492', '11.425475737926927', '107.43513511066607', 0);
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
INSERT INTO `services` VALUES (22, 'Quán cà phê Thinker & Dreamer', 2, 'Là một trong số những quán cà phê nằm ở khu chung cư 42 Nguyễn Huệ - khu chung cư nhận được nhiều sự quan tâm của giới trẻ - Thinker & Dreamer Coffee ở lầu 4, phường Bến Nghé, Quận 1. Quán tạo cảm giác khác biệt bởi không gian thơ mộng với cách thiết kế tối giản tạo sự gần gũi đối với những vị khách ghé thăm.', 89, '42 Nguyễn Huệ Lầu 4, Phường Bến Nghé, Quận 1', '0948919137', '10.774202829082762', '106.7041060394981', 0);
INSERT INTO `services` VALUES (23, 'nhà hàng SH Garden', 2, 'Nếu bạn đang tìm 1 nơi vừa thưởng thức món ăn Thuần Việt và view Chill ngay trung tâm Quận 1 thì không thể bỏ qua SH Garden. 1 nơi Tuyệt Vời khi bạn đến Sài Gòn.', 89, '26 Đồng Khởi, Hồ Huấn Nghiệp, Bến Nghé, Quận 1, Thành phố Hồ Chí Minh, Việt Nam', '098 199 91 88', '10.774515946540816', '106.70495478182619', 0);
INSERT INTO `services` VALUES (24, 'Au Lac Charner Hotel', 1, 'Tọa lạc tại trung tâm Thành phố Hồ Chí Minh, Au Lac Charner Hotel là khách sạn đầy phong cách lấy cảm hứng từ các phòng trà của thời kỳ thuộc địa Pháp. Khách sạn này nằm ở vị trí thuận tiện, cách khu mua sắm và giải trí sôi động của thành phố một quãng tản bộ ngắn và cách Nhà hát Thành phố mang đậm dấu ấn lịch sử cũng như Nhà thờ Đức Bà chỉ 5 phút đi bộ. Khách sạn có nhà hàng trong khuôn viên và cung cấp WiFi miễn phí trong tất cả các khu vực.', 89, '87-89-91 Hồ Tùng Mậu, Bến Nghé, Quận 1, TP. Hồ Chí Minh, Việt Nam', '02839156666', '10.772346327535397', '106.70350353949809', 0);
INSERT INTO `services` VALUES (25, 'Ha Trinh Hotel', 1, '    Tọa lạc tại thành phố Biên Hòa thuộc tỉnh Đồng Nai, Ha Trinh Hotel nằm ở trung tâm khu công nghiệp AMATA và chỉ cách trung tâm thành phố 5 km. Khách sạn 2 sao này có Wi-Fi miễn phí, lễ tân 24 giờ và dịch vụ phòng. Nhà hàng phục vụ ẩm thực Châu Á.\r\n\r\n    Tất cả phòng nghỉ tại khách sạn được trang bị TV màn hình phẳng và máy điều hòa. Mỗi phòng của Hotel Ha Trinh đều có khu vực ghế ngồi trong khi một số phòng còn có ban công.\r\n\r\n', 1, '816 QL1A, Long Bình, Thành phố Biên Hòa, Đồng Nai, Việt Nam', '02513993839', '10.944974401659673', '106.86882166833509', 0);
INSERT INTO `services` VALUES (26, 'Nhà hàng Đảo Ó Đồng Trường', 2, '    Nhà hàng Đảo Ó – Đồng Trường sẽ là một trải nghiệm ẩm thực vô cùng độc đáo khi có thể vừa nhâm nhi những đồ uống đặc sắc, \r\nthưởng thức những món ngon hấp dẫn, đồng thời vừa câu cá thư giãn ngay bên hồ.\r\n', 1, 'Bến đò ra Đảo Ó, Tôn Đức Thắng, TT. Vĩnh An, Vĩnh Cửu, Đồng Nai', '098 860 60 06', '11.098456346050467', '107.05029193364787', 0);
INSERT INTO `services` VALUES (27, 'Nguyễn Trâm Hotel', 1, 'Phòng nghỉ đầy đủ tiện nghi, sạch đẹp với giá cả hợp lý.', 6, 'Lý Nam Đế, TT. Tràng Bỏm, Trảng Bom, Đồng Nai, Việt Nam', '093 929 11 22', '10.958686021680798', '106.99452056833529', 0);
INSERT INTO `services` VALUES (28, 'Khách Sạn An Phú', 1, 'Khách sạn An Phú gồm 30 phòng khách sạn và được thiết kế hoàn toàn bằng gỗ tạo cho cho khách hàng cảm giác an lành, ấm áp.\r\n\r\nPhòng Deluxe: có diện tích từ 28m2 hướng phố một số phòng không có ban công, có thể bố trí thêm nệm nhỏ khi có bé nhỏ đồng hành cùng quý khách hàng trong chuyến du lịch\r\n\r\nDeluxe Double: phòng dành cho 2 khách với 1 giường đôi 1m6 + Deluxe Twin: phòng dành cho 2 khách với 02 giường đơn 1m6', 6, '11 Đường số 17, Quảng Tiến, Trảng Bom, Đồng Nai, Việt Nam', '098 415 57 02', '10.948100227900419', '106.98769593949925', 0);
INSERT INTO `services` VALUES (29, 'Hoa Sơn quán', 2, 'Thức ăn tươi, ngon. Các món ăn đa dạng, phong phú, hợp túi tiền. Đặc biệt phải kể đến món chính của quán: đặc sản gỏi cá Biên Hòa.', 1, 'Trảng Bom, Đồng Nai', '097 427 96 94', '10.957822756388783', '107.01279685669549', 0);
INSERT INTO `services` VALUES (30, 'Tre Xanh Hotel', 1, 'Khung cảnh thiên nhiên nơi đây mang đến những khoảnh khắc yên tĩnh, không gian trong lành, mát mẻ, hiền hòa, giúp du khách cảm thấy thư thái và bằng cuộc sống sau những ngày làm việc mệt nhọc.', 1, '104/4 Khu Công Nghiệp Giang Điền, Giang Điền, Trảng Bom, Đồng Nai', '0251 8966 527', '10.915906133708678', '106.99083400881081', 0);
INSERT INTO `services` VALUES (31, 'Vincom Thủ Đức', 2, 'Vincom Thủ Đức hay còn được biết đến với cái tên là Vinhomes Center Thủ Đức – Là trung tâm thương mại lớn tọa lạc tại đường Võ Văn Ngân, thành phố Thủ Đức. Đây là dự án khu trung tâm thương mại lớn của Vincom tại Thủ Đức giúp người dân ở đây thuận tiện mua sắm, vui chơi, giải trí.', 95, '216 Đ. Võ Văn Ngân, Bình Thọ, Thủ Đức, Thành phố Hồ Chí Minh', '', '10.850444010428351', '106.76586800857382', 0);
INSERT INTO `services` VALUES (32, 'Chợ Thủ Đức', 2, 'Có thuyết rằng tên gọi Thủ Đức là lấy từ tên một vị quan trấn thủ một khu đồi xưa trên khu vực này tên là Đức. Về sau, một thương gia tên Tạ Dương Minh đến đây lập chợ, lấy tên và chức của vị quan trấn thủ tên Đức kia đặt cho chợ Thủ Đức để tỏ lòng biết ơn. Từ đó có địa danh Thủ Đức', 95, '6 Đ. Võ Văn Ngân, Trường Thọ, Thủ Đức, Thành phố Hồ Chí Minh', '', '10.850454584860625', '106.75485638065157', 0);
INSERT INTO `services` VALUES (33, 'King BBQ Buffet Hòa Bình', 2, 'PHÙ HỢP:Tụ họp, gặp mặt, liên hoan, họp nhóm, gia đình…\r\nMÓN ĐẶC SẮC:Dẻ Sườn bò Mỹ, Cổ bò Mỹ sốt King BBQ, Bắp bò sốt muối ớt, Nầm heo nướng chao đỏ, Sườn heo, Ba chỉ bò Mỹ sốt King BBQ, Bạch tuộc sốt cay, Bò xào Bulgogi nồi đất, Cơm trộn Hàn Quốc, …', 5, '92B Hòa Bình, Phú Trung, Quận 11, Thành phố Hồ Chí Minh, Việt Nam', '02873018768', '10.768976359349221', '106.63798141797793', 0);
INSERT INTO `services` VALUES (34, 'Mì cay Sasin quận 11 Đầm Sen', 2, 'Mì cay Sasin tự hào là thương hiệu Mì Cay 7 Cấp Độ Hàn Quốc tiên phong và tạo nên cơn sốt hiện nay trong giới trẻ, đặc biệt luôn đặt chất lượng thực phẩm ...', 5, '52c Hòa Bình, Phường 5, Quận 11, Thành phố Hồ Chí Minh', '', '10.767644453747716', '106.64052974664548', 0);

-- ----------------------------
-- Table structure for trip
-- ----------------------------
DROP TABLE IF EXISTS `trip`;
CREATE TABLE `trip`  (
  `tripID` int(11) NOT NULL AUTO_INCREMENT,
  `tripName` varchar(255) CHARACTER SET utf8 COLLATE utf8_unicode_ci NULL DEFAULT NULL,
  `city` varchar(255) CHARACTER SET utf8 COLLATE utf8_unicode_ci NULL DEFAULT NULL,
  `numberOfDays` int(11) NULL DEFAULT 1,
  `isDisabled` tinyint(4) NULL DEFAULT 0,
  `userID` int(11) NULL DEFAULT NULL,
  `createAt` datetime(0) NULL DEFAULT current_timestamp(0),
  `updateAt` datetime(0) NULL DEFAULT current_timestamp(0) ON UPDATE CURRENT_TIMESTAMP(0),
  PRIMARY KEY (`tripID`) USING BTREE
) ENGINE = InnoDB AUTO_INCREMENT = 14 CHARACTER SET = utf8 COLLATE = utf8_unicode_ci ROW_FORMAT = Dynamic;

-- ----------------------------
-- Records of trip
-- ----------------------------
INSERT INTO `trip` VALUES (8, 'Hành trình 2 ngày 1 đêm TP. HCM - Đồng Nai (Vườn Quốc Gia)', 'Đồng Nai', 2, 0, 1, '2022-05-20 23:21:06', '2022-06-10 10:06:39');
INSERT INTO `trip` VALUES (11, 'Trải nghiệm TP HCM 2 ngày 1 đêm', 'Thành phố Hồ Chí Minh', 2, 0, 1, '2022-05-31 21:02:03', '2022-05-31 21:02:03');
INSERT INTO `trip` VALUES (12, 'Nửa ngày du hí trung tâm thành phố', 'Thành phố Hồ Chí Minh', 1, 0, 1, '2022-06-14 15:23:58', '2022-06-14 15:23:58');
INSERT INTO `trip` VALUES (13, 'Một ngày du lịch Đầm Sen Nước', 'Thành phố Hồ Chí Minh', 1, 0, 1, '2022-06-14 15:45:38', '2022-06-14 15:45:38');

-- ----------------------------
-- Table structure for typeservice
-- ----------------------------
DROP TABLE IF EXISTS `typeservice`;
CREATE TABLE `typeservice`  (
  `typeID` int(11) NOT NULL,
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
  `userID` int(11) NOT NULL AUTO_INCREMENT COMMENT 'moi user co 1 id rieng de phan biet',
  `userName` varchar(255) CHARACTER SET utf8 COLLATE utf8_unicode_ci NULL DEFAULT NULL,
  `password` varchar(255) CHARACTER SET utf8 COLLATE utf8_unicode_ci NULL DEFAULT NULL,
  `fullName` varchar(255) CHARACTER SET utf8 COLLATE utf8_unicode_ci NULL DEFAULT NULL,
  `email` varchar(255) CHARACTER SET utf8 COLLATE utf8_unicode_ci NULL DEFAULT NULL,
  `phonenumber` varchar(255) CHARACTER SET utf8 COLLATE utf8_unicode_ci NULL DEFAULT NULL,
  `role` int(11) NULL DEFAULT 0 COMMENT '0 la nguoi dung, 1 la admin',
  `isDisabled` tinyint(1) NULL DEFAULT NULL COMMENT 'Tai khoan co bi vo hieu hoa hay khong?',
  `lastUpdate` datetime(0) NULL DEFAULT current_timestamp(0) ON UPDATE CURRENT_TIMESTAMP(0),
  PRIMARY KEY (`userID`) USING BTREE,
  INDEX `role`(`role`) USING BTREE
) ENGINE = InnoDB AUTO_INCREMENT = 11 CHARACTER SET = utf8 COLLATE = utf8_unicode_ci ROW_FORMAT = Dynamic;

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
