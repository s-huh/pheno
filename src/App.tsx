import './App.css';
import { Layout } from './components/Layout';
import RainPage from './pages/Rain/Rain';
import AboutPage from './pages/About/About';
import SandboxPage from './pages/Sandbox/Sandbox';
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
            <Route path="/sandbox">
                <SandboxPage />
            </Route>
        </Layout>
    );
}

export default App;
