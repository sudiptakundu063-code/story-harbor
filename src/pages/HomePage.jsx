import { useEffect, useState } from "react";
// import Button from "../components/Button";
// import { Input } from "../components/Inputs";
import NovelCard from "../components/NovelCard";
import { supabase } from "../supabase";
import { Link } from "react-router-dom";

function HomePage() {
  const [stories, setStories] = useState([]);

  useEffect(() => {
    async function loadStories() {
      const { data, error } = await supabase
        .from("stories")
        .select("*");

      if (error) {
        console.error(error);
        return;
      }

      console.log(data);
      setStories(data);
    }

    loadStories();
  }, []);

  return (
    <div>
      {/* <div className="mx-auto flex w-[80%] gap-4 my-8">
        <Input
          type="text"
          placeholder="Search stories..."
          className="flex-1"
        />
        <Button>Add New Story</Button>
      </div> */}

      <div className="mt-8 mx-auto w-[80%] grid grid-cols-2 gap-4 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 xl:grid-cols-6">
        {stories.map((story) => (
          <Link key={story.id} to={`/stories/${story.id}`}>
            <NovelCard story={story} />
          </Link>
        ))}
      </div>
    </div>
  );
}

export default HomePage;