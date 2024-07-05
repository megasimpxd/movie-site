document.addEventListener("DOMContentLoaded", function() {
    var localFilePath = 'main/html/index.html';

    var iframe = document.createElement('iframe');
    iframe.src = localFilePath;
    iframe.style.cssText = 'width: 100%; height: 100vh; border: none; position: absolute; top: 0; left: 0;';
    document.body.appendChild(iframe);
});