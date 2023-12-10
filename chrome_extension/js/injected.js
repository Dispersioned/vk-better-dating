const PARAMS = window.vkParams;
const DEFAULT_DATING_URL = 'https://vk.com/dating';
const KEY_MESSAGE_OPEN = 'VK_BETTER_DATING:MESSAGE_OPEN';

if (!['true', 'false'].includes(localStorage.getItem(KEY_MESSAGE_OPEN))) {
  localStorage.setItem(KEY_MESSAGE_OPEN, true);
}

function isMessageOpen() {
  return localStorage.getItem(KEY_MESSAGE_OPEN) === 'true';
}

console.log(
  'Hello! Thanks for using VK BETTER DATING browser extension. Here is VK_PARAMS:\n',
  PARAMS,
  "\n\nIt's also displayed on-screen!"
);

console.log('vkbtgrg');

const root = document.createElement('div');
root.classList.add('VK_BETTER_DATING:root');
root.style.position = 'fixed';
root.style.left = '20px';
root.style.bottom = '20px';
root.style.background = 'black';
root.style.color = 'white';
root.style.fontFamily = 'Arial, sans';
root.style.padding = '15px 5px 15px 15px';
root.style.zIndex = '99999999999999';
root.style.maxWidth = '40vw';
root.style.borderRadius = '3px';
root.style.transition = 'all 0.1s ease';
root.style.display = 'flex';

const infoNode = document.createElement('div');
infoNode.textContent = 'Click blue button to hide this message';

const closeButtonNode = document.createElement('button');
closeButtonNode.style.display = 'block';
closeButtonNode.style.height = '32px';
closeButtonNode.style.width = '32px';
closeButtonNode.style.flex = '0 0 32px';
closeButtonNode.style.borderRadius = '50%';
closeButtonNode.style.backgroundColor = 'lightblue';
closeButtonNode.style.marginLeft = '5px';
closeButtonNode.style.cursor = 'pointer';
closeButtonNode.onclick = () => {
  toggleMessageOpen(!isMessageOpen());
  localStorage.setItem(KEY_MESSAGE_OPEN, !isMessageOpen());
};

const paramsNode = document.createElement('div');
paramsNode.textContent = PARAMS;
paramsNode.style.marginTop = '10px';
paramsNode.style.wordBreak = 'break-all';

const containerNode = document.createElement('div');
containerNode.append(infoNode, paramsNode);

root.append(containerNode, closeButtonNode);
document.body.appendChild(root);

function toggleMessageOpen(open) {
  if (open) {
    root.style.transform = '';
  } else {
    root.style.transform = 'translateX(calc(-100% + 20px))';
  }
}

toggleMessageOpen(isMessageOpen());

setInterval(() => {
  const href = window.location.href;
  if (!href.startsWith(DEFAULT_DATING_URL)) root.style.display = 'none';
  else root.style.display = 'flex';
}, 300);
