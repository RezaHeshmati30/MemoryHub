import { createContext, useContext, useEffect, useState } from "react";
import cookie from "js-cookie"; 
import axios from "axios";

const AuthContext = createContext();

const AuthContextProvider = ({ children }) => {
    const [hasToken, setHasToken] = useState(false);
    const [msg, setMsg] = useState("");
    const [user, setUser] = useState({});
    const [error, setError] = useState("");
    const [showLoginForm, setShowLoginForm] = useState(false);
    const [showSignUpForm, setShowSignUpForm] = useState(false);
    const [emailSignUp, setEmailSignUp] = useState("");
    const [emailLogin, setEmailLogin] = useState("");
    const [passwordSignUp, setPasswordSignUp] = useState("");
    const [passwordLogin, setPasswordLogin] = useState("");
    const [firstName, setFirstName] = useState("");
    const [lastName, setLastName] = useState("");


    
    const backendApiUrl = "http://localhost:3001";

    const resetMessages = () => {
        setMsg("");
        setError("");
      }

      const setErrorMessages = (error) => {
        // debugger;
        if (error.response) {
          setError(error.response.data.error)
        } else {
          setError(error.message)
        }
      }  

      const signUpHandler = async (e) => {
        e.preventDefault();
       
        resetMessages();
    
        try {
          const resp = await axios.post(`${backendApiUrl}/register`, { email:emailSignUp, password:passwordSignUp, firstName, lastName });
          console.log("Erfolgreich registriert:", resp.data);
          setEmailSignUp("");
          setPasswordSignUp("");
          setMsg("Du hast dich erfolgreich registriert.")
    
        } catch (error) {
          // setError(error.message)
    
          // oder etwas komplexer und genauer
          setErrorMessages(error);
          console.log("error while signing up:", error);
        }
    
      }
      

    const loginHandler = async (e) => {
        e.preventDefault();
        const email = emailLogin;
        const password = passwordLogin;
        resetMessages();
        
    
        try {
          
          const resp = await axios.post(`${backendApiUrl}/login`,
            {
              email,
              password
            },
            {
              withCredentials: true 
            }
          );
          setMsg(`Erfolgreich eingeloggt: ${email}. JWT erhalten.`);
          console.log(`Erfolgreich eingeloggt: ${email}. JWT erhalten.`)
          setHasToken(true);
          // setUser({ email });
          setEmailLogin("");
          setPasswordLogin(""); 
        } catch (error) {
          setErrorMessages(error);
          console.log("error while logging in:", error);
        }
      }

      const logoutHandler = async (e) => {
        e.preventDefault();
        resetMessages();
        try {
          const resp = await axios.post(`${backendApiUrl}/logout`, {}, { withCredentials: true });
          console.log("Erfolgreich ausgeloggt", resp.data);
          setMsg("Erfolgreich ausgeloggt.")
          setHasToken(false);
          setShowLoginForm(false);
          setShowSignUpForm(false);
        } catch (error) {
          setErrorMessages(error);
        }
    
      }
    
      // schauen, ob User nicht abgelaufenes Token hat
      const handleIfUserHasToken = () => {
        console.log("handleIfUserHasToken aufgerufen");
        // folgendes würde undefines zurückgeben, da das JWT Cookie "httpOnly" ist
        // const JWTcookie = cookie.get("JWT");
    
        // 1. Wert von JWTinfo Cookie auslesen und den darin enthaltenen JSON-String parsen
        let JWTinfocookie = cookie.get("JWTinfo");
    
        console.log("JWTinfo cookie", JWTinfocookie);// => j:{"expires":"2024-01-25T09:26:05.444Z","email":"Anna@dci.org"}
        if (!JWTinfocookie) return;
    
        // ":j" aus dem String in JWTinfo cookie entfernen und String parsen
        JWTinfocookie = JWTinfocookie.replace("j:", "");
        const cookieValueObj = JSON.parse(JWTinfocookie);
        console.log("cookieValueObj", cookieValueObj)
    
        // 2. Ist das Token schon abgelaufen 
        // bzw. wie lange ist es noch gültig (zeitlich betrachtet)?
        const expirationInMs = new Date(cookieValueObj.expires) - new Date();
        console.log("JWT läuft ab in", expirationInMs / 1000, "Sekunden")
    
        if (expirationInMs <= 0) return;
    
        setHasToken(true);
        setUser({ email: cookieValueObj.email });
        setMsg(`Eingeloggter User: ${cookieValueObj.email}.`);
    
      }
    
      const userInfoHandler = async () => {
        resetMessages();
    
        try {
          const resp = await axios.get(`${backendApiUrl}/userInfo`, {withCredentials:true})
          console.log("resp.data:", resp.data)
          setMsg(resp.data)
        } catch (error) {
      
          setErrorMessages(error)
        }
    
      }
    
    
      useEffect(() => {
        handleIfUserHasToken();
      }, [])
    
    const getUserInfo = async () => {
      try {
        const response = await axios.get(`${backendApiUrl}/userInfo`, { withCredentials: true });
        setUser(response.data);
        console.log(response.data);
      } catch (error) {
        setErrorMessages(error)
      }
    }

    

    return (
        <AuthContext.Provider
            value={{
                hasToken, setHasToken, msg, setMsg,user, setUser, 
                error, setError, loginHandler, signUpHandler, logoutHandler, userInfoHandler, showLoginForm, setShowLoginForm,
                showSignUpForm, setShowSignUpForm, emailSignUp, setEmailSignUp,emailLogin, setEmailLogin, passwordSignUp, setPasswordSignUp, passwordLogin, setPasswordLogin,
                firstName, setFirstName, lastName, setLastName, getUserInfo
            }}
        >
            {children}
        </AuthContext.Provider>
    );
}




export { AuthContext, AuthContextProvider };