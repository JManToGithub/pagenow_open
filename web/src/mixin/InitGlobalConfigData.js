const InitGlobalConfigData = {
  created() {

    let globalConfigData = {
      snapEnabled: false,
      autoSave: false
    };

    if(!localStorage.getItem('globalConfigData')) {
      localStorage.setItem('globalConfigData', JSON.stringify(globalConfigData))
    }

  }
};

export default InitGlobalConfigData
