import { Link } from "react-router-dom";

export default function Home() {
    return (
        <div>
            <p>Welcome to Cashier System</p>
            <Link to='/cashier'><button>Pergi Ke Kasir</button></Link>
        </div>
    );
}