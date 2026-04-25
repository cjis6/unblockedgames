import { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { Maximize2, X, Search, Zap, Play } from 'lucide-react';
import gamesData from './data/games.json';

export default function App() {
  const [games, setGames] = useState([]);
  const [selectedGame, setSelectedGame] = useState(null);
  const [searchQuery, setSearchQuery] = useState('');
  const [activeCategory, setActiveCategory] = useState('All');

  useEffect(() => {
    setGames(gamesData);
  }, []);

  const categories = ['All', ...new Set(games.map(g => g.category))];

  const filteredGames = games.filter(game => {
    const matchesSearch = game.title.toLowerCase().includes(searchQuery.toLowerCase());
    const matchesCategory = activeCategory === 'All' || game.category === activeCategory;
    return matchesSearch && matchesCategory;
  });

  return (
    <div className="flex h-screen w-full bg-[#0f172a] overflow-hidden text-slate-300">
      {/* Sidebar Navigation */}
      <aside className="hidden lg:flex w-64 bg-[#0a0f1d] border-r border-slate-800 flex-col p-6 overflow-y-auto">
        <div className="flex items-center gap-3 mb-10">
          <div className="w-8 h-8 bg-indigo-500 rounded-lg flex items-center justify-center font-bold text-white shadow-lg shadow-indigo-500/20">A</div>
          <h1 className="text-xl font-display font-bold text-white tracking-tight uppercase">ARCADE<span className="text-indigo-500">CORE</span></h1>
        </div>

        <nav className="flex-1 space-y-1">
          <div className="text-[10px] uppercase tracking-widest text-slate-500 font-bold mb-3 ml-2">Discovery</div>
          <button 
            onClick={() => { setActiveCategory('All'); setSearchQuery(''); }}
            className={`w-full sidebar-item flex items-center gap-3 px-3 py-2.5 rounded-xl transition-all ${
              activeCategory === 'All' ? 'sidebar-item-active' : 'text-slate-400 sidebar-item-hover'
            }`}
          >
            <Zap className="w-5 h-5" />
            Browse All
          </button>
          
          <div className="text-[10px] uppercase tracking-widest text-slate-500 font-bold mt-8 mb-3 ml-2">Categories</div>
          {categories.filter(c => c !== 'All').map(cat => (
            <button
              key={cat}
              onClick={() => setActiveCategory(cat)}
              className={`w-full sidebar-item flex items-center gap-3 px-3 py-2.5 rounded-xl transition-all ${
                activeCategory === cat ? 'sidebar-item-active' : 'text-slate-400 sidebar-item-hover'
              }`}
            >
              {cat}
            </button>
          ))}
        </nav>

        {selectedGame && (
          <div className="mt-8 p-4 glass rounded-2xl">
            <p className="text-[10px] uppercase tracking-wider text-slate-400 mb-2">Currently Playing</p>
            <p className="text-sm font-bold text-white truncate">{selectedGame.title}</p>
            <div className="mt-3 h-1.5 w-full bg-slate-700 rounded-full overflow-hidden">
              <motion.div 
                initial={{ width: 0 }}
                animate={{ width: "100%" }}
                transition={{ duration: 2, repeat: Infinity, repeatType: "reverse" }}
                className="h-full bg-indigo-500"
              />
            </div>
          </div>
        )}
      </aside>

      {/* Main Content Area */}
      <main className="flex-1 flex flex-col overflow-y-auto no-scrollbar">
        {/* Top Header */}
        <header className="flex justify-between items-center p-8 sticky top-0 bg-[#0f172a]/80 backdrop-blur-md z-30">
          <div className="relative w-full max-w-md">
            <span className="absolute inset-y-0 left-0 pl-3 flex items-center text-slate-500">
              <Search className="w-5 h-5" />
            </span>
            <input 
              type="text" 
              placeholder="Search for unblocked games..." 
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="w-full bg-[#1e293b] border-none rounded-xl py-2.5 pl-10 pr-4 text-sm text-slate-200 placeholder-slate-500 focus:ring-2 focus:ring-indigo-500 outline-none transition-all"
            />
          </div>
          
          <div className="hidden sm:flex items-center gap-4 ml-4">
            <div className="flex flex-col items-end">
              <span className="text-[10px] uppercase tracking-tighter text-slate-500">Network Host</span>
              <span className="text-xs font-bold text-indigo-400">ARCADE_V1.2</span>
            </div>
            <div className="w-10 h-10 rounded-full bg-gradient-to-tr from-indigo-500 to-purple-500 flex items-center justify-center text-white font-bold shadow-lg shadow-indigo-500/20">
              GA
            </div>
          </div>
        </header>

        <div className="px-8 pb-8">
          {/* Hero Card */}
          <section className="mb-8 relative rounded-3xl overflow-hidden h-44 bg-slate-800 shadow-2xl">
            <div className="absolute inset-0 bg-gradient-to-r from-slate-900 via-slate-900/60 to-transparent z-10 p-8 flex flex-col justify-center">
              <span className="text-indigo-400 text-[10px] font-bold uppercase tracking-widest mb-2 flex items-center gap-2">
                <Play className="w-3 h-3 fill-current" />
                Featured Release
              </span>
              <h2 className="text-3xl font-display font-black text-white mb-2 tracking-tight">NEON OVERDRIVE</h2>
              <p className="text-slate-400 text-sm max-w-sm mb-4 leading-relaxed line-clamp-1">The fastest retro racing game ever unblocked. Push the limits of the grid.</p>
              <button 
                onClick={() => setSelectedGame(games[0])}
                className="bg-white text-slate-900 px-6 py-2 rounded-xl font-bold text-sm hover:bg-indigo-500 hover:text-white transition-all w-fit shadow-xl"
              >
                PLAY NOW
              </button>
            </div>
            <div className="absolute top-0 right-0 w-1/2 h-full opacity-40">
              <div 
                className="w-full h-full bg-indigo-500/10" 
                style={{ backgroundImage: 'radial-gradient(#6366f1 1.5px, transparent 1.5px)', backgroundSize: '16px 16px' }}
              />
            </div>
          </section>

          {/* Games Grid */}
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
            <AnimatePresence mode='popLayout'>
              {filteredGames.map((game, index) => (
                <motion.div
                  key={game.id}
                  layout
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, scale: 0.95 }}
                  transition={{ duration: 0.2, delay: index * 0.03 }}
                  className="group cursor-pointer"
                  onClick={() => setSelectedGame(game)}
                >
                  <div className="aspect-video bg-slate-800 rounded-2xl mb-3 overflow-hidden border border-slate-700 group-hover:border-indigo-500/50 transition-all relative shadow-lg">
                    <img 
                      src={game.thumbnail} 
                      alt={game.title}
                      className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110 opacity-70 group-hover:opacity-100"
                      referrerPolicy="no-referrer"
                    />
                    <div className="absolute inset-0 bg-indigo-900/10 group-hover:bg-transparent transition-all"></div>
                    <div className="absolute top-2 right-2 flex gap-1 transform translate-y-2 opacity-0 group-hover:translate-y-0 group-hover:opacity-100 transition-all duration-300">
                      <div className="bg-black/60 backdrop-blur-md p-1.5 rounded-lg border border-white/5">
                        <Play className="w-4 h-4 text-white fill-current" />
                      </div>
                    </div>
                  </div>
                  <h3 className="text-sm font-bold text-white truncate px-1">{game.title}</h3>
                  <p className="text-[11px] text-slate-500 px-1 font-medium mt-0.5">{game.category} • 4.9 Rating</p>
                </motion.div>
              ))}
            </AnimatePresence>
          </div>

          {filteredGames.length === 0 && (
            <div className="py-24 text-center">
              <Search className="w-12 h-12 text-slate-700 mx-auto mb-4" />
              <h3 className="text-lg font-bold text-white mb-1">No experiments found</h3>
              <p className="text-xs text-slate-500">Try searching for something else in the network.</p>
            </div>
          )}

          {/* Small Stats Footer */}
          <footer className="mt-12 flex flex-col md:flex-row justify-between items-center text-[10px] uppercase tracking-wider text-slate-500 gap-4 border-t border-slate-800 pt-8">
            <p>© 2026 ARCADE CORE HUB • {games.length} GAMES UNBLOCKED</p>
            <div className="flex gap-4">
              <span className="flex items-center gap-1"><span className="w-1.5 h-1.5 bg-green-500 rounded-full"></span> Server Status: Good</span>
              <span className="hover:text-indigo-400 cursor-pointer transition-colors">Privacy Policy</span>
              <span className="hover:text-indigo-400 cursor-pointer transition-colors">Safety Protocol</span>
            </div>
          </footer>
        </div>
      </main>

      {/* Modal - Game Viewer */}
      <AnimatePresence>
        {selectedGame && (
          <motion.div 
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 z-50 flex items-center justify-center p-0 sm:p-12"
          >
            <div className="absolute inset-0 bg-[#0a0f1d]/90 backdrop-blur-3xl" onClick={() => setSelectedGame(null)}></div>
            
            <motion.div 
              initial={{ scale: 0.95, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              exit={{ scale: 0.95, opacity: 0 }}
              className="relative w-full h-full max-w-6xl glass sm:rounded-3xl overflow-hidden shadow-2xl flex flex-col bg-[#0f172a]"
            >
              {/* Modal Header */}
              <div className="bg-[#0a0f1d]/50 border-b border-slate-800 px-6 h-16 flex items-center justify-between">
                <div className="flex items-center gap-3">
                  <div className="w-2.5 h-2.5 rounded-full bg-indigo-500 shadow-[0_0_8px_rgba(99,102,241,0.6)]"></div>
                  <h3 className="font-display font-medium text-white truncate max-w-[200px] md:max-w-md">
                    {selectedGame.title}
                  </h3>
                </div>
                
                <div className="flex items-center gap-4">
                  <button className="p-2 text-slate-500 hover:text-white transition-colors">
                    <Maximize2 className="w-5 h-5" />
                  </button>
                  <button 
                    onClick={() => setSelectedGame(null)}
                    className="flex items-center gap-2 px-3 py-1.5 bg-red-500/10 text-red-400 border border-red-500/20 rounded-lg hover:bg-red-500 hover:text-white transition-all text-xs font-bold"
                  >
                    <X className="w-4 h-4" />
                    EXIT
                  </button>
                </div>
              </div>

              {/* Game Viewport */}
              <div className="flex-1 bg-black relative">
                <iframe 
                  src={selectedGame.url} 
                  className="w-full h-full border-none"
                  title={selectedGame.title}
                  allowFullScreen
                  referrerPolicy="no-referrer"
                />
              </div>

              {/* Modal Footer */}
              <div className="bg-[#0a0f1d]/50 border-t border-slate-800 px-6 py-4 flex items-center justify-between text-[10px] text-slate-500 font-bold tracking-widest uppercase">
                <div className="flex items-center gap-6">
                  <span className="flex items-center gap-2"><div className="w-1 h-1 bg-green-500 rounded-full"></div> FRAME_STABLE: 60FPS</span>
                  <span className="opacity-40">ENCRYPTION: ARCADE_V2.0</span>
                </div>
                <p className="hidden sm:block">ENJOY RESPONSIBLY • ARCADECORE NETWORK</p>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}
