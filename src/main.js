const $siteList = $('.siteList')
const $lastLi = $siteList.find('li.last')
const dz = localStorage.getItem('dz')
const dzObject = JSON.parse(dz)
const hasMap = dzObject || [
    { logo: 'D', url: 'https://developer.mozilla.org/zh-CN' },
    { logo: 'G', url: 'https://github.com' },
    { logo: 'J', url: 'https://jquery.com' },
    { logo: 'I', url: 'https://www.iconfont.cn/' }]

const simplifyUrl = (url) => {
    return url.replace('https://', '')
        .replace('http://', '')
        .replace('www.', '')
        .replace(/\/.*/, '')//删除以/开头的东西
}

const render = () => {
    $siteList.find('li:not(.last)').remove()//找到除最后一个li外的所有li,并清空。
    hasMap.forEach((node, index) => {
        const $li = $(`<li>
         <div class="site">
            <div class="logo">${node.logo}</div>
            <div class="link">${simplifyUrl(node.url)}</div>
            <div class="close">
            <svg class="icon">
                <use xlink:href="#icon-close"></use>
            </svg>
            </div>
         </div>
        </li>`).insertBefore($lastLi)
        $li.on('click', (e) => {
            window.open(node.url)
        })
        $li.on('click', '.close', (e) => {
            e.stopPropagation()//阻止冒泡
            hasMap.splice(index, 1)
            render()
        })

    })
}
render()

$('.addButton').on('click', () => {
    let url = window.prompt('请问您要添加的网址是 ？')//弹窗
    if (url.indexOf('http') !== 0) {
        url = 'https://' + url;
    }
    console.log(url)
    hasMap.push({
        logo: simplifyUrl(url)[0],
        url: url
    })
    render()
})

window.onbeforeunload = () => {
    const string = JSON.stringify(hasMap)
    localStorage.setItem('dz', string)//将string存到dz里
}

$(document).on('keypress', (e) => {
    const key = e.key
    for (let i = 0; i < hasMap.length; i++) {
        if (hasMap[i].logo.toLowerCase() === key) {
            window.open(hasMap[i].url)
        }
    }
})
