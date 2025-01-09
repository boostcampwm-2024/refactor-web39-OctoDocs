import { useState } from "react";
import { UserProfile } from "@/entities/user";
import { Logout, useGetUser, LoginForm } from "@/features/auth";
import {
  WorkspaceAddButton,
  WorkspaceForm,
  WorkspaceList,
} from "@/features/workspace";
import { Divider } from "@/shared/ui";

export default function WorkspacePanel() {
  const { data } = useGetUser();
  const [isModalOpen, setIsModalOpen] = useState(false);

  const onOpenModal = () => {
    setIsModalOpen(true);
  };

  const onCloseModal = () => {
    setIsModalOpen(false);
  };
  return (
    <div className="w-[280px] px-4 py-4">
      {data ? (
        <div className="flex flex-col gap-1">
          <UserProfile nickname={data.snowflakeId ?? "123"} />
          <Divider direction="horizontal" className="h-0.5" />
          <WorkspaceList />
          <WorkspaceForm
            isModalOpen={isModalOpen}
            onCloseModal={onCloseModal}
          />
          <Divider direction="horizontal" className="h-0.5" />
          <div className="flex w-full flex-col">
            <WorkspaceAddButton onClick={onOpenModal} />
            <Logout />
          </div>
        </div>
      ) : (
        <LoginForm />
      )}
    </div>
  );
}
