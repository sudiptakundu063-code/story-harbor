import AutoStoriesIcon from '@mui/icons-material/AutoStories';
import { Link } from 'react-router-dom';

function Header() {
  return (
    <header className="bg-zinc-900 border-b border-zinc-800 sticky top-0 w-full z-1000">
      <div className="flex h-20 max-w-7xl items-center justify-between px-8">
        <div className="flex items-center gap-3 cursor-pointer">
          <Link to="/">
            <div className="rounded-lg bg-amber-500/10 p-2 border border-amber-700/30">
              <AutoStoriesIcon className="text-amber-400 text-3xl" />
            </div>
          </Link>

          <h1 className="font-serif text-3xl font-semibold tracking-wide text-zinc-100">
            Story<span className="text-amber-400">Harbor</span>
          </h1>
        </div>
      </div>
    </header>
  );
}

export default Header;