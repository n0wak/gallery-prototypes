# gallery-prototypes


This is gallery generator that creates a static HTML image gallery based on settings provided in a config json file (currently in gulp-config.js). It uses Gulp 4, handlebars templates, sass, and webpack. To install run 'npm install' and just run 'gulp' to set up a local server with dynamic reloading (note if you have a previous Gulp installation you might need to install the gulp-cli first, though it is included in the package so it should work out of the box.)

The gallery uses native Picture element for truly responsive images. The images load a low-res blurred image by default and then inject picture element src-sets as it scrolls into view to load an image based on the current resolution. The images are self hosted but run through IMGIX.com for dynamic on the fly rendering. No need to resize. A non-JS alternative image is not currently provided but can be done so easily. Note that Polyfills for the Picture element are possible but not yet added. Polyfills for `object-fit` are also missing which allows inline items to scale to fit their containers (the image tiles) as such those will only work in the latest webkit (Chrome, Safari) and not Edge.

As each image generates its own page social sharing is as easy as posting a link. Twitter cards, and Facebook, and other unfurl services (like Slack) should render a preview automatically... when it's hosted. I have not added anything beyond a local environment for this yet.
