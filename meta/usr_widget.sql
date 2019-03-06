DROP TABLE IF EXISTS `usr_widget`;
CREATE TABLE IF NOT EXISTS `usr_widget` (
  `id` bigint(11) NOT NULL AUTO_INCREMENT COMMENT '仪表板id',
  `name` varchar(50) NOT NULL COMMENT '仪表板名称',
  `title` varchar(500) DEFAULT NULL COMMENT '仪表板标题',
  `remark` varchar(500) DEFAULT NULL COMMENT '仪表板备注',
  `height` int(11) DEFAULT '150' COMMENT '仪表板的高度',
  `width` int(11) DEFAULT '200' COMMENT '仪表板的宽度',
  `visible` tinyint(1) NOT NULL DEFAULT '1' COMMENT '仪表板的可见性',
  `ds` varchar(500) DEFAULT NULL COMMENT '仪表板的数据源',
  `link` varchar(100) DEFAULT NULL COMMENT '仪表板的链接',
  `desktop_id` int(11) NOT NULL COMMENT '关联的工作台',
  `type` varchar(10) NOT NULL DEFAULT 'default' COMMENT '仪表板类型',
  `delflag` tinyint(1) NOT NULL DEFAULT '0',
  `createAt` bigint(20) NOT NULL DEFAULT '0',
  `updateAt` bigint(20) NOT NULL DEFAULT '0',
  PRIMARY KEY (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=1 DEFAULT CHARSET=utf8 COMMENT='用户仪表板';