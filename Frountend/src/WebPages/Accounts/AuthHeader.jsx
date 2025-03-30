export default function AuthHeader() {
    const user=JSON.parse(localStorage.getItem('user'));
    if (user ) {
        return{
            'Authorization':'Bearer '+user,
            "Content-type":"application/json",
        }
    }
    else{
        return {};
    }
}