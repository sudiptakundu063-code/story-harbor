import { useEffect, useRef, useState } from "react";
import { Document, Page, pdfjs } from "react-pdf";
import { AnimatePresence, motion } from "framer-motion";

import "react-pdf/dist/Page/AnnotationLayer.css";
import "react-pdf/dist/Page/TextLayer.css";


pdfjs.GlobalWorkerOptions.workerSrc = new URL(
  "pdfjs-dist/build/pdf.worker.min.mjs",
  import.meta.url
).toString();


function BookReader({
  pdfUrl,
  storyId,
  chapterName,
  languageName,
}) {
  const [numPages, setNumPages] = useState(0);
  const [currentPage, setCurrentPage] = useState(1);
  const [controlsVisible, setControlsVisible] = useState(false);

  const hideTimer = useRef(null);


  function showControls() {
    setControlsVisible(true);

    clearTimeout(hideTimer.current);

    hideTimer.current = setTimeout(() => {
      setControlsVisible(false);
    }, 2500);
  }


  function nextPage() {
    setCurrentPage((page) =>
      Math.min(page + 1, numPages)
    );
  }


  function previousPage() {
    setCurrentPage((page) =>
      Math.max(page - 1, 1)
    );
  }


  useEffect(() => {
    function handleKeyboard(event) {
      if (event.key === "ArrowRight") {
        nextPage();
      }

      if (event.key === "ArrowLeft") {
        previousPage();
      }

      if (event.key === "Escape") {
        setControlsVisible(false);
      }
    }


    window.addEventListener(
      "keydown",
      handleKeyboard
    );


    return () => {
      window.removeEventListener(
        "keydown",
        handleKeyboard
      );

      clearTimeout(hideTimer.current);
    };
  }, [numPages]);


  return (
    <div
      className="
        relative
        h-screen
        w-screen
        overflow-hidden
        bg-black
      "
    >

      {/* PDF */}
      <div
        className="
          absolute
          inset-0
          flex
          items-center
          justify-center
        "
      >

        <Document
          file={pdfUrl}
          onLoadSuccess={({ numPages }) => {
            setNumPages(numPages);
          }}
          loading={null}
        >

          <AnimatePresence mode="wait">

            <motion.div
              key={currentPage}
              initial={{
                opacity: 0,
              }}
              animate={{
                opacity: 1,
              }}
              exit={{
                opacity: 0,
              }}
              transition={{
                duration: 0.45,
              }}
            >

              <Page
                pageNumber={currentPage}
                renderTextLayer={false}
                renderAnnotationLayer={false}
                className="
                  max-h-screen
                  max-w-screen
                "
              />

            </motion.div>

          </AnimatePresence>

        </Document>

      </div>


      {/* Activity area */}
      <div
        className="
          absolute
          inset-0
          z-50
        "
        onMouseMove={showControls}
        onTouchStart={showControls}
        onClick={showControls}
      />


      {/* Top controls */}
      <div
        className={`
          fixed
          top-0
          left-0
          right-0
          z-[1000]
          transition-all
          duration-500

          ${
            controlsVisible
              ? "opacity-100 translate-y-0"
              : "opacity-0 -translate-y-5 pointer-events-none"
          }
        `}
      >

        <div
          className="
            h-16
            px-6
            flex
            items-center
            justify-between
            bg-gradient-to-b
            from-black/80
            to-transparent
          "
        >

          <div className="text-white/70 text-sm">
            {chapterName}
          </div>

          <div className="text-white/50 text-sm">
            {languageName}
          </div>

        </div>

      </div>



      {/* Bottom controls */}
      <div
        className={`
          fixed
          bottom-0
          left-0
          right-0
          z-[1000]
          transition-all
          duration-500

          ${
            controlsVisible
              ? "opacity-100 translate-y-0"
              : "opacity-0 translate-y-5 pointer-events-none"
          }
        `}
      >

        <div
          className="
            h-20
            flex
            items-center
            justify-center
            gap-8
            bg-gradient-to-t
            from-black/80
            to-transparent
          "
        >

          <button
            onClick={previousPage}
            disabled={currentPage === 1}
            className="
              text-white/70
              text-2xl
              disabled:opacity-20
            "
          >
            ←
          </button>


          <span
            className="
              text-white/50
              text-sm
            "
          >
            {currentPage} / {numPages}
          </span>


          <button
            onClick={nextPage}
            disabled={currentPage === numPages}
            className="
              text-white/70
              text-2xl
              disabled:opacity-20
            "
          >
            →
          </button>

        </div>

      </div>

    </div>
  );
}


export default BookReader;