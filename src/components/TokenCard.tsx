import React from 'react';
import { TrendingUp, TrendingDown } from 'lucide-react';
import { Token } from '../types';

interface TokenCardProps {
  token: Token;
  onClick?: () => void;
}

export const TokenCard: React.FC<TokenCardProps> = ({ token, onClick }) => {
  const isPositive = token.change24h >= 0;

  return (
    <div
      onClick={onClick}
      className="bg-white dark:bg-gray-800 rounded-xl p-4 shadow-sm border border-gray-100 dark:border-gray-700 hover:shadow-md transition-all cursor-pointer"
    >
      <div className="flex items-center justify-between">
        <div className="flex items-center space-x-3">
          <div className="w-10 h-10 rounded-full bg-gray-100 dark:bg-gray-700 flex items-center justify-center">
            <span className="text-lg font-bold text-gray-600 dark:text-gray-300">
              {token.symbol.charAt(0)}
            </span>
          </div>
          <div>
            <h3 className="font-semibold text-gray-900 dark:text-white">{token.symbol}</h3>
            <p className="text-sm text-gray-500 dark:text-gray-400">{token.name}</p>
          </div>
        </div>
        <div className="text-right">
          <p className="font-semibold text-gray-900 dark:text-white">
            {token.balance.toFixed(4)} {token.symbol}
          </p>
          <div className="flex items-center space-x-1">
            {isPositive ? (
              <TrendingUp className="h-4 w-4 text-green-500 dark:text-green-400" />
            ) : (
              <TrendingDown className="h-4 w-4 text-red-500 dark:text-red-400" />
            )}
            <span className={`text-sm font-medium ${
              isPositive ? 'text-green-500 dark:text-green-400' : 'text-red-500 dark:text-red-400'
            }`}>
              {isPositive ? '+' : ''}{token.change24h.toFixed(2)}%
            </span>
          </div>
        </div>
      </div>
      <div className="mt-3 pt-3 border-t border-gray-50 dark:border-gray-700">
        <div className="flex justify-between items-center">
          <span className="text-sm text-gray-500 dark:text-gray-400">Value</span>
          <span className="text-sm font-medium text-gray-900 dark:text-white">
            ${token.value.toFixed(2)}
          </span>
        </div>
      </div>
    </div>
  );
};
