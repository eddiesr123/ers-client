export const logout = () => {
    localStorage.removeItem('cool-jwt');
    localStorage.removeItem('userid');
    localStorage.removeItem('role');
}