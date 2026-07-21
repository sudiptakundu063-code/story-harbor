import ReactMarkdown from "react-markdown";

function MarkdownRenderer({ content }) {
  return (
    <article className="text-zinc-300">
      <ReactMarkdown
        components={{
          h1: ({ children }) => (
            <h1 className="mb-10 mt-4 font-serif text-5xl font-bold text-zinc-100">
              {children}
            </h1>
          ),

          h2: ({ children }) => (
            <h2 className="mb-6 mt-14 font-serif text-3xl font-semibold text-amber-400">
              {children}
            </h2>
          ),

          h3: ({ children }) => (
            <h3 className="mb-4 mt-10 font-serif text-2xl font-semibold text-zinc-200">
              {children}
            </h3>
          ),

          p: ({ children }) => (
            <p className="mb-6 text-lg leading-9 text-zinc-300">
              {children}
            </p>
          ),

          strong: ({ children }) => (
            <strong className="font-semibold text-zinc-100">
              {children}
            </strong>
          ),

          em: ({ children }) => (
            <em className="italic text-amber-300">
              {children}
            </em>
          ),

          blockquote: ({ children }) => (
            <blockquote className="my-8 border-l-4 border-amber-500 pl-6 italic text-zinc-400">
              {children}
            </blockquote>
          ),

          hr: () => (
            <div className="my-14 flex justify-center">
              <div className="h-px w-40 bg-zinc-700" />
            </div>
          ),

          ul: ({ children }) => (
            <ul className="mb-6 list-disc space-y-2 pl-8">
              {children}
            </ul>
          ),

          ol: ({ children }) => (
            <ol className="mb-6 list-decimal space-y-2 pl-8">
              {children}
            </ol>
          ),

          li: ({ children }) => (
            <li className="leading-8">
              {children}
            </li>
          ),

          a: ({ href, children }) => (
            <a
              href={href}
              className="text-amber-400 underline underline-offset-4 hover:text-amber-300"
              target="_blank"
              rel="noopener noreferrer"
            >
              {children}
            </a>
          ),

          img: ({ src, alt }) => (
            <img
              src={src}
              alt={alt}
              className="my-8 rounded-xl border border-zinc-800"
            />
          ),

          code: ({ children }) => (
            <code className="rounded bg-zinc-800 px-1.5 py-1 text-amber-300">
              {children}
            </code>
          ),

          pre: ({ children }) => (
            <pre className="my-6 overflow-x-auto rounded-xl border border-zinc-800 bg-zinc-900 p-5">
              {children}
            </pre>
          ),
        }}
      >
        {content}
      </ReactMarkdown>
    </article>
  );
}

export default MarkdownRenderer;