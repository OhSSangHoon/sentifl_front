import { Route, Routes } from 'react-router-dom';
import Layout from '../components/layouts/Layout';

function Router() {
    return (
        <Routes>
            <Route path="/" element={<Layout />} />
        </Routes>
    );
}

export default Router;
