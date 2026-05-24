import PortfolioController from './PortfolioController'
import BriefController from './BriefController'
import Admin from './Admin'
import Settings from './Settings'
const Controllers = {
    PortfolioController: Object.assign(PortfolioController, PortfolioController),
BriefController: Object.assign(BriefController, BriefController),
Admin: Object.assign(Admin, Admin),
Settings: Object.assign(Settings, Settings),
}

export default Controllers