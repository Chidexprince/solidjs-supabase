import { createSignal } from "solid-js";
import { createSupabase } from 'solid-supabase';
import { useNavigate, A } from "@solidjs/router";

const Login = () => {
    const supabase = createSupabase();
    const [email, setEmail] = createSignal(''); // email of the user
    const [password, setPassword] = createSignal(''); // password of the user
    const navigate = useNavigate();

    const loginUser = async (e) => {
        e.preventDefault();
        const { data, error } = await supabase.auth.signInWithPassword({
            email: email(),
            password: password(),
        })
        if (error) {
            alert(error.message);
            return;
        }

        if (data) {
            navigate("/");
        }
    }

    return (
        <div class="account-section">
            <form onSubmit={(e) => loginUser(e)}>
                <h3>Login</h3>
                <label>Email</label>
                <input 
                    type="email"
                    value={email()}
                    onChange={(e) => setEmail(e.target.value)} />
                <label>Password</label>
                <input
                    type="password"
                    value={password()}
                    onChange={(e) => setPassword(e.target.value)}
                />
                <button type="submit">Login</button>
                <span>
                    Don't have an account? <A href="/register">Register here</A>
                </span>
            </form>
        </div>
    )
}


export default Login


