import { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";

export default function VerifyEmail() {
    const navigate = useNavigate();

    useEffect(() => {
        const verifyUser = async () => {
            const urlParams = new URLSearchParams(window.location.search);
            const token = urlParams.get("token");

            if (!token) {
                navigate("/verify-failed");
                return;
            }

            try {
                const backendUrl = process.env.REACT_APP_BASE_URL || "http://localhost:8080";

                const response = await axios.get(`${backendUrl}/auth/verify?token=${token}`);

                // ✅ Success if backend returns 200
                if (response.status === 200) {
                    navigate("/verified-success");
                }
            } catch (error) {
                // ✅ Any error or invalid token → fail page
                console.error("Verification error:", error.response?.data || error);
                navigate("/verify-failed");
            }
        };

        verifyUser();
    }, [navigate]);


    return (
        <div style={{ textAlign: "center", marginTop: "100px" }}>
            <h2>Verifying your email, please wait...</h2>
        </div>
    );
}
