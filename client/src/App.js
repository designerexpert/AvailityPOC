import React from "react";
import { BrowserRouter, Route } from "react-router-dom";
import Navigation from "./components/navigation/Navigation";
import Registration from "./components/registration/Registration";
import Enrollment from "./components/enrollment/Enrollment";

function App() {
    return (
        <div>
            <BrowserRouter>
                <Navigation>
                    <Route exact path="/" component={Registration} />
                    <Route exact path="/enrollment" component={Enrollment} />
                </Navigation>
            </BrowserRouter>
        </div>
    );
}

export default App;
