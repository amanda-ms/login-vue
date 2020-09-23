import Vue from "vue";
import Router from "vue-router";
import Login from "@/pages/Login";
import Dashboard from "@/pages/Dashboard";
import Cadastro from "@/pages/Cadastro";
import Biblioteca from "@/pages/Biblioteca";

Vue.use(Router);

export default new Router({
  mode: "history",
  base: process.env.BASE_URL,
  routes: [
    {
      path: "/",
      name: "login",
      component: Login,
    },
    {
      path: "/dashboard",
      name: "dashboard",
      component: Dashboard,
    },
    {
      path: "/cadastro",
      name: "cadastro",
      component: Cadastro,
    },
    {
      path: "/biblioteca",
      name: "biblioteca",
      component: Biblioteca,
    },
  ],
});
