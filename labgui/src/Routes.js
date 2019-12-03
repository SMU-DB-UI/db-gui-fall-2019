import Loginscreen from "./Loginscreen"
import { ReportsPage } from "./app/ReportsPage"
import HomePage from "./app/HomePage"
import HrReports from "./app/HrReports"
import { ReviewsPage } from "./app/ReviewsPage"



export const Routes = () => {
    return ([
        ['/', Loginscreen, 'Login'],
        ['/HomePage', HomePage, 'Home'],
        ['/reports', ReportsPage, 'Reports'],
        ['/HrReports', HrReports, 'HrReports'],
        ['/reviews', ReviewsPage, 'Reviews']
    ])
}