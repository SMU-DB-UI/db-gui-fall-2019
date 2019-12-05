import Loginscreen from "./Loginscreen"
import { ReportsPage } from "./app/ReportsPage"
import HomePage from "./app/HomePage"
import HrReports from "./app/HrReports"
import { ReviewsPage } from "./app/ReviewsPage"
import { AddEmpForm } from "./app/AddEmpForm"



export const Routes = () => {
    return ({
        employee: [
            ['/HomePage', HomePage, 'Home'],
            ['/reports', ReportsPage, 'Reports'],
            ['/reviews', ReviewsPage, 'Performance Reviews']
        ],
        hr: [
            // ['/', Loginscreen, 'Login'],
            ['/HomePage', HomePage, 'Home'],
            ['/HrReports', HrReports, 'Reports'],
            ['/reviews', ReviewsPage, 'Performance Reviews'],
            ['/addEmp', AddEmpForm, 'Add an Employee']
        ],
        all: [
            ['/', Loginscreen, 'Login'],
            ['/HomePage', HomePage, 'Home'],
            ['/HrReports', HrReports, 'Reports'],
            ['/reports', ReportsPage, 'Reports'],
            ['/reviews', ReviewsPage, 'Performance Reviews'],
            ['/addEmp', AddEmpForm, 'Add an Employee']

        ],
        public: [
            ['/', Loginscreen, 'Login']
        ]
    })
}