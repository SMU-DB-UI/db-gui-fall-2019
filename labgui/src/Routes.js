import Loginscreen from "./Loginscreen"
import { ReportsPage } from "./app/ReportsPage"
import { ReviewsPage } from "./app/ReviewsPage"



export const Routes = () => {
    return ([
        ['/login', Loginscreen, 'Login'],
        ['/reports', ReportsPage, 'Reports'],
        ['/reviews', ReviewsPage, 'Reviews']
    ])
}