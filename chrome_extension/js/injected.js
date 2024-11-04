const KEY_MESSAGE_OPEN = 'VK_BETTER_DATING:MESSAGE_OPEN';

const GLOBAL_CONFIG = {
  url: 'https://vk.com/dating',
  searchWord: 'vkParams',
}


class DomParser {
  getVkParamsFromAuthorizedDatingPageHTML() {
    const HTML = document.documentElement.innerHTML
    const index = HTML.indexOf(GLOBAL_CONFIG.searchWord)

    if (index === -1) {
      console.log('Параметры запуска не найдены? Вы авторизованы?');
    }

    const leftIndex = HTML.indexOf("'", index + 1)
    const rightIndex = HTML.indexOf("'", leftIndex + 1)

    const vkParams = HTML.slice(leftIndex + 1, rightIndex)
    return vkParams
  }
}

class App {
  nodes = {}
  form = new Form()
  domParser = new DomParser()

  init() {
    if (window.location.href.includes(GLOBAL_CONFIG.url)) {
      this.form.init()
      this.mount()
    }
    this.initLocationListener()
  }
  mount() {
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
      this.form.toggle()
    };

    const paramsNode = document.createElement('div');
    paramsNode.textContent = this.domParser.getVkParamsFromAuthorizedDatingPageHTML();
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
      let copyText = this.domParser.getVkParamsFromAuthorizedDatingPageHTML()
      try {
        await navigator.clipboard.writeText(copyText)
        showMessage(TEXT.success)
      } catch (e) {
        showMessage(TEXT.error)
      }
    };

    const containerNode = document.createElement('div');
    containerNode.append(infoNode, copyButtonNode, paramsNode);

    this.form.nodes.root.append(containerNode, closeButtonNode);
    document.body.appendChild(this.form.nodes.root);
  }
  initLocationListener() {
    window.navigation.addEventListener("navigate", (event) => {
      if (event.destination.url.includes(GLOBAL_CONFIG.url) && !event.destination.url.endsWith('vk_better_dating=true')) {
        // window.location.reload()
        // Из-за того что в вк сидят дауны со своим монолитом и кастомным staticManager необходимо сделать хардовую перезагрузку страницы, чтобы подгрузить нужные данные)
        window.location = `${GLOBAL_CONFIG.url}?vk_better_dating=true`
        // this.unmount()
        // this.mount()
      }
      else {
        this.unmount()
      }
    })
  }
  unmount() {
    this.form.unmount()
    this.form.init()
  }
}

class Form {
  nodes = {}
  init() {
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
    this.nodes.root = root
    this.setupDefaultOpen()
    this.toggle(this.isOpen());
  }
  setupDefaultOpen() {
    if (!['true', 'false'].includes(localStorage.getItem(KEY_MESSAGE_OPEN))) {
      localStorage.setItem(KEY_MESSAGE_OPEN, true);
    }
  }
  isOpen() {
    return localStorage.getItem(KEY_MESSAGE_OPEN) === 'true';
  }
  open() {
    this.setState(true)
  }
  close() {
    this.setState(false)
  }
  toggle() {
    this.setState(!this.isOpen())
  }
  setState(open) {
    localStorage.setItem(KEY_MESSAGE_OPEN, open);
    if (open) {
      this.nodes.root.style.transform = '';
    } else {
      this.nodes.root.style.transform = 'translateX(calc(-100% + 20px))';
    }
  }
  unmount() {
    Object.values(this.nodes).forEach(node => {
      node.remove()
    })
    this.nodes = {}
  }
}

const app = new App()
window.addEventListener("load", () => app.init.call(app));

