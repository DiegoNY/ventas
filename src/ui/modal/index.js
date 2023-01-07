import React from 'react';


function Modal(props) {

    return (
        <>

            <div className="modal fade" id={props.id} data-bs-keyboard="false" tabindex="-1" aria-labelledby="staticBackdropLabel" aria-hidden="true">
                <div className="modal-dialog modal-lg">
                    <div className="modal-content ">
                        <div className="modal-header navbar-dark ">
                            <h1 className="modal-title fs-5 mb-2" id="staticBackdropLabel">{props.title}</h1>
                            <button type="button" className="" data-bs-dismiss="modal" aria-label="Close">

                                <i class="fi fi-rr-sign-out-alt"></i>

                            </button>
                        </div>

                        {props.children}


                    </div>
                </div>
            </div>

        </>
    );

}


export { Modal }