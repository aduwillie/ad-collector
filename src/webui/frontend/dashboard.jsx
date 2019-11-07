import '@babel/polyfill';
import React, { useState } from 'react';

import StatCard from './components/statCard';
import TableCard from './components/tableCard';

const DashboardPage = () => {
    const stats = [
        { name: 'Projects', materialIcon: 'content_paste', stat: 27 },
        { name: 'Forms', materialIcon: 'library_books', stat: 27 },
        { name: 'Users', materialIcon: 'person', stat: 27 },
        { name: 'Notifications', materialIcon: 'notifications', stat: 0 },
    ];

    return (
        <div className="container-fluid">
            <div className="row">
                {stats.map(stat => (
                    <div className="col-lg-3 col-md-6 col-sm-6">
                        <StatCard key={stat.name} {...stat} />
                    </div>
                ))}
            </div>
            <div classname="row">
                    
            </div>
        </div>
    );
};

export default DashboardPage;
