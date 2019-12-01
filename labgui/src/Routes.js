import Loginscreen from "./Loginscreen"
import { ReportsPage } from "./app/ReportsPage"
import HomePage from "./HomePage"

export const Routes = () => {
    return ([
        ['/HomePage', HomePage, 'Home'],
        ['/login', Loginscreen, 'Login'],
        ['/reports', ReportsPage, 'Reports']
    ])
}