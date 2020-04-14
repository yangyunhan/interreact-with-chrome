console.log('this is content script! in interreact with chrome');

// 接收来自后台的消息
chrome.runtime.onMessage.addListener(function(request, sender, sendResponse){
	if(request.cmd == 'update_font_size') {
		var ele = document.createElement('style');
		ele.innerHTML = `* {font-size: ${request.size}px !important;}`;
		document.head.appendChild(ele);
	}
	else {
    // console.log('request', request)
		tip(JSON.stringify(request));
		sendResponse('我收到你的消息了：'+JSON.stringify(request));
	}
});

// 简单的消息通知
function tip(info) {
	info = info || '';
	var ele = document.createElement('div');
	ele.className = 'chrome-plugin-simple-tip slideInLeft';
	ele.style.top = tipCount * 70 + 20 + 'px';
	ele.innerHTML = `<div>${info}</div>`;
	document.body.appendChild(ele);
	ele.classList.add('animated');
	tipCount++;
	setTimeout(() => {
		ele.style.top = '-100px';
		setTimeout(() => {
			ele.remove();
			tipCount--;
		}, 400);
	}, 3000);
}