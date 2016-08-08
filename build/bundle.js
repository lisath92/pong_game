/******/ (function(modules) { // webpackBootstrap
/******/ 	var parentHotUpdateCallback = this["webpackHotUpdate"];
/******/ 	this["webpackHotUpdate"] = 
/******/ 	function webpackHotUpdateCallback(chunkId, moreModules) { // eslint-disable-line no-unused-vars
/******/ 		hotAddUpdateChunk(chunkId, moreModules);
/******/ 		if(parentHotUpdateCallback) parentHotUpdateCallback(chunkId, moreModules);
/******/ 	}
/******/ 	
/******/ 	function hotDownloadUpdateChunk(chunkId) { // eslint-disable-line no-unused-vars
/******/ 		var head = document.getElementsByTagName("head")[0];
/******/ 		var script = document.createElement("script");
/******/ 		script.type = "text/javascript";
/******/ 		script.charset = "utf-8";
/******/ 		script.src = __webpack_require__.p + "" + chunkId + "." + hotCurrentHash + ".hot-update.js";
/******/ 		head.appendChild(script);
/******/ 	}
/******/ 	
/******/ 	function hotDownloadManifest(callback) { // eslint-disable-line no-unused-vars
/******/ 		if(typeof XMLHttpRequest === "undefined")
/******/ 			return callback(new Error("No browser support"));
/******/ 		try {
/******/ 			var request = new XMLHttpRequest();
/******/ 			var requestPath = __webpack_require__.p + "" + hotCurrentHash + ".hot-update.json";
/******/ 			request.open("GET", requestPath, true);
/******/ 			request.timeout = 10000;
/******/ 			request.send(null);
/******/ 		} catch(err) {
/******/ 			return callback(err);
/******/ 		}
/******/ 		request.onreadystatechange = function() {
/******/ 			if(request.readyState !== 4) return;
/******/ 			if(request.status === 0) {
/******/ 				// timeout
/******/ 				callback(new Error("Manifest request to " + requestPath + " timed out."));
/******/ 			} else if(request.status === 404) {
/******/ 				// no update available
/******/ 				callback();
/******/ 			} else if(request.status !== 200 && request.status !== 304) {
/******/ 				// other failure
/******/ 				callback(new Error("Manifest request to " + requestPath + " failed."));
/******/ 			} else {
/******/ 				// success
/******/ 				try {
/******/ 					var update = JSON.parse(request.responseText);
/******/ 				} catch(e) {
/******/ 					callback(e);
/******/ 					return;
/******/ 				}
/******/ 				callback(null, update);
/******/ 			}
/******/ 		};
/******/ 	}

/******/ 	
/******/ 	
/******/ 	// Copied from https://github.com/facebook/react/blob/bef45b0/src/shared/utils/canDefineProperty.js
/******/ 	var canDefineProperty = false;
/******/ 	try {
/******/ 		Object.defineProperty({}, "x", {
/******/ 			get: function() {}
/******/ 		});
/******/ 		canDefineProperty = true;
/******/ 	} catch(x) {
/******/ 		// IE will fail on defineProperty
/******/ 	}
/******/ 	
/******/ 	var hotApplyOnUpdate = true;
/******/ 	var hotCurrentHash = "4ac3caa183697b9ae0d1"; // eslint-disable-line no-unused-vars
/******/ 	var hotCurrentModuleData = {};
/******/ 	var hotCurrentParents = []; // eslint-disable-line no-unused-vars
/******/ 	
/******/ 	function hotCreateRequire(moduleId) { // eslint-disable-line no-unused-vars
/******/ 		var me = installedModules[moduleId];
/******/ 		if(!me) return __webpack_require__;
/******/ 		var fn = function(request) {
/******/ 			if(me.hot.active) {
/******/ 				if(installedModules[request]) {
/******/ 					if(installedModules[request].parents.indexOf(moduleId) < 0)
/******/ 						installedModules[request].parents.push(moduleId);
/******/ 					if(me.children.indexOf(request) < 0)
/******/ 						me.children.push(request);
/******/ 				} else hotCurrentParents = [moduleId];
/******/ 			} else {
/******/ 				console.warn("[HMR] unexpected require(" + request + ") from disposed module " + moduleId);
/******/ 				hotCurrentParents = [];
/******/ 			}
/******/ 			return __webpack_require__(request);
/******/ 		};
/******/ 		for(var name in __webpack_require__) {
/******/ 			if(Object.prototype.hasOwnProperty.call(__webpack_require__, name)) {
/******/ 				if(canDefineProperty) {
/******/ 					Object.defineProperty(fn, name, (function(name) {
/******/ 						return {
/******/ 							configurable: true,
/******/ 							enumerable: true,
/******/ 							get: function() {
/******/ 								return __webpack_require__[name];
/******/ 							},
/******/ 							set: function(value) {
/******/ 								__webpack_require__[name] = value;
/******/ 							}
/******/ 						};
/******/ 					}(name)));
/******/ 				} else {
/******/ 					fn[name] = __webpack_require__[name];
/******/ 				}
/******/ 			}
/******/ 		}
/******/ 	
/******/ 		function ensure(chunkId, callback) {
/******/ 			if(hotStatus === "ready")
/******/ 				hotSetStatus("prepare");
/******/ 			hotChunksLoading++;
/******/ 			__webpack_require__.e(chunkId, function() {
/******/ 				try {
/******/ 					callback.call(null, fn);
/******/ 				} finally {
/******/ 					finishChunkLoading();
/******/ 				}
/******/ 	
/******/ 				function finishChunkLoading() {
/******/ 					hotChunksLoading--;
/******/ 					if(hotStatus === "prepare") {
/******/ 						if(!hotWaitingFilesMap[chunkId]) {
/******/ 							hotEnsureUpdateChunk(chunkId);
/******/ 						}
/******/ 						if(hotChunksLoading === 0 && hotWaitingFiles === 0) {
/******/ 							hotUpdateDownloaded();
/******/ 						}
/******/ 					}
/******/ 				}
/******/ 			});
/******/ 		}
/******/ 		if(canDefineProperty) {
/******/ 			Object.defineProperty(fn, "e", {
/******/ 				enumerable: true,
/******/ 				value: ensure
/******/ 			});
/******/ 		} else {
/******/ 			fn.e = ensure;
/******/ 		}
/******/ 		return fn;
/******/ 	}
/******/ 	
/******/ 	function hotCreateModule(moduleId) { // eslint-disable-line no-unused-vars
/******/ 		var hot = {
/******/ 			// private stuff
/******/ 			_acceptedDependencies: {},
/******/ 			_declinedDependencies: {},
/******/ 			_selfAccepted: false,
/******/ 			_selfDeclined: false,
/******/ 			_disposeHandlers: [],
/******/ 	
/******/ 			// Module API
/******/ 			active: true,
/******/ 			accept: function(dep, callback) {
/******/ 				if(typeof dep === "undefined")
/******/ 					hot._selfAccepted = true;
/******/ 				else if(typeof dep === "function")
/******/ 					hot._selfAccepted = dep;
/******/ 				else if(typeof dep === "object")
/******/ 					for(var i = 0; i < dep.length; i++)
/******/ 						hot._acceptedDependencies[dep[i]] = callback;
/******/ 				else
/******/ 					hot._acceptedDependencies[dep] = callback;
/******/ 			},
/******/ 			decline: function(dep) {
/******/ 				if(typeof dep === "undefined")
/******/ 					hot._selfDeclined = true;
/******/ 				else if(typeof dep === "number")
/******/ 					hot._declinedDependencies[dep] = true;
/******/ 				else
/******/ 					for(var i = 0; i < dep.length; i++)
/******/ 						hot._declinedDependencies[dep[i]] = true;
/******/ 			},
/******/ 			dispose: function(callback) {
/******/ 				hot._disposeHandlers.push(callback);
/******/ 			},
/******/ 			addDisposeHandler: function(callback) {
/******/ 				hot._disposeHandlers.push(callback);
/******/ 			},
/******/ 			removeDisposeHandler: function(callback) {
/******/ 				var idx = hot._disposeHandlers.indexOf(callback);
/******/ 				if(idx >= 0) hot._disposeHandlers.splice(idx, 1);
/******/ 			},
/******/ 	
/******/ 			// Management API
/******/ 			check: hotCheck,
/******/ 			apply: hotApply,
/******/ 			status: function(l) {
/******/ 				if(!l) return hotStatus;
/******/ 				hotStatusHandlers.push(l);
/******/ 			},
/******/ 			addStatusHandler: function(l) {
/******/ 				hotStatusHandlers.push(l);
/******/ 			},
/******/ 			removeStatusHandler: function(l) {
/******/ 				var idx = hotStatusHandlers.indexOf(l);
/******/ 				if(idx >= 0) hotStatusHandlers.splice(idx, 1);
/******/ 			},
/******/ 	
/******/ 			//inherit from previous dispose call
/******/ 			data: hotCurrentModuleData[moduleId]
/******/ 		};
/******/ 		return hot;
/******/ 	}
/******/ 	
/******/ 	var hotStatusHandlers = [];
/******/ 	var hotStatus = "idle";
/******/ 	
/******/ 	function hotSetStatus(newStatus) {
/******/ 		hotStatus = newStatus;
/******/ 		for(var i = 0; i < hotStatusHandlers.length; i++)
/******/ 			hotStatusHandlers[i].call(null, newStatus);
/******/ 	}
/******/ 	
/******/ 	// while downloading
/******/ 	var hotWaitingFiles = 0;
/******/ 	var hotChunksLoading = 0;
/******/ 	var hotWaitingFilesMap = {};
/******/ 	var hotRequestedFilesMap = {};
/******/ 	var hotAvailibleFilesMap = {};
/******/ 	var hotCallback;
/******/ 	
/******/ 	// The update info
/******/ 	var hotUpdate, hotUpdateNewHash;
/******/ 	
/******/ 	function toModuleId(id) {
/******/ 		var isNumber = (+id) + "" === id;
/******/ 		return isNumber ? +id : id;
/******/ 	}
/******/ 	
/******/ 	function hotCheck(apply, callback) {
/******/ 		if(hotStatus !== "idle") throw new Error("check() is only allowed in idle status");
/******/ 		if(typeof apply === "function") {
/******/ 			hotApplyOnUpdate = false;
/******/ 			callback = apply;
/******/ 		} else {
/******/ 			hotApplyOnUpdate = apply;
/******/ 			callback = callback || function(err) {
/******/ 				if(err) throw err;
/******/ 			};
/******/ 		}
/******/ 		hotSetStatus("check");
/******/ 		hotDownloadManifest(function(err, update) {
/******/ 			if(err) return callback(err);
/******/ 			if(!update) {
/******/ 				hotSetStatus("idle");
/******/ 				callback(null, null);
/******/ 				return;
/******/ 			}
/******/ 	
/******/ 			hotRequestedFilesMap = {};
/******/ 			hotAvailibleFilesMap = {};
/******/ 			hotWaitingFilesMap = {};
/******/ 			for(var i = 0; i < update.c.length; i++)
/******/ 				hotAvailibleFilesMap[update.c[i]] = true;
/******/ 			hotUpdateNewHash = update.h;
/******/ 	
/******/ 			hotSetStatus("prepare");
/******/ 			hotCallback = callback;
/******/ 			hotUpdate = {};
/******/ 			var chunkId = 0;
/******/ 			{ // eslint-disable-line no-lone-blocks
/******/ 				/*globals chunkId */
/******/ 				hotEnsureUpdateChunk(chunkId);
/******/ 			}
/******/ 			if(hotStatus === "prepare" && hotChunksLoading === 0 && hotWaitingFiles === 0) {
/******/ 				hotUpdateDownloaded();
/******/ 			}
/******/ 		});
/******/ 	}
/******/ 	
/******/ 	function hotAddUpdateChunk(chunkId, moreModules) { // eslint-disable-line no-unused-vars
/******/ 		if(!hotAvailibleFilesMap[chunkId] || !hotRequestedFilesMap[chunkId])
/******/ 			return;
/******/ 		hotRequestedFilesMap[chunkId] = false;
/******/ 		for(var moduleId in moreModules) {
/******/ 			if(Object.prototype.hasOwnProperty.call(moreModules, moduleId)) {
/******/ 				hotUpdate[moduleId] = moreModules[moduleId];
/******/ 			}
/******/ 		}
/******/ 		if(--hotWaitingFiles === 0 && hotChunksLoading === 0) {
/******/ 			hotUpdateDownloaded();
/******/ 		}
/******/ 	}
/******/ 	
/******/ 	function hotEnsureUpdateChunk(chunkId) {
/******/ 		if(!hotAvailibleFilesMap[chunkId]) {
/******/ 			hotWaitingFilesMap[chunkId] = true;
/******/ 		} else {
/******/ 			hotRequestedFilesMap[chunkId] = true;
/******/ 			hotWaitingFiles++;
/******/ 			hotDownloadUpdateChunk(chunkId);
/******/ 		}
/******/ 	}
/******/ 	
/******/ 	function hotUpdateDownloaded() {
/******/ 		hotSetStatus("ready");
/******/ 		var callback = hotCallback;
/******/ 		hotCallback = null;
/******/ 		if(!callback) return;
/******/ 		if(hotApplyOnUpdate) {
/******/ 			hotApply(hotApplyOnUpdate, callback);
/******/ 		} else {
/******/ 			var outdatedModules = [];
/******/ 			for(var id in hotUpdate) {
/******/ 				if(Object.prototype.hasOwnProperty.call(hotUpdate, id)) {
/******/ 					outdatedModules.push(toModuleId(id));
/******/ 				}
/******/ 			}
/******/ 			callback(null, outdatedModules);
/******/ 		}
/******/ 	}
/******/ 	
/******/ 	function hotApply(options, callback) {
/******/ 		if(hotStatus !== "ready") throw new Error("apply() is only allowed in ready status");
/******/ 		if(typeof options === "function") {
/******/ 			callback = options;
/******/ 			options = {};
/******/ 		} else if(options && typeof options === "object") {
/******/ 			callback = callback || function(err) {
/******/ 				if(err) throw err;
/******/ 			};
/******/ 		} else {
/******/ 			options = {};
/******/ 			callback = callback || function(err) {
/******/ 				if(err) throw err;
/******/ 			};
/******/ 		}
/******/ 	
/******/ 		function getAffectedStuff(module) {
/******/ 			var outdatedModules = [module];
/******/ 			var outdatedDependencies = {};
/******/ 	
/******/ 			var queue = outdatedModules.slice();
/******/ 			while(queue.length > 0) {
/******/ 				var moduleId = queue.pop();
/******/ 				var module = installedModules[moduleId];
/******/ 				if(!module || module.hot._selfAccepted)
/******/ 					continue;
/******/ 				if(module.hot._selfDeclined) {
/******/ 					return new Error("Aborted because of self decline: " + moduleId);
/******/ 				}
/******/ 				if(moduleId === 0) {
/******/ 					return;
/******/ 				}
/******/ 				for(var i = 0; i < module.parents.length; i++) {
/******/ 					var parentId = module.parents[i];
/******/ 					var parent = installedModules[parentId];
/******/ 					if(parent.hot._declinedDependencies[moduleId]) {
/******/ 						return new Error("Aborted because of declined dependency: " + moduleId + " in " + parentId);
/******/ 					}
/******/ 					if(outdatedModules.indexOf(parentId) >= 0) continue;
/******/ 					if(parent.hot._acceptedDependencies[moduleId]) {
/******/ 						if(!outdatedDependencies[parentId])
/******/ 							outdatedDependencies[parentId] = [];
/******/ 						addAllToSet(outdatedDependencies[parentId], [moduleId]);
/******/ 						continue;
/******/ 					}
/******/ 					delete outdatedDependencies[parentId];
/******/ 					outdatedModules.push(parentId);
/******/ 					queue.push(parentId);
/******/ 				}
/******/ 			}
/******/ 	
/******/ 			return [outdatedModules, outdatedDependencies];
/******/ 		}
/******/ 	
/******/ 		function addAllToSet(a, b) {
/******/ 			for(var i = 0; i < b.length; i++) {
/******/ 				var item = b[i];
/******/ 				if(a.indexOf(item) < 0)
/******/ 					a.push(item);
/******/ 			}
/******/ 		}
/******/ 	
/******/ 		// at begin all updates modules are outdated
/******/ 		// the "outdated" status can propagate to parents if they don't accept the children
/******/ 		var outdatedDependencies = {};
/******/ 		var outdatedModules = [];
/******/ 		var appliedUpdate = {};
/******/ 		for(var id in hotUpdate) {
/******/ 			if(Object.prototype.hasOwnProperty.call(hotUpdate, id)) {
/******/ 				var moduleId = toModuleId(id);
/******/ 				var result = getAffectedStuff(moduleId);
/******/ 				if(!result) {
/******/ 					if(options.ignoreUnaccepted)
/******/ 						continue;
/******/ 					hotSetStatus("abort");
/******/ 					return callback(new Error("Aborted because " + moduleId + " is not accepted"));
/******/ 				}
/******/ 				if(result instanceof Error) {
/******/ 					hotSetStatus("abort");
/******/ 					return callback(result);
/******/ 				}
/******/ 				appliedUpdate[moduleId] = hotUpdate[moduleId];
/******/ 				addAllToSet(outdatedModules, result[0]);
/******/ 				for(var moduleId in result[1]) {
/******/ 					if(Object.prototype.hasOwnProperty.call(result[1], moduleId)) {
/******/ 						if(!outdatedDependencies[moduleId])
/******/ 							outdatedDependencies[moduleId] = [];
/******/ 						addAllToSet(outdatedDependencies[moduleId], result[1][moduleId]);
/******/ 					}
/******/ 				}
/******/ 			}
/******/ 		}
/******/ 	
/******/ 		// Store self accepted outdated modules to require them later by the module system
/******/ 		var outdatedSelfAcceptedModules = [];
/******/ 		for(var i = 0; i < outdatedModules.length; i++) {
/******/ 			var moduleId = outdatedModules[i];
/******/ 			if(installedModules[moduleId] && installedModules[moduleId].hot._selfAccepted)
/******/ 				outdatedSelfAcceptedModules.push({
/******/ 					module: moduleId,
/******/ 					errorHandler: installedModules[moduleId].hot._selfAccepted
/******/ 				});
/******/ 		}
/******/ 	
/******/ 		// Now in "dispose" phase
/******/ 		hotSetStatus("dispose");
/******/ 		var queue = outdatedModules.slice();
/******/ 		while(queue.length > 0) {
/******/ 			var moduleId = queue.pop();
/******/ 			var module = installedModules[moduleId];
/******/ 			if(!module) continue;
/******/ 	
/******/ 			var data = {};
/******/ 	
/******/ 			// Call dispose handlers
/******/ 			var disposeHandlers = module.hot._disposeHandlers;
/******/ 			for(var j = 0; j < disposeHandlers.length; j++) {
/******/ 				var cb = disposeHandlers[j];
/******/ 				cb(data);
/******/ 			}
/******/ 			hotCurrentModuleData[moduleId] = data;
/******/ 	
/******/ 			// disable module (this disables requires from this module)
/******/ 			module.hot.active = false;
/******/ 	
/******/ 			// remove module from cache
/******/ 			delete installedModules[moduleId];
/******/ 	
/******/ 			// remove "parents" references from all children
/******/ 			for(var j = 0; j < module.children.length; j++) {
/******/ 				var child = installedModules[module.children[j]];
/******/ 				if(!child) continue;
/******/ 				var idx = child.parents.indexOf(moduleId);
/******/ 				if(idx >= 0) {
/******/ 					child.parents.splice(idx, 1);
/******/ 				}
/******/ 			}
/******/ 		}
/******/ 	
/******/ 		// remove outdated dependency from module children
/******/ 		for(var moduleId in outdatedDependencies) {
/******/ 			if(Object.prototype.hasOwnProperty.call(outdatedDependencies, moduleId)) {
/******/ 				var module = installedModules[moduleId];
/******/ 				var moduleOutdatedDependencies = outdatedDependencies[moduleId];
/******/ 				for(var j = 0; j < moduleOutdatedDependencies.length; j++) {
/******/ 					var dependency = moduleOutdatedDependencies[j];
/******/ 					var idx = module.children.indexOf(dependency);
/******/ 					if(idx >= 0) module.children.splice(idx, 1);
/******/ 				}
/******/ 			}
/******/ 		}
/******/ 	
/******/ 		// Not in "apply" phase
/******/ 		hotSetStatus("apply");
/******/ 	
/******/ 		hotCurrentHash = hotUpdateNewHash;
/******/ 	
/******/ 		// insert new code
/******/ 		for(var moduleId in appliedUpdate) {
/******/ 			if(Object.prototype.hasOwnProperty.call(appliedUpdate, moduleId)) {
/******/ 				modules[moduleId] = appliedUpdate[moduleId];
/******/ 			}
/******/ 		}
/******/ 	
/******/ 		// call accept handlers
/******/ 		var error = null;
/******/ 		for(var moduleId in outdatedDependencies) {
/******/ 			if(Object.prototype.hasOwnProperty.call(outdatedDependencies, moduleId)) {
/******/ 				var module = installedModules[moduleId];
/******/ 				var moduleOutdatedDependencies = outdatedDependencies[moduleId];
/******/ 				var callbacks = [];
/******/ 				for(var i = 0; i < moduleOutdatedDependencies.length; i++) {
/******/ 					var dependency = moduleOutdatedDependencies[i];
/******/ 					var cb = module.hot._acceptedDependencies[dependency];
/******/ 					if(callbacks.indexOf(cb) >= 0) continue;
/******/ 					callbacks.push(cb);
/******/ 				}
/******/ 				for(var i = 0; i < callbacks.length; i++) {
/******/ 					var cb = callbacks[i];
/******/ 					try {
/******/ 						cb(outdatedDependencies);
/******/ 					} catch(err) {
/******/ 						if(!error)
/******/ 							error = err;
/******/ 					}
/******/ 				}
/******/ 			}
/******/ 		}
/******/ 	
/******/ 		// Load self accepted modules
/******/ 		for(var i = 0; i < outdatedSelfAcceptedModules.length; i++) {
/******/ 			var item = outdatedSelfAcceptedModules[i];
/******/ 			var moduleId = item.module;
/******/ 			hotCurrentParents = [moduleId];
/******/ 			try {
/******/ 				__webpack_require__(moduleId);
/******/ 			} catch(err) {
/******/ 				if(typeof item.errorHandler === "function") {
/******/ 					try {
/******/ 						item.errorHandler(err);
/******/ 					} catch(err) {
/******/ 						if(!error)
/******/ 							error = err;
/******/ 					}
/******/ 				} else if(!error)
/******/ 					error = err;
/******/ 			}
/******/ 		}
/******/ 	
/******/ 		// handle errors in accept handlers and self accepted module load
/******/ 		if(error) {
/******/ 			hotSetStatus("fail");
/******/ 			return callback(error);
/******/ 		}
/******/ 	
/******/ 		hotSetStatus("idle");
/******/ 		callback(null, outdatedModules);
/******/ 	}

/******/ 	// The module cache
/******/ 	var installedModules = {};

/******/ 	// The require function
/******/ 	function __webpack_require__(moduleId) {

/******/ 		// Check if module is in cache
/******/ 		if(installedModules[moduleId])
/******/ 			return installedModules[moduleId].exports;

/******/ 		// Create a new module (and put it into the cache)
/******/ 		var module = installedModules[moduleId] = {
/******/ 			exports: {},
/******/ 			id: moduleId,
/******/ 			loaded: false,
/******/ 			hot: hotCreateModule(moduleId),
/******/ 			parents: hotCurrentParents,
/******/ 			children: []
/******/ 		};

/******/ 		// Execute the module function
/******/ 		modules[moduleId].call(module.exports, module, module.exports, hotCreateRequire(moduleId));

/******/ 		// Flag the module as loaded
/******/ 		module.loaded = true;

/******/ 		// Return the exports of the module
/******/ 		return module.exports;
/******/ 	}


/******/ 	// expose the modules object (__webpack_modules__)
/******/ 	__webpack_require__.m = modules;

/******/ 	// expose the module cache
/******/ 	__webpack_require__.c = installedModules;

/******/ 	// __webpack_public_path__
/******/ 	__webpack_require__.p = "/pong/";

/******/ 	// __webpack_hash__
/******/ 	__webpack_require__.h = function() { return hotCurrentHash; };

/******/ 	// Load entry module and return exports
/******/ 	return hotCreateRequire(0)(0);
/******/ })
/************************************************************************/
/******/ ([
/* 0 */
/***/ function(module, exports, __webpack_require__) {

	eval("'use strict';\n\n__webpack_require__(1);\n\nvar _Game = __webpack_require__(10);\n\nvar _Game2 = _interopRequireDefault(_Game);\n\nfunction _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }\n\n// game instance  \nvar game = new _Game2.default();\nvar fps = 30;\n\nfunction gameLoop() {\n  setTimeout(gameLoop, fps);\n  game.render();\n}\ngameLoop();//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIndlYnBhY2s6Ly8vLi9zcmMvaW5kZXguanM/OTU1MiJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiOztBQUFBOztBQUNBOzs7Ozs7QUFHQTtBQUNBLElBQUksT0FBTyxvQkFBWDtBQUNBLElBQU0sTUFBTSxFQUFaOztBQUVBLFNBQVMsUUFBVCxHQUFvQjtBQUNsQixhQUFXLFFBQVgsRUFBcUIsR0FBckI7QUFDQSxPQUFLLE1BQUw7QUFDRDtBQUNEIiwiZmlsZSI6IjAuanMiLCJzb3VyY2VzQ29udGVudCI6WyJpbXBvcnQgJy4vZ2FtZS5jc3MnO1xyXG5pbXBvcnQgR2FtZSBmcm9tICcuL0dhbWUuanMnO1xyXG5cclxuXHJcbi8vIGdhbWUgaW5zdGFuY2UgIFxyXG52YXIgZ2FtZSA9IG5ldyBHYW1lKCk7XHJcbmNvbnN0IGZwcyA9IDMwO1xyXG5cclxuZnVuY3Rpb24gZ2FtZUxvb3AoKSB7XHJcbiAgc2V0VGltZW91dChnYW1lTG9vcCwgZnBzKTtcclxuICBnYW1lLnJlbmRlcigpO1xyXG59XHJcbmdhbWVMb29wKCk7XHJcblxuXG5cbi8qKiBXRUJQQUNLIEZPT1RFUiAqKlxuICoqIC4vc3JjL2luZGV4LmpzXG4gKiovIl0sInNvdXJjZVJvb3QiOiIifQ==");

/***/ },
/* 1 */
/***/ function(module, exports, __webpack_require__) {

	eval("// style-loader: Adds some css to the DOM by adding a <style> tag\n\n// load the styles\nvar content = __webpack_require__(2);\nif(typeof content === 'string') content = [[module.id, content, '']];\n// add the styles to the DOM\nvar update = __webpack_require__(9)(content, {});\nif(content.locals) module.exports = content.locals;\n// Hot Module Replacement\nif(true) {\n\t// When the styles change, update the <style> tags\n\tif(!content.locals) {\n\t\tmodule.hot.accept(2, function() {\n\t\t\tvar newContent = __webpack_require__(2);\n\t\t\tif(typeof newContent === 'string') newContent = [[module.id, newContent, '']];\n\t\t\tupdate(newContent);\n\t\t});\n\t}\n\t// When the module is disposed, remove the <style> tags\n\tmodule.hot.dispose(function() { update(); });\n}//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIndlYnBhY2s6Ly8vLi9zcmMvZ2FtZS5jc3M/YmM3YiJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiQUFBQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLCtDQUFnRjtBQUNoRjtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSxHQUFHO0FBQ0g7QUFDQTtBQUNBLGdDQUFnQyxVQUFVLEVBQUU7QUFDNUMiLCJmaWxlIjoiMS5qcyIsInNvdXJjZXNDb250ZW50IjpbIi8vIHN0eWxlLWxvYWRlcjogQWRkcyBzb21lIGNzcyB0byB0aGUgRE9NIGJ5IGFkZGluZyBhIDxzdHlsZT4gdGFnXG5cbi8vIGxvYWQgdGhlIHN0eWxlc1xudmFyIGNvbnRlbnQgPSByZXF1aXJlKFwiISEuLy4uL25vZGVfbW9kdWxlcy9jc3MtbG9hZGVyL2luZGV4LmpzIS4vZ2FtZS5jc3NcIik7XG5pZih0eXBlb2YgY29udGVudCA9PT0gJ3N0cmluZycpIGNvbnRlbnQgPSBbW21vZHVsZS5pZCwgY29udGVudCwgJyddXTtcbi8vIGFkZCB0aGUgc3R5bGVzIHRvIHRoZSBET01cbnZhciB1cGRhdGUgPSByZXF1aXJlKFwiIS4vLi4vbm9kZV9tb2R1bGVzL3N0eWxlLWxvYWRlci9hZGRTdHlsZXMuanNcIikoY29udGVudCwge30pO1xuaWYoY29udGVudC5sb2NhbHMpIG1vZHVsZS5leHBvcnRzID0gY29udGVudC5sb2NhbHM7XG4vLyBIb3QgTW9kdWxlIFJlcGxhY2VtZW50XG5pZihtb2R1bGUuaG90KSB7XG5cdC8vIFdoZW4gdGhlIHN0eWxlcyBjaGFuZ2UsIHVwZGF0ZSB0aGUgPHN0eWxlPiB0YWdzXG5cdGlmKCFjb250ZW50LmxvY2Fscykge1xuXHRcdG1vZHVsZS5ob3QuYWNjZXB0KFwiISEuLy4uL25vZGVfbW9kdWxlcy9jc3MtbG9hZGVyL2luZGV4LmpzIS4vZ2FtZS5jc3NcIiwgZnVuY3Rpb24oKSB7XG5cdFx0XHR2YXIgbmV3Q29udGVudCA9IHJlcXVpcmUoXCIhIS4vLi4vbm9kZV9tb2R1bGVzL2Nzcy1sb2FkZXIvaW5kZXguanMhLi9nYW1lLmNzc1wiKTtcblx0XHRcdGlmKHR5cGVvZiBuZXdDb250ZW50ID09PSAnc3RyaW5nJykgbmV3Q29udGVudCA9IFtbbW9kdWxlLmlkLCBuZXdDb250ZW50LCAnJ11dO1xuXHRcdFx0dXBkYXRlKG5ld0NvbnRlbnQpO1xuXHRcdH0pO1xuXHR9XG5cdC8vIFdoZW4gdGhlIG1vZHVsZSBpcyBkaXNwb3NlZCwgcmVtb3ZlIHRoZSA8c3R5bGU+IHRhZ3Ncblx0bW9kdWxlLmhvdC5kaXNwb3NlKGZ1bmN0aW9uKCkgeyB1cGRhdGUoKTsgfSk7XG59XG5cblxuLyoqKioqKioqKioqKioqKioqXG4gKiogV0VCUEFDSyBGT09URVJcbiAqKiAuL3NyYy9nYW1lLmNzc1xuICoqIG1vZHVsZSBpZCA9IDFcbiAqKiBtb2R1bGUgY2h1bmtzID0gMFxuICoqLyJdLCJzb3VyY2VSb290IjoiIn0=");

/***/ },
/* 2 */
/***/ function(module, exports, __webpack_require__) {

	eval("exports = module.exports = __webpack_require__(3)();\n// imports\n\n\n// module\nexports.push([module.id, \"/* http://meyerweb.com/eric/tools/css/reset/\\r\\n   v2.0 | 20110126\\r\\n   License: none (public domain)\\r\\n*/\\r\\n\\r\\nhtml, body, div, span, applet, object, iframe,\\r\\nh1, h2, h3, h4, h5, h6, p, blockquote, pre,\\r\\na, abbr, acronym, address, big, cite, code,\\r\\ndel, dfn, em, img, ins, kbd, q, s, samp,\\r\\nsmall, strike, strong, sub, sup, tt, var,\\r\\nb, u, i, center,\\r\\ndl, dt, dd, ol, ul, li,\\r\\nfieldset, form, label, legend,\\r\\ntable, caption, tbody, tfoot, thead, tr, th, td,\\r\\narticle, aside, canvas, details, embed,\\r\\nfigure, figcaption, footer, header, hgroup,\\r\\nmenu, nav, output, ruby, section, summary,\\r\\ntime, mark, audio, video {\\r\\n   margin: 0;\\r\\n   padding: 0;\\r\\n   border: 0;\\r\\n   font-size: 100%;\\r\\n   font: inherit;\\r\\n   vertical-align: baseline;\\r\\n}\\r\\n/* HTML5 display-role reset for older browsers */\\r\\narticle, aside, details, figcaption, figure,\\r\\nfooter, header, hgroup, menu, nav, section {\\r\\n   display: block;\\r\\n}\\r\\nbody {\\r\\n   line-height: 1;\\r\\n}\\r\\nol, ul {\\r\\n   list-style: none;\\r\\n}\\r\\nblockquote, q {\\r\\n   quotes: none;\\r\\n}\\r\\nblockquote:before, blockquote:after,\\r\\nq:before, q:after {\\r\\n   content: '';\\r\\n   content: none;\\r\\n}\\r\\ntable {\\r\\n   border-collapse: collapse;\\r\\n   border-spacing: 0;\\r\\n}\\r\\n\\r\\n/* Game Styles */\\r\\n\\r\\n@font-face {\\r\\n    font-family: 'PressStart2P Web';\\r\\n    src: url(\" + __webpack_require__(4) + \");\\r\\n    src: url(\" + __webpack_require__(4) + \"?#iefix) format('embedded-opentype'),\\r\\n         url(\" + __webpack_require__(5) + \") format('woff2'),\\r\\n         url(\" + __webpack_require__(6) + \") format('woff'),\\r\\n         url(\" + __webpack_require__(7) + \") format('truetype'),\\r\\n         url(\" + __webpack_require__(8) + \"#press_start_2pregular) format('svg');\\r\\n    font-weight: normal;\\r\\n    font-style: normal;\\r\\n}\\r\\nbody {\\r\\n\\r\\n   font-family: 'PressStart2P Web', monospace;\\r\\n   margin: 0 auto;\\r\\n   text-align: center;\\r\\n}\\r\\nh1 {\\r\\n   margin-top: 20px;\\r\\n}\\r\\n#game {\\r\\n   background-color: #353535;\\r\\n   display: block;\\r\\n   height: 350px;\\r\\n   margin: 20px auto;\\r\\n   width: 600px;\\r\\n}\\r\\n.players {\\r\\n\\r\\n   display: inline-flex;\\r\\n   justify-content: space-between;\\r\\n   width: 600px;\\r\\n   line-height: 1.5;\\r\\n   padding-top: 10px;\\r\\n}\\r\\n\\r\\n.p1, .p2 {\\r\\n  font-size: 13px;\\r\\n}\\r\\n\\r\\n.p1{\\r\\n  text-align: left;\\r\\n}\\r\\n\\r\\n.p2{ \\r\\n  text-align: right;\\r\\n}\\r\\n\", \"\"]);\n\n// exports\n//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIndlYnBhY2s6Ly8vLi9zcmMvZ2FtZS5jc3M/NDMxMCJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiQUFBQTtBQUNBOzs7QUFHQTtBQUNBLDhwQkFBOHBCLGlCQUFpQixrQkFBa0IsaUJBQWlCLHVCQUF1QixxQkFBcUIsZ0NBQWdDLEtBQUsscUpBQXFKLHNCQUFzQixLQUFLLFVBQVUsc0JBQXNCLEtBQUssWUFBWSx3QkFBd0IsS0FBSyxtQkFBbUIsb0JBQW9CLEtBQUssK0RBQStELG1CQUFtQixxQkFBcUIsS0FBSyxXQUFXLGlDQUFpQyx5QkFBeUIsS0FBSyw2Q0FBNkMsd0NBQXdDLGlEQUF1RSw4V0FBK2QsNEJBQTRCLDJCQUEyQixLQUFLLFVBQVUsc0RBQXNELHNCQUFzQiwwQkFBMEIsS0FBSyxRQUFRLHdCQUF3QixLQUFLLFdBQVcsaUNBQWlDLHNCQUFzQixxQkFBcUIseUJBQXlCLG9CQUFvQixLQUFLLGNBQWMsZ0NBQWdDLHNDQUFzQyxvQkFBb0Isd0JBQXdCLHlCQUF5QixLQUFLLGtCQUFrQixzQkFBc0IsS0FBSyxZQUFZLHVCQUF1QixLQUFLLFlBQVkseUJBQXlCLEtBQUs7O0FBRTEvRSIsImZpbGUiOiIyLmpzIiwic291cmNlc0NvbnRlbnQiOlsiZXhwb3J0cyA9IG1vZHVsZS5leHBvcnRzID0gcmVxdWlyZShcIi4vLi4vbm9kZV9tb2R1bGVzL2Nzcy1sb2FkZXIvbGliL2Nzcy1iYXNlLmpzXCIpKCk7XG4vLyBpbXBvcnRzXG5cblxuLy8gbW9kdWxlXG5leHBvcnRzLnB1c2goW21vZHVsZS5pZCwgXCIvKiBodHRwOi8vbWV5ZXJ3ZWIuY29tL2VyaWMvdG9vbHMvY3NzL3Jlc2V0L1xcclxcbiAgIHYyLjAgfCAyMDExMDEyNlxcclxcbiAgIExpY2Vuc2U6IG5vbmUgKHB1YmxpYyBkb21haW4pXFxyXFxuKi9cXHJcXG5cXHJcXG5odG1sLCBib2R5LCBkaXYsIHNwYW4sIGFwcGxldCwgb2JqZWN0LCBpZnJhbWUsXFxyXFxuaDEsIGgyLCBoMywgaDQsIGg1LCBoNiwgcCwgYmxvY2txdW90ZSwgcHJlLFxcclxcbmEsIGFiYnIsIGFjcm9ueW0sIGFkZHJlc3MsIGJpZywgY2l0ZSwgY29kZSxcXHJcXG5kZWwsIGRmbiwgZW0sIGltZywgaW5zLCBrYmQsIHEsIHMsIHNhbXAsXFxyXFxuc21hbGwsIHN0cmlrZSwgc3Ryb25nLCBzdWIsIHN1cCwgdHQsIHZhcixcXHJcXG5iLCB1LCBpLCBjZW50ZXIsXFxyXFxuZGwsIGR0LCBkZCwgb2wsIHVsLCBsaSxcXHJcXG5maWVsZHNldCwgZm9ybSwgbGFiZWwsIGxlZ2VuZCxcXHJcXG50YWJsZSwgY2FwdGlvbiwgdGJvZHksIHRmb290LCB0aGVhZCwgdHIsIHRoLCB0ZCxcXHJcXG5hcnRpY2xlLCBhc2lkZSwgY2FudmFzLCBkZXRhaWxzLCBlbWJlZCxcXHJcXG5maWd1cmUsIGZpZ2NhcHRpb24sIGZvb3RlciwgaGVhZGVyLCBoZ3JvdXAsXFxyXFxubWVudSwgbmF2LCBvdXRwdXQsIHJ1YnksIHNlY3Rpb24sIHN1bW1hcnksXFxyXFxudGltZSwgbWFyaywgYXVkaW8sIHZpZGVvIHtcXHJcXG4gICBtYXJnaW46IDA7XFxyXFxuICAgcGFkZGluZzogMDtcXHJcXG4gICBib3JkZXI6IDA7XFxyXFxuICAgZm9udC1zaXplOiAxMDAlO1xcclxcbiAgIGZvbnQ6IGluaGVyaXQ7XFxyXFxuICAgdmVydGljYWwtYWxpZ246IGJhc2VsaW5lO1xcclxcbn1cXHJcXG4vKiBIVE1MNSBkaXNwbGF5LXJvbGUgcmVzZXQgZm9yIG9sZGVyIGJyb3dzZXJzICovXFxyXFxuYXJ0aWNsZSwgYXNpZGUsIGRldGFpbHMsIGZpZ2NhcHRpb24sIGZpZ3VyZSxcXHJcXG5mb290ZXIsIGhlYWRlciwgaGdyb3VwLCBtZW51LCBuYXYsIHNlY3Rpb24ge1xcclxcbiAgIGRpc3BsYXk6IGJsb2NrO1xcclxcbn1cXHJcXG5ib2R5IHtcXHJcXG4gICBsaW5lLWhlaWdodDogMTtcXHJcXG59XFxyXFxub2wsIHVsIHtcXHJcXG4gICBsaXN0LXN0eWxlOiBub25lO1xcclxcbn1cXHJcXG5ibG9ja3F1b3RlLCBxIHtcXHJcXG4gICBxdW90ZXM6IG5vbmU7XFxyXFxufVxcclxcbmJsb2NrcXVvdGU6YmVmb3JlLCBibG9ja3F1b3RlOmFmdGVyLFxcclxcbnE6YmVmb3JlLCBxOmFmdGVyIHtcXHJcXG4gICBjb250ZW50OiAnJztcXHJcXG4gICBjb250ZW50OiBub25lO1xcclxcbn1cXHJcXG50YWJsZSB7XFxyXFxuICAgYm9yZGVyLWNvbGxhcHNlOiBjb2xsYXBzZTtcXHJcXG4gICBib3JkZXItc3BhY2luZzogMDtcXHJcXG59XFxyXFxuXFxyXFxuLyogR2FtZSBTdHlsZXMgKi9cXHJcXG5cXHJcXG5AZm9udC1mYWNlIHtcXHJcXG4gICAgZm9udC1mYW1pbHk6ICdQcmVzc1N0YXJ0MlAgV2ViJztcXHJcXG4gICAgc3JjOiB1cmwoXCIgKyByZXF1aXJlKFwiLi4vZm9udHMvcHJlc3NzdGFydDJwLXdlYmZvbnQuZW90XCIpICsgXCIpO1xcclxcbiAgICBzcmM6IHVybChcIiArIHJlcXVpcmUoXCIuLi9mb250cy9wcmVzc3N0YXJ0MnAtd2ViZm9udC5lb3RcIikgKyBcIj8jaWVmaXgpIGZvcm1hdCgnZW1iZWRkZWQtb3BlbnR5cGUnKSxcXHJcXG4gICAgICAgICB1cmwoXCIgKyByZXF1aXJlKFwiLi4vZm9udHMvcHJlc3NzdGFydDJwLXdlYmZvbnQud29mZjJcIikgKyBcIikgZm9ybWF0KCd3b2ZmMicpLFxcclxcbiAgICAgICAgIHVybChcIiArIHJlcXVpcmUoXCIuLi9mb250cy9wcmVzc3N0YXJ0MnAtd2ViZm9udC53b2ZmXCIpICsgXCIpIGZvcm1hdCgnd29mZicpLFxcclxcbiAgICAgICAgIHVybChcIiArIHJlcXVpcmUoXCIuLi9mb250cy9wcmVzc3N0YXJ0MnAtd2ViZm9udC50dGZcIikgKyBcIikgZm9ybWF0KCd0cnVldHlwZScpLFxcclxcbiAgICAgICAgIHVybChcIiArIHJlcXVpcmUoXCIuLi9mb250cy9wcmVzc3N0YXJ0MnAtd2ViZm9udC5zdmdcIikgKyBcIiNwcmVzc19zdGFydF8ycHJlZ3VsYXIpIGZvcm1hdCgnc3ZnJyk7XFxyXFxuICAgIGZvbnQtd2VpZ2h0OiBub3JtYWw7XFxyXFxuICAgIGZvbnQtc3R5bGU6IG5vcm1hbDtcXHJcXG59XFxyXFxuYm9keSB7XFxyXFxuXFxyXFxuICAgZm9udC1mYW1pbHk6ICdQcmVzc1N0YXJ0MlAgV2ViJywgbW9ub3NwYWNlO1xcclxcbiAgIG1hcmdpbjogMCBhdXRvO1xcclxcbiAgIHRleHQtYWxpZ246IGNlbnRlcjtcXHJcXG59XFxyXFxuaDEge1xcclxcbiAgIG1hcmdpbi10b3A6IDIwcHg7XFxyXFxufVxcclxcbiNnYW1lIHtcXHJcXG4gICBiYWNrZ3JvdW5kLWNvbG9yOiAjMzUzNTM1O1xcclxcbiAgIGRpc3BsYXk6IGJsb2NrO1xcclxcbiAgIGhlaWdodDogMzUwcHg7XFxyXFxuICAgbWFyZ2luOiAyMHB4IGF1dG87XFxyXFxuICAgd2lkdGg6IDYwMHB4O1xcclxcbn1cXHJcXG4ucGxheWVycyB7XFxyXFxuXFxyXFxuICAgZGlzcGxheTogaW5saW5lLWZsZXg7XFxyXFxuICAganVzdGlmeS1jb250ZW50OiBzcGFjZS1iZXR3ZWVuO1xcclxcbiAgIHdpZHRoOiA2MDBweDtcXHJcXG4gICBsaW5lLWhlaWdodDogMS41O1xcclxcbiAgIHBhZGRpbmctdG9wOiAxMHB4O1xcclxcbn1cXHJcXG5cXHJcXG4ucDEsIC5wMiB7XFxyXFxuICBmb250LXNpemU6IDEzcHg7XFxyXFxufVxcclxcblxcclxcbi5wMXtcXHJcXG4gIHRleHQtYWxpZ246IGxlZnQ7XFxyXFxufVxcclxcblxcclxcbi5wMnsgXFxyXFxuICB0ZXh0LWFsaWduOiByaWdodDtcXHJcXG59XFxyXFxuXCIsIFwiXCJdKTtcblxuLy8gZXhwb3J0c1xuXG5cblxuLyoqKioqKioqKioqKioqKioqXG4gKiogV0VCUEFDSyBGT09URVJcbiAqKiAuL34vY3NzLWxvYWRlciEuL3NyYy9nYW1lLmNzc1xuICoqIG1vZHVsZSBpZCA9IDJcbiAqKiBtb2R1bGUgY2h1bmtzID0gMFxuICoqLyJdLCJzb3VyY2VSb290IjoiIn0=");

/***/ },
/* 3 */
/***/ function(module, exports) {

	eval("/*\r\n\tMIT License http://www.opensource.org/licenses/mit-license.php\r\n\tAuthor Tobias Koppers @sokra\r\n*/\r\n// css base code, injected by the css-loader\r\nmodule.exports = function() {\r\n\tvar list = [];\r\n\r\n\t// return the list of modules as css string\r\n\tlist.toString = function toString() {\r\n\t\tvar result = [];\r\n\t\tfor(var i = 0; i < this.length; i++) {\r\n\t\t\tvar item = this[i];\r\n\t\t\tif(item[2]) {\r\n\t\t\t\tresult.push(\"@media \" + item[2] + \"{\" + item[1] + \"}\");\r\n\t\t\t} else {\r\n\t\t\t\tresult.push(item[1]);\r\n\t\t\t}\r\n\t\t}\r\n\t\treturn result.join(\"\");\r\n\t};\r\n\r\n\t// import a list of modules into the list\r\n\tlist.i = function(modules, mediaQuery) {\r\n\t\tif(typeof modules === \"string\")\r\n\t\t\tmodules = [[null, modules, \"\"]];\r\n\t\tvar alreadyImportedModules = {};\r\n\t\tfor(var i = 0; i < this.length; i++) {\r\n\t\t\tvar id = this[i][0];\r\n\t\t\tif(typeof id === \"number\")\r\n\t\t\t\talreadyImportedModules[id] = true;\r\n\t\t}\r\n\t\tfor(i = 0; i < modules.length; i++) {\r\n\t\t\tvar item = modules[i];\r\n\t\t\t// skip already imported module\r\n\t\t\t// this implementation is not 100% perfect for weird media query combinations\r\n\t\t\t//  when a module is imported multiple times with different media queries.\r\n\t\t\t//  I hope this will never occur (Hey this way we have smaller bundles)\r\n\t\t\tif(typeof item[0] !== \"number\" || !alreadyImportedModules[item[0]]) {\r\n\t\t\t\tif(mediaQuery && !item[2]) {\r\n\t\t\t\t\titem[2] = mediaQuery;\r\n\t\t\t\t} else if(mediaQuery) {\r\n\t\t\t\t\titem[2] = \"(\" + item[2] + \") and (\" + mediaQuery + \")\";\r\n\t\t\t\t}\r\n\t\t\t\tlist.push(item);\r\n\t\t\t}\r\n\t\t}\r\n\t};\r\n\treturn list;\r\n};\r\n//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIndlYnBhY2s6Ly8vLi9+L2Nzcy1sb2FkZXIvbGliL2Nzcy1iYXNlLmpzP2RhMDQiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6IkFBQUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0EsZ0JBQWdCLGlCQUFpQjtBQUNqQztBQUNBO0FBQ0Esd0NBQXdDLGdCQUFnQjtBQUN4RCxJQUFJO0FBQ0o7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsZ0JBQWdCLGlCQUFpQjtBQUNqQztBQUNBO0FBQ0E7QUFDQTtBQUNBLFlBQVksb0JBQW9CO0FBQ2hDO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSxLQUFLO0FBQ0w7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSIsImZpbGUiOiIzLmpzIiwic291cmNlc0NvbnRlbnQiOlsiLypcclxuXHRNSVQgTGljZW5zZSBodHRwOi8vd3d3Lm9wZW5zb3VyY2Uub3JnL2xpY2Vuc2VzL21pdC1saWNlbnNlLnBocFxyXG5cdEF1dGhvciBUb2JpYXMgS29wcGVycyBAc29rcmFcclxuKi9cclxuLy8gY3NzIGJhc2UgY29kZSwgaW5qZWN0ZWQgYnkgdGhlIGNzcy1sb2FkZXJcclxubW9kdWxlLmV4cG9ydHMgPSBmdW5jdGlvbigpIHtcclxuXHR2YXIgbGlzdCA9IFtdO1xyXG5cclxuXHQvLyByZXR1cm4gdGhlIGxpc3Qgb2YgbW9kdWxlcyBhcyBjc3Mgc3RyaW5nXHJcblx0bGlzdC50b1N0cmluZyA9IGZ1bmN0aW9uIHRvU3RyaW5nKCkge1xyXG5cdFx0dmFyIHJlc3VsdCA9IFtdO1xyXG5cdFx0Zm9yKHZhciBpID0gMDsgaSA8IHRoaXMubGVuZ3RoOyBpKyspIHtcclxuXHRcdFx0dmFyIGl0ZW0gPSB0aGlzW2ldO1xyXG5cdFx0XHRpZihpdGVtWzJdKSB7XHJcblx0XHRcdFx0cmVzdWx0LnB1c2goXCJAbWVkaWEgXCIgKyBpdGVtWzJdICsgXCJ7XCIgKyBpdGVtWzFdICsgXCJ9XCIpO1xyXG5cdFx0XHR9IGVsc2Uge1xyXG5cdFx0XHRcdHJlc3VsdC5wdXNoKGl0ZW1bMV0pO1xyXG5cdFx0XHR9XHJcblx0XHR9XHJcblx0XHRyZXR1cm4gcmVzdWx0LmpvaW4oXCJcIik7XHJcblx0fTtcclxuXHJcblx0Ly8gaW1wb3J0IGEgbGlzdCBvZiBtb2R1bGVzIGludG8gdGhlIGxpc3RcclxuXHRsaXN0LmkgPSBmdW5jdGlvbihtb2R1bGVzLCBtZWRpYVF1ZXJ5KSB7XHJcblx0XHRpZih0eXBlb2YgbW9kdWxlcyA9PT0gXCJzdHJpbmdcIilcclxuXHRcdFx0bW9kdWxlcyA9IFtbbnVsbCwgbW9kdWxlcywgXCJcIl1dO1xyXG5cdFx0dmFyIGFscmVhZHlJbXBvcnRlZE1vZHVsZXMgPSB7fTtcclxuXHRcdGZvcih2YXIgaSA9IDA7IGkgPCB0aGlzLmxlbmd0aDsgaSsrKSB7XHJcblx0XHRcdHZhciBpZCA9IHRoaXNbaV1bMF07XHJcblx0XHRcdGlmKHR5cGVvZiBpZCA9PT0gXCJudW1iZXJcIilcclxuXHRcdFx0XHRhbHJlYWR5SW1wb3J0ZWRNb2R1bGVzW2lkXSA9IHRydWU7XHJcblx0XHR9XHJcblx0XHRmb3IoaSA9IDA7IGkgPCBtb2R1bGVzLmxlbmd0aDsgaSsrKSB7XHJcblx0XHRcdHZhciBpdGVtID0gbW9kdWxlc1tpXTtcclxuXHRcdFx0Ly8gc2tpcCBhbHJlYWR5IGltcG9ydGVkIG1vZHVsZVxyXG5cdFx0XHQvLyB0aGlzIGltcGxlbWVudGF0aW9uIGlzIG5vdCAxMDAlIHBlcmZlY3QgZm9yIHdlaXJkIG1lZGlhIHF1ZXJ5IGNvbWJpbmF0aW9uc1xyXG5cdFx0XHQvLyAgd2hlbiBhIG1vZHVsZSBpcyBpbXBvcnRlZCBtdWx0aXBsZSB0aW1lcyB3aXRoIGRpZmZlcmVudCBtZWRpYSBxdWVyaWVzLlxyXG5cdFx0XHQvLyAgSSBob3BlIHRoaXMgd2lsbCBuZXZlciBvY2N1ciAoSGV5IHRoaXMgd2F5IHdlIGhhdmUgc21hbGxlciBidW5kbGVzKVxyXG5cdFx0XHRpZih0eXBlb2YgaXRlbVswXSAhPT0gXCJudW1iZXJcIiB8fCAhYWxyZWFkeUltcG9ydGVkTW9kdWxlc1tpdGVtWzBdXSkge1xyXG5cdFx0XHRcdGlmKG1lZGlhUXVlcnkgJiYgIWl0ZW1bMl0pIHtcclxuXHRcdFx0XHRcdGl0ZW1bMl0gPSBtZWRpYVF1ZXJ5O1xyXG5cdFx0XHRcdH0gZWxzZSBpZihtZWRpYVF1ZXJ5KSB7XHJcblx0XHRcdFx0XHRpdGVtWzJdID0gXCIoXCIgKyBpdGVtWzJdICsgXCIpIGFuZCAoXCIgKyBtZWRpYVF1ZXJ5ICsgXCIpXCI7XHJcblx0XHRcdFx0fVxyXG5cdFx0XHRcdGxpc3QucHVzaChpdGVtKTtcclxuXHRcdFx0fVxyXG5cdFx0fVxyXG5cdH07XHJcblx0cmV0dXJuIGxpc3Q7XHJcbn07XHJcblxuXG5cbi8qKioqKioqKioqKioqKioqKlxuICoqIFdFQlBBQ0sgRk9PVEVSXG4gKiogLi9+L2Nzcy1sb2FkZXIvbGliL2Nzcy1iYXNlLmpzXG4gKiogbW9kdWxlIGlkID0gM1xuICoqIG1vZHVsZSBjaHVua3MgPSAwXG4gKiovIl0sInNvdXJjZVJvb3QiOiIifQ==");

/***/ },
/* 4 */
/***/ function(module, exports, __webpack_require__) {

	eval("module.exports = __webpack_require__.p + \"/fonts/pressstart2p-webfont.eot\";//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIndlYnBhY2s6Ly8vLi9mb250cy9wcmVzc3N0YXJ0MnAtd2ViZm9udC5lb3Q/MWUwYyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiQUFBQSIsImZpbGUiOiI0LmpzIiwic291cmNlc0NvbnRlbnQiOlsibW9kdWxlLmV4cG9ydHMgPSBfX3dlYnBhY2tfcHVibGljX3BhdGhfXyArIFwiL2ZvbnRzL3ByZXNzc3RhcnQycC13ZWJmb250LmVvdFwiO1xuXG5cbi8qKioqKioqKioqKioqKioqKlxuICoqIFdFQlBBQ0sgRk9PVEVSXG4gKiogLi9mb250cy9wcmVzc3N0YXJ0MnAtd2ViZm9udC5lb3RcbiAqKiBtb2R1bGUgaWQgPSA0XG4gKiogbW9kdWxlIGNodW5rcyA9IDBcbiAqKi8iXSwic291cmNlUm9vdCI6IiJ9");

/***/ },
/* 5 */
/***/ function(module, exports, __webpack_require__) {

	eval("module.exports = __webpack_require__.p + \"/fonts/pressstart2p-webfont.woff2\";//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIndlYnBhY2s6Ly8vLi9mb250cy9wcmVzc3N0YXJ0MnAtd2ViZm9udC53b2ZmMj9kOTUwIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiJBQUFBIiwiZmlsZSI6IjUuanMiLCJzb3VyY2VzQ29udGVudCI6WyJtb2R1bGUuZXhwb3J0cyA9IF9fd2VicGFja19wdWJsaWNfcGF0aF9fICsgXCIvZm9udHMvcHJlc3NzdGFydDJwLXdlYmZvbnQud29mZjJcIjtcblxuXG4vKioqKioqKioqKioqKioqKipcbiAqKiBXRUJQQUNLIEZPT1RFUlxuICoqIC4vZm9udHMvcHJlc3NzdGFydDJwLXdlYmZvbnQud29mZjJcbiAqKiBtb2R1bGUgaWQgPSA1XG4gKiogbW9kdWxlIGNodW5rcyA9IDBcbiAqKi8iXSwic291cmNlUm9vdCI6IiJ9");

/***/ },
/* 6 */
/***/ function(module, exports, __webpack_require__) {

	eval("module.exports = __webpack_require__.p + \"/fonts/pressstart2p-webfont.woff\";//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIndlYnBhY2s6Ly8vLi9mb250cy9wcmVzc3N0YXJ0MnAtd2ViZm9udC53b2ZmPzEyMGMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6IkFBQUEiLCJmaWxlIjoiNi5qcyIsInNvdXJjZXNDb250ZW50IjpbIm1vZHVsZS5leHBvcnRzID0gX193ZWJwYWNrX3B1YmxpY19wYXRoX18gKyBcIi9mb250cy9wcmVzc3N0YXJ0MnAtd2ViZm9udC53b2ZmXCI7XG5cblxuLyoqKioqKioqKioqKioqKioqXG4gKiogV0VCUEFDSyBGT09URVJcbiAqKiAuL2ZvbnRzL3ByZXNzc3RhcnQycC13ZWJmb250LndvZmZcbiAqKiBtb2R1bGUgaWQgPSA2XG4gKiogbW9kdWxlIGNodW5rcyA9IDBcbiAqKi8iXSwic291cmNlUm9vdCI6IiJ9");

/***/ },
/* 7 */
/***/ function(module, exports, __webpack_require__) {

	eval("module.exports = __webpack_require__.p + \"/fonts/pressstart2p-webfont.ttf\";//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIndlYnBhY2s6Ly8vLi9mb250cy9wcmVzc3N0YXJ0MnAtd2ViZm9udC50dGY/NTYzNSJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiQUFBQSIsImZpbGUiOiI3LmpzIiwic291cmNlc0NvbnRlbnQiOlsibW9kdWxlLmV4cG9ydHMgPSBfX3dlYnBhY2tfcHVibGljX3BhdGhfXyArIFwiL2ZvbnRzL3ByZXNzc3RhcnQycC13ZWJmb250LnR0ZlwiO1xuXG5cbi8qKioqKioqKioqKioqKioqKlxuICoqIFdFQlBBQ0sgRk9PVEVSXG4gKiogLi9mb250cy9wcmVzc3N0YXJ0MnAtd2ViZm9udC50dGZcbiAqKiBtb2R1bGUgaWQgPSA3XG4gKiogbW9kdWxlIGNodW5rcyA9IDBcbiAqKi8iXSwic291cmNlUm9vdCI6IiJ9");

/***/ },
/* 8 */
/***/ function(module, exports, __webpack_require__) {

	eval("module.exports = __webpack_require__.p + \"/fonts/pressstart2p-webfont.svg\";//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIndlYnBhY2s6Ly8vLi9mb250cy9wcmVzc3N0YXJ0MnAtd2ViZm9udC5zdmc/ZjRjYyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiQUFBQSIsImZpbGUiOiI4LmpzIiwic291cmNlc0NvbnRlbnQiOlsibW9kdWxlLmV4cG9ydHMgPSBfX3dlYnBhY2tfcHVibGljX3BhdGhfXyArIFwiL2ZvbnRzL3ByZXNzc3RhcnQycC13ZWJmb250LnN2Z1wiO1xuXG5cbi8qKioqKioqKioqKioqKioqKlxuICoqIFdFQlBBQ0sgRk9PVEVSXG4gKiogLi9mb250cy9wcmVzc3N0YXJ0MnAtd2ViZm9udC5zdmdcbiAqKiBtb2R1bGUgaWQgPSA4XG4gKiogbW9kdWxlIGNodW5rcyA9IDBcbiAqKi8iXSwic291cmNlUm9vdCI6IiJ9");

/***/ },
/* 9 */
/***/ function(module, exports, __webpack_require__) {

	eval("/*\r\n\tMIT License http://www.opensource.org/licenses/mit-license.php\r\n\tAuthor Tobias Koppers @sokra\r\n*/\r\nvar stylesInDom = {},\r\n\tmemoize = function(fn) {\r\n\t\tvar memo;\r\n\t\treturn function () {\r\n\t\t\tif (typeof memo === \"undefined\") memo = fn.apply(this, arguments);\r\n\t\t\treturn memo;\r\n\t\t};\r\n\t},\r\n\tisOldIE = memoize(function() {\r\n\t\treturn /msie [6-9]\\b/.test(window.navigator.userAgent.toLowerCase());\r\n\t}),\r\n\tgetHeadElement = memoize(function () {\r\n\t\treturn document.head || document.getElementsByTagName(\"head\")[0];\r\n\t}),\r\n\tsingletonElement = null,\r\n\tsingletonCounter = 0,\r\n\tstyleElementsInsertedAtTop = [];\r\n\r\nmodule.exports = function(list, options) {\r\n\tif(false) {\r\n\t\tif(typeof document !== \"object\") throw new Error(\"The style-loader cannot be used in a non-browser environment\");\r\n\t}\r\n\r\n\toptions = options || {};\r\n\t// Force single-tag solution on IE6-9, which has a hard limit on the # of <style>\r\n\t// tags it will allow on a page\r\n\tif (typeof options.singleton === \"undefined\") options.singleton = isOldIE();\r\n\r\n\t// By default, add <style> tags to the bottom of <head>.\r\n\tif (typeof options.insertAt === \"undefined\") options.insertAt = \"bottom\";\r\n\r\n\tvar styles = listToStyles(list);\r\n\taddStylesToDom(styles, options);\r\n\r\n\treturn function update(newList) {\r\n\t\tvar mayRemove = [];\r\n\t\tfor(var i = 0; i < styles.length; i++) {\r\n\t\t\tvar item = styles[i];\r\n\t\t\tvar domStyle = stylesInDom[item.id];\r\n\t\t\tdomStyle.refs--;\r\n\t\t\tmayRemove.push(domStyle);\r\n\t\t}\r\n\t\tif(newList) {\r\n\t\t\tvar newStyles = listToStyles(newList);\r\n\t\t\taddStylesToDom(newStyles, options);\r\n\t\t}\r\n\t\tfor(var i = 0; i < mayRemove.length; i++) {\r\n\t\t\tvar domStyle = mayRemove[i];\r\n\t\t\tif(domStyle.refs === 0) {\r\n\t\t\t\tfor(var j = 0; j < domStyle.parts.length; j++)\r\n\t\t\t\t\tdomStyle.parts[j]();\r\n\t\t\t\tdelete stylesInDom[domStyle.id];\r\n\t\t\t}\r\n\t\t}\r\n\t};\r\n}\r\n\r\nfunction addStylesToDom(styles, options) {\r\n\tfor(var i = 0; i < styles.length; i++) {\r\n\t\tvar item = styles[i];\r\n\t\tvar domStyle = stylesInDom[item.id];\r\n\t\tif(domStyle) {\r\n\t\t\tdomStyle.refs++;\r\n\t\t\tfor(var j = 0; j < domStyle.parts.length; j++) {\r\n\t\t\t\tdomStyle.parts[j](item.parts[j]);\r\n\t\t\t}\r\n\t\t\tfor(; j < item.parts.length; j++) {\r\n\t\t\t\tdomStyle.parts.push(addStyle(item.parts[j], options));\r\n\t\t\t}\r\n\t\t} else {\r\n\t\t\tvar parts = [];\r\n\t\t\tfor(var j = 0; j < item.parts.length; j++) {\r\n\t\t\t\tparts.push(addStyle(item.parts[j], options));\r\n\t\t\t}\r\n\t\t\tstylesInDom[item.id] = {id: item.id, refs: 1, parts: parts};\r\n\t\t}\r\n\t}\r\n}\r\n\r\nfunction listToStyles(list) {\r\n\tvar styles = [];\r\n\tvar newStyles = {};\r\n\tfor(var i = 0; i < list.length; i++) {\r\n\t\tvar item = list[i];\r\n\t\tvar id = item[0];\r\n\t\tvar css = item[1];\r\n\t\tvar media = item[2];\r\n\t\tvar sourceMap = item[3];\r\n\t\tvar part = {css: css, media: media, sourceMap: sourceMap};\r\n\t\tif(!newStyles[id])\r\n\t\t\tstyles.push(newStyles[id] = {id: id, parts: [part]});\r\n\t\telse\r\n\t\t\tnewStyles[id].parts.push(part);\r\n\t}\r\n\treturn styles;\r\n}\r\n\r\nfunction insertStyleElement(options, styleElement) {\r\n\tvar head = getHeadElement();\r\n\tvar lastStyleElementInsertedAtTop = styleElementsInsertedAtTop[styleElementsInsertedAtTop.length - 1];\r\n\tif (options.insertAt === \"top\") {\r\n\t\tif(!lastStyleElementInsertedAtTop) {\r\n\t\t\thead.insertBefore(styleElement, head.firstChild);\r\n\t\t} else if(lastStyleElementInsertedAtTop.nextSibling) {\r\n\t\t\thead.insertBefore(styleElement, lastStyleElementInsertedAtTop.nextSibling);\r\n\t\t} else {\r\n\t\t\thead.appendChild(styleElement);\r\n\t\t}\r\n\t\tstyleElementsInsertedAtTop.push(styleElement);\r\n\t} else if (options.insertAt === \"bottom\") {\r\n\t\thead.appendChild(styleElement);\r\n\t} else {\r\n\t\tthrow new Error(\"Invalid value for parameter 'insertAt'. Must be 'top' or 'bottom'.\");\r\n\t}\r\n}\r\n\r\nfunction removeStyleElement(styleElement) {\r\n\tstyleElement.parentNode.removeChild(styleElement);\r\n\tvar idx = styleElementsInsertedAtTop.indexOf(styleElement);\r\n\tif(idx >= 0) {\r\n\t\tstyleElementsInsertedAtTop.splice(idx, 1);\r\n\t}\r\n}\r\n\r\nfunction createStyleElement(options) {\r\n\tvar styleElement = document.createElement(\"style\");\r\n\tstyleElement.type = \"text/css\";\r\n\tinsertStyleElement(options, styleElement);\r\n\treturn styleElement;\r\n}\r\n\r\nfunction createLinkElement(options) {\r\n\tvar linkElement = document.createElement(\"link\");\r\n\tlinkElement.rel = \"stylesheet\";\r\n\tinsertStyleElement(options, linkElement);\r\n\treturn linkElement;\r\n}\r\n\r\nfunction addStyle(obj, options) {\r\n\tvar styleElement, update, remove;\r\n\r\n\tif (options.singleton) {\r\n\t\tvar styleIndex = singletonCounter++;\r\n\t\tstyleElement = singletonElement || (singletonElement = createStyleElement(options));\r\n\t\tupdate = applyToSingletonTag.bind(null, styleElement, styleIndex, false);\r\n\t\tremove = applyToSingletonTag.bind(null, styleElement, styleIndex, true);\r\n\t} else if(obj.sourceMap &&\r\n\t\ttypeof URL === \"function\" &&\r\n\t\ttypeof URL.createObjectURL === \"function\" &&\r\n\t\ttypeof URL.revokeObjectURL === \"function\" &&\r\n\t\ttypeof Blob === \"function\" &&\r\n\t\ttypeof btoa === \"function\") {\r\n\t\tstyleElement = createLinkElement(options);\r\n\t\tupdate = updateLink.bind(null, styleElement);\r\n\t\tremove = function() {\r\n\t\t\tremoveStyleElement(styleElement);\r\n\t\t\tif(styleElement.href)\r\n\t\t\t\tURL.revokeObjectURL(styleElement.href);\r\n\t\t};\r\n\t} else {\r\n\t\tstyleElement = createStyleElement(options);\r\n\t\tupdate = applyToTag.bind(null, styleElement);\r\n\t\tremove = function() {\r\n\t\t\tremoveStyleElement(styleElement);\r\n\t\t};\r\n\t}\r\n\r\n\tupdate(obj);\r\n\r\n\treturn function updateStyle(newObj) {\r\n\t\tif(newObj) {\r\n\t\t\tif(newObj.css === obj.css && newObj.media === obj.media && newObj.sourceMap === obj.sourceMap)\r\n\t\t\t\treturn;\r\n\t\t\tupdate(obj = newObj);\r\n\t\t} else {\r\n\t\t\tremove();\r\n\t\t}\r\n\t};\r\n}\r\n\r\nvar replaceText = (function () {\r\n\tvar textStore = [];\r\n\r\n\treturn function (index, replacement) {\r\n\t\ttextStore[index] = replacement;\r\n\t\treturn textStore.filter(Boolean).join('\\n');\r\n\t};\r\n})();\r\n\r\nfunction applyToSingletonTag(styleElement, index, remove, obj) {\r\n\tvar css = remove ? \"\" : obj.css;\r\n\r\n\tif (styleElement.styleSheet) {\r\n\t\tstyleElement.styleSheet.cssText = replaceText(index, css);\r\n\t} else {\r\n\t\tvar cssNode = document.createTextNode(css);\r\n\t\tvar childNodes = styleElement.childNodes;\r\n\t\tif (childNodes[index]) styleElement.removeChild(childNodes[index]);\r\n\t\tif (childNodes.length) {\r\n\t\t\tstyleElement.insertBefore(cssNode, childNodes[index]);\r\n\t\t} else {\r\n\t\t\tstyleElement.appendChild(cssNode);\r\n\t\t}\r\n\t}\r\n}\r\n\r\nfunction applyToTag(styleElement, obj) {\r\n\tvar css = obj.css;\r\n\tvar media = obj.media;\r\n\r\n\tif(media) {\r\n\t\tstyleElement.setAttribute(\"media\", media)\r\n\t}\r\n\r\n\tif(styleElement.styleSheet) {\r\n\t\tstyleElement.styleSheet.cssText = css;\r\n\t} else {\r\n\t\twhile(styleElement.firstChild) {\r\n\t\t\tstyleElement.removeChild(styleElement.firstChild);\r\n\t\t}\r\n\t\tstyleElement.appendChild(document.createTextNode(css));\r\n\t}\r\n}\r\n\r\nfunction updateLink(linkElement, obj) {\r\n\tvar css = obj.css;\r\n\tvar sourceMap = obj.sourceMap;\r\n\r\n\tif(sourceMap) {\r\n\t\t// http://stackoverflow.com/a/26603875\r\n\t\tcss += \"\\n/*# sourceMappingURL=data:application/json;base64,\" + btoa(unescape(encodeURIComponent(JSON.stringify(sourceMap)))) + \" */\";\r\n\t}\r\n\r\n\tvar blob = new Blob([css], { type: \"text/css\" });\r\n\r\n\tvar oldSrc = linkElement.href;\r\n\r\n\tlinkElement.href = URL.createObjectURL(blob);\r\n\r\n\tif(oldSrc)\r\n\t\tURL.revokeObjectURL(oldSrc);\r\n}\r\n//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIndlYnBhY2s6Ly8vLi9+L3N0eWxlLWxvYWRlci9hZGRTdHlsZXMuanM/Yjk4MCJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiQUFBQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLG9CQUFvQjtBQUNwQjtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSxFQUFFO0FBQ0Y7QUFDQTtBQUNBLEVBQUU7QUFDRjtBQUNBO0FBQ0EsRUFBRTtBQUNGO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBOztBQUVBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBLGdCQUFnQixtQkFBbUI7QUFDbkM7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsZ0JBQWdCLHNCQUFzQjtBQUN0QztBQUNBO0FBQ0Esa0JBQWtCLDJCQUEyQjtBQUM3QztBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQSxlQUFlLG1CQUFtQjtBQUNsQztBQUNBO0FBQ0E7QUFDQTtBQUNBLGlCQUFpQiwyQkFBMkI7QUFDNUM7QUFDQTtBQUNBLFFBQVEsdUJBQXVCO0FBQy9CO0FBQ0E7QUFDQSxHQUFHO0FBQ0g7QUFDQSxpQkFBaUIsdUJBQXVCO0FBQ3hDO0FBQ0E7QUFDQSwyQkFBMkI7QUFDM0I7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBLGVBQWUsaUJBQWlCO0FBQ2hDO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSxjQUFjO0FBQ2Q7QUFDQSxnQ0FBZ0Msc0JBQXNCO0FBQ3REO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsR0FBRztBQUNIO0FBQ0EsR0FBRztBQUNIO0FBQ0E7QUFDQTtBQUNBLEVBQUU7QUFDRjtBQUNBLEVBQUU7QUFDRjtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSxFQUFFO0FBQ0Y7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsRUFBRTtBQUNGO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsR0FBRztBQUNIO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQSxDQUFDOztBQUVEO0FBQ0E7O0FBRUE7QUFDQTtBQUNBLEVBQUU7QUFDRjtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsR0FBRztBQUNIO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBLEVBQUU7QUFDRjtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQSx1REFBdUQ7QUFDdkQ7O0FBRUEsNkJBQTZCLG1CQUFtQjs7QUFFaEQ7O0FBRUE7O0FBRUE7QUFDQTtBQUNBIiwiZmlsZSI6IjkuanMiLCJzb3VyY2VzQ29udGVudCI6WyIvKlxyXG5cdE1JVCBMaWNlbnNlIGh0dHA6Ly93d3cub3BlbnNvdXJjZS5vcmcvbGljZW5zZXMvbWl0LWxpY2Vuc2UucGhwXHJcblx0QXV0aG9yIFRvYmlhcyBLb3BwZXJzIEBzb2tyYVxyXG4qL1xyXG52YXIgc3R5bGVzSW5Eb20gPSB7fSxcclxuXHRtZW1vaXplID0gZnVuY3Rpb24oZm4pIHtcclxuXHRcdHZhciBtZW1vO1xyXG5cdFx0cmV0dXJuIGZ1bmN0aW9uICgpIHtcclxuXHRcdFx0aWYgKHR5cGVvZiBtZW1vID09PSBcInVuZGVmaW5lZFwiKSBtZW1vID0gZm4uYXBwbHkodGhpcywgYXJndW1lbnRzKTtcclxuXHRcdFx0cmV0dXJuIG1lbW87XHJcblx0XHR9O1xyXG5cdH0sXHJcblx0aXNPbGRJRSA9IG1lbW9pemUoZnVuY3Rpb24oKSB7XHJcblx0XHRyZXR1cm4gL21zaWUgWzYtOV1cXGIvLnRlc3Qod2luZG93Lm5hdmlnYXRvci51c2VyQWdlbnQudG9Mb3dlckNhc2UoKSk7XHJcblx0fSksXHJcblx0Z2V0SGVhZEVsZW1lbnQgPSBtZW1vaXplKGZ1bmN0aW9uICgpIHtcclxuXHRcdHJldHVybiBkb2N1bWVudC5oZWFkIHx8IGRvY3VtZW50LmdldEVsZW1lbnRzQnlUYWdOYW1lKFwiaGVhZFwiKVswXTtcclxuXHR9KSxcclxuXHRzaW5nbGV0b25FbGVtZW50ID0gbnVsbCxcclxuXHRzaW5nbGV0b25Db3VudGVyID0gMCxcclxuXHRzdHlsZUVsZW1lbnRzSW5zZXJ0ZWRBdFRvcCA9IFtdO1xyXG5cclxubW9kdWxlLmV4cG9ydHMgPSBmdW5jdGlvbihsaXN0LCBvcHRpb25zKSB7XHJcblx0aWYodHlwZW9mIERFQlVHICE9PSBcInVuZGVmaW5lZFwiICYmIERFQlVHKSB7XHJcblx0XHRpZih0eXBlb2YgZG9jdW1lbnQgIT09IFwib2JqZWN0XCIpIHRocm93IG5ldyBFcnJvcihcIlRoZSBzdHlsZS1sb2FkZXIgY2Fubm90IGJlIHVzZWQgaW4gYSBub24tYnJvd3NlciBlbnZpcm9ubWVudFwiKTtcclxuXHR9XHJcblxyXG5cdG9wdGlvbnMgPSBvcHRpb25zIHx8IHt9O1xyXG5cdC8vIEZvcmNlIHNpbmdsZS10YWcgc29sdXRpb24gb24gSUU2LTksIHdoaWNoIGhhcyBhIGhhcmQgbGltaXQgb24gdGhlICMgb2YgPHN0eWxlPlxyXG5cdC8vIHRhZ3MgaXQgd2lsbCBhbGxvdyBvbiBhIHBhZ2VcclxuXHRpZiAodHlwZW9mIG9wdGlvbnMuc2luZ2xldG9uID09PSBcInVuZGVmaW5lZFwiKSBvcHRpb25zLnNpbmdsZXRvbiA9IGlzT2xkSUUoKTtcclxuXHJcblx0Ly8gQnkgZGVmYXVsdCwgYWRkIDxzdHlsZT4gdGFncyB0byB0aGUgYm90dG9tIG9mIDxoZWFkPi5cclxuXHRpZiAodHlwZW9mIG9wdGlvbnMuaW5zZXJ0QXQgPT09IFwidW5kZWZpbmVkXCIpIG9wdGlvbnMuaW5zZXJ0QXQgPSBcImJvdHRvbVwiO1xyXG5cclxuXHR2YXIgc3R5bGVzID0gbGlzdFRvU3R5bGVzKGxpc3QpO1xyXG5cdGFkZFN0eWxlc1RvRG9tKHN0eWxlcywgb3B0aW9ucyk7XHJcblxyXG5cdHJldHVybiBmdW5jdGlvbiB1cGRhdGUobmV3TGlzdCkge1xyXG5cdFx0dmFyIG1heVJlbW92ZSA9IFtdO1xyXG5cdFx0Zm9yKHZhciBpID0gMDsgaSA8IHN0eWxlcy5sZW5ndGg7IGkrKykge1xyXG5cdFx0XHR2YXIgaXRlbSA9IHN0eWxlc1tpXTtcclxuXHRcdFx0dmFyIGRvbVN0eWxlID0gc3R5bGVzSW5Eb21baXRlbS5pZF07XHJcblx0XHRcdGRvbVN0eWxlLnJlZnMtLTtcclxuXHRcdFx0bWF5UmVtb3ZlLnB1c2goZG9tU3R5bGUpO1xyXG5cdFx0fVxyXG5cdFx0aWYobmV3TGlzdCkge1xyXG5cdFx0XHR2YXIgbmV3U3R5bGVzID0gbGlzdFRvU3R5bGVzKG5ld0xpc3QpO1xyXG5cdFx0XHRhZGRTdHlsZXNUb0RvbShuZXdTdHlsZXMsIG9wdGlvbnMpO1xyXG5cdFx0fVxyXG5cdFx0Zm9yKHZhciBpID0gMDsgaSA8IG1heVJlbW92ZS5sZW5ndGg7IGkrKykge1xyXG5cdFx0XHR2YXIgZG9tU3R5bGUgPSBtYXlSZW1vdmVbaV07XHJcblx0XHRcdGlmKGRvbVN0eWxlLnJlZnMgPT09IDApIHtcclxuXHRcdFx0XHRmb3IodmFyIGogPSAwOyBqIDwgZG9tU3R5bGUucGFydHMubGVuZ3RoOyBqKyspXHJcblx0XHRcdFx0XHRkb21TdHlsZS5wYXJ0c1tqXSgpO1xyXG5cdFx0XHRcdGRlbGV0ZSBzdHlsZXNJbkRvbVtkb21TdHlsZS5pZF07XHJcblx0XHRcdH1cclxuXHRcdH1cclxuXHR9O1xyXG59XHJcblxyXG5mdW5jdGlvbiBhZGRTdHlsZXNUb0RvbShzdHlsZXMsIG9wdGlvbnMpIHtcclxuXHRmb3IodmFyIGkgPSAwOyBpIDwgc3R5bGVzLmxlbmd0aDsgaSsrKSB7XHJcblx0XHR2YXIgaXRlbSA9IHN0eWxlc1tpXTtcclxuXHRcdHZhciBkb21TdHlsZSA9IHN0eWxlc0luRG9tW2l0ZW0uaWRdO1xyXG5cdFx0aWYoZG9tU3R5bGUpIHtcclxuXHRcdFx0ZG9tU3R5bGUucmVmcysrO1xyXG5cdFx0XHRmb3IodmFyIGogPSAwOyBqIDwgZG9tU3R5bGUucGFydHMubGVuZ3RoOyBqKyspIHtcclxuXHRcdFx0XHRkb21TdHlsZS5wYXJ0c1tqXShpdGVtLnBhcnRzW2pdKTtcclxuXHRcdFx0fVxyXG5cdFx0XHRmb3IoOyBqIDwgaXRlbS5wYXJ0cy5sZW5ndGg7IGorKykge1xyXG5cdFx0XHRcdGRvbVN0eWxlLnBhcnRzLnB1c2goYWRkU3R5bGUoaXRlbS5wYXJ0c1tqXSwgb3B0aW9ucykpO1xyXG5cdFx0XHR9XHJcblx0XHR9IGVsc2Uge1xyXG5cdFx0XHR2YXIgcGFydHMgPSBbXTtcclxuXHRcdFx0Zm9yKHZhciBqID0gMDsgaiA8IGl0ZW0ucGFydHMubGVuZ3RoOyBqKyspIHtcclxuXHRcdFx0XHRwYXJ0cy5wdXNoKGFkZFN0eWxlKGl0ZW0ucGFydHNbal0sIG9wdGlvbnMpKTtcclxuXHRcdFx0fVxyXG5cdFx0XHRzdHlsZXNJbkRvbVtpdGVtLmlkXSA9IHtpZDogaXRlbS5pZCwgcmVmczogMSwgcGFydHM6IHBhcnRzfTtcclxuXHRcdH1cclxuXHR9XHJcbn1cclxuXHJcbmZ1bmN0aW9uIGxpc3RUb1N0eWxlcyhsaXN0KSB7XHJcblx0dmFyIHN0eWxlcyA9IFtdO1xyXG5cdHZhciBuZXdTdHlsZXMgPSB7fTtcclxuXHRmb3IodmFyIGkgPSAwOyBpIDwgbGlzdC5sZW5ndGg7IGkrKykge1xyXG5cdFx0dmFyIGl0ZW0gPSBsaXN0W2ldO1xyXG5cdFx0dmFyIGlkID0gaXRlbVswXTtcclxuXHRcdHZhciBjc3MgPSBpdGVtWzFdO1xyXG5cdFx0dmFyIG1lZGlhID0gaXRlbVsyXTtcclxuXHRcdHZhciBzb3VyY2VNYXAgPSBpdGVtWzNdO1xyXG5cdFx0dmFyIHBhcnQgPSB7Y3NzOiBjc3MsIG1lZGlhOiBtZWRpYSwgc291cmNlTWFwOiBzb3VyY2VNYXB9O1xyXG5cdFx0aWYoIW5ld1N0eWxlc1tpZF0pXHJcblx0XHRcdHN0eWxlcy5wdXNoKG5ld1N0eWxlc1tpZF0gPSB7aWQ6IGlkLCBwYXJ0czogW3BhcnRdfSk7XHJcblx0XHRlbHNlXHJcblx0XHRcdG5ld1N0eWxlc1tpZF0ucGFydHMucHVzaChwYXJ0KTtcclxuXHR9XHJcblx0cmV0dXJuIHN0eWxlcztcclxufVxyXG5cclxuZnVuY3Rpb24gaW5zZXJ0U3R5bGVFbGVtZW50KG9wdGlvbnMsIHN0eWxlRWxlbWVudCkge1xyXG5cdHZhciBoZWFkID0gZ2V0SGVhZEVsZW1lbnQoKTtcclxuXHR2YXIgbGFzdFN0eWxlRWxlbWVudEluc2VydGVkQXRUb3AgPSBzdHlsZUVsZW1lbnRzSW5zZXJ0ZWRBdFRvcFtzdHlsZUVsZW1lbnRzSW5zZXJ0ZWRBdFRvcC5sZW5ndGggLSAxXTtcclxuXHRpZiAob3B0aW9ucy5pbnNlcnRBdCA9PT0gXCJ0b3BcIikge1xyXG5cdFx0aWYoIWxhc3RTdHlsZUVsZW1lbnRJbnNlcnRlZEF0VG9wKSB7XHJcblx0XHRcdGhlYWQuaW5zZXJ0QmVmb3JlKHN0eWxlRWxlbWVudCwgaGVhZC5maXJzdENoaWxkKTtcclxuXHRcdH0gZWxzZSBpZihsYXN0U3R5bGVFbGVtZW50SW5zZXJ0ZWRBdFRvcC5uZXh0U2libGluZykge1xyXG5cdFx0XHRoZWFkLmluc2VydEJlZm9yZShzdHlsZUVsZW1lbnQsIGxhc3RTdHlsZUVsZW1lbnRJbnNlcnRlZEF0VG9wLm5leHRTaWJsaW5nKTtcclxuXHRcdH0gZWxzZSB7XHJcblx0XHRcdGhlYWQuYXBwZW5kQ2hpbGQoc3R5bGVFbGVtZW50KTtcclxuXHRcdH1cclxuXHRcdHN0eWxlRWxlbWVudHNJbnNlcnRlZEF0VG9wLnB1c2goc3R5bGVFbGVtZW50KTtcclxuXHR9IGVsc2UgaWYgKG9wdGlvbnMuaW5zZXJ0QXQgPT09IFwiYm90dG9tXCIpIHtcclxuXHRcdGhlYWQuYXBwZW5kQ2hpbGQoc3R5bGVFbGVtZW50KTtcclxuXHR9IGVsc2Uge1xyXG5cdFx0dGhyb3cgbmV3IEVycm9yKFwiSW52YWxpZCB2YWx1ZSBmb3IgcGFyYW1ldGVyICdpbnNlcnRBdCcuIE11c3QgYmUgJ3RvcCcgb3IgJ2JvdHRvbScuXCIpO1xyXG5cdH1cclxufVxyXG5cclxuZnVuY3Rpb24gcmVtb3ZlU3R5bGVFbGVtZW50KHN0eWxlRWxlbWVudCkge1xyXG5cdHN0eWxlRWxlbWVudC5wYXJlbnROb2RlLnJlbW92ZUNoaWxkKHN0eWxlRWxlbWVudCk7XHJcblx0dmFyIGlkeCA9IHN0eWxlRWxlbWVudHNJbnNlcnRlZEF0VG9wLmluZGV4T2Yoc3R5bGVFbGVtZW50KTtcclxuXHRpZihpZHggPj0gMCkge1xyXG5cdFx0c3R5bGVFbGVtZW50c0luc2VydGVkQXRUb3Auc3BsaWNlKGlkeCwgMSk7XHJcblx0fVxyXG59XHJcblxyXG5mdW5jdGlvbiBjcmVhdGVTdHlsZUVsZW1lbnQob3B0aW9ucykge1xyXG5cdHZhciBzdHlsZUVsZW1lbnQgPSBkb2N1bWVudC5jcmVhdGVFbGVtZW50KFwic3R5bGVcIik7XHJcblx0c3R5bGVFbGVtZW50LnR5cGUgPSBcInRleHQvY3NzXCI7XHJcblx0aW5zZXJ0U3R5bGVFbGVtZW50KG9wdGlvbnMsIHN0eWxlRWxlbWVudCk7XHJcblx0cmV0dXJuIHN0eWxlRWxlbWVudDtcclxufVxyXG5cclxuZnVuY3Rpb24gY3JlYXRlTGlua0VsZW1lbnQob3B0aW9ucykge1xyXG5cdHZhciBsaW5rRWxlbWVudCA9IGRvY3VtZW50LmNyZWF0ZUVsZW1lbnQoXCJsaW5rXCIpO1xyXG5cdGxpbmtFbGVtZW50LnJlbCA9IFwic3R5bGVzaGVldFwiO1xyXG5cdGluc2VydFN0eWxlRWxlbWVudChvcHRpb25zLCBsaW5rRWxlbWVudCk7XHJcblx0cmV0dXJuIGxpbmtFbGVtZW50O1xyXG59XHJcblxyXG5mdW5jdGlvbiBhZGRTdHlsZShvYmosIG9wdGlvbnMpIHtcclxuXHR2YXIgc3R5bGVFbGVtZW50LCB1cGRhdGUsIHJlbW92ZTtcclxuXHJcblx0aWYgKG9wdGlvbnMuc2luZ2xldG9uKSB7XHJcblx0XHR2YXIgc3R5bGVJbmRleCA9IHNpbmdsZXRvbkNvdW50ZXIrKztcclxuXHRcdHN0eWxlRWxlbWVudCA9IHNpbmdsZXRvbkVsZW1lbnQgfHwgKHNpbmdsZXRvbkVsZW1lbnQgPSBjcmVhdGVTdHlsZUVsZW1lbnQob3B0aW9ucykpO1xyXG5cdFx0dXBkYXRlID0gYXBwbHlUb1NpbmdsZXRvblRhZy5iaW5kKG51bGwsIHN0eWxlRWxlbWVudCwgc3R5bGVJbmRleCwgZmFsc2UpO1xyXG5cdFx0cmVtb3ZlID0gYXBwbHlUb1NpbmdsZXRvblRhZy5iaW5kKG51bGwsIHN0eWxlRWxlbWVudCwgc3R5bGVJbmRleCwgdHJ1ZSk7XHJcblx0fSBlbHNlIGlmKG9iai5zb3VyY2VNYXAgJiZcclxuXHRcdHR5cGVvZiBVUkwgPT09IFwiZnVuY3Rpb25cIiAmJlxyXG5cdFx0dHlwZW9mIFVSTC5jcmVhdGVPYmplY3RVUkwgPT09IFwiZnVuY3Rpb25cIiAmJlxyXG5cdFx0dHlwZW9mIFVSTC5yZXZva2VPYmplY3RVUkwgPT09IFwiZnVuY3Rpb25cIiAmJlxyXG5cdFx0dHlwZW9mIEJsb2IgPT09IFwiZnVuY3Rpb25cIiAmJlxyXG5cdFx0dHlwZW9mIGJ0b2EgPT09IFwiZnVuY3Rpb25cIikge1xyXG5cdFx0c3R5bGVFbGVtZW50ID0gY3JlYXRlTGlua0VsZW1lbnQob3B0aW9ucyk7XHJcblx0XHR1cGRhdGUgPSB1cGRhdGVMaW5rLmJpbmQobnVsbCwgc3R5bGVFbGVtZW50KTtcclxuXHRcdHJlbW92ZSA9IGZ1bmN0aW9uKCkge1xyXG5cdFx0XHRyZW1vdmVTdHlsZUVsZW1lbnQoc3R5bGVFbGVtZW50KTtcclxuXHRcdFx0aWYoc3R5bGVFbGVtZW50LmhyZWYpXHJcblx0XHRcdFx0VVJMLnJldm9rZU9iamVjdFVSTChzdHlsZUVsZW1lbnQuaHJlZik7XHJcblx0XHR9O1xyXG5cdH0gZWxzZSB7XHJcblx0XHRzdHlsZUVsZW1lbnQgPSBjcmVhdGVTdHlsZUVsZW1lbnQob3B0aW9ucyk7XHJcblx0XHR1cGRhdGUgPSBhcHBseVRvVGFnLmJpbmQobnVsbCwgc3R5bGVFbGVtZW50KTtcclxuXHRcdHJlbW92ZSA9IGZ1bmN0aW9uKCkge1xyXG5cdFx0XHRyZW1vdmVTdHlsZUVsZW1lbnQoc3R5bGVFbGVtZW50KTtcclxuXHRcdH07XHJcblx0fVxyXG5cclxuXHR1cGRhdGUob2JqKTtcclxuXHJcblx0cmV0dXJuIGZ1bmN0aW9uIHVwZGF0ZVN0eWxlKG5ld09iaikge1xyXG5cdFx0aWYobmV3T2JqKSB7XHJcblx0XHRcdGlmKG5ld09iai5jc3MgPT09IG9iai5jc3MgJiYgbmV3T2JqLm1lZGlhID09PSBvYmoubWVkaWEgJiYgbmV3T2JqLnNvdXJjZU1hcCA9PT0gb2JqLnNvdXJjZU1hcClcclxuXHRcdFx0XHRyZXR1cm47XHJcblx0XHRcdHVwZGF0ZShvYmogPSBuZXdPYmopO1xyXG5cdFx0fSBlbHNlIHtcclxuXHRcdFx0cmVtb3ZlKCk7XHJcblx0XHR9XHJcblx0fTtcclxufVxyXG5cclxudmFyIHJlcGxhY2VUZXh0ID0gKGZ1bmN0aW9uICgpIHtcclxuXHR2YXIgdGV4dFN0b3JlID0gW107XHJcblxyXG5cdHJldHVybiBmdW5jdGlvbiAoaW5kZXgsIHJlcGxhY2VtZW50KSB7XHJcblx0XHR0ZXh0U3RvcmVbaW5kZXhdID0gcmVwbGFjZW1lbnQ7XHJcblx0XHRyZXR1cm4gdGV4dFN0b3JlLmZpbHRlcihCb29sZWFuKS5qb2luKCdcXG4nKTtcclxuXHR9O1xyXG59KSgpO1xyXG5cclxuZnVuY3Rpb24gYXBwbHlUb1NpbmdsZXRvblRhZyhzdHlsZUVsZW1lbnQsIGluZGV4LCByZW1vdmUsIG9iaikge1xyXG5cdHZhciBjc3MgPSByZW1vdmUgPyBcIlwiIDogb2JqLmNzcztcclxuXHJcblx0aWYgKHN0eWxlRWxlbWVudC5zdHlsZVNoZWV0KSB7XHJcblx0XHRzdHlsZUVsZW1lbnQuc3R5bGVTaGVldC5jc3NUZXh0ID0gcmVwbGFjZVRleHQoaW5kZXgsIGNzcyk7XHJcblx0fSBlbHNlIHtcclxuXHRcdHZhciBjc3NOb2RlID0gZG9jdW1lbnQuY3JlYXRlVGV4dE5vZGUoY3NzKTtcclxuXHRcdHZhciBjaGlsZE5vZGVzID0gc3R5bGVFbGVtZW50LmNoaWxkTm9kZXM7XHJcblx0XHRpZiAoY2hpbGROb2Rlc1tpbmRleF0pIHN0eWxlRWxlbWVudC5yZW1vdmVDaGlsZChjaGlsZE5vZGVzW2luZGV4XSk7XHJcblx0XHRpZiAoY2hpbGROb2Rlcy5sZW5ndGgpIHtcclxuXHRcdFx0c3R5bGVFbGVtZW50Lmluc2VydEJlZm9yZShjc3NOb2RlLCBjaGlsZE5vZGVzW2luZGV4XSk7XHJcblx0XHR9IGVsc2Uge1xyXG5cdFx0XHRzdHlsZUVsZW1lbnQuYXBwZW5kQ2hpbGQoY3NzTm9kZSk7XHJcblx0XHR9XHJcblx0fVxyXG59XHJcblxyXG5mdW5jdGlvbiBhcHBseVRvVGFnKHN0eWxlRWxlbWVudCwgb2JqKSB7XHJcblx0dmFyIGNzcyA9IG9iai5jc3M7XHJcblx0dmFyIG1lZGlhID0gb2JqLm1lZGlhO1xyXG5cclxuXHRpZihtZWRpYSkge1xyXG5cdFx0c3R5bGVFbGVtZW50LnNldEF0dHJpYnV0ZShcIm1lZGlhXCIsIG1lZGlhKVxyXG5cdH1cclxuXHJcblx0aWYoc3R5bGVFbGVtZW50LnN0eWxlU2hlZXQpIHtcclxuXHRcdHN0eWxlRWxlbWVudC5zdHlsZVNoZWV0LmNzc1RleHQgPSBjc3M7XHJcblx0fSBlbHNlIHtcclxuXHRcdHdoaWxlKHN0eWxlRWxlbWVudC5maXJzdENoaWxkKSB7XHJcblx0XHRcdHN0eWxlRWxlbWVudC5yZW1vdmVDaGlsZChzdHlsZUVsZW1lbnQuZmlyc3RDaGlsZCk7XHJcblx0XHR9XHJcblx0XHRzdHlsZUVsZW1lbnQuYXBwZW5kQ2hpbGQoZG9jdW1lbnQuY3JlYXRlVGV4dE5vZGUoY3NzKSk7XHJcblx0fVxyXG59XHJcblxyXG5mdW5jdGlvbiB1cGRhdGVMaW5rKGxpbmtFbGVtZW50LCBvYmopIHtcclxuXHR2YXIgY3NzID0gb2JqLmNzcztcclxuXHR2YXIgc291cmNlTWFwID0gb2JqLnNvdXJjZU1hcDtcclxuXHJcblx0aWYoc291cmNlTWFwKSB7XHJcblx0XHQvLyBodHRwOi8vc3RhY2tvdmVyZmxvdy5jb20vYS8yNjYwMzg3NVxyXG5cdFx0Y3NzICs9IFwiXFxuLyojIHNvdXJjZU1hcHBpbmdVUkw9ZGF0YTphcHBsaWNhdGlvbi9qc29uO2Jhc2U2NCxcIiArIGJ0b2EodW5lc2NhcGUoZW5jb2RlVVJJQ29tcG9uZW50KEpTT04uc3RyaW5naWZ5KHNvdXJjZU1hcCkpKSkgKyBcIiAqL1wiO1xyXG5cdH1cclxuXHJcblx0dmFyIGJsb2IgPSBuZXcgQmxvYihbY3NzXSwgeyB0eXBlOiBcInRleHQvY3NzXCIgfSk7XHJcblxyXG5cdHZhciBvbGRTcmMgPSBsaW5rRWxlbWVudC5ocmVmO1xyXG5cclxuXHRsaW5rRWxlbWVudC5ocmVmID0gVVJMLmNyZWF0ZU9iamVjdFVSTChibG9iKTtcclxuXHJcblx0aWYob2xkU3JjKVxyXG5cdFx0VVJMLnJldm9rZU9iamVjdFVSTChvbGRTcmMpO1xyXG59XHJcblxuXG5cbi8qKioqKioqKioqKioqKioqKlxuICoqIFdFQlBBQ0sgRk9PVEVSXG4gKiogLi9+L3N0eWxlLWxvYWRlci9hZGRTdHlsZXMuanNcbiAqKiBtb2R1bGUgaWQgPSA5XG4gKiogbW9kdWxlIGNodW5rcyA9IDBcbiAqKi8iXSwic291cmNlUm9vdCI6IiJ9");

/***/ },
/* 10 */
/***/ function(module, exports, __webpack_require__) {

	eval("'use strict';\n\nObject.defineProperty(exports, \"__esModule\", {\n  value: true\n});\n\nvar _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if (\"value\" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }(); // Game.js\n\n\nvar _Board = __webpack_require__(11);\n\nvar _Board2 = _interopRequireDefault(_Board);\n\nvar _Paddle = __webpack_require__(12);\n\nvar _Paddle2 = _interopRequireDefault(_Paddle);\n\nvar _Ball = __webpack_require__(14);\n\nvar _Ball2 = _interopRequireDefault(_Ball);\n\nvar _settings = __webpack_require__(13);\n\nvar _settings2 = _interopRequireDefault(_settings);\n\nvar _ScoreBoard = __webpack_require__(15);\n\nvar _ScoreBoard2 = _interopRequireDefault(_ScoreBoard);\n\nfunction _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }\n\nfunction _toConsumableArray(arr) { if (Array.isArray(arr)) { for (var i = 0, arr2 = Array(arr.length); i < arr.length; i++) { arr2[i] = arr[i]; } return arr2; } else { return Array.from(arr); } }\n\nfunction _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError(\"Cannot call a class as a function\"); } }\n\nvar gap = _settings2.default.gap;\nvar p1Keys = _settings2.default.p1Keys;\nvar p2Keys = _settings2.default.p2Keys;\nvar p1Score = _settings2.default.p1Score;\nvar p2Score = _settings2.default.p2Score;\n\nvar Game = function () {\n  function Game() {\n    var _this = this;\n\n    _classCallCheck(this, Game);\n\n    var canvas = document.getElementById('game');\n    this.width = canvas.width;\n    this.height = canvas.height;\n    this.context = canvas.getContext('2d');\n    this.context.fillStyle = 'white';\n    this.board = new _Board2.default(this.width, this.height);\n    this.score1 = new (Function.prototype.bind.apply(_ScoreBoard2.default, [null].concat(_toConsumableArray(p1Score))))();\n    this.score2 = new (Function.prototype.bind.apply(_ScoreBoard2.default, [null].concat(_toConsumableArray(p2Score))))();\n    this.player1 = new _Paddle2.default(this.width, this.height, gap, p1Keys, this.score1);\n    this.player2 = new _Paddle2.default(this.width, this.height, this.width - 4 - gap, p2Keys, this.score2);\n    this.ball1 = new _Ball2.default(this.width, this.height);\n    this.ballsArr = [];\n    this.gamePaused = false;\n\n    document.body.addEventListener('keyup', function (event) {\n      switch (event.keyCode) {\n        case p1Keys.addBalls:\n        case p2Keys.addBalls:\n          _this.addBalls();\n          break;\n\n        case p1Keys.ballSize:\n        case p2Keys.ballSize:\n          _this.ball1.radius = Math.floor(Math.random() * (9 - 5) + 5);\n          break;\n      }\n    });\n  }\n\n  _createClass(Game, [{\n    key: 'addBalls',\n    value: function addBalls() {\n      for (var i = 0; i < 5; i++) {\n        var ball = new _Ball2.default(this.width, this.height);\n        ball.vy = Math.floor(Math.random() * 12 - 6);\n        ball.vx = 7 - Math.abs(ball.vy);\n        this.ballsArr.push(ball);\n      }\n    }\n  }, {\n    key: 'getRandomColor',\n    value: function getRandomColor() {\n      var letters = '0123456789ABCDEF';\n      var color = '#';\n      for (var x = 0; x < 6; x++) {\n        color += letters[Math.floor(Math.random() * 16)];\n      }\n      return color;\n    }\n  }, {\n    key: 'render',\n    value: function render() {\n      var _this2 = this;\n\n      this.board.render(this.context);\n      this.player1.render(this.context, 'yellow');\n      this.player2.render(this.context, 'blue');\n      this.score1.render(this.context);\n      this.score2.render(this.context);\n      this.ball1.render(this.context, 'navy', this.player1, this.player2, this.width, this.height);\n\n      this.ballsArr.forEach(function (value) {\n        value.render(_this2.context, _this2.getRandomColor(), _this2.player1, _this2.player2, _this2.width, _this2.height);\n      });\n    }\n  }]);\n\n  return Game;\n}();\n\nexports.default = Game;//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIndlYnBhY2s6Ly8vLi9zcmMvR2FtZS5qcz82ZjI0Il0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiI7Ozs7OztxakJBQUE7OztBQUNBOzs7O0FBQ0E7Ozs7QUFDQTs7OztBQUNBOzs7O0FBQ0E7Ozs7Ozs7Ozs7QUFDQSxJQUFNLE1BQU0sbUJBQVMsR0FBckI7QUFDQSxJQUFJLFNBQVMsbUJBQVMsTUFBdEI7QUFDQSxJQUFJLFNBQVMsbUJBQVMsTUFBdEI7QUFDQSxJQUFJLFVBQVUsbUJBQVMsT0FBdkI7QUFDQSxJQUFJLFVBQVUsbUJBQVMsT0FBdkI7O0lBRXNCLEk7QUFDbkIsa0JBQWM7QUFBQTs7QUFBQTs7QUFDYixRQUFNLFNBQVMsU0FBUyxjQUFULENBQXdCLE1BQXhCLENBQWY7QUFDQSxTQUFLLEtBQUwsR0FBYSxPQUFPLEtBQXBCO0FBQ0EsU0FBSyxNQUFMLEdBQWMsT0FBTyxNQUFyQjtBQUNBLFNBQUssT0FBTCxHQUFlLE9BQU8sVUFBUCxDQUFrQixJQUFsQixDQUFmO0FBQ0EsU0FBSyxPQUFMLENBQWEsU0FBYixHQUF5QixPQUF6QjtBQUNBLFNBQUssS0FBTCxHQUFhLG9CQUFVLEtBQUssS0FBZixFQUFzQixLQUFLLE1BQTNCLENBQWI7QUFDQSxTQUFLLE1BQUwsNkZBQWdDLE9BQWhDO0FBQ0EsU0FBSyxNQUFMLDZGQUFnQyxPQUFoQztBQUNBLFNBQUssT0FBTCxHQUFlLHFCQUFXLEtBQUssS0FBaEIsRUFBdUIsS0FBSyxNQUE1QixFQUFvQyxHQUFwQyxFQUF5QyxNQUF6QyxFQUFpRCxLQUFLLE1BQXRELENBQWY7QUFDQSxTQUFLLE9BQUwsR0FBZSxxQkFBVyxLQUFLLEtBQWhCLEVBQXVCLEtBQUssTUFBNUIsRUFBb0MsS0FBSyxLQUFMLEdBQWEsQ0FBYixHQUFpQixHQUFyRCxFQUEwRCxNQUExRCxFQUFrRSxLQUFLLE1BQXZFLENBQWY7QUFDQSxTQUFLLEtBQUwsR0FBYSxtQkFBUyxLQUFLLEtBQWQsRUFBcUIsS0FBSyxNQUExQixDQUFiO0FBQ0EsU0FBSyxRQUFMLEdBQWdCLEVBQWhCO0FBQ0EsU0FBSyxVQUFMLEdBQWtCLEtBQWxCOztBQUVBLGFBQVMsSUFBVCxDQUFjLGdCQUFkLENBQStCLE9BQS9CLEVBQXdDLFVBQUMsS0FBRCxFQUFXO0FBQ2pELGNBQVEsTUFBTSxPQUFkO0FBQ0UsYUFBSyxPQUFPLFFBQVo7QUFDQSxhQUFLLE9BQU8sUUFBWjtBQUNBLGdCQUFLLFFBQUw7QUFDQTs7QUFFQSxhQUFLLE9BQU8sUUFBWjtBQUNBLGFBQUssT0FBTyxRQUFaO0FBQ0EsZ0JBQUssS0FBTCxDQUFXLE1BQVgsR0FBb0IsS0FBSyxLQUFMLENBQVcsS0FBSyxNQUFMLE1BQWlCLElBQUUsQ0FBbkIsSUFBc0IsQ0FBakMsQ0FBcEI7QUFDQTtBQVRGO0FBV0QsS0FaRDtBQWFEOzs7OytCQUdTO0FBQ1IsV0FBSSxJQUFJLElBQUksQ0FBWixFQUFlLElBQUksQ0FBbkIsRUFBc0IsR0FBdEIsRUFBMEI7QUFDeEIsWUFBSSxPQUFPLG1CQUFTLEtBQUssS0FBZCxFQUFxQixLQUFLLE1BQTFCLENBQVg7QUFDQSxhQUFLLEVBQUwsR0FBVSxLQUFLLEtBQUwsQ0FBVyxLQUFLLE1BQUwsS0FBZ0IsRUFBaEIsR0FBcUIsQ0FBaEMsQ0FBVjtBQUNBLGFBQUssRUFBTCxHQUFXLElBQUksS0FBSyxHQUFMLENBQVMsS0FBSyxFQUFkLENBQWY7QUFDQSxhQUFLLFFBQUwsQ0FBYyxJQUFkLENBQW1CLElBQW5CO0FBQ0M7QUFDSjs7O3FDQUVrQjtBQUNiLFVBQUksVUFBVSxrQkFBZDtBQUNBLFVBQUksUUFBUSxHQUFaO0FBQ0EsV0FBSyxJQUFJLElBQUksQ0FBYixFQUFnQixJQUFJLENBQXBCLEVBQXVCLEdBQXZCLEVBQTZCO0FBQ3pCLGlCQUFTLFFBQVEsS0FBSyxLQUFMLENBQVcsS0FBSyxNQUFMLEtBQWdCLEVBQTNCLENBQVIsQ0FBVDtBQUNIO0FBQ0QsYUFBTyxLQUFQO0FBQ0g7Ozs2QkFFTTtBQUFBOztBQUNQLFdBQUssS0FBTCxDQUFXLE1BQVgsQ0FBa0IsS0FBSyxPQUF2QjtBQUNBLFdBQUssT0FBTCxDQUFhLE1BQWIsQ0FBb0IsS0FBSyxPQUF6QixFQUFrQyxRQUFsQztBQUNBLFdBQUssT0FBTCxDQUFhLE1BQWIsQ0FBb0IsS0FBSyxPQUF6QixFQUFrQyxNQUFsQztBQUNBLFdBQUssTUFBTCxDQUFZLE1BQVosQ0FBbUIsS0FBSyxPQUF4QjtBQUNBLFdBQUssTUFBTCxDQUFZLE1BQVosQ0FBbUIsS0FBSyxPQUF4QjtBQUNBLFdBQUssS0FBTCxDQUFXLE1BQVgsQ0FBa0IsS0FBSyxPQUF2QixFQUFnQyxNQUFoQyxFQUF3QyxLQUFLLE9BQTdDLEVBQXNELEtBQUssT0FBM0QsRUFBb0UsS0FBSyxLQUF6RSxFQUFnRixLQUFLLE1BQXJGOztBQUVBLFdBQUssUUFBTCxDQUFjLE9BQWQsQ0FBc0IsVUFBQyxLQUFELEVBQVc7QUFDL0IsY0FBTSxNQUFOLENBQWEsT0FBSyxPQUFsQixFQUEyQixPQUFLLGNBQUwsRUFBM0IsRUFBa0QsT0FBSyxPQUF2RCxFQUFnRSxPQUFLLE9BQXJFLEVBQThFLE9BQUssS0FBbkYsRUFBMEYsT0FBSyxNQUEvRjtBQUNELE9BRkQ7QUFJQzs7Ozs7O2tCQTlEaUIsSSIsImZpbGUiOiIxMC5qcyIsInNvdXJjZXNDb250ZW50IjpbIi8vIEdhbWUuanNcclxuaW1wb3J0IEJvYXJkIGZyb20gJy4vQm9hcmQnO1xyXG5pbXBvcnQgUGFkZGxlIGZyb20gJy4vUGFkZGxlJztcclxuaW1wb3J0IEJhbGwgZnJvbSAnLi9CYWxsJztcclxuaW1wb3J0IHNldHRpbmdzIGZyb20gJy4vc2V0dGluZ3MnO1xyXG5pbXBvcnQgU2NvcmVCb2FyZCBmcm9tICcuL1Njb3JlQm9hcmQnO1xyXG5jb25zdCBnYXAgPSBzZXR0aW5ncy5nYXA7XHJcbnZhciBwMUtleXMgPSBzZXR0aW5ncy5wMUtleXM7XHJcbnZhciBwMktleXMgPSBzZXR0aW5ncy5wMktleXM7XHJcbnZhciBwMVNjb3JlID0gc2V0dGluZ3MucDFTY29yZTtcclxudmFyIHAyU2NvcmUgPSBzZXR0aW5ncy5wMlNjb3JlO1xyXG5cclxuIGV4cG9ydCBkZWZhdWx0IGNsYXNzIEdhbWUge1xyXG4gICBjb25zdHJ1Y3RvcigpIHsgXHJcbiAgICBjb25zdCBjYW52YXMgPSBkb2N1bWVudC5nZXRFbGVtZW50QnlJZCgnZ2FtZScpO1xyXG4gICAgdGhpcy53aWR0aCA9IGNhbnZhcy53aWR0aDtcclxuICAgIHRoaXMuaGVpZ2h0ID0gY2FudmFzLmhlaWdodDtcclxuICAgIHRoaXMuY29udGV4dCA9IGNhbnZhcy5nZXRDb250ZXh0KCcyZCcpO1xyXG4gICAgdGhpcy5jb250ZXh0LmZpbGxTdHlsZSA9ICd3aGl0ZSc7XHJcbiAgICB0aGlzLmJvYXJkID0gbmV3IEJvYXJkKHRoaXMud2lkdGgsIHRoaXMuaGVpZ2h0KTtcclxuICAgIHRoaXMuc2NvcmUxID0gbmV3IFNjb3JlQm9hcmQoLi4ucDFTY29yZSk7XHJcbiAgICB0aGlzLnNjb3JlMiA9IG5ldyBTY29yZUJvYXJkKC4uLnAyU2NvcmUpO1xyXG4gICAgdGhpcy5wbGF5ZXIxID0gbmV3IFBhZGRsZSh0aGlzLndpZHRoLCB0aGlzLmhlaWdodCwgZ2FwLCBwMUtleXMsIHRoaXMuc2NvcmUxKTtcclxuICAgIHRoaXMucGxheWVyMiA9IG5ldyBQYWRkbGUodGhpcy53aWR0aCwgdGhpcy5oZWlnaHQsIHRoaXMud2lkdGggLSA0IC0gZ2FwLCBwMktleXMsIHRoaXMuc2NvcmUyKTtcclxuICAgIHRoaXMuYmFsbDEgPSBuZXcgQmFsbCh0aGlzLndpZHRoLCB0aGlzLmhlaWdodCk7XHJcbiAgICB0aGlzLmJhbGxzQXJyID0gW107XHJcbiAgICB0aGlzLmdhbWVQYXVzZWQgPSBmYWxzZTtcclxuXHJcbiAgICBkb2N1bWVudC5ib2R5LmFkZEV2ZW50TGlzdGVuZXIoJ2tleXVwJywgKGV2ZW50KSA9PiB7XHJcbiAgICAgIHN3aXRjaCAoZXZlbnQua2V5Q29kZSl7XHJcbiAgICAgICAgY2FzZSBwMUtleXMuYWRkQmFsbHM6XHJcbiAgICAgICAgY2FzZSBwMktleXMuYWRkQmFsbHM6XHJcbiAgICAgICAgdGhpcy5hZGRCYWxscygpO1xyXG4gICAgICAgIGJyZWFrO1xyXG5cclxuICAgICAgICBjYXNlIHAxS2V5cy5iYWxsU2l6ZTpcclxuICAgICAgICBjYXNlIHAyS2V5cy5iYWxsU2l6ZTpcclxuICAgICAgICB0aGlzLmJhbGwxLnJhZGl1cyA9IE1hdGguZmxvb3IoTWF0aC5yYW5kb20oKSAqICg5LTUpKzUpO1xyXG4gICAgICAgIGJyZWFrO1xyXG4gICAgfVxyXG4gICAgfSk7XHJcbiAgfVxyXG4gIFxyXG5cclxuICBhZGRCYWxscygpe1xyXG4gICAgZm9yKHZhciBpID0gMDsgaSA8IDU7IGkrKyl7XHJcbiAgICAgIGxldCBiYWxsID0gbmV3IEJhbGwodGhpcy53aWR0aCwgdGhpcy5oZWlnaHQpO1xyXG4gICAgICBiYWxsLnZ5ID0gTWF0aC5mbG9vcihNYXRoLnJhbmRvbSgpICogMTIgLSA2KTtcclxuICAgICAgYmFsbC52eCA9ICg3IC0gTWF0aC5hYnMoYmFsbC52eSkpO1xyXG4gICAgICB0aGlzLmJhbGxzQXJyLnB1c2goYmFsbCk7XHJcbiAgICAgIH1cclxuICB9XHJcblxyXG4gICAgZ2V0UmFuZG9tQ29sb3IoKSB7XHJcbiAgICAgICAgdmFyIGxldHRlcnMgPSAnMDEyMzQ1Njc4OUFCQ0RFRic7XHJcbiAgICAgICAgdmFyIGNvbG9yID0gJyMnO1xyXG4gICAgICAgIGZvciAodmFyIHggPSAwOyB4IDwgNjsgeCsrICkge1xyXG4gICAgICAgICAgICBjb2xvciArPSBsZXR0ZXJzW01hdGguZmxvb3IoTWF0aC5yYW5kb20oKSAqIDE2KV07XHJcbiAgICAgICAgfVxyXG4gICAgICAgIHJldHVybiBjb2xvcjtcclxuICAgIH1cclxuXHJcbiAgcmVuZGVyKCkge1xyXG4gICAgdGhpcy5ib2FyZC5yZW5kZXIodGhpcy5jb250ZXh0KTtcclxuICAgIHRoaXMucGxheWVyMS5yZW5kZXIodGhpcy5jb250ZXh0LCAneWVsbG93Jyk7XHJcbiAgICB0aGlzLnBsYXllcjIucmVuZGVyKHRoaXMuY29udGV4dCwgJ2JsdWUnKTtcclxuICAgIHRoaXMuc2NvcmUxLnJlbmRlcih0aGlzLmNvbnRleHQpO1xyXG4gICAgdGhpcy5zY29yZTIucmVuZGVyKHRoaXMuY29udGV4dCk7XHJcbiAgICB0aGlzLmJhbGwxLnJlbmRlcih0aGlzLmNvbnRleHQsICduYXZ5JywgdGhpcy5wbGF5ZXIxLCB0aGlzLnBsYXllcjIsIHRoaXMud2lkdGgsIHRoaXMuaGVpZ2h0KTtcclxuXHJcbiAgICB0aGlzLmJhbGxzQXJyLmZvckVhY2goKHZhbHVlKSA9PiB7XHJcbiAgICAgIHZhbHVlLnJlbmRlcih0aGlzLmNvbnRleHQsIHRoaXMuZ2V0UmFuZG9tQ29sb3IoKSwgdGhpcy5wbGF5ZXIxLCB0aGlzLnBsYXllcjIsIHRoaXMud2lkdGgsIHRoaXMuaGVpZ2h0KTtcclxuICAgIH0pO1xyXG5cclxuICAgIH1cclxuICB9XG5cblxuLyoqIFdFQlBBQ0sgRk9PVEVSICoqXG4gKiogLi9zcmMvR2FtZS5qc1xuICoqLyJdLCJzb3VyY2VSb290IjoiIn0=");

/***/ },
/* 11 */
/***/ function(module, exports) {

	eval("\"use strict\";\n\nObject.defineProperty(exports, \"__esModule\", {\n    value: true\n});\n\nvar _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if (\"value\" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();\n\nfunction _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError(\"Cannot call a class as a function\"); } }\n\n// Board.js\nvar Board = function () {\n    function Board(width, height) {\n        _classCallCheck(this, Board);\n\n        this.width = width;\n        this.height = height;\n    }\n\n    _createClass(Board, [{\n        key: \"drawLine\",\n        value: function drawLine(ctx) {\n            ctx.setLineDash([10, 10]);\n            ctx.beginPath();\n            ctx.moveTo(this.width / 2, 0);\n            ctx.lineTo(this.width / 2, this.height);\n            ctx.strokeStyle = \"white\";\n            ctx.stroke();\n        }\n    }, {\n        key: \"render\",\n        value: function render(ctx) {\n            ctx.clearRect(0, 0, this.width, this.height);\n            this.drawLine(ctx);\n        }\n    }]);\n\n    return Board;\n}();\n\nexports.default = Board;//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIndlYnBhY2s6Ly8vLi9zcmMvQm9hcmQuanM/OWQ5NSJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiOzs7Ozs7Ozs7O0FBQUE7SUFDcUIsSztBQUNqQixtQkFBWSxLQUFaLEVBQW1CLE1BQW5CLEVBQTJCO0FBQUE7O0FBQ3ZCLGFBQUssS0FBTCxHQUFhLEtBQWI7QUFDQSxhQUFLLE1BQUwsR0FBYyxNQUFkO0FBQ0g7Ozs7aUNBQ1EsRyxFQUFLO0FBQ1YsZ0JBQUksV0FBSixDQUFnQixDQUFDLEVBQUQsRUFBSyxFQUFMLENBQWhCO0FBQ0EsZ0JBQUksU0FBSjtBQUNBLGdCQUFJLE1BQUosQ0FBVyxLQUFLLEtBQUwsR0FBYSxDQUF4QixFQUEyQixDQUEzQjtBQUNBLGdCQUFJLE1BQUosQ0FBVyxLQUFLLEtBQUwsR0FBYSxDQUF4QixFQUEyQixLQUFLLE1BQWhDO0FBQ0EsZ0JBQUksV0FBSixHQUFrQixPQUFsQjtBQUNBLGdCQUFJLE1BQUo7QUFDSDs7OytCQUNNLEcsRUFBSztBQUNaLGdCQUFJLFNBQUosQ0FBYyxDQUFkLEVBQWlCLENBQWpCLEVBQW9CLEtBQUssS0FBekIsRUFBZ0MsS0FBSyxNQUFyQztBQUNJLGlCQUFLLFFBQUwsQ0FBYyxHQUFkO0FBQ0g7Ozs7OztrQkFoQmdCLEsiLCJmaWxlIjoiMTEuanMiLCJzb3VyY2VzQ29udGVudCI6WyIvLyBCb2FyZC5qc1xyXG5leHBvcnQgZGVmYXVsdCBjbGFzcyBCb2FyZCB7XHJcbiAgICBjb25zdHJ1Y3Rvcih3aWR0aCwgaGVpZ2h0KSB7XHJcbiAgICAgICAgdGhpcy53aWR0aCA9IHdpZHRoO1xyXG4gICAgICAgIHRoaXMuaGVpZ2h0ID0gaGVpZ2h0O1xyXG4gICAgfVxyXG4gICAgZHJhd0xpbmUoY3R4KSB7XHJcbiAgICAgICAgY3R4LnNldExpbmVEYXNoKFsxMCwgMTBdKTtcclxuICAgICAgICBjdHguYmVnaW5QYXRoKCk7XHJcbiAgICAgICAgY3R4Lm1vdmVUbyh0aGlzLndpZHRoIC8gMiwgMCk7XHJcbiAgICAgICAgY3R4LmxpbmVUbyh0aGlzLndpZHRoIC8gMiwgdGhpcy5oZWlnaHQpO1xyXG4gICAgICAgIGN0eC5zdHJva2VTdHlsZSA9IFwid2hpdGVcIjtcclxuICAgICAgICBjdHguc3Ryb2tlKCk7XHJcbiAgICB9XHJcbiAgICByZW5kZXIoY3R4KSB7XHJcbiAgICBjdHguY2xlYXJSZWN0KDAsIDAsIHRoaXMud2lkdGgsIHRoaXMuaGVpZ2h0KTtcclxuICAgICAgICB0aGlzLmRyYXdMaW5lKGN0eCk7XHJcbiAgICB9XHJcbn1cblxuXG4vKiogV0VCUEFDSyBGT09URVIgKipcbiAqKiAuL3NyYy9Cb2FyZC5qc1xuICoqLyJdLCJzb3VyY2VSb290IjoiIn0=");

/***/ },
/* 12 */
/***/ function(module, exports, __webpack_require__) {

	eval("'use strict';\n\nObject.defineProperty(exports, \"__esModule\", {\n   value: true\n});\n\nvar _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if (\"value\" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();\n\nvar _settings = __webpack_require__(13);\n\nvar _settings2 = _interopRequireDefault(_settings);\n\nfunction _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }\n\nfunction _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError(\"Cannot call a class as a function\"); } }\n\nvar victorySound = new Audio('../sounds/pong-02.wav');\n\nvar Paddle = function () {\n   function Paddle(boardWidth, boardHeight, x, control, score) {\n      var _this = this;\n\n      _classCallCheck(this, Paddle);\n\n      this.width = _settings2.default.paddleWidth;\n      this.height = _settings2.default.paddleHeight;\n      this.x = x;\n      this.y = boardHeight / 2 - this.height / 2;\n      this.speed = _settings2.default.paddleSpeed;\n      this.maxHeight = boardHeight;\n      this.maxWidth = boardWidth;\n      this.score = score;\n\n      document.body.addEventListener('keydown', function (event) {\n         switch (event.keyCode) {\n            case control.up:\n               _this.y = Math.max(0, _this.y - _this.speed);\n               break;\n\n            case control.down:\n               _this.y = Math.min(_this.maxHeight - _this.height, _this.y + _this.speed);\n               break;\n         }\n      });\n   }\n\n   _createClass(Paddle, [{\n      key: 'addScore',\n      value: function addScore() {\n         this.score.score++;\n         victorySound.play();\n      }\n   }, {\n      key: 'render',\n      value: function render(ctx, color) {\n         // What is ctx? Where does it come from?\n         ctx.fillStyle = color;\n         ctx.fillRect(this.x, this.y, this.width, this.height);\n      }\n   }]);\n\n   return Paddle;\n}();\n\nexports.default = Paddle;//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIndlYnBhY2s6Ly8vLi9zcmMvUGFkZGxlLmpzP2ZkYmQiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6Ijs7Ozs7Ozs7QUFBQTs7Ozs7Ozs7QUFDQSxJQUFNLGVBQWUsSUFBSSxLQUFKLENBQVUsdUJBQVYsQ0FBckI7O0lBQ3FCLE07QUFDbEIsbUJBQVksVUFBWixFQUF3QixXQUF4QixFQUFxQyxDQUFyQyxFQUF3QyxPQUF4QyxFQUFpRCxLQUFqRCxFQUF3RDtBQUFBOztBQUFBOztBQUNyRCxXQUFLLEtBQUwsR0FBYSxtQkFBUyxXQUF0QjtBQUNBLFdBQUssTUFBTCxHQUFjLG1CQUFTLFlBQXZCO0FBQ0EsV0FBSyxDQUFMLEdBQVMsQ0FBVDtBQUNBLFdBQUssQ0FBTCxHQUFVLGNBQWMsQ0FBZixHQUFxQixLQUFLLE1BQUwsR0FBYyxDQUE1QztBQUNBLFdBQUssS0FBTCxHQUFhLG1CQUFTLFdBQXRCO0FBQ0EsV0FBSyxTQUFMLEdBQWlCLFdBQWpCO0FBQ0EsV0FBSyxRQUFMLEdBQWdCLFVBQWhCO0FBQ0EsV0FBSyxLQUFMLEdBQWEsS0FBYjs7QUFFQSxlQUFTLElBQVQsQ0FBYyxnQkFBZCxDQUErQixTQUEvQixFQUEwQyxVQUFDLEtBQUQsRUFBVztBQUNyRCxpQkFBUSxNQUFNLE9BQWQ7QUFDRyxpQkFBSyxRQUFRLEVBQWI7QUFDQSxxQkFBSyxDQUFMLEdBQVMsS0FBSyxHQUFMLENBQ04sQ0FETSxFQUVOLE1BQUssQ0FBTCxHQUFTLE1BQUssS0FGUixDQUFUO0FBSUc7O0FBRUgsaUJBQUssUUFBUSxJQUFiO0FBQ0EscUJBQUssQ0FBTCxHQUFTLEtBQUssR0FBTCxDQUNOLE1BQUssU0FBTCxHQUFpQixNQUFLLE1BRGhCLEVBRU4sTUFBSyxDQUFMLEdBQVUsTUFBSyxLQUZULENBQVQ7QUFJRztBQWJOO0FBZUMsT0FoQkQ7QUFpQkY7Ozs7aUNBRVM7QUFDUCxjQUFLLEtBQUwsQ0FBVyxLQUFYO0FBQ0Esc0JBQWEsSUFBYjtBQUNGOzs7NkJBR00sRyxFQUFLLEssRUFBTztBQUFFO0FBQ2xCLGFBQUksU0FBSixHQUFnQixLQUFoQjtBQUNBLGFBQUksUUFBSixDQUNHLEtBQUssQ0FEUixFQUNXLEtBQUssQ0FEaEIsRUFFRyxLQUFLLEtBRlIsRUFFZSxLQUFLLE1BRnBCO0FBS0Y7Ozs7OztrQkEzQ2lCLE0iLCJmaWxlIjoiMTIuanMiLCJzb3VyY2VzQ29udGVudCI6WyJpbXBvcnQgc2V0dGluZ3MgZnJvbSAnLi9zZXR0aW5ncyc7XHJcbmNvbnN0IHZpY3RvcnlTb3VuZCA9IG5ldyBBdWRpbygnLi4vc291bmRzL3BvbmctMDIud2F2Jyk7XHJcbmV4cG9ydCBkZWZhdWx0IGNsYXNzIFBhZGRsZSB7XHJcbiAgIGNvbnN0cnVjdG9yKGJvYXJkV2lkdGgsIGJvYXJkSGVpZ2h0LCB4LCBjb250cm9sLCBzY29yZSkge1xyXG4gICAgICB0aGlzLndpZHRoID0gc2V0dGluZ3MucGFkZGxlV2lkdGg7XHJcbiAgICAgIHRoaXMuaGVpZ2h0ID0gc2V0dGluZ3MucGFkZGxlSGVpZ2h0O1xyXG4gICAgICB0aGlzLnggPSB4O1xyXG4gICAgICB0aGlzLnkgPSAoYm9hcmRIZWlnaHQgLyAyKSAtICh0aGlzLmhlaWdodCAvIDIpO1xyXG4gICAgICB0aGlzLnNwZWVkID0gc2V0dGluZ3MucGFkZGxlU3BlZWQ7XHJcbiAgICAgIHRoaXMubWF4SGVpZ2h0ID0gYm9hcmRIZWlnaHQ7XHJcbiAgICAgIHRoaXMubWF4V2lkdGggPSBib2FyZFdpZHRoO1xyXG4gICAgICB0aGlzLnNjb3JlID0gc2NvcmU7XHJcbiAgICAgIFxyXG4gICAgICBkb2N1bWVudC5ib2R5LmFkZEV2ZW50TGlzdGVuZXIoJ2tleWRvd24nLCAoZXZlbnQpID0+IHtcclxuICAgICAgc3dpdGNoIChldmVudC5rZXlDb2RlKSB7XHJcbiAgICAgICAgIGNhc2UgY29udHJvbC51cDpcclxuICAgICAgICAgdGhpcy55ID0gTWF0aC5tYXgoXHJcbiAgICAgICAgICAgIDAsXHJcbiAgICAgICAgICAgIHRoaXMueSAtIHRoaXMuc3BlZWRcclxuICAgICAgICAgICAgKTtcclxuICAgICAgICAgICAgYnJlYWs7XHJcbiAgICAgICAgIFxyXG4gICAgICAgICBjYXNlIGNvbnRyb2wuZG93bjpcclxuICAgICAgICAgdGhpcy55ID0gTWF0aC5taW4oXHJcbiAgICAgICAgICAgIHRoaXMubWF4SGVpZ2h0IC0gdGhpcy5oZWlnaHQsXHJcbiAgICAgICAgICAgIHRoaXMueSArICB0aGlzLnNwZWVkXHJcbiAgICAgICAgICAgICk7XHJcbiAgICAgICAgICAgIGJyZWFrO1xyXG4gICAgICAgICB9XHJcbiAgICAgIH0pO1xyXG4gICB9XHJcblxyXG4gICBhZGRTY29yZSgpe1xyXG4gICAgICB0aGlzLnNjb3JlLnNjb3JlKys7XHJcbiAgICAgIHZpY3RvcnlTb3VuZC5wbGF5KCk7XHJcbiAgIH1cclxuXHJcblxyXG4gICByZW5kZXIoY3R4LCBjb2xvcikgeyAvLyBXaGF0IGlzIGN0eD8gV2hlcmUgZG9lcyBpdCBjb21lIGZyb20/XHJcbiAgICAgIGN0eC5maWxsU3R5bGUgPSBjb2xvcjtcclxuICAgICAgY3R4LmZpbGxSZWN0KFxyXG4gICAgICAgICB0aGlzLngsIHRoaXMueSxcclxuICAgICAgICAgdGhpcy53aWR0aCwgdGhpcy5oZWlnaHRcclxuICAgICAgKTtcclxuICAgICAgXHJcbiAgIH1cclxufVxuXG5cbi8qKiBXRUJQQUNLIEZPT1RFUiAqKlxuICoqIC4vc3JjL1BhZGRsZS5qc1xuICoqLyJdLCJzb3VyY2VSb290IjoiIn0=");

/***/ },
/* 13 */
/***/ function(module, exports) {

	eval("\"use strict\";\n\nObject.defineProperty(exports, \"__esModule\", {\n  value: true\n});\nvar settings = {\n  gap: 10,\n  p1Keys: { up: 38, down: 40, addBalls: 32, ballSize: 17 },\n  p2Keys: { up: 65, down: 90, addBalls: 88, ballSize: 83 },\n  paddleHeight: 32,\n  paddleWidth: 5,\n  paddleSpeed: 20,\n  ballRadius: 5,\n  p1Score: [60, 35],\n  p2Score: [220, 35]\n\n};\n\nexports.default = settings;//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIndlYnBhY2s6Ly8vLi9zcmMvc2V0dGluZ3MuanM/MTc5YiJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiOzs7OztBQUFBLElBQU0sV0FBVztBQUNmLE9BQUssRUFEVTtBQUVmLFVBQVEsRUFBRSxJQUFJLEVBQU4sRUFBVSxNQUFNLEVBQWhCLEVBQW9CLFVBQVUsRUFBOUIsRUFBa0MsVUFBVSxFQUE1QyxFQUZPO0FBR2YsVUFBUSxFQUFFLElBQUksRUFBTixFQUFVLE1BQU0sRUFBaEIsRUFBb0IsVUFBVSxFQUE5QixFQUFrQyxVQUFVLEVBQTVDLEVBSE87QUFJZixnQkFBYyxFQUpDO0FBS2YsZUFBYSxDQUxFO0FBTWYsZUFBYSxFQU5FO0FBT2YsY0FBWSxDQVBHO0FBUWYsV0FBUyxDQUFDLEVBQUQsRUFBSyxFQUFMLENBUk07QUFTZixXQUFTLENBQUMsR0FBRCxFQUFNLEVBQU47O0FBVE0sQ0FBakI7O2tCQWNlLFEiLCJmaWxlIjoiMTMuanMiLCJzb3VyY2VzQ29udGVudCI6WyJjb25zdCBzZXR0aW5ncyA9IHtcclxuICBnYXA6IDEwLFxyXG4gIHAxS2V5czogeyB1cDogMzgsIGRvd246IDQwLCBhZGRCYWxsczogMzIsIGJhbGxTaXplOiAxNyB9LFxyXG4gIHAyS2V5czogeyB1cDogNjUsIGRvd246IDkwLCBhZGRCYWxsczogODgsIGJhbGxTaXplOiA4M30sXHJcbiAgcGFkZGxlSGVpZ2h0OiAzMixcclxuICBwYWRkbGVXaWR0aDogNSxcclxuICBwYWRkbGVTcGVlZDogMjAsXHJcbiAgYmFsbFJhZGl1czogNSxcclxuICBwMVNjb3JlOiBbNjAsIDM1XSxcclxuICBwMlNjb3JlOiBbMjIwLCAzNV0sXHJcblxyXG5cclxufTtcclxuXHJcbmV4cG9ydCBkZWZhdWx0IHNldHRpbmdzO1xuXG5cbi8qKiBXRUJQQUNLIEZPT1RFUiAqKlxuICoqIC4vc3JjL3NldHRpbmdzLmpzXG4gKiovIl0sInNvdXJjZVJvb3QiOiIifQ==");

/***/ },
/* 14 */
/***/ function(module, exports, __webpack_require__) {

	eval("'use strict';\n\nObject.defineProperty(exports, \"__esModule\", {\n    value: true\n});\n\nvar _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if (\"value\" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }(); // In Ball.js..\n\n\nvar _settings = __webpack_require__(13);\n\nvar _settings2 = _interopRequireDefault(_settings);\n\nfunction _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }\n\nfunction _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError(\"Cannot call a class as a function\"); } }\n\nvar wallSound = new Audio('../sounds/pong-01.wav');\nvar paddleSound = new Audio('../sounds/pong-03.wav');\n\nvar Ball = function () {\n    function Ball(boardWidth, boardHeight) {\n        _classCallCheck(this, Ball);\n\n        this.x = boardWidth / 2;\n        this.y = boardHeight / 2;\n        this.vy = Math.floor(Math.random() * 12 - 6);\n        this.vx = 7 - Math.abs(this.vy);\n        this.radius = _settings2.default.ballRadius;\n        this.maxHeight = boardHeight;\n    }\n\n    _createClass(Ball, [{\n        key: 'draw',\n        value: function draw(ctx, color) {\n            ctx.fillStyle = color;\n            ctx.beginPath();\n            ctx.arc(this.x, this.y, this.radius, 0, 2 * Math.PI, false);\n            ctx.fill();\n            ctx.closePath();\n        }\n    }, {\n        key: 'goal',\n        value: function goal(width, height) {\n            // console.log('Goal!');\n            this.x = width / 2;\n            this.y = height / 2;\n            this.vx = -this.vx;\n            this.vy = -this.vy;\n        }\n    }, {\n        key: 'wallBounce',\n        value: function wallBounce(ctx, player1, player2) {\n            // this.x += this.vx;\n            // this.y += this.vy;\n            if (this.y - this.radius < 0 || this.y + this.radius > this.maxHeight) {\n                this.vy *= -1;\n                wallSound.play();\n            };\n        }\n    }, {\n        key: 'paddleCollision',\n        value: function paddleCollision(player1, player2) {\n            if (this.vx > 0) {\n                var inRightEnd = player2.x <= this.x + this.radius && player2.x > this.x - this.vx + this.radius;\n                if (inRightEnd) {\n                    var collisionDiff = this.x + this.radius - player2.x;\n                    var k = collisionDiff / this.vx;\n                    var y = this.vy * k + (this.y - this.vy);\n                    var hitRightPaddle = y >= player2.y && y + this.radius <= player2.y + player2.height;\n                    if (hitRightPaddle) {\n                        paddleSound.play();\n                        this.x = player2.x - this.radius;\n                        this.y = Math.floor(this.y - this.vy + this.vy * k);\n                        this.vx = -this.vx;\n                    }\n                }\n            } else {\n                var inLeftEnd = player1.x + player1.width >= this.x;\n                if (inLeftEnd) {\n                    var _collisionDiff = player1.x + player1.width - this.x;\n                    var _k = _collisionDiff / -this.vx;\n                    var _y = this.vy * _k + (this.y - this.vy);\n                    var hitLeftPaddle = _y >= player1.y && _y + this.radius <= player1.y + player1.height;\n                    if (hitLeftPaddle) {\n                        paddleSound.play();\n                        this.x = player1.x + player1.width;\n                        this.y = Math.floor(this.y - this.vy + this.vy * _k);\n                        this.vx = -this.vx;\n                    }\n                }\n            }\n        }\n    }, {\n        key: 'render',\n        value: function render(ctx, color, player1, player2, width, height) {\n            this.draw(ctx, color);\n            this.wallBounce(ctx, player1, player2);\n            this.paddleCollision(player1, player2);\n            this.x += this.vx;\n            this.y += this.vy;\n            if (this.x < 0) {\n                player2.addScore();\n                this.goal(width, height);\n            } else if (this.x > width) {\n                player1.addScore();\n                this.goal(width, height);\n            }\n        }\n    }]);\n\n    return Ball;\n}();\n\nexports.default = Ball;//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIndlYnBhY2s6Ly8vLi9zcmMvQmFsbC5qcz9iODFhIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiI7Ozs7OztxakJBQUE7OztBQUNBOzs7Ozs7OztBQUNBLElBQU0sWUFBWSxJQUFJLEtBQUosQ0FBVSx1QkFBVixDQUFsQjtBQUNBLElBQU0sY0FBYyxJQUFJLEtBQUosQ0FBVSx1QkFBVixDQUFwQjs7SUFDcUIsSTtBQUNqQixrQkFBWSxVQUFaLEVBQXdCLFdBQXhCLEVBQXFDO0FBQUE7O0FBQ2pDLGFBQUssQ0FBTCxHQUFTLGFBQVcsQ0FBcEI7QUFDQSxhQUFLLENBQUwsR0FBUyxjQUFZLENBQXJCO0FBQ0EsYUFBSyxFQUFMLEdBQVUsS0FBSyxLQUFMLENBQVcsS0FBSyxNQUFMLEtBQWdCLEVBQWhCLEdBQXFCLENBQWhDLENBQVY7QUFDQSxhQUFLLEVBQUwsR0FBVyxJQUFJLEtBQUssR0FBTCxDQUFTLEtBQUssRUFBZCxDQUFmO0FBQ0EsYUFBSyxNQUFMLEdBQWMsbUJBQVMsVUFBdkI7QUFDQSxhQUFLLFNBQUwsR0FBaUIsV0FBakI7QUFDSDs7Ozs2QkFFSSxHLEVBQUssSyxFQUFPO0FBQ2IsZ0JBQUksU0FBSixHQUFnQixLQUFoQjtBQUNBLGdCQUFJLFNBQUo7QUFDQSxnQkFBSSxHQUFKLENBQVEsS0FBSyxDQUFiLEVBQWdCLEtBQUssQ0FBckIsRUFBd0IsS0FBSyxNQUE3QixFQUFxQyxDQUFyQyxFQUF3QyxJQUFJLEtBQUssRUFBakQsRUFBcUQsS0FBckQ7QUFDQSxnQkFBSSxJQUFKO0FBQ0EsZ0JBQUksU0FBSjtBQUNEOzs7NkJBRUUsSyxFQUFPLE0sRUFBTztBQUNqQjtBQUNBLGlCQUFLLENBQUwsR0FBUyxRQUFNLENBQWY7QUFDQSxpQkFBSyxDQUFMLEdBQVMsU0FBTyxDQUFoQjtBQUNBLGlCQUFLLEVBQUwsR0FBVSxDQUFDLEtBQUssRUFBaEI7QUFDQSxpQkFBSyxFQUFMLEdBQVUsQ0FBQyxLQUFLLEVBQWhCO0FBQ0M7OzttQ0FFUSxHLEVBQUssTyxFQUFTLE8sRUFBUztBQUM5QjtBQUNBO0FBQ0EsZ0JBQUksS0FBSyxDQUFMLEdBQVMsS0FBSyxNQUFkLEdBQXVCLENBQXZCLElBQTRCLEtBQUssQ0FBTCxHQUFTLEtBQUssTUFBZCxHQUF1QixLQUFLLFNBQTVELEVBQXVFO0FBQ25FLHFCQUFLLEVBQUwsSUFBVyxDQUFDLENBQVo7QUFDQSwwQkFBVSxJQUFWO0FBQ0g7QUFDSjs7O3dDQUNZLE8sRUFBUyxPLEVBQVM7QUFDOUIsZ0JBQUksS0FBSyxFQUFMLEdBQVUsQ0FBZCxFQUFpQjtBQUNiLG9CQUFNLGFBQWEsUUFBUSxDQUFSLElBQWEsS0FBSyxDQUFMLEdBQVMsS0FBSyxNQUEzQixJQUNmLFFBQVEsQ0FBUixHQUFZLEtBQUssQ0FBTCxHQUFTLEtBQUssRUFBZCxHQUFtQixLQUFLLE1BRHhDO0FBRUEsb0JBQUksVUFBSixFQUFnQjtBQUNaLHdCQUFNLGdCQUFnQixLQUFLLENBQUwsR0FBUyxLQUFLLE1BQWQsR0FBdUIsUUFBUSxDQUFyRDtBQUNBLHdCQUFNLElBQUksZ0JBQWdCLEtBQUssRUFBL0I7QUFDQSx3QkFBTSxJQUFJLEtBQUssRUFBTCxHQUFVLENBQVYsSUFBZSxLQUFLLENBQUwsR0FBUyxLQUFLLEVBQTdCLENBQVY7QUFDQSx3QkFBTSxpQkFBaUIsS0FBSyxRQUFRLENBQWIsSUFBa0IsSUFBSSxLQUFLLE1BQVQsSUFBbUIsUUFBUSxDQUFSLEdBQVksUUFBUSxNQUFoRjtBQUNBLHdCQUFJLGNBQUosRUFBb0I7QUFDaEIsb0NBQVksSUFBWjtBQUNBLDZCQUFLLENBQUwsR0FBUyxRQUFRLENBQVIsR0FBWSxLQUFLLE1BQTFCO0FBQ0EsNkJBQUssQ0FBTCxHQUFTLEtBQUssS0FBTCxDQUFXLEtBQUssQ0FBTCxHQUFTLEtBQUssRUFBZCxHQUFtQixLQUFLLEVBQUwsR0FBVSxDQUF4QyxDQUFUO0FBQ0EsNkJBQUssRUFBTCxHQUFVLENBQUMsS0FBSyxFQUFoQjtBQUVIO0FBQ0o7QUFDSixhQWhCRCxNQWdCTztBQUNILG9CQUFNLFlBQVksUUFBUSxDQUFSLEdBQVksUUFBUSxLQUFwQixJQUE2QixLQUFLLENBQXBEO0FBQ0Esb0JBQUksU0FBSixFQUFlO0FBQ1gsd0JBQU0saUJBQWdCLFFBQVEsQ0FBUixHQUFZLFFBQVEsS0FBcEIsR0FBNEIsS0FBSyxDQUF2RDtBQUNBLHdCQUFNLEtBQUksaUJBQWdCLENBQUMsS0FBSyxFQUFoQztBQUNBLHdCQUFNLEtBQUksS0FBSyxFQUFMLEdBQVUsRUFBVixJQUFlLEtBQUssQ0FBTCxHQUFTLEtBQUssRUFBN0IsQ0FBVjtBQUNBLHdCQUFNLGdCQUFnQixNQUFLLFFBQVEsQ0FBYixJQUFrQixLQUFJLEtBQUssTUFBVCxJQUFtQixRQUFRLENBQVIsR0FBWSxRQUFRLE1BQS9FO0FBQ0Esd0JBQUksYUFBSixFQUFtQjtBQUNkLG9DQUFZLElBQVo7QUFDRCw2QkFBSyxDQUFMLEdBQVMsUUFBUSxDQUFSLEdBQVksUUFBUSxLQUE3QjtBQUNBLDZCQUFLLENBQUwsR0FBUyxLQUFLLEtBQUwsQ0FBVyxLQUFLLENBQUwsR0FBUyxLQUFLLEVBQWQsR0FBbUIsS0FBSyxFQUFMLEdBQVUsRUFBeEMsQ0FBVDtBQUNBLDZCQUFLLEVBQUwsR0FBVSxDQUFDLEtBQUssRUFBaEI7QUFFSDtBQUNKO0FBQ0o7QUFDSjs7OytCQUNTLEcsRUFBSyxLLEVBQU8sTyxFQUFTLE8sRUFBUyxLLEVBQU8sTSxFQUFRO0FBQ2hELGlCQUFLLElBQUwsQ0FBVSxHQUFWLEVBQWUsS0FBZjtBQUNBLGlCQUFLLFVBQUwsQ0FBZ0IsR0FBaEIsRUFBcUIsT0FBckIsRUFBOEIsT0FBOUI7QUFDQSxpQkFBSyxlQUFMLENBQXFCLE9BQXJCLEVBQThCLE9BQTlCO0FBQ0EsaUJBQUssQ0FBTCxJQUFVLEtBQUssRUFBZjtBQUNBLGlCQUFLLENBQUwsSUFBVSxLQUFLLEVBQWY7QUFDQSxnQkFBSSxLQUFLLENBQUwsR0FBUyxDQUFiLEVBQWU7QUFDYix3QkFBUSxRQUFSO0FBQ0EscUJBQUssSUFBTCxDQUFVLEtBQVYsRUFBaUIsTUFBakI7QUFFRCxhQUpELE1BSU8sSUFBRyxLQUFLLENBQUwsR0FBUyxLQUFaLEVBQW1CO0FBQ3RCLHdCQUFRLFFBQVI7QUFDQSxxQkFBSyxJQUFMLENBQVUsS0FBVixFQUFpQixNQUFqQjtBQUVIO0FBQ0o7Ozs7OztrQkFuRmdCLEkiLCJmaWxlIjoiMTQuanMiLCJzb3VyY2VzQ29udGVudCI6WyIvLyBJbiBCYWxsLmpzLi5cclxuaW1wb3J0IHNldHRpbmdzIGZyb20gJy4vc2V0dGluZ3MnO1xyXG5jb25zdCB3YWxsU291bmQgPSBuZXcgQXVkaW8oJy4uL3NvdW5kcy9wb25nLTAxLndhdicpO1xyXG5jb25zdCBwYWRkbGVTb3VuZCA9IG5ldyBBdWRpbygnLi4vc291bmRzL3BvbmctMDMud2F2Jyk7XHJcbmV4cG9ydCBkZWZhdWx0IGNsYXNzIEJhbGwge1xyXG4gICAgY29uc3RydWN0b3IoYm9hcmRXaWR0aCwgYm9hcmRIZWlnaHQpIHtcclxuICAgICAgICB0aGlzLnggPSBib2FyZFdpZHRoLzI7XHJcbiAgICAgICAgdGhpcy55ID0gYm9hcmRIZWlnaHQvMjtcclxuICAgICAgICB0aGlzLnZ5ID0gTWF0aC5mbG9vcihNYXRoLnJhbmRvbSgpICogMTIgLSA2KTtcclxuICAgICAgICB0aGlzLnZ4ID0gKDcgLSBNYXRoLmFicyh0aGlzLnZ5KSk7XHJcbiAgICAgICAgdGhpcy5yYWRpdXMgPSBzZXR0aW5ncy5iYWxsUmFkaXVzO1xyXG4gICAgICAgIHRoaXMubWF4SGVpZ2h0ID0gYm9hcmRIZWlnaHQ7XHJcbiAgICB9XHJcblxyXG4gICAgZHJhdyhjdHgsIGNvbG9yKSB7XHJcbiAgICAgICAgY3R4LmZpbGxTdHlsZSA9IGNvbG9yO1xyXG4gICAgICAgIGN0eC5iZWdpblBhdGgoKTtcclxuICAgICAgICBjdHguYXJjKHRoaXMueCwgdGhpcy55LCB0aGlzLnJhZGl1cywgMCwgMiAqIE1hdGguUEksIGZhbHNlKTtcclxuICAgICAgICBjdHguZmlsbCgpO1xyXG4gICAgICAgIGN0eC5jbG9zZVBhdGgoKTtcclxuICAgICAgfVxyXG5cclxuICAgIGdvYWwod2lkdGgsIGhlaWdodCl7XHJcbiAgICAgIC8vIGNvbnNvbGUubG9nKCdHb2FsIScpO1xyXG4gICAgICB0aGlzLnggPSB3aWR0aC8yO1xyXG4gICAgICB0aGlzLnkgPSBoZWlnaHQvMjtcclxuICAgICAgdGhpcy52eCA9IC10aGlzLnZ4O1xyXG4gICAgICB0aGlzLnZ5ID0gLXRoaXMudnk7XHJcbiAgICAgIH1cclxuXHJcbiAgICB3YWxsQm91bmNlKGN0eCwgcGxheWVyMSwgcGxheWVyMikge1xyXG4gICAgICAgIC8vIHRoaXMueCArPSB0aGlzLnZ4O1xyXG4gICAgICAgIC8vIHRoaXMueSArPSB0aGlzLnZ5O1xyXG4gICAgICAgIGlmICh0aGlzLnkgLSB0aGlzLnJhZGl1cyA8IDAgfHwgdGhpcy55ICsgdGhpcy5yYWRpdXMgPiB0aGlzLm1heEhlaWdodCkge1xyXG4gICAgICAgICAgICB0aGlzLnZ5ICo9IC0xO1xyXG4gICAgICAgICAgICB3YWxsU291bmQucGxheSgpO1xyXG4gICAgICAgIH07XHJcbiAgICB9XHJcbiBwYWRkbGVDb2xsaXNpb24ocGxheWVyMSwgcGxheWVyMikge1xyXG4gICAgIGlmICh0aGlzLnZ4ID4gMCkge1xyXG4gICAgICAgICBjb25zdCBpblJpZ2h0RW5kID0gcGxheWVyMi54IDw9IHRoaXMueCArIHRoaXMucmFkaXVzICYmXHJcbiAgICAgICAgICAgICBwbGF5ZXIyLnggPiB0aGlzLnggLSB0aGlzLnZ4ICsgdGhpcy5yYWRpdXM7XHJcbiAgICAgICAgIGlmIChpblJpZ2h0RW5kKSB7XHJcbiAgICAgICAgICAgICBjb25zdCBjb2xsaXNpb25EaWZmID0gdGhpcy54ICsgdGhpcy5yYWRpdXMgLSBwbGF5ZXIyLng7XHJcbiAgICAgICAgICAgICBjb25zdCBrID0gY29sbGlzaW9uRGlmZiAvIHRoaXMudng7XHJcbiAgICAgICAgICAgICBjb25zdCB5ID0gdGhpcy52eSAqIGsgKyAodGhpcy55IC0gdGhpcy52eSk7XHJcbiAgICAgICAgICAgICBjb25zdCBoaXRSaWdodFBhZGRsZSA9IHkgPj0gcGxheWVyMi55ICYmIHkgKyB0aGlzLnJhZGl1cyA8PSBwbGF5ZXIyLnkgKyBwbGF5ZXIyLmhlaWdodDtcclxuICAgICAgICAgICAgIGlmIChoaXRSaWdodFBhZGRsZSkge1xyXG4gICAgICAgICAgICAgICAgIHBhZGRsZVNvdW5kLnBsYXkoKTtcclxuICAgICAgICAgICAgICAgICB0aGlzLnggPSBwbGF5ZXIyLnggLSB0aGlzLnJhZGl1cztcclxuICAgICAgICAgICAgICAgICB0aGlzLnkgPSBNYXRoLmZsb29yKHRoaXMueSAtIHRoaXMudnkgKyB0aGlzLnZ5ICogayk7XHJcbiAgICAgICAgICAgICAgICAgdGhpcy52eCA9IC10aGlzLnZ4O1xyXG4gICAgICAgICAgICAgICAgIFxyXG4gICAgICAgICAgICAgfVxyXG4gICAgICAgICB9XHJcbiAgICAgfSBlbHNlIHtcclxuICAgICAgICAgY29uc3QgaW5MZWZ0RW5kID0gcGxheWVyMS54ICsgcGxheWVyMS53aWR0aCA+PSB0aGlzLng7XHJcbiAgICAgICAgIGlmIChpbkxlZnRFbmQpIHtcclxuICAgICAgICAgICAgIGNvbnN0IGNvbGxpc2lvbkRpZmYgPSBwbGF5ZXIxLnggKyBwbGF5ZXIxLndpZHRoIC0gdGhpcy54O1xyXG4gICAgICAgICAgICAgY29uc3QgayA9IGNvbGxpc2lvbkRpZmYgLyAtdGhpcy52eDtcclxuICAgICAgICAgICAgIGNvbnN0IHkgPSB0aGlzLnZ5ICogayArICh0aGlzLnkgLSB0aGlzLnZ5KTtcclxuICAgICAgICAgICAgIGNvbnN0IGhpdExlZnRQYWRkbGUgPSB5ID49IHBsYXllcjEueSAmJiB5ICsgdGhpcy5yYWRpdXMgPD0gcGxheWVyMS55ICsgcGxheWVyMS5oZWlnaHQ7XHJcbiAgICAgICAgICAgICBpZiAoaGl0TGVmdFBhZGRsZSkge1xyXG4gICAgICAgICAgICAgICAgICBwYWRkbGVTb3VuZC5wbGF5KCk7XHJcbiAgICAgICAgICAgICAgICAgdGhpcy54ID0gcGxheWVyMS54ICsgcGxheWVyMS53aWR0aDtcclxuICAgICAgICAgICAgICAgICB0aGlzLnkgPSBNYXRoLmZsb29yKHRoaXMueSAtIHRoaXMudnkgKyB0aGlzLnZ5ICogayk7XHJcbiAgICAgICAgICAgICAgICAgdGhpcy52eCA9IC10aGlzLnZ4O1xyXG4gICAgICAgICAgICAgICAgIFxyXG4gICAgICAgICAgICAgfVxyXG4gICAgICAgICB9XHJcbiAgICAgfVxyXG4gfVxyXG4gICAgcmVuZGVyKGN0eCwgY29sb3IsIHBsYXllcjEsIHBsYXllcjIsIHdpZHRoLCBoZWlnaHQpIHtcclxuICAgICAgICB0aGlzLmRyYXcoY3R4LCBjb2xvcik7XHJcbiAgICAgICAgdGhpcy53YWxsQm91bmNlKGN0eCwgcGxheWVyMSwgcGxheWVyMik7XHJcbiAgICAgICAgdGhpcy5wYWRkbGVDb2xsaXNpb24ocGxheWVyMSwgcGxheWVyMik7XHJcbiAgICAgICAgdGhpcy54ICs9IHRoaXMudng7XHJcbiAgICAgICAgdGhpcy55ICs9IHRoaXMudnk7XHJcbiAgICAgICAgaWYgKHRoaXMueCA8IDApe1xyXG4gICAgICAgICAgcGxheWVyMi5hZGRTY29yZSgpO1xyXG4gICAgICAgICAgdGhpcy5nb2FsKHdpZHRoLCBoZWlnaHQpO1xyXG4gICAgICAgICAgXHJcbiAgICAgICAgfSBlbHNlIGlmKHRoaXMueCA+IHdpZHRoKSB7XHJcbiAgICAgICAgICAgIHBsYXllcjEuYWRkU2NvcmUoKTtcclxuICAgICAgICAgICAgdGhpcy5nb2FsKHdpZHRoLCBoZWlnaHQpO1xyXG4gICAgICAgICAgICBcclxuICAgICAgICB9XHJcbiAgICB9XHJcbn1cblxuXG4vKiogV0VCUEFDSyBGT09URVIgKipcbiAqKiAuL3NyYy9CYWxsLmpzXG4gKiovIl0sInNvdXJjZVJvb3QiOiIifQ==");

/***/ },
/* 15 */
/***/ function(module, exports) {

	eval("\"use strict\";\n\nObject.defineProperty(exports, \"__esModule\", {\n  value: true\n});\n\nvar _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if (\"value\" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();\n\nfunction _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError(\"Cannot call a class as a function\"); } }\n\nvar ScoreBoard = function () {\n  function ScoreBoard(x, y) {\n    _classCallCheck(this, ScoreBoard);\n\n    this.x = x;\n    this.y = y;\n    this.score = 0;\n  }\n\n  _createClass(ScoreBoard, [{\n    key: \"render\",\n    value: function render(ctx) {\n      ctx.fillStyle = 'white';\n      ctx.font = \"25px sans-serif\";\n      ctx.fillText(this.score, this.x, this.y);\n    }\n  }]);\n\n  return ScoreBoard;\n}();\n\nexports.default = ScoreBoard;//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIndlYnBhY2s6Ly8vLi9zcmMvU2NvcmVCb2FyZC5qcz8zZjUxIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiI7Ozs7Ozs7Ozs7SUFBcUIsVTtBQUNuQixzQkFBYSxDQUFiLEVBQWdCLENBQWhCLEVBQWtCO0FBQUE7O0FBQ2hCLFNBQUssQ0FBTCxHQUFTLENBQVQ7QUFDQSxTQUFLLENBQUwsR0FBUyxDQUFUO0FBQ0EsU0FBSyxLQUFMLEdBQVksQ0FBWjtBQUNEOzs7OzJCQUVNLEcsRUFBSTtBQUNULFVBQUksU0FBSixHQUFnQixPQUFoQjtBQUNBLFVBQUksSUFBSixHQUFXLGlCQUFYO0FBQ0EsVUFBSSxRQUFKLENBQWEsS0FBSyxLQUFsQixFQUF5QixLQUFLLENBQTlCLEVBQWlDLEtBQUssQ0FBdEM7QUFDRDs7Ozs7O2tCQVhrQixVIiwiZmlsZSI6IjE1LmpzIiwic291cmNlc0NvbnRlbnQiOlsiZXhwb3J0IGRlZmF1bHQgY2xhc3MgU2NvcmVCb2FyZCB7XHJcbiAgY29uc3RydWN0b3IgKHgsIHkpe1xyXG4gICAgdGhpcy54ID0geDtcclxuICAgIHRoaXMueSA9IHk7XHJcbiAgICB0aGlzLnNjb3JlID0wO1xyXG4gIH1cclxuXHJcbiAgcmVuZGVyKGN0eCl7XHJcbiAgICBjdHguZmlsbFN0eWxlID0gJ3doaXRlJztcclxuICAgIGN0eC5mb250ID0gXCIyNXB4IHNhbnMtc2VyaWZcIjtcclxuICAgIGN0eC5maWxsVGV4dCh0aGlzLnNjb3JlLCB0aGlzLngsIHRoaXMueSk7XHJcbiAgfVxyXG5cclxufVxuXG5cbi8qKiBXRUJQQUNLIEZPT1RFUiAqKlxuICoqIC4vc3JjL1Njb3JlQm9hcmQuanNcbiAqKi8iXSwic291cmNlUm9vdCI6IiJ9");

/***/ }
/******/ ]);