import { Route, Routes } from 'react-router-dom';
import Layout from '../components/layouts/Layout';
import Create from "../pages/Create/Create";
import Main from '../pages/main/Main';

function Router() {
    return (
        <Routes>
            <Route path="/" element={<Layout />}>
                <Route path="/" element={<Main />} />
                <Route path="/Create" element={<Create />} />
            </Route>
        </Routes>
    );
}

export default Router;
