import React from "react";

import NewsFeedSettings from "./NewsFeedSettings";
import AccountSettings from "./AccountSettings";

const PreferencesPage = () => {
    return (
        <div className="preferences">
            <AccountSettings />
            <NewsFeedSettings />
        </div>
    );
};

export default PreferencesPage;
