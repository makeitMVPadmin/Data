import './TempUi.scss'
import Icons from '../../functions/icons_holder'

export default function TempUi(){
    
    return(
        <>
            <nav className="nav-bar">
                <div className="left-container">
                    <img src="" alt="Communiti Logo" className="left-container__logo" />
                    <div className="icon-pair">
                        <img src={Icons().IconDashboard} alt="Home Icon" className="icon-pair__icon" />
                        <p className="icon-pair__label">Home</p>
                    </div>
                    <div className="icon-pair">
                        <img src={Icons().IconMembers} alt="Community Icon" className="icon-pair__icon" />
                        <p className="icon-pair__label">Communities</p>
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
                    <img src="" alt="Profile Headshot" className="right-container__headshot" />
                    <img src="" alt="downward chevron" className="right-container__chevron" />
                </div>
            </nav>
            <section className="hero">
                <div className="back-nav">
                    <img src={Icons().IconArrow} alt="" className="back-nav__return-arrow" />
                    <p className="back-nav__text">Back to Communities</p>
                </div>
                <img src="" alt="" className="community-image" />
                <section className="community-info">
                    <div className="title-section">
                        <h1 className="title-section__title">Product Pitchers</h1>
                        <img src={Icons().IconEdit} alt="" className="title-section__icon" />
                        <img src={Icons().IconDelete} alt="" className="title-section__icon" />
                    </div>
                    <div className="title-sub-info">
                        <div className="title-sub-info__left-container">
                            <div className="tag">
                                <img src="" alt="pin" className="tag__icon" />
                                <p className="tag__text">San Fransisco</p>
                            </div>
                            <div className="tag">
                                <img src="" alt="pin" className="tag__icon" />
                                <p className="tag__text">Virtual</p>
                            </div>
                        </div>
                        <div className="title-sub-info__right-container">
                            <div className="title-icon">
                                <img src={Icons().IconMembers} alt="edit" className="title-icon__image" />
                                <p className="title-icon__text"> ## members</p>
                            </div>
                        </div>
                    </div>
                </section>
            </section>
            <section className="description">
                <h3 className="description__header">Description</h3>
                <p className="description__text">Join our Product Enthusiasts Club for exclusive insights, discounts, and community. Stay ahead with the latest trends and meet fellow product aficionados. Your gateway to product innovation!</p>
            </section>
        </>
    )
}