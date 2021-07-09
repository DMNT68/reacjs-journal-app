import React from 'react'

export const JournalEntry = () => {
    return (
        <div className="journal__entry pointer">
            <div className="journal__entry-picture" style={{backgroundSize:'cover' ,backgroundImage:`url(https://images.unsplash.com/photo-1604661062458-671ede52d6aa?ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&ixlib=rb-1.2.1&auto=format&fit=crop&w=790&q=80)`}}></div>
            <div className="journal__entry-body">
                <p className="journal__entry-title">Un nuevo día</p>
                <p className="journal__entry-content">Lorem Ipsum is simply dummy text of the printing and typesetting industry.</p>
            </div>
            <div className="journal__entry-date-box">
                <span>Monday</span>
                <h4>28</h4>
            </div>
        </div>
    )
}
