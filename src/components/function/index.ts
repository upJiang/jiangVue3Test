const componentsList =
    import.meta.globEager('./components/**');

export default function (app) {
    Object.keys(componentsList).forEach((key)=>{
        // 筛选出ts后缀
        if(key.split(".")[2] === 'ts'){
            app.config.globalProperties[`$${componentsList[key].default.name}`] = componentsList[key].default
        }
    })
}