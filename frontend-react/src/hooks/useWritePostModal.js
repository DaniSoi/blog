import { useReducer, useRef, useState } from "react";
import writePostModalReducer from "../redux/reducers/writePostModal";

export default function useWritePostModal () {
  const [writePostModal, writePostModalDispatch] = useReducer(writePostModalReducer, {
    hide: true,
    header: null,
    buttonTitle: '',
    inputValues: {postTitleInput: '', postBodyInput: ''}
  }, undefined);
  const [ formErrors, setFormErrors ] = useState({});
  const fileInputRef = useRef(null);

  return { writePostModal, writePostModalDispatch, formErrors, setFormErrors, fileInputRef };
}
