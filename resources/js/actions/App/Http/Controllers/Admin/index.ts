import DashboardController from './DashboardController'
import ProjectController from './ProjectController'
import BriefQuestionController from './BriefQuestionController'
import BriefSubmissionController from './BriefSubmissionController'
const Admin = {
    DashboardController: Object.assign(DashboardController, DashboardController),
ProjectController: Object.assign(ProjectController, ProjectController),
BriefQuestionController: Object.assign(BriefQuestionController, BriefQuestionController),
BriefSubmissionController: Object.assign(BriefSubmissionController, BriefSubmissionController),
}

export default Admin