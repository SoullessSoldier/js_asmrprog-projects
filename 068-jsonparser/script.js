"use strict"

const parseAndDisplayJson = () => {
    const jsonInput = document.getElementById("jsonInput").value;
    const jsonViewer = document.querySelector(".jsonviewer")
    try {
        const jsonObj = JSON.parse(jsonInput);
        jsonViewer.textContent = "";
        buildTree(jsonObj, jsonViewer, "root")
    } catch (e) {
        const p = document.createElement("p");
        p.classList.add("error-paragraph");
        p.innerText = "Invalid JSON";
        jsonViewer.textContent = "";
        jsonViewer.append(p);
    }
};

const buildTree = function(obj, parentElement, key) {
    const item = document.createElement("div");
    parentElement.appendChild(item);
    if (obj && typeof obj === "object") {
        const keySpan = document.createElement("span");
        keySpan.className = "key collapsable";
        keySpan.textContent = `${key}: `;
        item.appendChild(keySpan);

        const childContainer = document.createElement("div");
        childContainer.className = `hidden ${Array.isArray(obj) ? "array" : "object"}`;
        item.appendChild(childContainer);

        for (const childKey in obj) {
            buildTree(obj[childKey], childContainer, childKey)
        }

        keySpan.onclick = function(event) {
            event.stopPropagation();
            const childDiv = this.parentElement.querySelector(".hidden");
            if (childDiv.style.display === "block") {
                childDiv.style.display = "none";
                this.classList.remove("collapsed")
            } else {
                childDiv.style.display = "block";
                this.classList.add("collapsed");
            }
        }
    } else {
        item.innerHTML = '<span class="key">' + key + ': </span>' + '<span class="' + getType(obj) + '">'
        + obj + '</span>';
    }
}

const getType = function(value) {
    if (value) {
        if (typeof value === "string") return "string";
        if (typeof value === "number") return "number";
        if (Array.isArray(value)) return "array";
        if (typeof value === "object") return "object";
    } else {
        return "unknown"
    }
}

const fileInput = document.querySelector("#fileInput");
fileInput.addEventListener("change", (event) => {
    const file = event.target.files[0];
    if (!file) {
        return;
    }
    let reader = new FileReader();
    reader.onload = (event) => {
        const fileContent = event.target.result;
        document.getElementById("jsonInput").value = fileContent;
        parseAndDisplayJson()
    };
    reader.readAsText(file);
})