export default function MultiPartAuthHeader() {
    const user = JSON.parse(localStorage.getItem('user'));

    if (user) {
        return {
            'Authorization': 'Bearer ' + user,
            // Do NOT set Content-Type manually when using FormData
        };
    } else {
        return {};
    }
}
