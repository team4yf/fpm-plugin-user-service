DROP TABLE IF EXISTS `usr_obs`;
CREATE TABLE IF NOT EXISTS `usr_obs` (
  `id` int(11) NOT NULL AUTO_INCREMENT COMMENT '部门id',
  `name` varchar(100) NOT NULL COMMENT '部门名称',
  `pid` bigint(11) NOT NULL DEFAULT '0' COMMENT '上级部门',
  `code` varchar(100) NOT NULL COMMENT 'OBS编码',
  `phone` varchar(100) NULL COMMENT '联系电话',
  `contact` varchar(100) NULL COMMENT '联系人',
  `address` varchar(100) NULL COMMENT '联系地址',
  `is_virtual` tinyint(1) NOT NULL DEFAULT '0' COMMENT '虚拟的机构',
  `role_id` bigint(11) DEFAULT NULL COMMENT '部门权限',
  `profile_id` bigint(11) DEFAULT NULL COMMENT '部门配置',
  `desktop_id` bigint(11) DEFAULT NULL COMMENT '部门工作台',
  `delflag` tinyint(1) NOT NULL DEFAULT '0',
  `createAt` bigint(20) NOT NULL DEFAULT '0',
  `updateAt` bigint(20) NOT NULL DEFAULT '0',
  PRIMARY KEY (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=9 DEFAULT CHARSET=utf8 COMMENT='企业OBS架构';

INSERT INTO `usr_obs` (`id`, `name`, `pid`, `code`, `is_virtual`, `role_id`, `profile_id`, `desktop_id`, `delflag`, `createAt`, `updateAt`) VALUES
(1, '信息中心', 0, '5', 0, 3, 1, 1, 0, 0, 0),
(2, '运维单位', 0, 'COMPANY', 1, 4, 1, 1, 0, 0, 0);