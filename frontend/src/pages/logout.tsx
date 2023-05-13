import { setAuthStatus, setCurrentUserId, setCurrentUserName } from "@/utils/authStatus";

export default function Logout(){
    if(typeof window !== "undefined"){
        setAuthStatus(null)
        setCurrentUserId(null)
        setCurrentUserName(null)
        window.location.href = '/login'
    }

    document.cookie.split(";").forEach(function(c) {
      document.cookie = c
        .replace(/^ +/, "")
        .replace(/=.*/, "=;expires=" + new Date().toUTCString() + ";path=/");
    });
}
