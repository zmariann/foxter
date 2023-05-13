import { setAuthStatus, setCurrentUserId, setCurrentUserName } from "@/utils/authStatus";
import { betterFetch } from '@/utils/utils'

export default function Logout(){    
    setAuthStatus(null)
    setCurrentUserId(null)
    setCurrentUserName(null)

    betterFetch("/api/logout", { method: 'POST' });
    
    window.location.href = "/login";
}
