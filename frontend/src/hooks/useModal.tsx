import React, { FC, useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { ModalState } from "../@types/redux";
import { closeModal } from "../actions/uiActions";
import CreateAddressModel from "../components/core/Modal/CreateAddressModal";
import EditUserModal from "../components/core/Modal/EditUserModal";
import { reduxStore } from "../store";

const ElementPerView: Record<string, FC | JSX.Element> = {
  USER_EDIT_PROFILE: <EditUserModal />,
  USER_CREATE_ADDRESS: () => <CreateAddressModel />,
  USER_EDIT_ADDRESS: () => <h1>test</h1>,
};

export default function useModal(): [
  boolean,
  FC | JSX.Element | null,
  () => void
] {
  const dispatch = useDispatch();

  const [documentRef, setDocumentRef] = useState<HTMLBodyElement | null>(null);
  const [Component, setComponent] = useState<FC | JSX.Element | null>(null);

  const { open, view = null } = useSelector<typeof reduxStore>(
    (state) => state.modal
  ) as ModalState;

  useEffect(() => {
    if (!view) return;
    setComponent(ElementPerView[view]);
  }, [view]);

  useEffect(() => {
    setDocumentRef(document.querySelector("body"));
  }, []);

  useEffect(() => {
    if (Component) documentRef!.style.overflow = "hidden";
  }, [Component]);

  const _closeModal = () => {
    (documentRef as any).style.overflow = "unset";
    dispatch(closeModal());
  };

  return [open, Component, _closeModal];
}
