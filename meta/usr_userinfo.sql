DROP TABLE IF EXISTS `usr_userinfo`;
CREATE TABLE IF NOT EXISTS `usr_userinfo` (
  `id` bigint(11) NOT NULL AUTO_INCREMENT COMMENT '用户编号',
  `password` varchar(50) DEFAULT NULL COMMENT '用户密码',
  `nickname` varchar(100) DEFAULT NULL COMMENT '用户昵称',
  `username` varchar(50) DEFAULT NULL COMMENT '用户帐户',
  `email` varchar(50) DEFAULT NULL COMMENT '用户邮箱',
  `mobile` varchar(20) DEFAULT NULL COMMENT '用户手机',
  `delflag` tinyint(1) NOT NULL DEFAULT '0',
  `dept` bigint(11) DEFAULT NULL COMMENT '用户的部门',
  `createAt` bigint(20) NOT NULL DEFAULT '0',
  `gender` tinyint(1) NOT NULL DEFAULT '1' COMMENT '员工性别:1-男,0-女',
  `profile_id` bigint(11) NOT NULL DEFAULT 1 COMMENT '用户配置',
  `desktop_id` bigint(11) NOT NULL DEFAULT 1 COMMENT '工作台',
  `enable` tinyint(1) NOT NULL DEFAULT '1',
  `updateAt` bigint(20) NOT NULL DEFAULT '0',
  `lastLoginAt` bigint(20) NOT NULL DEFAULT '0',
  `lastLoginIp` varchar(50) NOT NULL DEFAULT '127.0.0.1' COMMENT '用户邮箱',
  `try_fail` int(11) NOT NULL DEFAULT '0',
  PRIMARY KEY (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=1 DEFAULT CHARSET=utf8 COMMENT='用户信息';