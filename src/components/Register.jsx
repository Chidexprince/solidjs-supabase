import { createSignal } from "solid-js";
import { createSupabase } from 'solid-supabase';
import { useNavigate, A } from "@solidjs/router";

const Register = () => {

    const supabase = createSupabase();
    const [email, setEmail] = createSignal(''); // email of the user
    const [password, setPassword] = createSignal(''); // password of the user
    const navigate = useNavigate();


    const registerUser = async (e) => {
        e.preventDefault();
        const { data, error } = await supabase.auth.signUp({
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
            <form onSubmit={(e) => registerUser(e)}>
                <h3>Register</h3>
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
                <button type="submit">Register</button>
                <span>
                    Already have an account? <A href="/login">Login here</A>
                </span>
            </form>
        </div>
    )
}


export default Register