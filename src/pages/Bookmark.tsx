import PostContainer from "../views/containers/post.container";
import PostInteractor from "../views/interactor/PostInteractor";

export default function BookmarkPage() {
  return (
    <PostContainer>
      <PostInteractor />
    </PostContainer>
  );
}
