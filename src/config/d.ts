const componentList = import.meta.globEager('../components/common/**')
const componentArray = new Object()
Object.keys(componentList).forEach(key => {
  const keyArray = key.split('/')
  const name = 'D' + keyArray[keyArray.length - 1].split('.')[0]
  componentArray[name] = componentList[key].default
})

export default function (app) {
  Object.keys(componentArray).forEach(key => {
    app.component(key, componentArray[key])
  })
}
