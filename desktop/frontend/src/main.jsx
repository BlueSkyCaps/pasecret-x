import React from 'react'
import {createRoot} from 'react-dom/client'
import './style.css'
import Core from "./Core.jsx";

const container = document.getElementById('root')

const root = createRoot(container)

root.render(
    <Core/>
)
