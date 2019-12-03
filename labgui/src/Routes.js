import Loginscreen from "./Loginscreen"
import { ReportsPage } from "./app/ReportsPage"
import HomePage from "./HomePage"
import HrReports from "./HrReports"
import { ReviewsPage } from "./app/ReviewsPage"



export const Routes = () => {
    return ([
        ['/HomePage', HomePage, 'Home'],
        ['/', Loginscreen, 'Login'],
        ['/reports', ReportsPage, 'Reports'],
        ['/HrReports', HrReports, 'HrReports'],
        ['/reviews', ReviewsPage, 'Reviews']
    ])
}