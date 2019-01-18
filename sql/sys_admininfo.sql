DROP TABLE IF EXISTS `sys_admininfo`;
CREATE TABLE IF NOT EXISTS `sys_admininfo` (
  `id` bigint(20) NOT NULL AUTO_INCREMENT,
  `delflag` tinyint(4) NOT NULL DEFAULT '0',
  `createAt` bigint(20) NOT NULL DEFAULT '0',
  `updateAt` bigint(20) NOT NULL DEFAULT '0',
  `loginName` varchar(500) NOT NULL,
  `loginPass` varchar(500) NOT NULL,
  `lastLoginAt` bigint(20) NOT NULL DEFAULT '0',
  `lastLoginIP` varchar(100) NOT NULL DEFAULT '0.0.0.0',
  `tryLoginTimes` int(4) NOT NULL DEFAULT '0',
  `encodeType` varchar(50) NOT NULL DEFAULT 'md5',
  PRIMARY KEY (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=2 DEFAULT CHARSET=utf8;

INSERT INTO `sys_admininfo` (`id`, `delflag`, `createAt`, `updateAt`, `loginName`, `loginPass`, `lastLoginAt`, `lastLoginIP`, `tryLoginTimes`, `encodeType`) VALUES
(1, 0, 0, 0, 'admin', '21232f297a57a5a743894a0e4a801fc3', 0, '0.0.0.0', 0, 'md5');