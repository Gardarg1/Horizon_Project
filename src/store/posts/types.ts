export interface PostsState {
  data: Post[];
  currentPage: Post;
  loading: boolean;
}

export interface Post {
  id: string;
  title: string;
  img: string;
  content: string;
  userIsAdmin?: boolean;
}
