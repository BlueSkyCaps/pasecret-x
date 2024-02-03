import React from 'react'
import {createRoot} from 'react-dom/client'
import './style.css'
import './i18n.js';
import Core from "./Core.tsx";

const container = document.getElementById('root')

const root = createRoot(container)

root.render(
    <Core/>
)
