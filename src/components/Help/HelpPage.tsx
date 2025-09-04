import React from 'react';
import { motion } from 'framer-motion';
import { HelpCircle, BarChart3, Brain, Shield, Zap } from 'lucide-react';
import Accordion from './Accordion';

const faqData = [
  {
    question: 'What is the purpose of the Personal Bias Tracker?',
    answer: 'This application is designed to help you become more aware of your unconscious cognitive biases. It automatically collects signals about your digital behavior (like news reading and online shopping) and provides data-driven feedback to help you recognize and reflect on these patterns.'
  },
  {
    question: 'How does the automatic tracking work?',
    answer: 'The app simulates a background service that collects signals about your activities. In a real-world scenario, this might involve a browser extension. You can trigger this process using the "Sync New Activity" button to see new data appear in your Activity Log.'
  },
  {
    question: 'What is the Activity Log?',
    answer: 'The Activity Log is the central feed where you can see all the signals the app has collected about your behavior, presented in a unified timeline. This is the raw data that powers all the analytics and insights throughout the app.'
  },
  {
    question: 'Is my data private and secure?',
    answer: 'Yes. Your privacy is our top priority. All your data is stored securely in your own database instance, protected by Row Level Security. This means only you can access your personal data. We do not sell or share your data.'
  },
  {
    question: 'How can I use the Analytics page?',
    answer: 'The Analytics page provides deeper insights into your long-term trends based on the automatically collected data. You can see how your biases correlate, identify your most dominant biases, and discover your peak activity times.'
  },
  {
    question: 'What are Challenges for?',
    answer: 'Challenges are a gamified way to actively work on your bias awareness. By completing daily, weekly, or monthly challenges, you can build healthier cognitive habits and earn experience points.'
  }
];

const HelpPage: React.FC = () => {
  return (
    <div className="space-y-8">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        className="text-center"
      >
        <div className="inline-block p-4 bg-primary-100 dark:bg-primary-900/50 rounded-2xl mb-4">
          <HelpCircle className="w-10 h-10 text-primary-600 dark:text-primary-400" />
        </div>
        <h2 className="text-3xl font-bold text-gray-900 dark:text-white mb-2">Help & Support</h2>
        <p className="text-lg text-gray-600 dark:text-gray-300">
          Find answers to common questions and learn how to get the most out of your Bias Tracker.
        </p>
      </motion.div>

      <div className="max-w-3xl mx-auto">
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.2 }}
          className="bg-white dark:bg-gray-800 rounded-xl shadow-sm border border-gray-200 dark:border-gray-700 divide-y divide-gray-200 dark:divide-gray-700"
        >
          {faqData.map((faq, index) => (
            <Accordion key={index} title={faq.question}>
              {faq.answer}
            </Accordion>
          ))}
        </motion.div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-6 max-w-5xl mx-auto text-center">
        <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.4 }} className="bg-white dark:bg-gray-800 p-6 rounded-lg border border-gray-200 dark:border-gray-700">
          <Zap className="w-8 h-8 mx-auto text-primary-500 mb-3" />
          <h3 className="font-semibold text-gray-900 dark:text-white">Automated Tracking</h3>
          <p className="text-sm text-gray-600 dark:text-gray-400 mt-1">Let the app work in the background to gather insights for you.</p>
        </motion.div>
        <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.5 }} className="bg-white dark:bg-gray-800 p-6 rounded-lg border border-gray-200 dark:border-gray-700">
          <BarChart3 className="w-8 h-8 mx-auto text-accent-500 mb-3" />
          <h3 className="font-semibold text-gray-900 dark:text-white">Analyze Your Data</h3>
          <p className="text-sm text-gray-600 dark:text-gray-400 mt-1">Use our powerful analytics tools to find patterns in your behavior.</p>
        </motion.div>
        <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.6 }} className="bg-white dark:bg-gray-800 p-6 rounded-lg border border-gray-200 dark:border-gray-700">
          <Shield className="w-8 h-8 mx-auto text-secondary-500 mb-3" />
          <h3 className="font-semibold text-gray-900 dark:text-white">Contact Support</h3>
          <p className="text-sm text-gray-600 dark:text-gray-400 mt-1">Still have questions? Reach out to our support team for help.</p>
        </motion.div>
      </div>
    </div>
  );
};

export default HelpPage;
