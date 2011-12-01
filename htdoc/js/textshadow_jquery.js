/*
	text-shadow for MSIE with jQuery
	http://asamuzak.jp
*/

var isMSIE = /*@cc_on!@*/false;
var ieVersion = (function(reg) { return isMSIE && navigator.userAgent.match(reg) ? RegExp.$1 * 1 : null; })(/MSIE\s([0-9]+[\.0-9]*)/);

var cNum = (function(n) { return function() { return n++; }})(0);

function showElm(eId) {
	var elm = document.getElementById(eId);
	elm && (elm.style.visibility = 'visible');
}
function hideElm(eId) {
	var elm = document.getElementById(eId);
	elm && (elm.style.visibility = 'hidden');
}

(function($) {
	$.fn.textShadowForMSIE = function(sObj) {
		var getCompStyle = function(elm) {
			return isMSIE && ieVersion < 9 ? elm.currentStyle : document.defaultView.getComputedStyle(elm, '');
		};
		var getAncestObj = function(pElm) {
			var arr = [];
			if(pElm = pElm.parentNode) {
				for(arr[arr.length] = pElm; pElm.nodeName.toLowerCase() != "body";) {
					(pElm = pElm.parentNode) && (arr[arr.length] = pElm);
				}
			}
			return arr;
		};
		var convPercentTo256 = function(cProf) {
			if(cProf.match(/(rgba?)\(\s*([0-9\.]+%?\s*,\s*[0-9\.]+%?\s*,\s*[0-9\.]+%?)\s*(,\s*[01]?[\.0-9]*)?\s*\)/)) {
				for(var cType = RegExp.$1, arr = RegExp.$2.split(/,/), aCh = (RegExp.$3 || ''), rgbArr = [], i = 0, l = arr.length; i < l; i++) {
					arr[i].match(/([0-9\.]+)%/) && (arr[i] = Math.round(RegExp.$1 * 255 / 100));
					rgbArr[rgbArr.length] = arr[i];
				}
				return cType + '(' + rgbArr.join(',') + aCh + ')';
			}
		};
		var convUnitToPx = function(sUnit, obj) {
			var getUnitRatio = function(sUnit) {
				var elm, val, dId = cNum(), dBox = document.createElement('div'), dBody = document.getElementsByTagName('body')[0];
				dBox.id = 'dummyDiv' + dId;	dId++;
				dBox.style.width = sUnit;
				dBox.style.height = 0;
				dBox.style.visibility = 'hidden';
				dBody.appendChild(dBox);
				elm = document.getElementById(dBox.id);
				val = Math.abs(elm.getBoundingClientRect().right - elm.getBoundingClientRect().left);
				dBody.removeChild(elm);
				return val;
			};
			if(sUnit.match(/^0(em|ex|px|cm|mm|in|pt|pc)?$/)) {
				return 0;
			}
			else if(sUnit.match(/^(\-?[0-9\.]+)px$/)) {
				return RegExp.$1 * 1;
			}
			else if(sUnit.match(/^(\-?[0-9\.]+)(cm|mm|in|pt|pc)$/)) {
				return RegExp.$1 * 1 >= 0 ? getUnitRatio(sUnit) : getUnitRatio((RegExp.$1 * -1) + RegExp.$2) * -1;
			}
			else if(sUnit.match(/^(\-?[0-9\.]+)(em|ex)$/)) {
				var val = (getUnitRatio(sUnit) / getUnitRatio('1em')), arr = getAncestObj(obj), dRoot = document.getElementsByTagName('html')[0], fSize = [];
				arr.unshift(obj);	arr[arr.length] = dRoot;
				for(var i = 0, l = arr.length; i < l; i++) {
					fSize[fSize.length] = getCompStyle(arr[i]).fontSize;
				}
				for(i = 0, l = fSize.length; i < l; i++) {
					if(fSize[i].match(/^([0-9\.]+)%$/)) {
						val *= (RegExp.$1 / 100);
					}
					else if(fSize[i].match(/^[0-9\.]+(em|ex)$/)) {
						val *= (getUnitRatio(fSize[i]) / getUnitRatio('1em'));
					}
					else if(fSize[i].match(/^smaTagr$/)) {
						val /= 1.2;
					}
					else if(fSize[i].match(/^larger$/)) {
						val *= 1.2;
					}
					else if(fSize[i].match(/^([0-9\.]+)(px|cm|mm|in|pt|pc)$/)) {
						val *= getUnitRatio(fSize[i]);
						break;
					}
					else if(fSize[i].match(/^xx\-small$/)) {
						val *= (getUnitRatio(getCompStyle(dRoot).fontSize) / 1.728);
						break;
					}
					else if(fSize[i].match(/^x\-small$/)) {
						val *= (getUnitRatio(getCompStyle(dRoot).fontSize) / 1.44);
						break;
					}
					else if(fSize[i].match(/^small$/)) {
						val *= (getUnitRatio(getCompStyle(dRoot).fontSize) / 1.2);
						break;
					}
					else if(fSize[i].match(/^medium$/)){
						val *= getUnitRatio(getCompStyle(dRoot).fontSize);
						break;
					}
					else if(fSize[i].match(/^large$/)) {
						val *= (getUnitRatio(getCompStyle(dRoot).fontSize) * 1.2);
						break;
					}
					else if(fSize[i].match(/^x\-large$/)) {
						val *= (getUnitRatio(getCompStyle(dRoot).fontSize) * 1.44);
						break;
					}
					else if(fSize[i].match(/^xx\-large$/)) {
						val *= (getUnitRatio(getCompStyle(dRoot).fontSize) * 1.728);
						break;
					}
					else if(fSize[i].match(/^([0-9\.]+)([a-z]+)/)) {
						val *= getUnitRatio(fSize[i]);
						break;
					}
					else {
						break;
					}
				}
				return Math.round(val);
			}
		};
		var removeDupFunc = function(fStr) {
			for(var arr = fStr.replace(/\s+/, '').split(/;/), fArr = [], bool, i = 0, l = arr.length; i < l; i++) {
				bool = true;
				for(var j = i; j < l; j++) {
					i != j && arr[i] == arr[j] && (bool = false);
				}
				bool && arr[i] != '' && (fArr[fArr.length] = arr[i]);
			}
			return fArr.join(';') + ';';
		};
		var revArr = function(arr) {
			for(var rArr = [], i = 0, l = arr.length; i < l; i++) {
				rArr.unshift(arr[i]);
			}
			return rArr;
		};
		var getShadowValue = function() {
			if(sObj.sValue.match(/none/)) {
				return 'none';
			}
			else {
				for(var val = [], arr = sObj.sValue.match(/((rgba?\(\s*[0-9\.]+%?\s*,\s*[0-9\.]+%?\s*,\s*[0-9\.]+%?\s*(,\s*[01]?[\.0-9]*\s*)?\)|#[0-9a-fA-F]{3,6}|[a-zA-Z]+)\s)?(\-?[0-9\.]+(em|ex|px|cm|mm|in|pt|pc)?\s*){2,3}(rgba?\(\s*[0-9\.]+%?\s*,\s*[0-9\.]+%?\s*,\s*[0-9\.]+%?\s*(,\s*[01]?[\.0-9]*\s*)?\)|#[0-9a-fA-F]{3,6}|[a-zA-Z]+)?/g), i = 0, l = arr.length; i < l; i++) {
					val[i] = { x : '0', y : '0', z : '0', cProf : null };
					var uArr = arr[i].match(/\-?[0-9\.]+(em|ex|px|cm|mm|in|pt|pc)?\s+\-?[0-9\.]+(em|ex|px|cm|mm|in|pt|pc)?(\s+[0-9\.]+(em|ex|px|cm|mm|in|pt|pc)?)?/);
					if(uArr = uArr[0].split(/\s+/), uArr[0].match(/^(\-?[0-9\.]+(em|ex|px|cm|mm|in|pt|pc)?)$/) && uArr[1].match(/^(\-?[0-9\.]+(em|ex|px|cm|mm|in|pt|pc)?)$/)) {
						uArr.length >= 2 && (val[i].x = uArr[0], val[i].y = uArr[1]);
						uArr.length == 3 && uArr[2].match(/^([0-9\.]+(em|ex|px|cm|mm|in|pt|pc)?)$/) && (val[i].z = uArr[2]);
						arr[i].match(/%/) && (arr[i] = convPercentTo256(arr[i]));
						arr[i].match(/^(rgba?\(\s*[0-9]+\s*,\s*[0-9]+\s*,\s*[0-9]+\s*(,\s*[01]?[\.0-9]*\s*)?\)|[a-zA-Z]+)/) ? (val[i].cProf = RegExp.$1) :
						arr[i].match(/\s(rgba?\(\s*[0-9]+\s*,\s*[0-9]+\s*,\s*[0-9]+\s*(,\s*[01]?[\.0-9]*\s*)?\)|#[0-9a-fA-F]{3,6}|[a-zA-Z]+)$/) && (val[i].cProf = RegExp.$1);
					}
					else {
						val = 'invalid';
						break;
					}
				}
				return val;
			}
		};
		var setShadowNodeColor = function(elm) {
			for(var arr = elm.childNodes, i = 0, l = arr.length; i < l; i++) {
				if(arr[i].nodeType == 1) {
					!arr[i].hasChildNodes() ? arr[i].style.visibility = 'hidden' : (arr[i].style.color = elm.style.color, setShadowNodeColor(arr[i]));
				}
			}
		};
		var hideAncestShadow = function(oElm, pElm) {
			for(var arr = pElm.childNodes, i = 0, l = arr.length; i < l; i++) {
				if(arr[i].hasChildNodes()) {
					arr[i].nodeName.toLowerCase() == oElm.tagName.toLowerCase() && arr[i].firstChild == oElm.firstChild ? arr[i].style.visibility = 'hidden' : hideAncestShadow(oElm, arr[i]);
				}
			}
		};
		var boolShadowChild = function(elm) {
			for(var bool = true, arr = getAncestObj(elm), i = 0, l = arr.length; i < l; i++) {
				if(arr[i].tagName.toLowerCase() == 'span' && arr[i].className.match(/dummyShadow/)) {
					bool = false;
					break;
				}
			}
			return bool;
		};
		var setShadow = function(elm) {
			var sShadow = getShadowValue();
			if(sShadow != 'invalid') {
				for(var arr = [], nArr = elm.childNodes, bool = false, i = 0, l = nArr.length; i < l; i++) {
					if(nArr[i].nodeName.toLowerCase() == 'span' && nArr[i].className.match(/dummyShadow/)) {
						nArr[i].className.match(/hasImp/) && (bool = true);
						arr[arr.length] = nArr[i].id;
					}
				}
				if(bool == false || hasImp == true) {
					var mOver = elm.getAttribute('onmouseover') || '';
					var mOut = elm.getAttribute('onmouseout') || '';
					mOver != '' && !mOver.match(/;$/) && (mOver += ';');
					mOut != '' && !mOut.match(/;$/) && (mOut += ';');
					for(i = 0, l = arr.length; i < l; i++) {
						if(sObj.onHover && sShadow == 'none') {
							mOver += "hideElm('" + arr[i] + "');";
							mOut += "showElm('" + arr[i] + "');";
						}
						else if(!(sObj.onHover && sShadow != 'none')) {
							elm.removeChild(document.getElementById(arr[i]));
						}
					}
					sObj.onHover && sShadow == 'none' && elm.setAttribute('onmouseover', mOver), elm.setAttribute('onmouseout', mOut);
					for(var aBg, arr = getAncestObj(elm), i = 0, l = arr.length; i < l; i++) {
						aBg == null && (getCompStyle(arr[i]).backgroundColor != 'transparent' || getCompStyle(arr[i]).backgroundImage != 'none') && (aBg = arr[i]);
						for(var cArr = arr[i].childNodes, j = 0, k = cArr.length; j < k; j++) {
							cArr[j].nodeType == 1 && cArr[j].nodeName.toLowerCase() == 'span' && cArr[j].className.match(/dummyShadow/) && hideAncestShadow(elm, document.getElementById(cArr[j].id));
						}
					}
					sShadow != 'none' && sShadow.length > 1 && (getCompStyle(elm).backgroundColor != 'transparent' || getCompStyle(elm).backgroundImage != 'none') && (sShadow = revArr(sShadow));
					if(sShadow == 'none' && sObj.onHover == false) {
						for(var arr = elm.parentNode.childNodes, i = 0, l = arr.length; i < l; i++) {
							if(arr[i].nodeName.toLowerCase() == 'span' && arr[i].className == 'dummyShadow') {
								getCompStyle(elm).display == 'inline-block' && (elm.style.display = 'inline');
								getCompStyle(elm).position == 'relative' && (elm.style.position = 'static');
								break;
							}
						}
					}
					if(sShadow != 'none' && nArr.length != 0 && boolShadowChild(elm)) {
						for(var hArr = [], clNode = elm.cloneNode(true), arr = clNode.childNodes, i = 0, l = arr.length; i < l; i++) {
							arr[i] != null && arr[i].hasChildNodes() && arr[i].nodeName.toLowerCase() == 'span' && arr[i].className.match(/dummyShadow/) && (hArr[hArr.length] = arr[i].id, clNode.removeChild(arr[i]));
						}
						var sNode = clNode.innerHTML;
						ieVersion == 9 && (sNode = sNode.replace(/\n/, ' '));
						ieVersion == 8 && (elm.innerHTML = elm.innerHTML);
						for(i = 0, l = sShadow.length; i < l; i++) {
							var pxRad = convUnitToPx(sShadow[i].z, elm);
							var xPos = convUnitToPx(sShadow[i].x, elm) - pxRad + convUnitToPx(getCompStyle(elm).paddingLeft, elm);
							getCompStyle(elm).textAlign == 'center' && (xPos -= ((convUnitToPx(getCompStyle(elm).paddingLeft, elm) + convUnitToPx(getCompStyle(elm).paddingRight, elm)) / 2));
							var yPos = convUnitToPx(sShadow[i].y, elm) - pxRad + convUnitToPx(getCompStyle(elm).paddingTop, elm);
							if(ieVersion == 7 && pxRad == 0) {
								xPos >= 0 && (xPos -= 1);
								yPos >= 0 && (yPos -= 1);
							}
							var sColor = sShadow[i].cProf || getCompStyle(elm).color;
							var sOpacity = 0.6;
							sShadow[i].cProf != null && sShadow[i].cProf.match(/rgba\(\s*([0-9]+\s*,\s*[0-9]+\s*,\s*[0-9]+)\s*,\s*([01]?[\.0-9]*)\)/) && (sColor = 'rgb(' + RegExp.$1 + ')', sOpacity = (RegExp.$2 * 1));
							var sBox = document.createElement('span');
							var sId = cNum();
							sBox.id = 'dummyShadow' + sId;	sId++;
							sBox.className = (sObj.hasImp == true) ? 'dummyShadow hasImp' : 'dummyShadow';
							sBox.style.display = 'block';
							sBox.style.position = 'absolute';
							sBox.style.left = xPos + 'px';
							sBox.style.top = yPos + 'px';
							sBox.style.width = '100%';
							sBox.style.color = sColor;
							sBox.style.filter = 'progid:DXImageTransform.Microsoft.Blur(PixelRadius=' + pxRad + ', MakeShadow=false, ShadowOpacity=' + sOpacity + ')';
							sBox.style.zIndex = -(i + 1);
							sBox.innerHTML = sNode;
							if(getCompStyle(elm).display == 'inline') {
								elm.style.display = 'inline-block';
							}
							if(!(getCompStyle(elm).position == 'absolute' || getCompStyle(elm).position == 'fixed')) {
								elm.style.position = 'relative';
								ieVersion == 7 && (elm.style.top = getCompStyle(elm).paddingTop);
							}
							if(getCompStyle(elm).backgroundColor != 'transparent' || getCompStyle(elm).backgroundImage != 'none') {
								getCompStyle(elm).zIndex != ('auto' || null) ? (sBox.style.zIndex = elm.style.zIndex) : (elm.style.zIndex = sBox.style.zIndex = -1);
							}
							if(aBg && aBg.tagName.toLowerCase() != 'body') {
								elm.style.zIndex = 1; sBox.style.zIndex = -1;
							}
							ieVersion == 7 && getCompStyle(elm).lineHeight.match(/^([0-9\.]+)(em|ex|px|cm|mm|in|pt|pc|%)?$/) && (elm.style.minHeight = !RegExp.$2 ? convUnitToPx(RegExp.$1 + 'em', elm) : RegExp.$2 == '%' ? convUnitToPx((RegExp.$1 / 100) + 'em', elm) : convUnitToPx(RegExp.$1 + RegExp.$2, elm));
							elm.appendChild(sBox);
							if(sObj.onHover) {
								sBox.style.visibility = 'hidden';
								mOver = elm.getAttribute('onmouseover') || '';
								mOut = elm.getAttribute('onmouseout') || '';
								mOver != '' && !mOver.match(/;$/) && (mOver += ';');
								mOut != '' && !mOut.match(/;$/) && (mOut += ';');
								mOver += ("showElm('" + sBox.id + "');");
								mOut += ("hideElm('" + sBox.id + "');");
								if(hArr.length > 0) {
									for(j = 0, k = hArr.length; j < k; j++) {
										var hElm = document.getElementById(hArr[j]);
										if(hElm) {
											mOver += ("hideElm('" + hElm.id + "');");
											mOut += ("showElm('" + hElm.id + "');");
										}
									}
								}
								elm.setAttribute('onmouseover', removeDupFunc(mOver));
								elm.setAttribute('onmouseout', removeDupFunc(mOut));
							}
							setShadowNodeColor(document.getElementById(sBox.id));
						}
					}
				}
			}
		};
		return this.each(function() {
			setShadow(this);
		});
	};
})(jQuery);

$().ready(function() {
	if(ieVersion >= 7 && ieVersion <= 9) {
		var ieShadowSettings = function() {
			var sArr = [];
			sArr = cssShadowValues();
			//	自動的にスタイルシートからtext-shadow値を読み込みます
			//	読み込ませたくない場合は上記1行（sArr = cssShadowValues();）をコメントアウトのこと
			//	Gets text-shadow values from stylesheets automatically.
			//	If you don't want to do so, comment out the line above (sArr = cssShadowValues();).
			var arr = [
			//	ここにtext-shadowを適用させるセレクタの配列と影の値を記述
			//	セレクタ毎に「カンマ区切り」で配列を追加（カンマを忘れるとエラー発生）
			//	Write your shadow settings here, like below.
			//	{ sel : 'h1', shadow : '2px 2px 2px gray' },
			//	{ sel : 'em', shadow : '1px 1px 1px rgb(0, 100, 100)' }
			];
			return sArr.concat(arr);
		};
		var cssShadowValues = function() {
			var getCssValues = function(prop) {
				var sReg = prop.match(/(\-)/) ? prop.replace(RegExp.$1, '\\\-') : prop;
				sReg += '\\s*:\\s*([0-9a-zA-Z\\s\\-\\+\\*\\\&#\\.\\(\\)%\\,\\!\\"\\\'\\>\\<\\\\]+);?';
				var getCssRules = function(sSheet) {
					for(var arr = [], sRules = sSheet.cssRules || sSheet.rules, i = 0, l = sRules.length; i < l; i++) {
						if(sRules[i].type) {
							sRules[i].type == 3 && (arr = arr.concat(getCssRules(sRules[i].styleSheet)));
							sRules[i].type == 4 && sRules[i].media.mediaText.match(/all|screen/) && (arr = arr.concat(getCssRules(sRules[i])));
							sRules[i].type == 1 && sRules[i].style.cssText.match(sReg) && (arr[arr.length] = { sel : sRules[i].selectorText, prop : prop, val : RegExp.$1 });
						}
						else {
							var sText = sRules[i].style.cssText || sRules[i].cssText;
							if(sText) {
								sText.match(sReg) && (arr[arr.length] = { sel : sRules[i].selectorText, prop : prop, val : RegExp.$1 });
							}
						}
					}
					return arr;
				};
				if(document.styleSheets) {
					for(var arr = [], sArr = document.styleSheets, i = 0, l = sArr.length; i < l; i++) {
						if(isMSIE && ieVersion < 9 && sArr[i].imports) {
							for(var iArr = sArr[i].imports, j = 0, k = iArr.length; j < k; j++) {
								iArr[j] != undefined && (arr = arr.concat(getCssRules(iArr[j])));
							}
						}
						arr = arr.concat(getCssRules(sArr[i]));
					}
				}
				for(var aTag = document.getElementsByTagName('*'), oId = cNum(), i = 0, l = aTag.length; i < l; i++) {
					if(aTag[i].style != null && aTag[i].style.cssText.match(sReg)) {
						aTag[i].id == '' && (aTag[i].id = 'objId' + oId, oId++);
						arr[arr.length] = { sel : '#' + aTag[i].id, prop : prop, val : RegExp.$1 };
					}
				}
				return arr;
			}
			for(var arr = [], sArr = getCssValues('text-shadow'), revReg = /^(#[0-9a-fA-F]{3,6})\s+([0-9a-zA-Z\s\-\.\(\)%\,\!]+)$/, i = 0, l = sArr.length; i < l; i++) {
				arr[arr.length] = { sel : sArr[i].sel, shadow : sArr[i].val.match(revReg) ? RegExp.$2 + ' ' + RegExp.$1 : sArr[i].val };
			}
			return arr;
		};
		for(var arr = ieShadowSettings(), i = 0, l = arr.length; i < l; i++) {
			for(var sArr = arr[i].sel.split(/\s*,\s*/), j = 0, k = sArr.length; j < k; j++) {
				var sObj = { sValue : arr[i].shadow, onHover : sArr[j].match(/:hover/) ? true : false, hasImp : arr[i].shadow.match(/important/) ? true : false };
				sObj.onHover && (sArr[j] = sArr[j].replace(/:hover/, ''));
				$(sArr[j]).textShadowForMSIE(sObj);
			}
		}
	}
});
