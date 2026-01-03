export const QUERY_KEYS = {
  profile: {
    all: ["profile"],
    list: ["profile", "list"],
    byId: (userId?: string) => ["profile", "list", userId],
  },

  post: {
    all: ["post"],
    list: ["post", "list"],
    userList: (authorId?: string) => ["post", "userList", authorId],
    byId: (postId?: number) => ["post", "list", postId],
  },
};

export const BUCKET_NAME = "uploads";

export const POST_CONTENT_LENGTH_MAX = 180;
export const NICKNAME_LENGTH_MIN = 2;
