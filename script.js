document.getElementById('repairRequestForm').addEventListener('submit', function(event) {
    event.preventDefault();
    
    const residentName = document.getElementById('residentName').value;
    const unitNumber = document.getElementById('unitNumber').value;
    const issueDescription = document.getElementById('issueDescription').value;
    
    const request = {
        residentName,
        unitNumber,
        issueDescription,
        status: '대기중'
    };
    
    addRequestToList(request);
    saveRequest(request);
    
    // Form reset
    this.reset();
});

function addRequestToList(request) {
    const requestList = document.getElementById('repairRequestList');
    const li = document.createElement('li');
    
    const checkbox = document.createElement('input');
    checkbox.type = 'checkbox';
    checkbox.onclick = function() {
        li.classList.toggle('completed');
    };
    
    li.appendChild(checkbox);
    li.appendChild(document.createTextNode(`${request.residentName} (${request.unitNumber}): ${request.issueDescription} - ${request.status}`));
    
    // Delete button
    const deleteButton = document.createElement('button');
    deleteButton.textContent = '삭제';
    deleteButton.onclick = function() {
        li.remove();
        removeRequestFromStorage(request);
    };
    
    li.appendChild(deleteButton);
    requestList.appendChild(li);
}

function saveRequest(request) {
    let requests = JSON.parse(localStorage.getItem('repairRequests')) || [];
    requests.push(request);
    localStorage.setItem('repairRequests', JSON.stringify(requests));
}

function removeRequestFromStorage(requestToRemove) {
    let requests = JSON.parse(localStorage.getItem('repairRequests')) || [];
    requests = requests.filter(request => request.issueDescription !== requestToRemove.issueDescription || request.unitNumber !== requestToRemove.unitNumber);
    localStorage.setItem('repairRequests', JSON.stringify(requests));
}

// Load existing requests on page load
window.onload = function() {
    const requests = JSON.parse(localStorage.getItem('repairRequests')) || [];
    requests.forEach(addRequestToList);
};
