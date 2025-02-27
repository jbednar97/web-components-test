const esbuild = require("esbuild");

esbuild
    .build({
        entryPoints: ["src/index.tsx"],
        bundle: true,
        format: "iife", // Immediately Invoked Function Expression (works in browsers)
        jsxFactory: "React.createElement",
        jsxFragment: "React.Fragment",
        globalName: "WebComponentsRegistry",
        outfile: "dist/web-components.js",
        minify: true,
        sourcemap: true,
    })
    .catch(() => process.exit(1));
