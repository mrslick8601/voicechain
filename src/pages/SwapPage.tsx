import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { ArrowLeft, ArrowUpDown, TrendingUp } from 'lucide-react';
import { useTranslation } from 'react-i18next';

interface SwapPageProps {
  onBack: () => void;
}

export const SwapPage: React.FC<SwapPageProps> = ({ onBack }) => {
  const { t } = useTranslation();
  const [fromToken, setFromToken] = useState('ICP');
  const [toToken, setToToken] = useState('ckBTC');
  const [fromAmount, setFromAmount] = useState('');
  const [toAmount, setToAmount] = useState('');

  const tokens = [
    { symbol: 'ICP', name: 'Internet Computer', balance: 245.67, price: 12.45 },
    { symbol: 'ckBTC', name: 'Chain Key Bitcoin', balance: 0.0847, price: 43250.30 },
    { symbol: 'ckETH', name: 'Chain Key Ethereum', balance: 1.234, price: 2650.75 },
    { symbol: 'USDT', name: 'Tether USD', balance: 1500.00, price: 1.00 },
    { symbol: 'USDC', name: 'USD Coin', balance: 500.00, price: 1.00 }
  ];

  const fromTokenData = tokens.find(t => t.symbol === fromToken);
  const toTokenData = tokens.find(t => t.symbol === toToken);

  const handleSwapTokens = () => {
    setFromToken(toToken);
    setToToken(fromToken);
    setFromAmount(toAmount);
    setToAmount(fromAmount);
  };

  const calculateSwap = (amount: string, isFromAmount: boolean) => {
    if (!amount || !fromTokenData || !toTokenData) return '';
    
    const numAmount = parseFloat(amount);
    if (isNaN(numAmount)) return '';

    if (isFromAmount) {
      const fromValue = numAmount * fromTokenData.price;
      const toTokenAmount = fromValue / toTokenData.price;
      return toTokenAmount.toFixed(6);
    } else {
      const toValue = numAmount * toTokenData.price;
      const fromTokenAmount = toValue / fromTokenData.price;
      return fromTokenAmount.toFixed(6);
    }
  };

  const handleFromAmountChange = (value: string) => {
    setFromAmount(value);
    setToAmount(calculateSwap(value, true));
  };

  const handleToAmountChange = (value: string) => {
    setToAmount(value);
    setFromAmount(calculateSwap(value, false));
  };

  const exchangeRate = fromTokenData && toTokenData 
    ? (fromTokenData.price / toTokenData.price).toFixed(6)
    : '0';

  return (
    <div className="min-h-screen bg-gray-50 p-4">
      <div className="max-w-md mx-auto">
        {/* Header */}
        <div className="flex items-center space-x-4 mb-6">
          <button
            onClick={onBack}
            className="p-2 hover:bg-gray-100 rounded-full transition-colors"
          >
            <ArrowLeft className="h-6 w-6 text-gray-600" />
          </button>
          <h1 className="text-2xl font-bold text-gray-900">{t('swapTokens')}</h1>
        </div>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="space-y-6"
        >
          {/* Swap Interface */}
          <div className="bg-white rounded-2xl shadow-lg p-6">
            {/* From Token */}
            <div className="space-y-4">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">From</label>
                <div className="bg-gray-50 rounded-xl p-4">
                  <div className="flex items-center justify-between mb-3">
                    <select
                      value={fromToken}
                      onChange={(e) => setFromToken(e.target.value)}
                      className="bg-transparent text-lg font-semibold text-gray-900 focus:outline-none"
                    >
                      {tokens.map((token) => (
                        <option key={token.symbol} value={token.symbol}>
                          {token.symbol}
                        </option>
                      ))}
                    </select>
                    <input
                      type="number"
                      value={fromAmount}
                      onChange={(e) => handleFromAmountChange(e.target.value)}
                      placeholder="0.0"
                      className="bg-transparent text-right text-lg font-semibold text-gray-900 focus:outline-none w-32"
                    />
                  </div>
                  <div className="flex items-center justify-between text-sm text-gray-500">
                    <span>{fromTokenData?.name}</span>
                    <div className="text-right">
                      <p>Balance: {fromTokenData?.balance.toFixed(4)}</p>
                      <p>${fromTokenData?.price.toFixed(2)}</p>
                    </div>
                  </div>
                </div>
              </div>

              {/* Swap Button */}
              <div className="flex justify-center">
                <button
                  onClick={handleSwapTokens}
                  className="p-3 bg-blue-100 hover:bg-blue-200 rounded-full transition-colors"
                >
                  <ArrowUpDown className="h-5 w-5 text-blue-600" />
                </button>
              </div>

              {/* To Token */}
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">To</label>
                <div className="bg-gray-50 rounded-xl p-4">
                  <div className="flex items-center justify-between mb-3">
                    <select
                      value={toToken}
                      onChange={(e) => setToToken(e.target.value)}
                      className="bg-transparent text-lg font-semibold text-gray-900 focus:outline-none"
                    >
                      {tokens.filter(t => t.symbol !== fromToken).map((token) => (
                        <option key={token.symbol} value={token.symbol}>
                          {token.symbol}
                        </option>
                      ))}
                    </select>
                    <input
                      type="number"
                      value={toAmount}
                      onChange={(e) => handleToAmountChange(e.target.value)}
                      placeholder="0.0"
                      className="bg-transparent text-right text-lg font-semibold text-gray-900 focus:outline-none w-32"
                    />
                  </div>
                  <div className="flex items-center justify-between text-sm text-gray-500">
                    <span>{toTokenData?.name}</span>
                    <div className="text-right">
                      <p>Balance: {toTokenData?.balance.toFixed(4)}</p>
                      <p>${toTokenData?.price.toFixed(2)}</p>
                    </div>
                  </div>
                </div>
              </div>
            </div>

            {/* Exchange Rate */}
            {fromAmount && toAmount && (
              <div className="mt-4 p-3 bg-blue-50 rounded-xl">
                <div className="flex items-center justify-between text-sm">
                  <span className="text-blue-600">Exchange Rate</span>
                  <span className="font-medium text-blue-800">
                    1 {fromToken} = {exchangeRate} {toToken}
                  </span>
                </div>
              </div>
            )}

            {/* Swap Button */}
            <button
              disabled={!fromAmount || !toAmount}
              className="w-full mt-6 bg-blue-500 text-white py-3 px-6 rounded-xl font-semibold hover:bg-blue-600 disabled:opacity-50 disabled:cursor-not-allowed transition-colors"
            >
              {t('swap')} {fromToken} for {toToken}
            </button>
          </div>

          {/* Market Info */}
          <div className="bg-white rounded-2xl shadow-lg p-6">
            <h2 className="text-lg font-semibold text-gray-900 mb-4">Market Information</h2>
            <div className="space-y-3">
              <div className="flex items-center justify-between">
                <span className="text-gray-600">Slippage Tolerance</span>
                <span className="font-medium text-gray-900">0.5%</span>
              </div>
              <div className="flex items-center justify-between">
                <span className="text-gray-600">Network Fee</span>
                <span className="font-medium text-gray-900">0.0001 ICP</span>
              </div>
              <div className="flex items-center justify-between">
                <span className="text-gray-600">Minimum Received</span>
                <span className="font-medium text-gray-900">
                  {toAmount ? (parseFloat(toAmount) * 0.995).toFixed(6) : '0'} {toToken}
                </span>
              </div>
            </div>
          </div>

          {/* Live Chart Placeholder */}
          <div className="bg-white rounded-2xl shadow-lg p-6">
            <div className="flex items-center justify-between mb-4">
              <h2 className="text-lg font-semibold text-gray-900">{fromToken}/{toToken} Chart</h2>
              <TrendingUp className="h-5 w-5 text-green-500" />
            </div>
            <div className="h-48 bg-gray-100 rounded-xl flex items-center justify-center">
              <div className="text-center text-gray-500">
                <TrendingUp className="h-12 w-12 mx-auto mb-2" />
                <p>Live trading chart</p>
                <p className="text-sm">TradingView integration</p>
              </div>
            </div>
          </div>
        </motion.div>
      </div>
    </div>
  );
};