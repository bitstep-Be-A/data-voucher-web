import PostContainer from "../views/containers/post.container";
import PostList from "../views/interactor/PostList";

export default function BookmarkPage() {
  return (
    <PostContainer>
      <PostList />
    </PostContainer>
  );
}
