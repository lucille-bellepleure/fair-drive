import AccountCreateRoot from "./account-create/AccountCreateRoot"
import AccountRoot from "./account/AccountRoot"
import ConnectRoot from "./connect/ConnectRoot"

export default [
    { path: "/account-create", exact: true, component: AccountCreateRoot },
    { path: "/account", exact: true, component: AccountRoot },
    { path: "/connect/:id", component: ConnectRoot }

]