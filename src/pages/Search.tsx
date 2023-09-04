import PostContainer from "../views/containers/post.container";
import PostList from "../views/interactor/PostList";

export default function SearchPage() {
  return (
    <PostContainer>
      <PostList />
    </PostContainer>
  );
}
