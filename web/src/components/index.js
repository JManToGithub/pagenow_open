import Vue from 'vue'

// 自动扫描出.vue后缀的文件
const componentsContext = require.context('./', true, /\.vue$/);

function capitalizeFirstLetter(str){
  return str.charAt(0).toUpperCase() + str.slice(1);
}

componentsContext.keys().forEach(fileName => {
  const componentConfig = componentsContext(fileName);
  let a = fileName.lastIndexOf('/');
  fileName = '.' + fileName.slice(a);
  const componentName = capitalizeFirstLetter(
    fileName.replace(/^\.\//,'').replace(/\.\w+$/,'')
  );

  Vue.component(componentName, componentConfig.default || componentConfig)
});
