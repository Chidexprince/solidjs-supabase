import { createEffect, createSignal } from "solid-js";
import { createSupabase } from 'solid-supabase';
import { useNavigate } from "@solidjs/router";

const Dashboard = () => {
    const [user, setUser] = createSignal({});
    const navigate = useNavigate();
    const supabase = createSupabase();

    createEffect(() => {
        getLoggedUser();  
    })

    const getLoggedUser = async () => {
        const { data: { user } } = await supabase.auth.getUser();
        setUser(user)
        if(!user) {
            navigate("/login", { replace: true });
        }
    }

    const logOut = async () => {
        let { error } = await supabase.auth.signOut();

        if (error) {
            alert(error.message);
            return
        }
        setUser({})
        navigate("/login", { replace: true });
    }

    return (
        
        <div class="dashboard-section">
            <div class="user-detail">
                <h3>Dashboard</h3>
                <h4>Welcome, {user() && user().email}</h4>
            
                <button type="button" class="logout" onClick={logOut}>Log out</button>
            </div>
        </div>
        
    )
}


export default Dashboard