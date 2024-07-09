// auth.js
class AuthService {
    #token;
    #user = {
        name: 'John Smith',
        id: '123',
        email: 'john.smith@example.com'
    };
    /*
    *isAuthenticated: boolean
    */

   //If you don't call this method isAuthenticated, you must give it this alias how you
    //prefer
    isAuthenticated() {
        return true;
    }
    //If you don't call this method getToken, you must give it this alias how you
    //prefer
    getToken() {  
        return this.#token;
    }
    getUser() { return this.#user; }
    setUse(){ this.#user}
    //If you don't call this method logout, you must give it this alias how you
    //prefer
    async logout() {
        // session.clear();
    }
}

export default new AuthService();