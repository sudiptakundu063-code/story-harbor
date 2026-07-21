import { useEffect, useRef, useState } from "react";
import { Link } from "react-router-dom";
import ePub from "epubjs";

function BookReader({ epubUrl, storyId, chapterName }) {
    const viewerRef = useRef(null);
    const renditionRef = useRef(null);
    const bookRef = useRef(null);
    const hideTimer = useRef(null);

    const [loading, setLoading] = useState(true);
    const [showControls, setShowControls] = useState(true);

    function revealControls() {
        setShowControls(true);

        clearTimeout(hideTimer.current);

        hideTimer.current = setTimeout(() => {
            setShowControls(false);
        }, 2000);
    }

    useEffect(() => {
        if (!epubUrl) return;

        async function loadBook() {
            try {
                const book = ePub(epubUrl);
                bookRef.current = book;

                await book.ready;

                const rendition = book.renderTo(viewerRef.current, {
                    width: "100%",
                    height: "100%",
                    flow: "paginated",
                    manager: "default",
                    spread: "none",
                });

                renditionRef.current = rendition;

                rendition.themes.default({
                    body: {
                        background: "#09090b !important",
                        color: "#d4d4d8 !important",
                        "font-family": "Georgia, serif !important",
                        "line-height": "1.8 !important",
                        padding: "0 6% !important",
                    },

                    p: {
                        color: "#d4d4d8 !important",
                    },

                    h1: {
                        color: "#fbbf24 !important",
                    },

                    h2: {
                        color: "#fbbf24 !important",
                    },

                    h3: {
                        color: "#fbbf24 !important",
                    },

                    a: {
                        color: "#fbbf24 !important",
                    },
                });

                rendition.themes.fontSize("110%");

                await rendition.display();

                setLoading(false);
            } catch (error) {
                console.error(error);
            }
        }

        loadBook();

        return () => {
            clearTimeout(hideTimer.current);
            bookRef.current?.destroy();
        };
    }, [epubUrl]);

    useEffect(() => {
        function handleKeyDown(e) {
            if (e.key === "ArrowRight" || e.key === " ") {
                e.preventDefault();
                renditionRef.current?.next();
            }

            if (e.key === "ArrowLeft") {
                e.preventDefault();
                renditionRef.current?.prev();
            }
        }

        window.addEventListener("keydown", handleKeyDown);

        return () => {
            window.removeEventListener("keydown", handleKeyDown);
        };
    }, []);

    function nextPage() {
        renditionRef.current?.next();
        revealControls();
    }

    function previousPage() {
        renditionRef.current?.prev();
        revealControls();
    }

    return (
        <div className="relative h-screen w-screen overflow-hidden bg-zinc-950">

            {/* ---------- TOP INTERACTION ZONE ---------- */}

            <div
                className="fixed inset-x-0 top-0 z-[999] h-24"
                onMouseMove={revealControls}
                onTouchStart={revealControls}
            />

            {/* ---------- BOTTOM INTERACTION ZONE ---------- */}

            <div
                className="fixed inset-x-0 bottom-0 z-[999] h-24"
                onMouseMove={revealControls}
                onTouchStart={revealControls}
            />

            {/* ---------- TOP BAR ---------- */}

            <header
                className={`fixed inset-x-0 top-0 z-[1000] flex items-center justify-between bg-zinc-950/70 px-6 py-4 backdrop-blur-md transition-all duration-300 ${showControls
                        ? "translate-y-0 opacity-100"
                        : "-translate-y-full opacity-0 pointer-events-none"
                    }`}
            >
                <Link
                    to={`/stories/${storyId}`}
                    className="text-sm text-amber-400 transition hover:text-amber-300"
                >
                    ← Back
                </Link>

                <h2 className="font-serif text-lg text-zinc-100">
                    {chapterName}
                </h2>

                <button className="text-xl text-zinc-400 transition hover:text-amber-400">
                    ⚙
                </button>
            </header>

            {/* ---------- READER ---------- */}

            <div className="flex h-screen items-center justify-center px-4 py-16">

                <div
                    ref={viewerRef}
                    className="h-full w-full max-w-4xl overflow-hidden rounded-lg bg-zinc-950"
                >
                    {loading && (
                        <div className="flex h-full items-center justify-center text-zinc-400">
                            Opening book...
                        </div>
                    )}
                </div>

            </div>

            {/* ---------- BOTTOM BAR ---------- */}

            <footer
                className={`fixed inset-x-0 bottom-0 z-[1000] flex items-center justify-between bg-zinc-950/70 px-6 py-4 backdrop-blur-md transition-all duration-300 ${showControls
                        ? "translate-y-0 opacity-100"
                        : "translate-y-full opacity-0 pointer-events-none"
                    }`}
            >
                <button
                    onClick={previousPage}
                    className="rounded-lg border border-zinc-700 px-5 py-2 text-zinc-300 transition hover:border-amber-500 hover:text-amber-400"
                >
                    ← Previous
                </button>

                <span className="text-sm text-zinc-500">
                    StoryHarbor
                </span>

                <button
                    onClick={nextPage}
                    className="rounded-lg border border-zinc-700 px-5 py-2 text-zinc-300 transition hover:border-amber-500 hover:text-amber-400"
                >
                    Next →
                </button>
            </footer>

        </div>
    );
}

export default BookReader;