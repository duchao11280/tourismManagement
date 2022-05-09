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

 Date: 09/05/2022 16:24:30
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
  `placeID` int(11) NULL DEFAULT NULL,
  `time` datetime(0) NULL DEFAULT NULL,
  PRIMARY KEY (`id`) USING BTREE
) ENGINE = InnoDB AUTO_INCREMENT = 13 CHARACTER SET = utf8 COLLATE = utf8_unicode_ci ROW_FORMAT = Dynamic;

-- ----------------------------
-- Records of comment
-- ----------------------------
INSERT INTO `comment` VALUES (12, 1, 'Nơi này mát lắm\n', 1, '2022-04-04 12:28:00');

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
  INDEX `fk_feedback_place`(`userID`) USING BTREE
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
  CONSTRAINT `fk_image_place` FOREIGN KEY (`placeID`) REFERENCES `place` (`placeID`) ON DELETE RESTRICT ON UPDATE RESTRICT
) ENGINE = InnoDB AUTO_INCREMENT = 50 CHARACTER SET = utf8mb4 COLLATE = utf8mb4_general_ci ROW_FORMAT = Dynamic;

-- ----------------------------
-- Records of image
-- ----------------------------
INSERT INTO `image` VALUES (7, '1650089335776_giangdien3.jpg', 30, NULL, 0);
INSERT INTO `image` VALUES (8, '1650089335779_giangdien4.jpg', 30, NULL, 0);
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

-- ----------------------------
-- Table structure for notification
-- ----------------------------
DROP TABLE IF EXISTS `notification`;
CREATE TABLE `notification`  (
  `notificationID` int(11) NOT NULL AUTO_INCREMENT,
  `title` varchar(255) CHARACTER SET utf8mb4 COLLATE utf8mb4_general_ci NULL DEFAULT NULL,
  `content` varchar(255) CHARACTER SET utf8mb4 COLLATE utf8mb4_general_ci NULL DEFAULT NULL,
  `time` datetime(6) NULL DEFAULT NULL,
  PRIMARY KEY (`notificationID`) USING BTREE
) ENGINE = InnoDB AUTO_INCREMENT = 1 CHARACTER SET = utf8mb4 COLLATE = utf8mb4_general_ci ROW_FORMAT = Dynamic;

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
) ENGINE = InnoDB AUTO_INCREMENT = 78 CHARACTER SET = utf8mb4 COLLATE = utf8mb4_general_ci ROW_FORMAT = Dynamic;

-- ----------------------------
-- Records of place
-- ----------------------------
INSERT INTO `place` VALUES (1, 'Thác Giang Điền', 'Thác Giang Điền là địa điểm thu hút rất nhiều bạn trẻ và các hộ gia đình kéo nhau về đây tổ chức cắm trại, tắm thác và tổ chức ăn uống. Với khung cảnh hoang sơ được bao bọc...', 'Mang theo đồ để cắm trại như: Thảm,  than, bếp nướng,...', 'Đồng Nai', '104/4 Khu Công Nghiệp Giang Điền, Giang Điền, Trảng Bom, Đồng Nai', '11', '107', 1);
INSERT INTO `place` VALUES (2, 'Quảng trường Ba Đình', 'Quảng trường Ba Đình là quảng trường lớn nhất Việt Nam, nằm trên đường Hùng Vương, quận Ba Đình và là nơi Lăng Chủ tịch Hồ Chí Minh được xây dựng.', 'Đi cùng bạn bè', 'Hà Nội', NULL, NULL, NULL, 1);
INSERT INTO `place` VALUES (3, 'Núi Chứa Chan', 'Ngọn núi cao thứ hai ở Đông Nam Bộ có nhiều rừng rậm, vách đá dựng đứng... được các bạn trẻ chọn để khám phá khi rảnh rỗi.', '', 'Đồng Nai', NULL, NULL, NULL, 1);
INSERT INTO `place` VALUES (4, 'Vườn Xoài', 'Đây là một địa điểm du lịch ưa thích đối với các bạn trẻ thích một nơi cắm trại vui vẻ. Noi nay that dep\n', 'Many hinh\n', 'Đồng Nai', NULL, NULL, NULL, 1);
INSERT INTO `place` VALUES (5, 'Công viên Văn hóa Đầm Sen', 'Nơi đây được ví là “ốc đảo xanh” với 36 thiết bị dưới nước hiện đại cùng nhiều trò chơi cảm giác mạnh đến nhẹ, phù hợp với mọi lứa tuổi. Vì vậy, bạn có thể vui chơi cả ngày mà không thấy chán.', 'Nên tắm sơ trước khi bơi để hạn chế khả năng hấp thu nước Clo trong hồ bơi.\nNgăn chặn tình trạng sạm da bằng cách dùng kem dưỡng ẩm, lotion và kem chống nắng.\nKhi tham gia máng trượt bạn nên mặc quần áo gọn gàng, không mang các vật dụng sắc nhọn để tránh ', 'Thành phố Hồ Chí Minh', NULL, NULL, NULL, 0);
INSERT INTO `place` VALUES (6, 'Thác Đá Hàn', 'Khu du lịch thác Đá Hàn là một trong những điểm mới lạ để cho các bạn trẻ tới khám phá. Với vẻ đẹp thiên nhiên hoang sơ và hùng vĩ khó cưỡng, thác nước hữu tình điểm thêm vườn trái cây trĩu quả. Với những bạn yêu thích đi phượt thì địa điểm này hứa hẹn sẽ là điểm đến lý tưởng để dã ngoại, cắm trại những ngày cuối tuần.', 'Hãy mặc trang phục thoải mái, đi giày thể thao để bảo vệ sức khỏe trong thời gian di chuyển.\nCần mang thuốc xịt đề phòng côn trùng cắn', 'Đồng Nai', NULL, '11.054820078965946', '107.40045249717184', 1);
INSERT INTO `place` VALUES (30, 'Thác Yên tĩnh', 'Thác Nước Thác Nước', 'Thác NướcThác Nước Thác Nước', 'An Giang', NULL, NULL, NULL, 1);
INSERT INTO `place` VALUES (73, 'Thác Mai', 'Thác Mai hay còn gọi đầy đủ là khu du lịch sinh thái bàu nước sôi – Thác Mai. Nằm trên địa phận xã Gia Canh, huyện Định Quán, tỉnh Đồng Nai và nằm cách thành phố Hồ Chí Minh tầm 130km. Đây là điểm du lịch nằm sâu trong rừng nguyên sinh bạt ngạt sẽ rất thích hợp với những bạn mê phượt.\r\nTrên ranh giới giữa hai tỉnh Bình Thuận, Đồng Nai, Thác Mai là một địa điểm thiên nhiên kỳ thú, còn lưu giữ được vẻ hoang sơ.\r\nThác rất lớn, có chiều dài khoảng 2 km, được hợp thành từ vô số dòng suối, thác và sông con. Thác Mai gai góc, lởm chởm và bí hiểm. Nước nối tiếp nhau xô vào đá, đá nối tiếp nhau trùng điệp, như dòng thác không có chỗ tận cùng\r\n', 'Nếu bạn nào định tìm đường tới Thác Mai bằng Google Map thì cần phải hết sức lưu ý. Bởi vì bản đồ sẽ hướng dẫn chúng ta đi con đường ngắn hơn, tuy nhiên điểm đến lại là đường cụt ngay bờ sông và thác Mai lại ở bên kia sông. Chính vì vậy bạn cần phải có một hướng dẫn viên có kinh nghiệm đầy đặn', 'Đồng Nai', 'Gia Canh, Định Quán, Đồng Nai', '11.054820078965946', '107.40045249717184', 0);
INSERT INTO `place` VALUES (74, 'Rừng Quốc Gia Nam Cát Tiên', 'Nam Cát Tiên là tên gọi một vùng đất nằm trọn trong đoạn uốn khúc của sông Đồng Nai, tọa lạc ngay trên ranh giới của cả ba tỉnh Đồng Nai, Bình Phước và Lâm Đồng. Khu rừng cấm Nam Cát Tiên có diện tích 36.000ha, đại diện cho cả hệ thực vật và động vật Nam Bộ.\r\nNơi đây có cảnh thiên nhiên đa dạng: Vừa có đồi, vừa có bãi ven sông, vừa có các trảng rộng lớn bằng phẳng, lại có các dòng chảy dốc. \r\nRừng ở đây có nhiều cây cổ thụ như bằng lăng, gỗ đỏ và hơn 600 loài thực vật.\r\nVề động vật có 240 loài chim, có những loài chim quý hiếm như trĩ lông đỏ, cò quắm xanh, tê giác một sừng,...', 'Thời điểm thích hợp để du lịch từ là vào khoảng tháng 12 – tháng 5. Bởi vì trong thời gian, tại rừng Nam Cát Tiên ít mưa, rừng khô ráo.\nVới những bạn thích đi phượt và có kinh phí hạn hẹp thì có thể lựa chọn mang theo lều trại để cắm trại trong rừng, chắn chắn sẽ đỡ tốn chi phí hơn nhiều', 'Đồng Nai', 'Nam Cát Tiên, Tân Phú, Đồng Nai', '11.423294791892964', '107.43066356749813', 0);
INSERT INTO `place` VALUES (75, 'Chùa Bửu Phong', '      Chùa Bửu Phòng nằm trên núi Bửu Long, thuộc xã Tân Bửu, Tỉnh Đồng Nai, cách thành phố Biên Hòa 6km.\r\n       Chùa được xây dựng vào thế kỷ XVII, lúc đầu chùa chỉ là thảo am nhỏ, sau đó trùng tu mở rộng vào năm 1829 và các năm gần đây. Đây là ngôi chùa cổ kính có những pho tượng với những nét điêu khắc đặc biệt Á Đông', '    Chùa rất rộng nên phải đi bộ nhiều, bạn nên mặc đồ mỏng, có chất liệu thoáng mát và nên sử dụng giày dép đế thấp tiện cho việc di chuyển.\n\n', 'Đồng Nai', 'B31, Huỳnh Văn Nghệ, Khu Phố 5, P, Thành phố Biên Hòa, Đồng Nai', '10.96774591813126', '106.79999308283477', 0);
INSERT INTO `place` VALUES (76, 'Nhà Thờ Đức Bà', '    Nhà thờ Đức Bà là công trình kiến trúc lớn ở Quảng trường Công xã Pari, trung tâm thành phố, với hai tháp chuông cao 40m.\r\n    Ngày 7/10/1877, một cha cố người pháp tên là Colombert đã đặt viên đá đầu tiên và đến ngày 11/4/1880 thì khánh thành. Bản đồ án thiết kế vẽ từ bên Pháp, do kỹ sư người Pháp chỉ huy thực hiện với tổng số tiền là hai triệu rưỡi quan lúc bấy giờ. Ngày 7 và 8 tháng 12 năm 1959, theo sự chấp thuận của tòa thánh Vaticang, nhà thờ đã làm lễ xúc dầu, đặt tên là Vương Cung thánh đường', '    Nếu đến thăm nhà thờ, bạn hãy chuẩn bị sẵn một chút vụn bánh mì hoặc hạt. Bởi ở đây sẽ có những chú chim bồ câu cực “hiếu khách”, sẵn sàng tới chào bạn và nhảy lên tay chơi đùa cùng bạn đó.\r\n', 'Thành phố Hồ Chí Minh', '01 Công xã Paris, Bến Nghé, Quận 1, Thành phố Hồ Chí Minh, Vietnam', '10.779911966388712', '106.69905108283332', 0);
INSERT INTO `place` VALUES (77, 'Dinh Thống Nhất', '    Khi nói đến Sài Gòn, không ai không liên tưởng đến dinh Thống Nhất với vai trò lịch sử đối với dân tộc Việt Nam, vị trí được xác lập trong giao lưu kinh tế, trính trị, xã hội đối với toàn vùng Đông Nam Á cũng như trên thế giới.\r\n    Mặt tiền của dinh Thống Nhất nằm trên ngã ba đường Nam Kỳ Khởi Nghĩa và đường Lê Duẩn, khuôn viên rộng 15ha.\r\n    Sau chiến dịch Hồ Chí Minh, Dinh Độc Lập là nơi làm việc của ủy ban Quân Quản thành phố Sài Gòn. Tháng 12/1975 tại đây diễn ra hội nghị Hiệp thương thống nhất đất nước. Cũng tại nơi đây đã diễn ra những cuộc họp quan trọng của Trung ương Đảng Công sản Việt Nam và một số đoàn thể để bàn việc thống nhất các tổ chức. Với ý nghĩa lịch sử đó dinh Độc Lập đổi tên thành Hội trường Thống Nhất', '    Giá vé vào Dinh Độc Lập 2021: 40.000đ/ người lớn. Nếu tham quan thêm nhà trưng bày, bạn cần mua thêm vé 25.000đ nữa. Mình muốn đi cả hai nên tổng vé vào cửa của mình là 65.000đ. Có thẻ sinh viên được giảm giá nên nếu có hãy mang theo nhé!', 'Thành phố Hồ Chí Minh', '135 Đ. Nam Kỳ Khởi Nghĩa, Phường Bến Thành, Quận 1, Tp.HCM', '10.777836883913713', '106.69526516749279', 0);

-- ----------------------------
-- Table structure for role
-- ----------------------------
DROP TABLE IF EXISTS `role`;
CREATE TABLE `role`  (
  `role` tinyint(4) NOT NULL,
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
  `serviceID` int(11) NOT NULL AUTO_INCREMENT,
  `serviceName` varchar(255) CHARACTER SET utf8 COLLATE utf8_unicode_ci NULL DEFAULT NULL,
  `typeID` int(11) NULL DEFAULT NULL,
  `description` varchar(255) CHARACTER SET utf8 COLLATE utf8_unicode_ci NULL DEFAULT NULL,
  `placeID` int(11) NULL DEFAULT NULL,
  `address` varchar(255) CHARACTER SET utf8 COLLATE utf8_unicode_ci NULL DEFAULT NULL,
  `hotline` varchar(255) CHARACTER SET utf8 COLLATE utf8_unicode_ci NULL DEFAULT NULL,
  `latitude` varchar(255) CHARACTER SET utf8 COLLATE utf8_unicode_ci NULL DEFAULT NULL COMMENT 'vi do',
  `longitude` varchar(255) CHARACTER SET utf8 COLLATE utf8_unicode_ci NULL DEFAULT NULL COMMENT 'kinh do',
  `isDisabled` tinyint(1) NULL DEFAULT NULL,
  PRIMARY KEY (`serviceID`) USING BTREE
) ENGINE = InnoDB AUTO_INCREMENT = 14 CHARACTER SET = utf8 COLLATE = utf8_unicode_ci ROW_FORMAT = Dynamic;

-- ----------------------------
-- Records of services
-- ----------------------------
INSERT INTO `services` VALUES (3, 'Nam Cát Tiên Homestay', 1, 'Tọa lạc tại huyện Cát Tiên, \n    Nam Cat Tien Homestay có tầm nhìn ra khu vườn, nhà hàng, quầy lễ tân 24 giờ, quầy bar, khu vườn, sân chơi trẻ em và sân hiên tắm nắng. Homestay này có cả WiFi lẫn chỗ đỗ xe riêng miễn phí.\n    Mỗi phòng nghỉ tại đây đều đư', 1, '825 Ấp 1 Xã Nam Cát Tiên, huyện Tân Phú, Vườn Quốc Gia Cát Tiên, Đồng Nai, Vietnam', '0977468492', '11.425475737926927', '107.43513511066607', 0);
INSERT INTO `services` VALUES (4, 'Green Hope Lodge', 1, '    Green Hope Lodge cung cấp chỗ nghỉ mộc mạc, giản dị với phòng tắm riêng và khu vực tiếp khách tiện nghi. Chỗ nghỉ này có nhà hàng và lễ tân 24 giờ trong khuôn viên. Khách có thể truy cập WiFi miễn phí trong toàn bộ lodge.\r\n    Tọa lạc bên Sông Đồng Na', 74, 'Cát Tiên Hamlet 1, Đồng Nai, Vietnam', '0972184683', '11.426663402268858', '107.43440091066603', 0);
INSERT INTO `services` VALUES (7, 'Spring Garden Hotel', 1, 'Phòng ốc hiện đại, thoáng mát. Nhân viên lịch sự. Nơi đây có đầy đủ nhà hàng, karaoke, cafe nên khách không phải đi ra ngoài.', 73, 'Spring Garden Hotel', '0394952996', '10.91727948487271', '107.25910896515734', 0);
INSERT INTO `services` VALUES (8, 'Khách sạn Ngọc Mai', 1, 'Tọa lạc tại huyện Xuân Lộc, Ngoc Mai Hotel có khu vườn. Chỗ nghỉ có lễ tân 24 giờ, dịch vụ đưa đón sân bay, dịch vụ phòng và WiFi miễn phí trong toàn bộ khuôn viên.', 73, '01 Nguyễn Huệ, 241 Trần Phú, khu phố 5, Xuân Lộc, Đồng Nai , Vietnam', '0916763344', '10.924471908365554', '107.40870425484307', 0);
INSERT INTO `services` VALUES (9, 'HAPPYSON Hotel', 1, '    Hapyson cung cấp phòng nghỉ gắn máy điều hòa ở thành phố Long Khánh. Khách sạn này có dịch vụ phòng và sân hiên. Chỗ nghỉ cũng có trung tâm thể dục, lễ tân 24 giờ và WiFi miễn phí.\r\n    Phòng nghỉ của khách sạn được bố trí khu vực ghế ngồi. Tại Hapyso', 73, '50 Phạm Thế Hiển, Khu Phố 4, Long Khánh, Đồng Nai', '0251 3787 797', '10.933262308284721', '107.25682381251522', 0);
INSERT INTO `services` VALUES (10, 'Quán cơm Bà Cành', 2, 'Quán cơm bình dân với giá rẻ, thích hợp cho các bạn du lịch tiết kiệm chi phí', 73, '29GF+QR4, Chà Rang Suối CaoXuân Lộc,Đồng Nai, Suối Cao, Xuân Lộc, Đồng Nai, Vietnam', '01228987948', '11.02704102268979', '107.37456573949953', 0);
INSERT INTO `services` VALUES (12, 'Quán Trà Sữa Chỗ Cũ', 2, 'Quán trà sữa ngon, rẻ. Phục vụ tận tình và giá bình dân, khi du lịch ở Thác Mai bạn không nên bỏ lỡ', 73, ' Xuân Trường, Xuân Lộc District, Dong Nai', '0382336185', '11.023913426017161', '107.44528428465588', 0);
INSERT INTO `services` VALUES (13, 'Quán ăn Út Thảo', 2, 'Quán ăn với nhiều món ngon, bạn không nên bỏ lỡ khi du lịch thác mai', 73, '1246 ĐT766, Xuân Thành, Xuân Lộc, Đồng Nai', '0934164220', '11.020698418821128', '107.44079748182747', 0);

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
  `role` int(11) NULL DEFAULT NULL COMMENT '0 la nguoi dung, 1 la admin, 2 la khach san, 3 la nha hang ',
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
