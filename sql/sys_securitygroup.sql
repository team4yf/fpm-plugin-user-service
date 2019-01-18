DROP TABLE IF EXISTS `sys_securitygroup`;
CREATE TABLE IF NOT EXISTS `sys_securitygroup` (
  `id` bigint(11) NOT NULL AUTO_INCREMENT COMMENT '安全组编号',
  `title` varchar(100) DEFAULT NULL COMMENT '安全组名称中文',
  `remark` varchar(1000) DEFAULT NULL COMMENT '备注',
  `delflag` tinyint(1) NOT NULL DEFAULT '0',
  `createAt` bigint(20) NOT NULL DEFAULT '0',
  `updateAt` bigint(20) NOT NULL DEFAULT '0',
  PRIMARY KEY (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=8 DEFAULT CHARSET=utf8 COMMENT='权限安全组';

INSERT INTO `sys_securitygroup` (`id`, `title`, `remark`, `delflag`, `createAt`, `updateAt`) VALUES
(1, 'LOCAL MANAGER ADMIN', '本地管理员，拥有最高权限', 0, 0, 0),
(2, 'LOCAL ADMIN', '本地管理员，拥有后台管理权限', 0, 0, 0),
(3, 'DEFAULT ADMIN', '默认管理员，拥有后台部分管理权限', 0, 0, 0),
(4, 'DEFAULT USER', '默认用户组，拥有处理部分业务数据的权限', 0, 0, 0);