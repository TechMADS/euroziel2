// app/not-found.tsx
'use client';

import { useState, useEffect } from 'react';
import Link from 'next/link';
import { useTheme } from 'next-themes';
import { motion, AnimatePresence } from 'framer-motion';

// Memory card game data
const createCardDeck = () => {
  const emojis = ['🚧', '🎨', '⚡', '🎮', '🚀', '💡', '🇩🇪', '🎓'];
  const deck = [...emojis, ...emojis];
  return deck.sort(() => Math.random() - 0.5).map((emoji, index) => ({
    id: index,
    emoji,
    isFlipped: false,
    isMatched: false,
  }));
};

export default function NotFound() {
  const [cards, setCards] = useState(createCardDeck());
  const [flippedIndex, setFlippedIndex] = useState<number | null>(null);
  const [moves, setMoves] = useState(0);
  const [matches, setMatches] = useState(0);
  const [isLocked, setIsLocked] = useState(false);
  const [gameComplete, setGameComplete] = useState(false);
  const { resolvedTheme } = useTheme();
  const isDark = resolvedTheme === 'dark';

  useEffect(() => {
    if (matches === 8) {
      setGameComplete(true);
    }
  }, [matches]);

  const handleCardClick = (clickedId: number) => {
    if (isLocked) return;
    
    const clickedCard = cards[clickedId];
    if (clickedCard.isMatched || clickedCard.isFlipped) return;

    const newCards = [...cards];
    
    // No card flipped yet
    if (flippedIndex === null) {
      newCards[clickedId].isFlipped = true;
      setCards(newCards);
      setFlippedIndex(clickedId);
    } 
    // Second card flipped
    else {
      const firstCard = cards[flippedIndex];
      const secondCard = clickedCard;
      
      setMoves(prev => prev + 1);
      
      if (firstCard.emoji === secondCard.emoji) {
        // Match found
        newCards[flippedIndex].isMatched = true;
        newCards[clickedId].isMatched = true;
        newCards[flippedIndex].isFlipped = true;
        newCards[clickedId].isFlipped = true;
        setCards(newCards);
        setFlippedIndex(null);
        setMatches(prev => prev + 1);
      } else {
        // No match - flip back
        newCards[clickedId].isFlipped = true;
        setCards(newCards);
        setIsLocked(true);
        
        setTimeout(() => {
          const resetCards = [...cards];
          resetCards[flippedIndex].isFlipped = false;
          resetCards[clickedId].isFlipped = false;
          setCards(resetCards);
          setFlippedIndex(null);
          setIsLocked(false);
        }, 800);
      }
    }
  };

  const resetGame = () => {
    setCards(createCardDeck());
    setFlippedIndex(null);
    setMoves(0);
    setMatches(0);
    setGameComplete(false);
    setIsLocked(false);
  };

  const bgGradient = isDark 
    ? 'from-purple-900 via-indigo-800 to-blue-900'
    : 'from-purple-200 via-indigo-300 to-blue-200';
    
  const cardBg = isDark ? 'bg-white/10' : 'bg-white/30';
  const textColor = isDark ? 'text-white' : 'text-gray-900';
  const subTextColor = isDark ? 'text-purple-200' : 'text-purple-800';

  return (
    <div className={`min-h-screen bg-gradient-to-br ${bgGradient} flex items-center justify-center p-4`}>
      <motion.div
        initial={{ opacity: 0, scale: 0.95 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ duration: 0.5 }}
        className="max-w-2xl w-full"
      >
        <div className={`backdrop-blur-lg rounded-2xl shadow-2xl overflow-hidden border ${isDark ? 'border-white/20 bg-white/10' : 'border-black/10 bg-white/30'}`}>
          
          {/* Header */}
          <div className="text-center py-8 px-4 border-b border-white/20">
            <motion.div
              initial={{ y: -20, opacity: 0 }}
              animate={{ y: 0, opacity: 1 }}
              transition={{ delay: 0.2 }}
            >
              <h1 className={`text-8xl font-bold ${textColor} mb-2`}>404</h1>
              <div className="inline-block bg-yellow-500/20 rounded-full px-4 py-2 mb-4">
                <span className="text-yellow-300 font-semibold">🚧 UNDER CONSTRUCTION 🚧</span>
              </div>
              <h2 className={`text-3xl font-semibold ${textColor} mb-2`}>Website is being crafted</h2>
              <p className={subTextColor}>
                Play a memory game while we build something amazing!
              </p>
            </motion.div>
          </div>

          {/* Game Section */}
          <div className="p-6">
            {/* Stats */}
            <div className="flex justify-between items-center mb-6 bg-white/5 rounded-lg p-4">
              <div className="text-center">
                <p className="text-purple-300 text-sm">MOVES</p>
                <p className={`text-2xl font-bold ${textColor}`}>{moves}</p>
              </div>
              <div className="text-center">
                <p className="text-purple-300 text-sm">MATCHES</p>
                <p className={`text-2xl font-bold ${textColor}`}>{matches}/8</p>
              </div>
              <button
                onClick={resetGame}
                className="bg-white/20 hover:bg-white/30 text-white px-4 py-2 rounded-lg transition-all text-sm font-semibold"
              >
                🔄 New Game
              </button>
            </div>

            {/* Cards Grid */}
            <div className="grid grid-cols-4 gap-3">
              {cards.map((card) => (
                <motion.button
                  key={card.id}
                  onClick={() => handleCardClick(card.id)}
                  className={`
                    aspect-square rounded-xl text-3xl font-bold transition-all duration-300
                    ${card.isFlipped || card.isMatched 
                      ? 'bg-gradient-to-br from-yellow-400 to-orange-500 shadow-lg' 
                      : `${cardBg} hover:bg-white/30`}
                  `}
                  whileHover={!card.isFlipped && !card.isMatched && !isLocked ? { scale: 1.05 } : {}}
                  whileTap={!card.isFlipped && !card.isMatched && !isLocked ? { scale: 0.95 } : {}}
                  disabled={isLocked || card.isMatched}
                >
                  <AnimatePresence mode="wait">
                    {card.isFlipped || card.isMatched ? (
                      <motion.span
                        key="front"
                        initial={{ scale: 0.5, opacity: 0 }}
                        animate={{ scale: 1, opacity: 1 }}
                        exit={{ scale: 0.5, opacity: 0 }}
                        className="block"
                      >
                        {card.emoji}
                      </motion.span>
                    ) : (
                      <motion.span
                        key="back"
                        initial={{ scale: 0.5, opacity: 0 }}
                        animate={{ scale: 1, opacity: 1 }}
                        exit={{ scale: 0.5, opacity: 0 }}
                        className="block text-white/50 text-2xl"
                      >
                        ?
                      </motion.span>
                    )}
                  </AnimatePresence>
                </motion.button>
              ))}
            </div>

            {/* Completion Message */}
            <AnimatePresence>
              {gameComplete && (
                <motion.div
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: -20 }}
                  className="mt-6 text-center"
                >
                  <div className="bg-green-500/20 rounded-lg p-4 border border-green-500/30">
                    <p className="text-green-300 text-lg font-semibold">
                      🎉 Amazing! You completed it in {moves} moves! 🎉
                    </p>
                  </div>
                </motion.div>
              )}
            </AnimatePresence>

            {/* Return Home Button */}
            <div className="mt-6 text-center">
              <Link
                href="/"
                className="inline-flex items-center gap-2 bg-white text-purple-900 px-6 py-3 rounded-xl font-semibold hover:bg-purple-100 transition-all shadow-lg"
              >
                🏠 Return to Homepage
              </Link>
            </div>
          </div>
        </div>
      </motion.div>
    </div>
  );
}