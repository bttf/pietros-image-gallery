# Pietro's Image Gallery
A self-contained server and webpage to allow the user to upload and host static image files.

## Origins & Goals
The goal of this was to create a small webserver that anyone could run on their machine so that they could upload and host images via a web UI.

I recently built a blogging web-app that was lacking any sort of static-file uploading functionality (e.g. uploading images to display in my articles). I originally planned to implement it inside of the application, but decided to build it separately in a self-contained package for learning purposes and for reusability.

## How it Works
The app serves just one web page at the root index ('/'). There you will find an upload dialog to select a file and to upload it.

Once submitted, the web page makes an AJAX request to itself to the '/upload' URI and passes the image data using a DataURL. Then the app saves it to the 'public/uploads' folder where it is publically accessible. The URL for the image is provided on the web page.

## Steps
1. 'npm install && bower install'
2. Run 'npm start' to start the server, 'grunt' if you want to start and enable asset pipeline (development).
3. Access http://localhost:3000 in your browser.
