import React from 'react';
import { motion } from 'framer-motion';
import { ShoppingBag, AlertTriangle, Clock } from 'lucide-react';
import { ShoppingPattern } from '../../types';
import { format } from 'date-fns';

interface PurchasesListProps {
  patterns: ShoppingPattern[];
}

const PurchasesList: React.FC<PurchasesListProps> = ({ patterns }) => {
  const sortedPatterns = patterns
    .sort((a, b) => b.date.getTime() - a.date.getTime())
    .slice(0, 10);

  const getBiasColor = (biasType: string) => {
    const colors: Record<string, string> = {
      'Impulse': 'bg-red-100 text-red-700',
      'Social Proof': 'bg-blue-100 text-blue-700',
      'Scarcity': 'bg-orange-100 text-orange-700',
      'Authority': 'bg-purple-100 text-purple-700',
      'Anchoring': 'bg-green-100 text-green-700',
      'Loss Aversion': 'bg-yellow-100 text-yellow-700',
      'Bandwagon': 'bg-pink-100 text-pink-700'
    };
    return colors[biasType] || 'bg-gray-100 text-gray-700';
  };

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ delay: 0.5 }}
      className="bg-white rounded-xl shadow-sm border border-gray-200"
    >
      <div className="p-6 border-b border-gray-200">
        <h3 className="text-lg font-semibold text-gray-900">Recent Purchases</h3>
        <p className="text-sm text-gray-600 mt-1">
          Latest {sortedPatterns.length} purchases with bias analysis
        </p>
      </div>

      <div className="divide-y divide-gray-200">
        {sortedPatterns.map((pattern, index) => (
          <motion.div
            key={pattern.id}
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: index * 0.05 }}
            className="p-6 hover:bg-gray-50 transition-colors"
          >
            <div className="flex items-start justify-between">
              <div className="flex items-start space-x-4">
                <div className={`p-2 rounded-lg ${pattern.impulse ? 'bg-warning-100' : 'bg-primary-100'}`}>
                  {pattern.impulse ? (
                    <AlertTriangle className={`w-5 h-5 ${pattern.impulse ? 'text-warning-600' : 'text-primary-600'}`} />
                  ) : (
                    <ShoppingBag className="w-5 h-5 text-primary-600" />
                  )}
                </div>
                
                <div className="flex-1">
                  <div className="flex items-center space-x-2 mb-1">
                    <h4 className="font-medium text-gray-900">{pattern.category}</h4>
                    <span className={`px-2 py-1 rounded-full text-xs font-medium ${getBiasColor(pattern.biasType)}`}>
                      {pattern.biasType}
                    </span>
                    {pattern.impulse && (
                      <span className="px-2 py-1 rounded-full text-xs font-medium bg-red-100 text-red-700">
                        Impulse
                      </span>
                    )}
                  </div>
                  
                  <div className="flex items-center space-x-4 text-sm text-gray-600">
                    <div className="flex items-center space-x-1">
                      <Clock className="w-4 h-4" />
                      <span>{format(pattern.date, 'MMM dd, yyyy')}</span>
                    </div>
                  </div>
                </div>
              </div>
              
              <div className="text-right">
                <div className="text-lg font-bold text-gray-900">
                  ${pattern.amount.toFixed(2)}
                </div>
                <div className="text-sm text-gray-600">
                  {pattern.impulse ? 'Unplanned' : 'Planned'}
                </div>
              </div>
            </div>
          </motion.div>
        ))}
      </div>
    </motion.div>
  );
};

export default PurchasesList;
