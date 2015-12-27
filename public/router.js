/**
 * ------------------------------------------
 * 整个网站的路由配置
 * @version  1.0
 * @update   2015/12/23
 * @author   小木瓜(mrgaonju@gmail.com)
 * ------------------------------------------
 */
var f = function (angular, require) {

	var app = angular.module('webapp', ['ui.router']);
	// 自定义指令
	app.directive('onFinishRenderFilters', function ($timeout) {
		return {
			restrict: 'A',
			// 链接函数将作用域和dom进行链接
			link: function (scope, element, attr) {
				if (scope.$last === true) {
					$timeout(function () {
						//根据controller的关系是选择$emit或者$broadcast
						scope.$emit('ngRepeatFinished');
					});
				}
			}
		};
	});

	// 路由配置
	var routeMap = {
		// 一级路由
		'index': {
			url: '/',
			viewUrl: 'module/index/index.html',
			ctrlUrl: 'module/index/indexCtrl',
			ctrlName: 'indexCtrl'
		},
		'people': {
			url: '/people',
			viewUrl: 'module/people/people.html',
			ctrlUrl: 'module/people/peopleCtrl',
			ctrlName: 'peopleCtrl'
		},
		'walker': {
			url: '/walker',
			viewUrl: 'module/walker/walker.html',
			ctrlUrl: 'module/walker/walkerCtrl',
			ctrlName: 'walkerCtrl'
		},
		'nature': {
			url: '/nature',
			viewUrl: 'module/nature/nature.html',
			ctrlUrl: 'module/nature/natureCtrl',
			ctrlName: 'natureCtrl'
		},
		'impression': {
			url: '/impression',
			viewUrl: 'module/impression/impression.html',
			ctrlUrl: 'module/impression/impressionCtrl',
			ctrlName: 'impressionCtrl'
		},
		'love': {
			url: '/love',
			viewUrl: 'module/love/love.html',
			ctrlUrl: 'module/love/loveCtrl',
			ctrlName: 'loveCtrl'
		},
		'about': {
			url: '/about',
			viewUrl: 'module/about/about.html',
			ctrlUrl: 'module/about/aboutCtrl',
			ctrlName: 'aboutCtrl'
		},
		// 二级路由
		'people.picWall': {
			url: '/picWall',
			viewUrl: 'module/people/ui/picWall.html',
			ctrlUrl: 'module/people/ui/picWallCtrl',
			ctrlName: 'picWallCtrl'
		}
//		'people.list': {
//			url: '/people/list/:type',
//			viewUrl: 'module/people/ui/list.html',
//			ctrlUrl: 'module/people/ui/listCtrl',
//			ctrlName: 'listCtrl'
//		}
	};
	app.config(function ($stateProvider, $urlRouterProvider, $locationProvider) {
		for (var key in routeMap) {
			$stateProvider.state(key, {
				url: routeMap[key].url,
				templateUrl: routeMap[key].viewUrl,
				controller: routeMap[key].ctrlName
			});
		}
		$urlRouterProvider.otherwise('/');
		$locationProvider.html5Mode(true);
	});

	// 控制器配置
	app.controller('navCtrl', function ($scope) {
		// 导航栏控制器
	});
	for (var key in routeMap) {
		app.controller(routeMap[key].ctrlName, ['$scope', '$http', '$stateParams', '$interval', '$q', require(routeMap[key].ctrlUrl)]);
	}

	return app;
};

define([
		'angular',
		'require',
		'angular-route',
		'module/index/indexCtrl',
		'module/people/peopleCtrl',
		'module/walker/walkerCtrl',
		'module/nature/natureCtrl',
		'module/impression/impressionCtrl',
		'module/love/loveCtrl',
		'module/about/aboutCtrl',
		'module/people/ui/picWallCtrl',
//		'module/people/ui/listCtrl'
], f);