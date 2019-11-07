import React from 'react';

const StatCard = (props) => {
    const {
        name,
        materialIcon,
        stat,
    } = props;
    return (
        <div class="card card-stats">
            <div class="card-header card-header-info card-header-icon">
                <div class="card-icon"><i class="material-icons">{materialIcon}</i></div>
                <p class="card-category">{name}</p>
                <h3 class="card-title">+{stat}</h3></div>
            <div class="card-footer">
                <div class="stats"><i class="material-icons">access_time</i> Last created 2 days ago</div>
            </div>
        </div>
    );
};

export default StatCard;
