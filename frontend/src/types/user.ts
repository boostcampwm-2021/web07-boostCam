type User = {
  id: number;
  githubId: number;
  nickname: string;
  profile: string;
};

type UserEntity = {
  githubId: number;
  id: number;
  nickname: string;
  profile: string;
};

export type { User, UserEntity };
