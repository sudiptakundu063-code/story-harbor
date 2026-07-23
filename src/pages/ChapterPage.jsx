import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { supabase } from "../supabase";
import BookReader from "../components/BookReader";

function ChapterPage() {
  const { storyId, translationId } = useParams();

  const [chapter, setChapter] = useState(null);
  const [contentUrl, setContentUrl] = useState("");
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    async function loadChapter() {
      setLoading(true);

      const { data, error } = await supabase
        .from("chapter_translations")
        .select(`
          *,
          chapters (
            id,
            name,
            description,
            story_id
          ),
          languages (
            id,
            code,
            name,
            native_name
          )
        `)
        .eq("id", translationId)
        .single();

      if (error) {
        console.error(error);
        setLoading(false);
        return;
      }

      setChapter(data);

      if (!data.content_path) {
        console.error("No content path found.");
        setLoading(false);
        return;
      }

      const { data: storageData } = supabase.storage
        .from("chapters")
        .getPublicUrl(data.content_path);

      setContentUrl(storageData.publicUrl);

      setLoading(false);
    }

    loadChapter();
  }, [translationId]);


  if (loading) {
    return (
      <div className="
        h-screen
        flex
        items-center
        justify-center
        bg-zinc-950
        text-zinc-400
      ">
        Loading chapter...
      </div>
    );
  }


  if (!chapter) {
    return (
      <div className="
        h-screen
        flex
        items-center
        justify-center
        bg-zinc-950
        text-zinc-400
      ">
        Chapter not found.
      </div>
    );
  }


  return (
    <BookReader
      pdfUrl={contentUrl}
      storyId={storyId}
      chapterName={chapter.chapters.name}
      languageName={chapter.languages.native_name}
    />
  );
}

export default ChapterPage;