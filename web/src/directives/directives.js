import Vue from 'vue';
import Clipboard from 'clipboard'

Vue.directive('resize', {
  bind(el, binding) {
    let width = '', height = '';

    function get() {
      const style = document.defaultView.getComputedStyle(el);
      if (width !== style.width || height !== style.height) {
        binding.value({width, height});
      }
      width = style.width;
      height = style.height;
    }

    el.__vueReize__ = setInterval(get, 100);
  },
  unbind(el) {
    clearInterval(el.__vueReize__);
  },
});

Vue.directive('clipboard', {
  bind: (el, binding) => {
    const clipboard = new Clipboard(el, {
      text: () => binding.value.value
    });
    el.__success_callback__ = binding.value.success;
    el.__error_callback__ = binding.value.error;
    clipboard.on('success', e => {
      const callback = el.__success_callback__;
      callback && callback(e)
    });
    clipboard.on('error', e => {
      const callback = el.__error_callback__;
      callback && callback(e)
    });
    el.__clipboard__ = clipboard
  },
  update: (el, binding) => {
    el.__clipboard__.text = () => binding.value.value;
    el.__success_callback__ = binding.value.success;
    el.__error_callback__ = binding.value.error
  },
  unbind: (el, binding) => {
    delete el.__success_callback__;
    delete el.__error_callback__;
    el.__clipboard__.destroy();
    delete el.__clipboard__
  }
});

Vue.directive('permission', {
  inserted(el, binding, vnode) {

    let currentUser = JSON.parse(localStorage.getItem('current_user'));
    if (currentUser) {
      if (currentUser.role.rolecode !== '001') {
        el.parentNode.removeChild(el);
      }
    }else {
      el.parentNode.removeChild(el);
    }

  }
});
