

const isUserAuthenticated = ()=>{
    const token = localStorage.getItem('token');
    if(token) return ;
    window.location = '/login';
    
}

export default isUserAuthenticated;