const fileInput = document.querySelector("input"),
downloadBtn = document.querySelector("button");

downloadBtn.addEventListener("click", (e)=>{
    e.preventDefault();
    downloadBtn.innerText = "downloading file ...";
    fetchFile(fileInput.value);
});

function fetchFile(url){
    fetch(url).then(res => res.blob()).then(file => {
        //URL.createObjectURL creates a url of passed object
        let tempURL = URL.createObjectURL(file);
        let aTag = document.createElement("a");
        aTag.href = tempURL;
        //passing file lastname and extension as download value of <a> tag
        aTag.download = url.replace(/^.*[\\\/]/, '');
        document.body.appendChild(aTag); // adding a tag inside body
        aTag.click();   // clicking <a> tag so that file download
        aTag.remove();  // removing <a> tag once file downloads
        url.revokeObjectURL(tempURL); // removing temp url from the document
        downloadBtn.innerText = "download";
    }).catch(()=>{
        // catch method will call if any error accor during downloading
        downloadBtn.innerText = "download";
        alert("fail to download file!");
    });
}