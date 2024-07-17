import React from "react";
import ReactDOM from 'react-dom';

export default function Card({topic, content}) {
    return(
        <div>
            <h1>{topic}</h1>
            <p>{content}</p>
        </div>
    );
}