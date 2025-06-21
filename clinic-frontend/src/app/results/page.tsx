'use client';

import { motion } from 'framer-motion';
import { useState, useEffect } from 'react';
import { 
  PhotoIcon,
  EyeIcon,
  FunnelIcon,
  MagnifyingGlassIcon
} from '@heroicons/react/24/outline';
import Image from 'next/image';

interface Result {
  id: string;
  title: string;
  description?: string;
  beforeImage: string;
  afterImage: string;
  procedure: string;
  createdAt: string;
  user: {
    firstName: string;
    lastName: string;
  };
}

export default function ResultsPage() {
  const [results, setResults] = useState<Result[]>([]);
  const [loading, setLoading] = useState(true);
  const [selectedProcedure, setSelectedProcedure] = useState('all');
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedResult, setSelectedResult] = useState<Result | null>(null);

  const procedures = [
    { value: 'all', label: 'جميع العمليات' },
    { value: 'hair_transplant', label: 'زراعة الشعر' },
    { value: 'beard_transplant', label: 'زراعة اللحية' },
    { value: 'eyebrow_transplant', label: 'زراعة الحواجب' },
    { value: 'hair_treatment', label: 'علاج تساقط الشعر' },
  ];

  useEffect(() => {
    fetchResults();
  }, [selectedProcedure]);

  const fetchResults = async () => {
    try {
      const url = selectedProcedure === 'all' 
        ? 'http://localhost:3001/api/results/public'
        : `http://localhost:3001/api/results/procedure/${selectedProcedure}`;
      
      const response = await fetch(url);
      
      if (response.ok) {
        const data = await response.json();
        setResults(data);
      }
    } catch (error) {
      console.error('Error fetching results:', error);
    } finally {
      setLoading(false);
    }
  };

  const filteredResults = results.filter(result =>
    result.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
    result.procedure.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const formatDate = (dateString: string) => {
    return new Date(dateString).toLocaleDateString('ar-SA', {
      year: 'numeric',
      month: 'long',
      day: 'numeric',
    });
  };

  if (loading) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center">
        <div className="text-center">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600 mx-auto"></div>
          <p className="mt-4 text-gray-600">جاري تحميل النتائج...</p>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header */}
      <div className="bg-white shadow-sm border-b border-gray-200">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="py-6">
            <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between">
              <div className="mb-4 sm:mb-0">
                <h1 className="text-2xl font-bold text-gray-900">معرض النتائج</h1>
                <p className="text-sm text-gray-500">اكتشف نتائج عملياتنا الناجحة</p>
              </div>
              
              {/* Search and Filter */}
              <div className="flex flex-col sm:flex-row space-y-2 sm:space-y-0 sm:space-x-4 sm:space-x-reverse">
                <div className="relative">
                  <MagnifyingGlassIcon className="absolute left-3 top-1/2 transform -translate-y-1/2 h-5 w-5 text-gray-400" />
                  <input
                    type="text"
                    placeholder="البحث في النتائج..."
                    value={searchTerm}
                    onChange={(e) => setSearchTerm(e.target.value)}
                    className="pl-10 pr-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                  />
                </div>
                
                <div className="relative">
                  <FunnelIcon className="absolute left-3 top-1/2 transform -translate-y-1/2 h-5 w-5 text-gray-400" />
                  <select
                    value={selectedProcedure}
                    onChange={(e) => setSelectedProcedure(e.target.value)}
                    className="pl-10 pr-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent appearance-none bg-white"
                  >
                    {procedures.map((procedure) => (
                      <option key={procedure.value} value={procedure.value}>
                        {procedure.label}
                      </option>
                    ))}
                  </select>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Results Grid */}
      <div className="max-w-7xl mx-auto py-6 sm:px-6 lg:px-8">
        <div className="px-4 py-6 sm:px-0">
          {filteredResults.length === 0 ? (
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              className="text-center py-12"
            >
              <PhotoIcon className="mx-auto h-12 w-12 text-gray-400" />
              <h3 className="mt-2 text-sm font-medium text-gray-900">لا توجد نتائج</h3>
              <p className="mt-1 text-sm text-gray-500">لم يتم العثور على نتائج تطابق البحث</p>
            </motion.div>
          ) : (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {filteredResults.map((result, index) => (
                <motion.div
                  key={result.id}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: index * 0.1 }}
                  className="bg-white rounded-lg shadow-md overflow-hidden hover:shadow-lg transition-shadow cursor-pointer"
                  onClick={() => setSelectedResult(result)}
                >
                  <div className="relative">
                    {/* Before/After Images */}
                    <div className="grid grid-cols-2">
                      <div className="relative h-48">
                        <Image
                          src={result.beforeImage}
                          alt="قبل العملية"
                          fill
                          className="object-cover"
                        />
                        <div className="absolute top-2 left-2 bg-red-500 text-white text-xs px-2 py-1 rounded">
                          قبل
                        </div>
                      </div>
                      <div className="relative h-48">
                        <Image
                          src={result.afterImage}
                          alt="بعد العملية"
                          fill
                          className="object-cover"
                        />
                        <div className="absolute top-2 right-2 bg-green-500 text-white text-xs px-2 py-1 rounded">
                          بعد
                        </div>
                      </div>
                    </div>
                    
                    {/* View Button */}
                    <div className="absolute inset-0 bg-black bg-opacity-0 hover:bg-opacity-30 transition-all duration-300 flex items-center justify-center">
                      <div className="opacity-0 hover:opacity-100 transition-opacity">
                        <div className="bg-white rounded-full p-3">
                          <EyeIcon className="h-6 w-6 text-gray-700" />
                        </div>
                      </div>
                    </div>
                  </div>
                  
                  <div className="p-4">
                    <h3 className="text-lg font-semibold text-gray-900 mb-2">
                      {result.title}
                    </h3>
                    
                    {result.description && (
                      <p className="text-sm text-gray-600 mb-3 line-clamp-2">
                        {result.description}
                      </p>
                    )}
                    
                    <div className="flex items-center justify-between text-sm text-gray-500">
                      <span>{procedures.find(p => p.value === result.procedure)?.label || result.procedure}</span>
                      <span>{formatDate(result.createdAt)}</span>
                    </div>
                  </div>
                </motion.div>
              ))}
            </div>
          )}
        </div>
      </div>

      {/* Result Modal */}
      {selectedResult && (
        <ResultModal
          result={selectedResult}
          onClose={() => setSelectedResult(null)}
        />
      )}
    </div>
  );
}

// Result Modal Component
function ResultModal({ result, onClose }: { result: Result; onClose: () => void }) {
  const [showBefore, setShowBefore] = useState(true);

  return (
    <div className="fixed inset-0 bg-black bg-opacity-75 flex items-center justify-center z-50 p-4">
      <div className="bg-white rounded-lg max-w-4xl w-full max-h-[90vh] overflow-y-auto">
        <div className="p-6">
          <div className="flex justify-between items-start mb-6">
            <div>
              <h2 className="text-2xl font-bold text-gray-900">{result.title}</h2>
              <p className="text-gray-600 mt-1">{result.description}</p>
            </div>
            <button
              onClick={onClose}
              className="text-gray-400 hover:text-gray-600 text-2xl"
            >
              ×
            </button>
          </div>

          {/* Image Comparison */}
          <div className="mb-6">
            <div className="flex justify-center mb-4">
              <div className="bg-gray-100 rounded-lg p-1 flex">
                <button
                  onClick={() => setShowBefore(true)}
                  className={`px-4 py-2 rounded-md text-sm font-medium transition-colors ${
                    showBefore
                      ? 'bg-white text-gray-900 shadow-sm'
                      : 'text-gray-600 hover:text-gray-900'
                  }`}
                >
                  قبل العملية
                </button>
                <button
                  onClick={() => setShowBefore(false)}
                  className={`px-4 py-2 rounded-md text-sm font-medium transition-colors ${
                    !showBefore
                      ? 'bg-white text-gray-900 shadow-sm'
                      : 'text-gray-600 hover:text-gray-900'
                  }`}
                >
                  بعد العملية
                </button>
              </div>
            </div>

            <div className="relative h-96 rounded-lg overflow-hidden">
              <Image
                src={showBefore ? result.beforeImage : result.afterImage}
                alt={showBefore ? 'قبل العملية' : 'بعد العملية'}
                fill
                className="object-cover"
              />
            </div>
          </div>

          {/* Details */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div>
              <h3 className="text-lg font-semibold text-gray-900 mb-3">تفاصيل العملية</h3>
              <div className="space-y-2">
                <div className="flex justify-between">
                  <span className="text-gray-600">نوع العملية:</span>
                  <span className="font-medium">{result.procedure}</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-gray-600">تاريخ العملية:</span>
                  <span className="font-medium">{new Date(result.createdAt).toLocaleDateString('ar-SA')}</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-gray-600">المريض:</span>
                  <span className="font-medium">{result.user.firstName} {result.user.lastName}</span>
                </div>
              </div>
            </div>

            <div>
              <h3 className="text-lg font-semibold text-gray-900 mb-3">ملاحظات</h3>
              <p className="text-gray-600">
                {result.description || 'لا توجد ملاحظات إضافية'}
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

