export async function readFileAsBase64(uri) {
    const response = await fetch(uri);
    const blob = await response.blob();
    const base64 = await convertBlobToBase64(blob);
    return base64;
}

function convertBlobToBase64(blob) {
    return new Promise((resolve, reject) => {
        const reader = new FileReader();
        reader.onload = () => resolve(reader.result.split(',')[1]);
        reader.onerror = (error) => reject(error);
        reader.readAsDataURL(blob);
    });
}