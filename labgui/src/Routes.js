import Loginscreen from "./Loginscreen"
import { ReportsPage } from "./app/ReportsPage"
import HomePage from "./app/HomePage"
import HrReports from "./app/HrReports"
import { ReviewsPage } from "./app/ReviewsPage"



export const Routes = () => {
    return ({
        employee: [
            ['/', Loginscreen, 'Login'],
            ['/HomePage', HomePage, 'Home'],
            ['/reports', ReportsPage, 'Reports'],
            ['/reviews', ReviewsPage, 'Reviews']
        ],
        hr: [
            ['/', Loginscreen, 'Login'],
            ['/HomePage', HomePage, 'Home'],
            ['/HrReports', HrReports, 'Reports'],
            ['/reviews', ReviewsPage, 'Reviews']
        ],
        all: [
            ['/', Loginscreen, 'Login'],
            ['/HomePage', HomePage, 'Home'],
            ['/HrReports', HrReports, 'Reports'],
            ['/reports', ReportsPage, 'Reports'],
            ['/reviews', ReviewsPage, 'Reviews']
        ]
    })
}