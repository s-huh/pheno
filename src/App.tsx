import './App.css';
import { Layout } from './components/Layout';
import RainPage from './pages/Rain/Rain';
import AboutPage from './pages/About/About';
import DarwinPage from './pages/Darwin/Darwin';
import { Route } from 'wouter';

function App() {
    return (
        <Layout>
            <Route path="/">
                <RainPage />
            </Route>
            <Route path="/about">
                <AboutPage />
            </Route>
            <Route path="/darwin">
                <DarwinPage />
            </Route>
        </Layout>
    );
}

export default App;
