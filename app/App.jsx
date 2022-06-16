import React, { StrictMode } from 'react';
import Routes from './config/Routes';
import {createRoot} from 'react-dom/client';

const rootElement = document.getElementById('app');
const root = createRoot(rootElement);

root.render( 
    <Routes />
);