import Loginscreen from "./Loginscreen"
import { ReportsPage } from "./app/ReportsPage"

export const Routes = () => {
    return ([
        ['/login', Loginscreen, 'Login'],
        ['/reports', ReportsPage, 'Reports']
    ])
}