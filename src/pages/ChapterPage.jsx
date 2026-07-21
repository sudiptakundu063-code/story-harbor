import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { supabase } from "../supabase";
import BookReader from "../components/BookReader";

function ChapterPage() {
  const { storyId, translationId } = useParams();

  const [translation, setTranslation] = useState(null);
  const [epubUrl, setEpubUrl] = useState("");
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    async function loadChapter() {
      setLoading(true);

      const { data: translationData, error } = await supabase
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

      setTranslation(translationData);

      if (!translationData.content_path) {
        console.error("No EPUB path found.");
        setLoading(false);
        return;
      }

      const { data: storageData } = supabase.storage
        .from("chapters")
        .getPublicUrl(translationData.content_path);

      setEpubUrl(storageData.publicUrl);
      setLoading(false);
    }

    loadChapter();
  }, [translationId]);

  if (loading) {
    return (
      <div className="flex h-screen items-center justify-center bg-zinc-950 text-zinc-400">
        Loading chapter...
      </div>
    );
  }

  if (!translation) {
    return (
      <div className="flex h-screen items-center justify-center bg-zinc-950 text-zinc-400">
        Chapter not found.
      </div>
    );
  }

  return (
    <BookReader
      epubUrl={epubUrl}
      storyId={storyId}
      chapterName={translation.chapters.name}
      languageName={translation.languages.native_name}
    />
  );
}

export default ChapterPage;