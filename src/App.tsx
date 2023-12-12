import './App.css';
import { Layout } from './components/Layout';
import { Rain } from './pages/Rain';
import { Route } from 'wouter';

function App() {
    return (
        <Layout>
            <Route path="/">
                <Rain />
            </Route>
            <Route path="/about">About page</Route>
        </Layout>
    );
}

export default App;
