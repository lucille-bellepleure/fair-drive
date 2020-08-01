import AccountCreateRoot from "./account-create/AccountCreateRoot"
import AccountRoot from "./account/AccountRoot"
import ConnectRoot from "./connect/ConnectRoot"
import DriveRoot from "./drive/DriveRoot"

export default [
    { path: "/account-create", exact: true, component: AccountCreateRoot },
    { path: "/account", exact: true, component: AccountRoot },
    { path: "/connect/:id", component: ConnectRoot },
    { path: "/drive/:id", component: DriveRoot }

]