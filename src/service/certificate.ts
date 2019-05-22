async function getCertificationStatus(request: RequestInfo): Promise<any> {
    const method = "POST";
    const body = JSON.stringify(__atinfo);
    const headers = {
        'Accept': 'application/json',
        'Content-Type': 'application/json'
    };

    return new Promise(resolve => {
        fetch(request, {method, headers, body})
        .then(response => response.json())
        .then(body => resolve(body));
    });
};

export { getCertificationStatus }