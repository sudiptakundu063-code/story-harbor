export default function NovelCard({ story }) {
    return (
        <article className="group overflow-hidden rounded-xl border border-zinc-800 bg-zinc-900 transition-all duration-300 hover:-translate-y-1 hover:border-amber-500/40 hover:shadow-xl hover:shadow-amber-500/5">
            <div className="aspect-2/3 overflow-hidden bg-zinc-800">
                {story.cover ? (
                    <img
                        src={story.cover_url}
                        alt={story.title}
                        className="h-full w-full object-cover transition duration-500 group-hover:scale-105"
                    />
                ) : (
                    <div className="flex h-full w-full items-center justify-center text-xs text-zinc-600">
                        No Cover
                    </div>
                )}
            </div>

            <div className="space-y-2 p-4">
                <h3 className="line-clamp-1 font-serif text-lg font-semibold text-zinc-100">
                    {story.title}
                </h3>

                <p className="text-sm text-zinc-400">
                    {story.author}
                </p>

                <div className="flex items-center justify-between pt-2">
                    <span className="rounded-full bg-amber-500/10 px-2 py-1 text-xs text-amber-400">
                        {story.genre}
                    </span>

                    <span className="text-xs text-zinc-500">
                        {story.chapter_count} ch.
                    </span>
                </div>
            </div>
        </article>
    );
}