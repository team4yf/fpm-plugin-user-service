DROP TABLE IF EXISTS `usr_action_log`;
CREATE TABLE IF NOT EXISTS `usr_action_log` (
  `id` int(10) UNSIGNED NOT NULL AUTO_INCREMENT COMMENT '主键',
  `uid` int(10) UNSIGNED NOT NULL DEFAULT '0' COMMENT '执行用户id',
  `ip` varchar(20) NOT NULL COMMENT '执行行为者ip',
  `delflag` tinyint(1) NOT NULL DEFAULT '0',
  `remark` varchar(255) NOT NULL DEFAULT '-' COMMENT '日志备注',
  `createAt` bigint(20) NOT NULL DEFAULT '0' COMMENT '执行行为的时间',
  `updateAt` bigint(20) NOT NULL DEFAULT '0',
  `action` varchar(100) NOT NULL DEFAULT '-',
  `result` varchar(10) NOT NULL DEFAULT 'OK',
  PRIMARY KEY (`id`),
  KEY `action_ip_ix` (`ip`),
  KEY `user_id_ix` (`uid`)
) ENGINE=MyISAM AUTO_INCREMENT=2 DEFAULT CHARSET=utf8 COMMENT='行为日志表' ROW_FORMAT=FIXED;