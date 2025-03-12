import { useNavigate } from "react-router-dom";
import { useEffect } from "react";

const PageError = () => {
    const navigate = useNavigate();

      useEffect(() => {
        document.title = "Nimbus' PawPal - Error"; // Sets the browser tab title
      }, []);

    const goBack = () => {
        navigate(-1);
    };

    return (
        <div className="d-flex justify-content-center align-items-center m-5">
            <div className="d-flex flex-column gap-3 align-items-center text-center">
                <div className='fw-bold mb-5' style={{ fontSize: "30pt" }}>404: Not Found :(</div>
                <button onClick={goBack} className="btn btn-primary">Go back</button>
            </div>
        </div>

    );
}

export default PageError;
