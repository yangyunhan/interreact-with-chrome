$(function() {
  // 加载设置
  var defaultConfig = { color: 'white' };
  // 从存储中获得值
  chrome.storage.sync.get(defaultConfig, function(items) {
    document.body.style.backgroundColor = items.color;
  });
});
$('#open_background').click(() => {
  // 将扩展程序安装目录中的相对路径转换为完整的 URL。
  window.open(chrome.extension.getURL('background.html'));
});
$('#invoke_background_js').click(() => {
  // 从background中加载方法
  var bg = chrome.extension.getBackgroundPage();
  bg.alertFromBackground();
});
$('#update_bg_color').click(() => {
  sendMessageToContentScript({cmd:'update_font_size', size: 82}, function(){
    setTimeout(() => {
      alert('hhh，刷新页面就好啦')
    }, 4000);
  });
});
$('#show_notification').click(e => {
	chrome.notifications.create(null, {
		type: 'image',
		iconUrl: 'img/hi.png',
		title: '祝我🐷',
		message: '身体棒棒，论文多多，offer拿到手软。同时还拥有八块腹肌、精湛厨艺，总带我出去玩，嘿嘿嘿。',
		imageUrl: 'img/hi.png'
	});
});

// 向content-script主动发送消息
function sendMessageToContentScript(message, callback) {
	getCurrentTabId((tabId) => {
		chrome.tabs.sendMessage(tabId, message, function(response) {
			if(callback) callback(response);
		});
	});
}
// 获取当前选项卡ID
function getCurrentTabId(callback) {
	chrome.tabs.query({active: true, currentWindow: true}, function(tabs) {
		if(callback) callback(tabs.length ? tabs[0].id: null);
	});
}