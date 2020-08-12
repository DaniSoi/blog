import { RegisterService } from "../services";
import { useApi } from "./index";
import { useEffect } from "react";
import { bindParamsToCallback } from "../utils";

const registerService = new RegisterService();

export default function useConfirmUser (token) {
  const { data, isLoading, apiError, success, load } = useApi();

  useEffect(() => {
    async function onLoad () {
      const sendConfirm = bindParamsToCallback(registerService.confirmUser)(token);
      await load(sendConfirm);
    }

    onLoad().catch(e => console.log(e));
  }, [token]);

  return { data, isLoading, apiError, success };
}
