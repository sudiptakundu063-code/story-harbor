import { useEffect, useState } from "react";
import { useParams, Link } from "react-router-dom";
import { supabase } from "../supabase";
import Select from "../components/Select";

function StoryPage() {
    const { storyId } = useParams();

    const [story, setStory] = useState(null);
    const [chapters, setChapters] = useState([]);
    const [languages, setLanguages] = useState([]);
    const [selectedLanguage, setSelectedLanguage] = useState("");
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        async function loadData() {
            setLoading(true);

            const [storyRes, chaptersRes, languagesRes] = await Promise.all([
                supabase
                    .from("stories")
                    .select("*")
                    .eq("id", storyId)
                    .single(),

                supabase
                    .from("chapters")
                    .select(`
            *,
            chapter_translations (
              *,
              languages (
                id,
                code,
                name
              )
            )
          `)
                    .eq("story_id", storyId)
                    .order("created_at"),

                supabase
                    .from("languages")
                    .select("*")
                    .order("name"),
            ]);

            if (storyRes.error) return console.error(storyRes.error);
            if (chaptersRes.error) return console.error(chaptersRes.error);
            if (languagesRes.error) return console.error(languagesRes.error);

            console.log("Languages:", languagesRes.data);

            setStory(storyRes.data);
            setChapters(chaptersRes.data);
            setLanguages(languagesRes.data);

            // Default to English if available
            const english = languagesRes.data.find((l) => l.code === "en");

            setSelectedLanguage(
                english?.id ?? languagesRes.data[0]?.id ?? ""
            );

            setLoading(false);
        }

        loadData();
    }, [storyId]);

    if (loading) {
        return (
            <div className="flex h-96 items-center justify-center text-zinc-400">
                Loading...
            </div>
        );
    }

    if (!story) {
        return (
            <div className="flex h-96 items-center justify-center text-zinc-400">
                Story not found.
            </div>
        );
    }

    return (
        <main className="mx-auto max-w-6xl px-6 py-12">
            {/* Hero */}
            <section className="flex flex-col gap-8 md:flex-row">
                <img
                    src={story.cover_url}
                    alt={story.name}
                    className="aspect-2/3 w-56 rounded-xl border border-zinc-800 object-cover shadow-xl"
                />

                <div className="flex-1">
                    <h1 className="font-serif text-5xl font-bold text-zinc-100">
                        {story.name}
                    </h1>

                    <p className="mt-3 text-zinc-400">
                        By {story.author}
                    </p>

                    <p className="mt-6 max-w-3xl leading-7 text-zinc-300">
                        {story.description}
                    </p>

                    <div className="mt-8">
                        <label className="mb-2 block text-sm font-medium text-zinc-400">
                            Read in
                        </label>

                        <Select
                            options={languages}
                            value={selectedLanguage}
                            onChange={setSelectedLanguage}
                            getLabel={(language) => language.native_name}
                            getValue={(language) => language.id}
                        />
                    </div>
                </div>
            </section>

            {/* Chapters */}
            <section className="mt-14">
                <h2 className="mb-6 font-serif text-3xl font-semibold text-zinc-100">
                    Chapters
                </h2>

                <div className="space-y-4">
                    {chapters.map((chapter, index) => {
                        const translation = chapter.chapter_translations.find(
                            (t) => t.language_id === selectedLanguage
                        );

                        const available = Boolean(translation);

                        const card = (
                            <div
                                className={`rounded-xl border p-5 transition ${available
                                        ? "border-zinc-800 bg-zinc-900 hover:border-amber-500 hover:bg-zinc-800"
                                        : "cursor-not-allowed border-zinc-800 bg-zinc-900/50 opacity-50"
                                    }`}
                            >
                                <div className="flex items-center justify-between">
                                    <div>
                                        <p className="text-sm text-zinc-500">
                                            Chapter {index + 1}
                                        </p>

                                        <h3 className="mt-1 text-xl font-semibold text-zinc-100">
                                            {chapter.name}
                                        </h3>

                                        <p className="mt-2 text-zinc-400">
                                            {chapter.description}
                                        </p>
                                    </div>

                                    <span
                                        className={
                                            available ? "text-amber-400" : "text-zinc-500"
                                        }
                                    >
                                        {available ? "Read →" : "Not Available"}
                                    </span>
                                </div>
                            </div>
                        );

                        return available ? (
                            <Link
                                key={chapter.id}
                                to={`/stories/${storyId}/chapters/${translation.id}`}
                                className="block"
                            >
                                {card}
                            </Link>
                        ) : (
                            <div key={chapter.id}>
                                {card}
                            </div>
                        );
                    })}
                </div>
            </section>
        </main>
    );
}

export default StoryPage;