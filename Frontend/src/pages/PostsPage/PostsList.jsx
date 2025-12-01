import { useEffect, useState } from "react";
import { getPosts } from "../../services/postService";

const PostsList = () => {
  const [posts, setPosts] = useState([]);
  const [page, setPage] = useState(1);

  const load = async () => {
    const data = await getPosts(page);
    setPosts(data.posts);
  };

  useEffect(() => {
    load();
  }, [page]);

  return (
    <div>
      <h2>Publicaciones</h2>

      {posts.map(p => (
        <div key={p._id}>
          <h3>{p.title}</h3>
          <p>{p.content}</p>
          <p><b>Categoría:</b> {p.category?.name}</p>
        </div>
      ))}

      <button onClick={() => setPage(page - 1)} disabled={page === 1}>
        Anterior
      </button>

      <button onClick={() => setPage(page + 1)}>
        Siguiente
      </button>
    </div>
  );
};

export default PostsList;

