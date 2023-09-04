import { usePost } from "../../context/post.context";

const PostList: React.FC = () => {
  const {
    search,
    showDetail,
    saveBookmark
  } = usePost();

  return (
    <></>
  );
}

export default PostList;
