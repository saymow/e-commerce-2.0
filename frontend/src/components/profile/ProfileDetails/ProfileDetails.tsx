import React, { ChangeEvent, useEffect, useMemo } from "react";
import { useDispatch, useSelector } from "react-redux";
import { toast } from "react-toastify";
import { DefaultState } from "../../../@types/redux";
import { UserDetailsState } from "../../../@types/redux/user";
import { openEditProfileModal } from "../../../actions/uiActions";
import { userConfirmation, userDetails } from "../../../actions/userActions";
import { reduxStore } from "../../../store";
import { dateFormmater } from "../../../utils";
import Button from "../../ui/Button";
import Loading from "../../ui/Loading";

import {
  Container,
  UserInfo,
  UserInfoProgress,
  UserOptions,
  CheckIcon,
  PerfilCompletition,
  Progress,
} from "./styles";

const ProfileDetails: React.FC = () => {
  const dispatch = useDispatch();

  const { user, loading } = useSelector<typeof reduxStore>(
    (state) => state.userDetails
  ) as UserDetailsState;

  const {
    success: confirmationSuccess,
    reset: confirmationReset,
    error: confirmationError,
  } = useSelector<typeof reduxStore>(
    (state) => state.userConfirmation
  ) as DefaultState;

  useEffect(() => {
    dispatch(userDetails());
  }, []);

  useEffect(() => {
    if (confirmationSuccess && confirmationReset) {
      toast.success("Confirmation email sent successfully");
      dispatch(confirmationReset());
    }
  }, [confirmationSuccess, confirmationReset]);

  useEffect(() => {
    if (confirmationError && confirmationReset) {
      toast.error("Confirmation email failed, sorry :(.");
      dispatch(confirmationReset());
    }
  }, [confirmationError, confirmationReset]);

  const completitionPercentage = useMemo(() => {
    if (!user) return undefined;

    let editableKeys = [
      "name",
      "contact_number",
      "email",
      "birth_date",
      "is_confirmed",
    ];
    let notNullKeys = editableKeys.reduce((accum, key) => {
      return (user as any)[key] ? accum + 1 : accum;
    }, 0);

    return `${(notNullKeys / editableKeys.length) * 100}%`;
  }, [user]);

  const handleUserConfirmation = (e: ChangeEvent<HTMLInputElement>) => {
    const checked = e.target.checked;

    if (!checked) return;

    dispatch(userConfirmation());
  };

  const handleOpenEditProfileModal = () => dispatch(openEditProfileModal());

  if (loading || !user) return <Loading />;

  return (
    <Container>
      <UserInfo>
        <div>
          <p>
            <strong>Name</strong>: {user!.name}
          </p>
          <p>
            <strong>Contact number</strong>: {user!.contact_number}
          </p>
        </div>
        <div>
          <p>
            <strong>Email</strong>: {user!.email}
          </p>
          <p>
            <strong>Birth date</strong>: {dateFormmater(user!.birth_date)}
          </p>
          <p>
            <strong>Is confirmed</strong>:{" "}
            {user!.is_confirmed ? <CheckIcon /> : "Not yet."}
          </p>
        </div>
      </UserInfo>
      <UserInfoProgress>
        <PerfilCompletition>
          {completitionPercentage && (
            <>
              <h2>Perfil completion</h2>
              <Progress fillCoeff={completitionPercentage}>
                <span></span>
                <p>{completitionPercentage}</p>
              </Progress>
            </>
          )}
        </PerfilCompletition>
      </UserInfoProgress>
      <UserOptions>
        <div>
          {!user!.is_confirmed && (
            <>
              <input
                type="checkbox"
                name="confirm_account"
                id="confirm_account"
                checked={user?.is_confirmed}
                onChange={handleUserConfirmation}
              />
              <label htmlFor="confirm_account">
                Click here to confirm your account{"  "}
                <span>
                  (In order to buy products you have to confirm your account.)
                </span>
              </label>
            </>
          )}
        </div>
        <Button variant="fill" onClick={handleOpenEditProfileModal}>
          Edit profile
        </Button>
      </UserOptions>
    </Container>
  );
};

export default ProfileDetails;
