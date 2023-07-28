import React from "react"
import "../../styles/private.css";

const Private = () => {
    return(
        <div className="container-fluid">
            <h1 className="text-center my-5 pt-3">Welcome to the private page</h1>
            <div className="container-fluid my-5">
                <img className="mt-5 p-5"id="privateImage" src="https://picsum.photos/id/158/500"></img>
            </div>
        </div>
    )
}

export default Private