import r2wc from "@r2wc/react-to-web-component";
import { ImageUploader } from "./components/ImageUploader";

// Convert to Web Components
const WebImageUploader = r2wc(ImageUploader, {
    props: {
        onProcessed: "function",
    },
});
// Register them

customElements.define("image-uploader", WebImageUploader);
