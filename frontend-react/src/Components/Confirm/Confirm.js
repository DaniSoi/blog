import React from "react";
import LoadingProgress from "../Common/LoadingProgress";
import { useConfirmUser } from "../../hooks";
import SuccessCheckmark from "../Common/SuccessCheckmark";
import { history } from "../../history";
import routes from "../../routes";
import { NotFound404 } from "../NotFound404/NotFound404";

// get verification token from user's URL and send it to API confirmation
export default function Confirm ({ match }) {
  console.log(match.params.token)
  const { apiError: error, success } = useConfirmUser(match.params.token);

  function onSuccess () {
    setTimeout(() => history.push(routes.LOGIN), 2000);
  }

  return (
    <div className='confirm centerContainer'>
      {error ?
        <NotFound404/>
        :
        success ?
          <SuccessCheckmark callback={onSuccess}
                            text="Your account has been verified successfully!"/>
          :
          <LoadingProgress/>
      }
    </div>
  );
}
