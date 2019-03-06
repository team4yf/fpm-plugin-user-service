INSERT INTO `sys_admininfo` (`id`, `delflag`, `createAt`, `updateAt`, `loginName`, `loginPass`, `lastLoginAt`, `lastLoginIP`, `tryLoginTimes`, `encodeType`) VALUES
(1, 0, 0, 0, 'admin', '21232f297a57a5a743894a0e4a801fc3', 0, '0.0.0.0', 0, 'md5');
INSERT INTO `usr_desktop` (`id`, `name`, `title`, `remark`, `group_id`, `sort_index`, `delflag`, `createAt`, `updateAt`, `entry_url`) VALUES
(1, 'Default-Desktop', '默认工作台', '系统默认工作台', 1, 1, 0, 0, 0, '/setting/area');
INSERT INTO `usr_obs` (`id`, `name`, `pid`, `code`, `is_virtual`, `role_id`, `profile_id`, `desktop_id`, `delflag`, `createAt`, `updateAt`) VALUES
(1, '系统管理员', 0, 'LOCAL_ADMIN', 1, 2, 1, 1, 0, 0, 0),
(2, '项目经理', 0, 'MANAGER', 0, 3, 1, 1, 0, 0, 0),
(3, '操作员', 0, 'OPERATER', 0, 4, 1, 1, 0, 0, 0);
INSERT INTO `usr_profile` (`id`, `profile`, `name`, `delflag`, `createAt`, `updateAt`) VALUES
(1, '{\"dateformat\":\"yyyy-mm-dd\",\"mdl_report\":\"m_user desc\"}', '默认系统配置', 0, 0, 0);
INSERT INTO `usr_userinfo` (`id`, `password`, `nickname`, `username`, `email`, `mobile`, `delflag`, `dept`, `createAt`, `gender`, `profile_id`, `desktop_id`, `updateAt`) VALUES
(1, 'a1c8c73885cb1ccdd83f369b709563a2', 'admin', 'admin', 'zyh1985200@yahoo.com.cn', '18626367704', 0, 1, 1526370965088, 1, 1, 1, 0),
(2, 'a1c8c73885cb1ccdd83f369b709563a2', '夏英伟', 'xyw', 'betterxiayw@126.com', '13942602228', 0, 1, 1526370965088, 1, 1, 1, 0);
INSERT INTO `usr_widget` (`id`, `name`, `title`, `remark`, `height`, `width`, `visible`, `ds`, `link`, `desktop_id`, `type`, `delflag`, `createAt`, `updateAt`) VALUES
(1, 'notice', '公告栏', 'oa的公告栏，可由管理员于后台发布后，滚动显示在仪表板上', 200, 350, 1, 'c?s=common&o=notice', 'http://www.baidu.com', 1, 'notice', 0, 0, 0);