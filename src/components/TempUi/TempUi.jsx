import './TempUi.scss'
import Icons from '../../functions/icons_holder'
import CommunitiLogo from '../../assets/logos/communiti_logo.svg'
import chevron from '../../assets/icons/icon_chevron.svg'

export default function TempUi(){
    
    return(
        <>
            <nav className="nav-bar">
                <div className="left-container">
                    <img src={CommunitiLogo} alt="Communiti Logo" className="left-container__logo" />
                    <div className="icon-pair">
                        <img src={Icons().IconDashboard} alt="Home Icon" className="icon-pair__icon" />
                        <p className="icon-pair__label">Home</p>
                    </div>
                    <div className="icon-pair icon-pair--active">
                        <img src={Icons().IconMembers} alt="Community Icon" className="icon-pair__icon" />
                        <p className="icon-pair__label">Dashboard</p>
                    </div>
                    <div className="icon-pair">
                        <img src={Icons().IconCalendar} alt="Events Icon" className="icon-pair__icon" />
                        <p className="icon-pair__label">Events</p>
                    </div>
                    <div className="icon-pair">
                        <img src={Icons().IconMessages3} alt="Chats" className="icon-pair__icon" />
                        <p className="icon-pair__label">Chats</p>
                    </div>
                </div>
                <div className="right-container">
                    {/* <img src={profileHeadshot} alt="Profile Headshot" className="right-container__headshot" /> */}
                    <img src={chevron} alt="downward chevron" className="right-container__chevron" />
                </div>
            </nav>
        </>
    )
}