import Vue from "vue";
import {Form, FormItem, Input, Button, Message,
        Container, Header, Aside, Main,
        Menu, Submenu, MenuItemGroup, MenuItem
} from "element-ui";

Vue.use(Form).use(FormItem).use(Input).use(Button)
    .use(Container).use(Header).use(Aside).use(Main)
    .use(Menu).use(Submenu).use(MenuItemGroup).use(MenuItem)
Vue.prototype.$message=Message
