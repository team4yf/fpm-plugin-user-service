DROP TABLE IF EXISTS `usr_obs`;
CREATE TABLE IF NOT EXISTS `usr_obs` (
  `id` int(11) NOT NULL AUTO_INCREMENT COMMENT '组织id',
  `name` varchar(100) NOT NULL COMMENT '组织名称',
  `pid` bigint(11) NOT NULL DEFAULT '0' COMMENT '上级组织',
  `code` varchar(100) NOT NULL COMMENT 'OBS编码',
  `phone` varchar(100) NULL COMMENT '联系电话',
  `contact` varchar(100) NULL COMMENT '联系人',
  `address` varchar(100) NULL COMMENT '联系地址',
  `is_virtual` tinyint(1) NOT NULL DEFAULT '0' COMMENT '虚拟的机构',
  `role_id` bigint(11) DEFAULT NULL COMMENT '组织权限',
  `profile_id` bigint(11) DEFAULT NULL COMMENT '组织配置',
  `desktop_id` bigint(11) DEFAULT NULL COMMENT '组织工作台',
  `delflag` tinyint(1) NOT NULL DEFAULT '0',
  `createAt` bigint(20) NOT NULL DEFAULT '0',
  `updateAt` bigint(20) NOT NULL DEFAULT '0',
  PRIMARY KEY (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=1 DEFAULT CHARSET=utf8 COMMENT='企业OBS架构';