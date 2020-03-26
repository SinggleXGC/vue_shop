import Vue from "vue";
import {
        Form, FormItem, Input, Button, Message,
        Container, Header, Aside, Main,
        Menu, Submenu, MenuItemGroup, MenuItem,
        Breadcrumb, BreadcrumbItem, Card, Col, Row,
        Table, TableColumn, Switch, Tooltip, Pagination,
        Dialog, MessageBox, Tag, Tree, Select, Option, Cascader,
        Alert, Tabs, TabPane, Steps, Step, CheckboxGroup, Checkbox,
        Upload, Timeline, TimelineItem
} from "element-ui";

Vue.use(Form).use(FormItem).use(Input).use(Button)
    .use(Container).use(Header).use(Aside).use(Main)
    .use(Menu).use(Submenu).use(MenuItemGroup).use(MenuItem)
    .use(Breadcrumb).use(BreadcrumbItem).use(Card).use(Col).use(Row)
    .use(Table).use(TableColumn).use(Switch).use(Tooltip).use(Pagination)
    .use(Dialog).use(Tag).use(Tree).use(Select).use(Option).use(Cascader)
    .use(Alert).use(Tabs).use(TabPane).use(Steps).use(Step).use(CheckboxGroup).use(Checkbox)
    .use(Upload).use(Timeline).use(TimelineItem)
Vue.prototype.$message=Message
Vue.prototype.$confirm=MessageBox.confirm
