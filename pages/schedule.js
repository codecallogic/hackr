import React, { Component } from 'react';

class Schedule extends Component {
    render () {
        return (
        <div>
            <div className="schedule">
                <nav className="schedule-nav">
                    <span className="schedule-nav-logo">
                        <span class="schedule-nav-logo-icon material-icons">
                        local_fire_department
                        </span>
                        Blossom
                    </span>
                    <span className="schedule-nav-menu-item">
                        Get In Touch
                    </span>
                </nav>
                <div className="schedule-heading">
                    <h1 className="schedule-heading-big">
                        Schedule a meeting
                    </h1>
                    <h1 className="schedule-heading-medium">
                    Have questions about Canvas or want to see a demo?
                    Book time with us! We'd love to chat.
                    </h1>
                </div>
            </div>
        </div>
        )
    }
}
export default Schedule