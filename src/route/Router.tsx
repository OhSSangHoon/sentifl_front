import { Route, Routes } from 'react-router-dom';
import Layout from '../components/layouts/Layout';
import Main from '../main/Main';

function Router() {
    return (
        <Routes>
            <Route path="/" element={<Layout />}>
                <Route path="/" element={<Main />} />
            </Route>
        </Routes>
    );
}

export default Router;
