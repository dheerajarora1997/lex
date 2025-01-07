"use client";
import "../styles/components/blankChat.scss";

export default function BlankChat() {
  return (
    <div className="container">
      <div className="blank-chat m-auto">
        <div className="">
          <h1 className="fs-4 text-center">AI-Powered Search Revolution!</h1>
          <div className="form-group position-relative mb-4 col-sm-12 col-md-8 mx-auto">
            <input type="text" className="form-control rounded-5" />
            <button
              className="search-btn icon-btn rounded-5 btn btn-secondary d-flex justify-content-center align-items-center"
              onClick={() => {
                console.log("btn click");
                // dispatch(increment());
              }}
            >
              🡒
            </button>
          </div>
          <div className="text-start">
            <h4 className="fs-6">Master the search game</h4>
            <button className="alert alert-light text-start w-100">
              Give me judgments which are either related to murder or Attempt to
              murder
            </button>
            <div className="row">
              <div className="col-sm-12 col-md-6">
                <button className="alert alert-light text-start w-100">
                  Give me judgments which are either related to murder or
                  Attempt to murder
                </button>
              </div>
              <div className="col-sm-12 col-md-6">
                <button className="alert alert-light text-start w-100">
                  Give me judgments which are either related to murder or
                  Attempt to murder
                </button>
              </div>
              <div className="col-sm-12 col-md-6">
                <button className="alert alert-light text-start w-100">
                  Give me judgments which are either related to murder or
                  Attempt to murder
                </button>
              </div>
              <div className="col-sm-12 col-md-6">
                <button className="alert alert-light text-start w-100">
                  Give me judgments which are either related to murder or
                  Attempt to murder
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
