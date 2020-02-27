const InitDbRoutes = {
  created() {

    this.$PnApi.PageApi.getAllPageBaseInfo().then(result => {
      let dbRoutes = result.data;
      let routes = [];
      dbRoutes.forEach((item) => {

        let route = {};
        route.path = item.path;
        route.name = item.id;
        route.component = resolve => require(['@/views/components/layout/' + item.component + '.vue'], resolve);
        route.meta = {
          id: item.id,
          title: item.name
        };

        routes.push(route);
      });

      this.$router.addRoutes(routes)
    })

  }
};

export default InitDbRoutes
