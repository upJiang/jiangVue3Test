const componentList = import.meta.globEager('../components/common/**');
let componentArray = new Object()
Object.keys(componentList).forEach((key) => {
    let keyArray = key.split('/')
    let name = 'D' + keyArray[keyArray.length - 1].split('.')[0]
    componentArray[name] = componentList[key].default
})

export default function (app) {
    Object.keys(componentArray).forEach((key) => {
        app.component(key, componentArray[key])
    })
}