import React, { FC } from "react";
import { User } from "../typings";
import { UserHeader } from "../components/UserHeader/UserHeader";

export interface ProfileProps {
  user: User;
  logout: () => void;
}

export const Profile: FC<ProfileProps> = ({ user, logout }) => {
  const onExit = () => {
    // Тут обрабатываем логаут пользователя и редирект
    console.log("Выход из аккаунта");
  };

  return (
    <>
      <UserHeader user={user} onExit={logout} />
    </>
  );
};
