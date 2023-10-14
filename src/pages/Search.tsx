import PostContainer from "../views/containers/post.container";
import PostList from "../views/interactor/PostInteractor";

export default function SearchPage() {
  return (
    <PostContainer>
      <PostList />
    </PostContainer>
  );
}
