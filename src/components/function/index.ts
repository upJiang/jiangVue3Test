const componentsList = import.meta.globEager("./components/**");

let List = {}; 
export default function (app) {
  Object.keys(componentsList).forEach((key) => {
    // 筛选出ts后缀
    if (key.split(".")[2] === "ts") {
        List[`$${componentsList[key].default.name}`] =
        componentsList[key].default;
      app.config.globalProperties[`$${componentsList[key].default.name}`] =
        componentsList[key].default;
    }
  });
}

//抛出函数组件，用于js/ts中使用
export const funComponentList = List;
