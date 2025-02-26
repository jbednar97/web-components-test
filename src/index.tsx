import r2wc from "@r2wc/react-to-web-component";
import React from "react";
import { ImageUploader } from "./components/ImageUploader";
// Example React Components
const Button = ({ label }: { label: string }) => <button>{label}</button>;
const Alert = ({ message }: { message: string }) => (
    <div style={{ color: "red" }}>{message}</div>
);

// Convert to Web Components
const WebButton = r2wc(Button, { props: { label: "string" } });
const WebAlert = r2wc(Alert);
const WebImageUploader = r2wc(ImageUploader);
// Register them
customElements.define("web-button", WebButton);
customElements.define("web-alert", WebAlert);
customElements.define("web-image-uploader", WebImageUploader);
