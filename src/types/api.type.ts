export type loginType = { email: string; password: string };
export type LoginResponseType = {
  message: string;
  access_token: string;
  user: {
    _id: string;
    currentWorkspace: string;
  };
};

export type registerType = {
  name: string;
  email: string;
  password: string;
};

// USER TYPE
export type UserType = {
  _id: string;
  name: string;
  email: string;
};

export type CurrentUserResponseType = {
  user: UserType;
};

//******** */ WORLSPACE TYPES ****************
// ******************************************
export type WorkspaceType = {
  _id: string;
  name: string;
  description?: string;
  owner: string;
  inviteCode: string;
};






export type WorkspaceWithMembersType = WorkspaceType & {
  members: {
    _id: string;
    userId: string;
    workspaceId: string;
    joinedAt: string;
    createdAt: string;
  }[];
};

export type WorkspaceByIdResponseType = {
  message: string;
  workspace: WorkspaceWithMembersType;
};



export type RoleType = {
  _id: string;
  name: string;
};
