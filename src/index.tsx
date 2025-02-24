import r2wc from "@r2wc/react-to-web-component";
import React from "react";

// Example React Components
const Button = ({ label }: { label: string }) => <button>{label}</button>;
const Alert = ({ message }: { message: string }) => (
    <div style={{ color: "red" }}>{message}</div>
);

// Convert to Web Components
const WebButton = r2wc(Button);
const WebAlert = r2wc(Alert);

// Register them
customElements.define("web-button", WebButton);
customElements.define("web-alert", WebAlert);
