DROP TABLE IF EXISTS `usr_desktop`;
CREATE TABLE IF NOT EXISTS `usr_desktop` (
  `id` bigint(11) NOT NULL AUTO_INCREMENT COMMENT '工作台ID',
  `name` varchar(50) NOT NULL COMMENT '工作台名称',
  `title` varchar(500) DEFAULT NULL COMMENT '工作台标题',
  `remark` varchar(500) DEFAULT NULL COMMENT '工作台备注',
  `group_id` bigint(11) NOT NULL COMMENT '工作台所属的安全组',
  `sort_index` int(11) DEFAULT '0' COMMENT '工作台索引位置',
  `delflag` tinyint(4) NOT NULL DEFAULT '0',
  `createAt` bigint(20) NOT NULL DEFAULT '0',
  `updateAt` bigint(20) NOT NULL DEFAULT '0',
  `entry_url` varchar(200) NOT NULL DEFAULT '/',
  PRIMARY KEY (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=1 DEFAULT CHARSET=utf8 COMMENT='用户工作台';