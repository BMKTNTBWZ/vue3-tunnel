-- phpMyAdmin SQL Dump
-- version 5.1.1
-- https://www.phpmyadmin.net/
--
-- 主机： 127.0.0.1
-- 生成日期： 2022-11-11 18:10:51
-- 服务器版本： 10.4.22-MariaDB
-- PHP 版本： 8.1.1

SET SQL_MODE = "NO_AUTO_VALUE_ON_ZERO";
START TRANSACTION;
SET time_zone = "+00:00";


/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET @OLD_CHARACTER_SET_RESULTS=@@CHARACTER_SET_RESULTS */;
/*!40101 SET @OLD_COLLATION_CONNECTION=@@COLLATION_CONNECTION */;
/*!40101 SET NAMES utf8mb4 */;

--
-- 数据库： `vue_itbaizhan`
--

-- --------------------------------------------------------

--
-- 表的结构 `project`
--

CREATE TABLE `project` (
  `id` int(11) NOT NULL,
  `name` text NOT NULL,
  `number` text NOT NULL,
  `money` text NOT NULL,
  `address` text NOT NULL,
  `duration` text NOT NULL,
  `startTime` text NOT NULL,
  `endTime` text NOT NULL,
  `quantity` text NOT NULL,
  `status` text NOT NULL,
  `remark` text NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

--
-- 转存表中的数据 `project`
--

INSERT INTO `project` (`id`, `name`, `number`, `money`, `address`, `duration`, `startTime`, `endTime`, `quantity`, `status`, `remark`) VALUES
(1, '晋阳(晋冀界)至榆次', 'gbc', '3200000', '榆次', '12', '1643644800000', '1706716800000', '1', '1', '正在进行中的隧道挖掘'),
(2, '大广高速(北京)路段', 'cfbj', '900000', '北京', '9', '1654012800000', '1685548800000', '5', '0', '可挖掘隧道'),
(3, '京哈高速(北京)路段', 'bjh', '5600000', '北京', '15', '1664899200000', '1699977600000', '5', '1', '京哈高速路段隧道维修较为困难'),
(4, 'G2京沪高速', 'G2', '1000000', '上海', '45', '1666195200000', '1729094400000', '30', '0', '北京－唐山－秦皇岛－锦州－沈阳－四平－长春－哈尔滨，1280公里'),
(5, 'G3京台高速', 'G3', '300000', '台湾', '45', '1665676800000', '1729094400000', '30', '1', '北京－天津－沧州－德州－济南－泰安－曲阜－徐州－蚌埠－合肥－铜陵－黄山－衢州－南平－福州－台北，2030公里'),
(6, 'G4京港澳高速', 'G4', '6000000', '香港', '43', '1665331200000', '1760630400000', '50', '1', '北京－保定－石家庄－邯郸－新乡－郑州－漯河－信阳－武汉－咸宁－岳阳－长沙－株洲－阳－郴州－韶关－广州－深圳－香港（口岸），2285公里'),
(7, 'G4W广澳高速', 'G4W', '6000000', '香港', '43', '1665331200000', '1760630400000', '50', '1', '广州—澳门广州－中山－珠海－澳门（口岸）'),
(8, 'G5京昆高速', 'G5', '6000000', '北京', '43', '1665331200000', '1760630400000', '50', '1', '北京－保定－石家庄－太原－临汾－西安－汉中－广元－绵阳－成都－雅安－西昌－攀枝花－昆明，2865公里'),
(9, 'G6京藏高速', 'G6', '6000000', '西藏', '43', '1665331200000', '1760630400000', '50', '1', '北京－张家口－集宁－呼和浩特－包头－临河－乌海－银川－中宁－白银－兰州－西宁－格尔木－拉萨，3710公里'),
(10, 'G7京新高速', 'G7', '6000000', '新疆', '43', '1665331200000', '1760630400000', '50', '1', '北京－张家口－集宁－呼和浩特－包头－临河－额济纳旗－哈密－吐鲁番－乌鲁木齐，2540公里'),
(11, 'G11鹤大高速', 'G11', '6000000', '鹤岗', '43', '1665331200000', '1760630400000', '50', '1', '鹤岗－佳木斯－鸡西－牡丹江－敦化－通化－丹东－大连，1390公里'),
(12, 'G1111鹤哈高速', 'G1111', '6000000', '鹤岗', '43', '1665331200000', '1760630400000', '50', '1', '鹤岗－伊春－绥化－哈尔滨'),
(13, 'G111集双高速', 'G111', '6000000', '集安（口岸）', '43', '1665331200000', '1760630400000', '50', '1', '集安（口岸）－通化－梅河口－辽源－四平－双辽'),
(14, 'G1113丹阜高速', 'G1113', '6000000', '丹东', '43', '1665331200000', '1760630400000', '50', '1', '丹东（口岸）－本溪－沈阳－新民－阜新'),
(15, 'G15沈海高速', 'G15', '6000000', '沈阳', '43', '1665331200000', '1760630400000', '50', '1', '沈阳－辽阳－鞍山－海城－大连－烟台－青岛－日照－连云港－盐城－南通－常熟－太仓－上海－宁波－台州－温州－宁德－福州－泉州－厦门－汕头－汕尾－深圳－广州－佛山－开平－阳江－茂名－湛江－海口，3710公里'),
(16, 'G15W常台高速', 'G15W', '6000000', '台州', '43', '1665331200000', '1760630400000', '50', '1', '常熟－苏州－嘉兴－绍兴－台州'),
(17, 'G1511日兰高速', 'G1511', '6000000', '兰考', '43', '1665331200000', '1760630400000', '50', '1', '日照－曲阜－济宁－菏泽－兰考'),
(18, 'G1512甬金高速', 'G1512', '6000000', '宁波', '43', '1665331200000', '1760630400000', '50', '1', '宁波－嵊州－金华'),
(19, 'G1513温丽高速', 'G1513', '6000000', '温州', '43', '1665331200000', '1760630400000', '50', '1', '温州－丽水'),
(20, 'G25长深高速', 'G25', '6000000', '长春', '43', '1665331200000', '1760630400000', '50', '1', '长春－双辽－阜新－朝阳－承德－唐山－天津－黄骅－滨州－青州－临沂－连云港－淮安－南京－溧阳－宜兴－湖州－杭州－金华－丽水－南平－三明－龙岩－梅州－河源－惠州－深圳，3580公里'),
(21, 'G2511新鲁高速', 'G2511', '6000000', '新民', '43', '1665331200000', '1760630400000', '50', '1', '新民－彰武－通辽－鲁北'),
(22, 'G35济广高速', 'G35', '6000000', '济南', '43', '1665331200000', '1760630400000', '50', '1', '济南－菏泽－商丘－阜阳－六安－安庆－景德镇－鹰潭－南城－瑞金－河源－广州，2110公里'),
(23, 'G45大广高速', 'G45', '6000000', '大庆', '43', '1665331200000', '1760630400000', '50', '1', '大庆－松原－双辽－通辽－赤峰－承德－北京－霸州－衡水－濮阳－开封－周口－麻城－黄石－吉安－赣州－龙南－连平－广州，3550公里'),
(24, 'G55二广高速', 'G55', '6000000', '二连浩特', '43', '1665331200000', '1760630400000', '50', '1', '<p>二连浩特－集宁－大同－太原－长治－晋城－洛阳－平顶山－南阳－襄樊－荆州－常德－娄底－邵阳－永州－连州－广州，2685公里</p>');

-- --------------------------------------------------------

--
-- 表的结构 `tunnel`
--

CREATE TABLE `tunnel` (
  `id` int(11) NOT NULL,
  `name` text NOT NULL,
  `cid` text NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

--
-- 转存表中的数据 `tunnel`
--

INSERT INTO `tunnel` (`id`, `name`, `cid`) VALUES
(1, '晋阳(津冀界)至榆次高速公路', 'c01'),
(2, '晋京(津冀界)至北京高速公路', 'c02'),
(3, '京哈(京哈界)至承德高速公路', 'c03');

-- --------------------------------------------------------

--
-- 表的结构 `tunnelchild`
--

CREATE TABLE `tunnelchild` (
  `id` int(11) NOT NULL,
  `cid` text NOT NULL,
  `name` text NOT NULL,
  `content` text NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

--
-- 转存表中的数据 `tunnelchild`
--

INSERT INTO `tunnelchild` (`id`, `cid`, `name`, `content`) VALUES
(1, 'c01', '赵壁1号隧道出口', 'zb'),
(2, 'c01', '赵壁2号隧道出口', 'zb'),
(3, 'c01', '赵壁3号隧道出口', 'zb'),
(4, 'c01', '赵壁4号隧道出口', 'zb'),
(5, 'c02', '赤承01号隧道出口', 'cc'),
(6, 'c02', '赤承02号隧道出口', 'cc'),
(7, 'c02', '赤承03号隧道出口', 'cc');

-- --------------------------------------------------------

--
-- 表的结构 `tunnelcontent`
--

CREATE TABLE `tunnelcontent` (
  `id` int(11) NOT NULL,
  `tunnelname` text NOT NULL,
  `imagename` text NOT NULL,
  `num` text NOT NULL,
  `url` text NOT NULL,
  `content` text NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

--
-- 转存表中的数据 `tunnelcontent`
--

INSERT INTO `tunnelcontent` (`id`, `tunnelname`, `imagename`, `num`, `url`, `content`) VALUES
(1, '赵壁1号隧道出口', '赵壁1号纵断', 'zb0001', '', 'zb'),
(2, '赵壁1号隧道出口', '赵壁2号纵断', 'zb0002', '', 'zb');

-- --------------------------------------------------------

--
-- 表的结构 `user`
--

CREATE TABLE `user` (
  `id` int(11) NOT NULL,
  `username` text DEFAULT NULL,
  `password` text DEFAULT NULL,
  `permission` text NOT NULL,
  `phone` text DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

--
-- 转存表中的数据 `user`
--

INSERT INTO `user` (`id`, `username`, `password`, `permission`, `phone`) VALUES
(1, 'admin', '123456', 'admin', '18888888888'),
(2, 'hello', '123456', 'vip', '15555555555'),
(3, 'demo', '123456', 'vip', '13337155551'),
(4, 'test', '111111', 'vip', '17777777777');

--
-- 转储表的索引
--

--
-- 表的索引 `project`
--
ALTER TABLE `project`
  ADD PRIMARY KEY (`id`);

--
-- 表的索引 `tunnel`
--
ALTER TABLE `tunnel`
  ADD PRIMARY KEY (`id`);

--
-- 表的索引 `tunnelchild`
--
ALTER TABLE `tunnelchild`
  ADD PRIMARY KEY (`id`);

--
-- 表的索引 `tunnelcontent`
--
ALTER TABLE `tunnelcontent`
  ADD PRIMARY KEY (`id`);

--
-- 表的索引 `user`
--
ALTER TABLE `user`
  ADD PRIMARY KEY (`id`);

--
-- 在导出的表使用AUTO_INCREMENT
--

--
-- 使用表AUTO_INCREMENT `project`
--
ALTER TABLE `project`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=32;

--
-- 使用表AUTO_INCREMENT `tunnel`
--
ALTER TABLE `tunnel`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=4;

--
-- 使用表AUTO_INCREMENT `tunnelchild`
--
ALTER TABLE `tunnelchild`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=8;

--
-- 使用表AUTO_INCREMENT `tunnelcontent`
--
ALTER TABLE `tunnelcontent`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=3;

--
-- 使用表AUTO_INCREMENT `user`
--
ALTER TABLE `user`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=8;
COMMIT;

/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
