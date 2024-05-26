function getVkMiniAppStartingUrlParams() {
  const pageHTML = document.documentElement.innerHTML.toString();
  const PARAM_KEY = 'vkParams'
  const PARAMS_LENGTH = 338
  const idx = pageHTML.indexOf(PARAM_KEY);
  // 4 и 2 убирают кавычки и отступы
  const initParams = pageHTML.slice(idx + PARAM_KEY.length + 4, idx + PARAMS_LENGTH - 2);
  return initParams;
}

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
  getVkMiniAppStartingUrlParams(),
  "\n\nIt's also displayed on-screen!"
);

const root = document.createElement('div');
root.classList.add('VK_BETTER_DATING:root');
root.style.position = 'fixed';
root.style.left = '20px';
root.style.bottom = '20px';
root.style.border = '2px solid pink';
root.style.background = '#333';
root.style.color = 'white';
root.style.fontFamily = 'Roboto, Arial, sans';
root.style.padding = '15px 5px 15px 15px';
root.style.zIndex = '99999999999999';
root.style.maxWidth = '40vw';
root.style.borderRadius = '3px';
root.style.transition = 'all 0.1s ease';
root.style.display = 'flex';

const infoNode = document.createElement('div');
infoNode.textContent = 'Click pink button to hide this message';

const closeButtonNode = document.createElement('button');
closeButtonNode.style.display = 'block';
closeButtonNode.style.height = '32px';
closeButtonNode.style.width = '32px';
closeButtonNode.style.flex = '0 0 32px';
closeButtonNode.style.borderRadius = '50%';
closeButtonNode.style.backgroundColor = 'pink';
closeButtonNode.style.marginLeft = '5px';
closeButtonNode.style.cursor = 'pointer';
closeButtonNode.onclick = () => {
  toggleMessageOpen(!isMessageOpen());
  localStorage.setItem(KEY_MESSAGE_OPEN, !isMessageOpen());
};

const paramsNode = document.createElement('div');
paramsNode.textContent = getVkMiniAppStartingUrlParams();
paramsNode.style.color = '#ddd';
paramsNode.style.marginTop = '10px';
paramsNode.style.wordBreak = 'break-all';

const TEXT = {
  default: 'Click to copy vk token',
  error: 'Error occured, copy&paste token from below',
  success: 'Token copied in clipboard',
}
const copyButtonNode = document.createElement('button');
function showMessage(text) {
  copyButtonNode.textContent = text
  setTimeout(() => { copyButtonNode.textContent = TEXT.default }, 1000)
}
copyButtonNode.textContent = TEXT.default;
copyButtonNode.style.padding = '10px 15px';
copyButtonNode.style.margin = '10px 0px';
copyButtonNode.style.backgroundColor = '#666';
copyButtonNode.style.cursor = 'pointer';
copyButtonNode.onclick = async () => {
  let copyText = getVkMiniAppStartingUrlParams()
  try {
    await navigator.clipboard.writeText(copyText)
    showMessage(TEXT.success)
  } catch (e) {
    showMessage(TEXT.error)
  }
};


const containerNode = document.createElement('div');
containerNode.append(infoNode, copyButtonNode, paramsNode);

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

function cycle() {
  const href = window.location.href;
  if (!copyText.textContent || copyText.textContent.startsWith('vk_access_token') || !paramsNode.textContent || !paramsNode.textContent.startsWith('vk_access_token')) {
    const params = getVkMiniAppStartingUrlParams()
    paramsNode.textContent = params
    copyText = params
  }
  if (!href.startsWith(DEFAULT_DATING_URL)) root.style.display = 'none';
  else root.style.display = 'flex';
}

cycle()
setInterval(cycle, 1000);
