import React from 'react';
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom';
import Header from './components/Header';
import UploadPage from './pages/UploadPage';
import GalleryPage from './pages/GalleryPage';
import AdminPage from './pages/AdminPage';
import './styles/global.css';

function App() {
    return (
        <Router>
            <div className="App">
                <Header />
                <div className="container">
                    <Switch>
                        <Route exact path="/" component={UploadPage} />
                        <Route path="/gallery" component={GalleryPage} />
                        <Route path="/admin" component={AdminPage} />
                    </Switch>
                </div>
            </div>
        </Router>
    );
}

export default App;