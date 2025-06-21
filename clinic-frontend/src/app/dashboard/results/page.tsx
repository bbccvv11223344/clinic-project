'use client';

import { motion } from 'framer-motion';
import { useState, useEffect } from 'react';
import { useAuth } from '@/contexts/AuthContext';
import { 
  PlusIcon, 
  PhotoIcon,
  EyeIcon,
  PencilIcon,
  TrashIcon,
  EyeSlashIcon
} from '@heroicons/react/24/outline';
import Image from 'next/image';

interface Result {
  id: string;
  title: string;
  description?: string;
  beforeImage: string;
  afterImage: string;
  procedure: string;
  isPublic: boolean;
  createdAt: string;
  user: {
    id: string;
    firstName: string;
    lastName: string;
  };
}

export default function DashboardResultsPage() {
  const { user, token } = useAuth();
  const [results, setResults] = useState<Result[]>([]);
  const [loading, setLoading] = useState(true);
  const [showNewResult, setShowNewResult] = useState(false);
  const [selectedResult, setSelectedResult] = useState<Result | null>(null);

  useEffect(() => {
    if (token) {
      fetchResults();
    }
  }, [token]);

  const fetchResults = async () => {
    try {
      const endpoint = user?.role === 'PATIENT' ? 'my' : 'all';
      const response = await fetch(`http://localhost:3001/api/results/${endpoint}`, {
        headers: {
          'Authorization': `Bearer ${token}`,
        },
      });

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

  const deleteResult = async (id: string) => {
    if (!confirm('هل أنت متأكد من حذف هذه النتيجة؟')) return;

    try {
      const response = await fetch(`http://localhost:3001/api/results/${id}`, {
        method: 'DELETE',
        headers: {
          'Authorization': `Bearer ${token}`,
        },
      });

      if (response.ok) {
        setResults(results.filter(r => r.id !== id));
      }
    } catch (error) {
      console.error('Error deleting result:', error);
    }
  };

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
          <div className="flex justify-between items-center py-6">
            <div>
              <h1 className="text-2xl font-bold text-gray-900">إدارة النتائج</h1>
              <p className="text-sm text-gray-500">عرض وإدارة نتائج العمليات</p>
            </div>
            {(user?.role === 'DOCTOR' || user?.role === 'ADMIN') && (
              <motion.button
                whileHover={{ scale: 1.02 }}
                whileTap={{ scale: 0.98 }}
                onClick={() => setShowNewResult(true)}
                className="bg-blue-600 hover:bg-blue-700 text-white px-4 py-2 rounded-lg flex items-center space-x-2 space-x-reverse"
              >
                <PlusIcon className="h-5 w-5" />
                <span>إضافة نتيجة جديدة</span>
              </motion.button>
            )}
          </div>
        </div>
      </div>

      {/* Results Grid */}
      <div className="max-w-7xl mx-auto py-6 sm:px-6 lg:px-8">
        <div className="px-4 py-6 sm:px-0">
          {results.length === 0 ? (
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              className="text-center py-12"
            >
              <PhotoIcon className="mx-auto h-12 w-12 text-gray-400" />
              <h3 className="mt-2 text-sm font-medium text-gray-900">لا توجد نتائج</h3>
              <p className="mt-1 text-sm text-gray-500">ابدأ بإضافة نتائج العمليات</p>
              {(user?.role === 'DOCTOR' || user?.role === 'ADMIN') && (
                <div className="mt-6">
                  <button
                    onClick={() => setShowNewResult(true)}
                    className="inline-flex items-center px-4 py-2 border border-transparent shadow-sm text-sm font-medium rounded-md text-white bg-blue-600 hover:bg-blue-700"
                  >
                    <PlusIcon className="ml-2 h-5 w-5" />
                    إضافة نتيجة جديدة
                  </button>
                </div>
              )}
            </motion.div>
          ) : (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {results.map((result, index) => (
                <motion.div
                  key={result.id}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: index * 0.1 }}
                  className="bg-white rounded-lg shadow-md overflow-hidden hover:shadow-lg transition-shadow"
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
                    
                    {/* Privacy Indicator */}
                    <div className="absolute top-2 left-1/2 transform -translate-x-1/2">
                      {result.isPublic ? (
                        <div className="bg-green-500 text-white text-xs px-2 py-1 rounded flex items-center space-x-1 space-x-reverse">
                          <EyeIcon className="h-3 w-3" />
                          <span>عام</span>
                        </div>
                      ) : (
                        <div className="bg-gray-500 text-white text-xs px-2 py-1 rounded flex items-center space-x-1 space-x-reverse">
                          <EyeSlashIcon className="h-3 w-3" />
                          <span>خاص</span>
                        </div>
                      )}
                    </div>
                  </div>
                  
                  <div className="p-4">
                    <div className="flex justify-between items-start mb-2">
                      <h3 className="text-lg font-semibold text-gray-900">
                        {result.title}
                      </h3>
                      
                      {/* Action Buttons */}
                      <div className="flex space-x-2 space-x-reverse">
                        <button
                          onClick={() => setSelectedResult(result)}
                          className="text-blue-600 hover:text-blue-800"
                        >
                          <EyeIcon className="h-4 w-4" />
                        </button>
                        {(user?.role === 'DOCTOR' || user?.role === 'ADMIN' || result.user.id === user?.id) && (
                          <>
                            <button className="text-green-600 hover:text-green-800">
                              <PencilIcon className="h-4 w-4" />
                            </button>
                            <button
                              onClick={() => deleteResult(result.id)}
                              className="text-red-600 hover:text-red-800"
                            >
                              <TrashIcon className="h-4 w-4" />
                            </button>
                          </>
                        )}
                      </div>
                    </div>
                    
                    {result.description && (
                      <p className="text-sm text-gray-600 mb-3 line-clamp-2">
                        {result.description}
                      </p>
                    )}
                    
                    <div className="flex items-center justify-between text-sm text-gray-500">
                      <span>{result.procedure}</span>
                      <span>{formatDate(result.createdAt)}</span>
                    </div>
                    
                    {user?.role !== 'PATIENT' && (
                      <div className="mt-2 text-sm text-gray-600">
                        المريض: {result.user.firstName} {result.user.lastName}
                      </div>
                    )}
                  </div>
                </motion.div>
              ))}
            </div>
          )}
        </div>
      </div>

      {/* New Result Modal */}
      {showNewResult && (
        <NewResultModal
          onClose={() => setShowNewResult(false)}
          onSuccess={() => {
            setShowNewResult(false);
            fetchResults();
          }}
        />
      )}

      {/* Result Detail Modal */}
      {selectedResult && (
        <ResultDetailModal
          result={selectedResult}
          onClose={() => setSelectedResult(null)}
        />
      )}
    </div>
  );
}

// New Result Modal Component
function NewResultModal({ onClose, onSuccess }: { onClose: () => void; onSuccess: () => void }) {
  const { token } = useAuth();
  const [formData, setFormData] = useState({
    title: '',
    description: '',
    beforeImage: '',
    afterImage: '',
    procedure: '',
    isPublic: false,
  });
  const [loading, setLoading] = useState(false);

  const procedures = [
    { value: 'hair_transplant', label: 'زراعة الشعر' },
    { value: 'beard_transplant', label: 'زراعة اللحية' },
    { value: 'eyebrow_transplant', label: 'زراعة الحواجب' },
    { value: 'hair_treatment', label: 'علاج تساقط الشعر' },
  ];

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);

    try {
      const response = await fetch('http://localhost:3001/api/results', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${token}`,
        },
        body: JSON.stringify(formData),
      });

      if (response.ok) {
        onSuccess();
      }
    } catch (error) {
      console.error('Error creating result:', error);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="fixed inset-0 bg-gray-600 bg-opacity-50 overflow-y-auto h-full w-full z-50">
      <div className="relative top-20 mx-auto p-5 border w-96 shadow-lg rounded-md bg-white">
        <div className="mt-3">
          <h3 className="text-lg font-medium text-gray-900 mb-4">إضافة نتيجة جديدة</h3>
          
          <form onSubmit={handleSubmit} className="space-y-4">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                عنوان النتيجة
              </label>
              <input
                type="text"
                value={formData.title}
                onChange={(e) => setFormData({ ...formData, title: e.target.value })}
                className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-blue-500 focus:border-blue-500"
                placeholder="أدخل عنوان النتيجة"
                required
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                نوع العملية
              </label>
              <select
                value={formData.procedure}
                onChange={(e) => setFormData({ ...formData, procedure: e.target.value })}
                className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-blue-500 focus:border-blue-500"
                required
              >
                <option value="">اختر نوع العملية</option>
                {procedures.map((procedure) => (
                  <option key={procedure.value} value={procedure.value}>
                    {procedure.label}
                  </option>
                ))}
              </select>
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                صورة قبل العملية (URL)
              </label>
              <input
                type="url"
                value={formData.beforeImage}
                onChange={(e) => setFormData({ ...formData, beforeImage: e.target.value })}
                className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-blue-500 focus:border-blue-500"
                placeholder="https://example.com/before.jpg"
                required
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                صورة بعد العملية (URL)
              </label>
              <input
                type="url"
                value={formData.afterImage}
                onChange={(e) => setFormData({ ...formData, afterImage: e.target.value })}
                className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-blue-500 focus:border-blue-500"
                placeholder="https://example.com/after.jpg"
                required
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                وصف النتيجة
              </label>
              <textarea
                value={formData.description}
                onChange={(e) => setFormData({ ...formData, description: e.target.value })}
                rows={3}
                className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-blue-500 focus:border-blue-500"
                placeholder="اشرح تفاصيل النتيجة"
              />
            </div>

            <div className="flex items-center">
              <input
                type="checkbox"
                id="isPublic"
                checked={formData.isPublic}
                onChange={(e) => setFormData({ ...formData, isPublic: e.target.checked })}
                className="h-4 w-4 text-blue-600 focus:ring-blue-500 border-gray-300 rounded"
              />
              <label htmlFor="isPublic" className="mr-2 block text-sm text-gray-900">
                عرض في المعرض العام
              </label>
            </div>

            <div className="flex justify-end space-x-3 space-x-reverse pt-4">
              <button
                type="button"
                onClick={onClose}
                className="px-4 py-2 text-sm font-medium text-gray-700 bg-gray-100 hover:bg-gray-200 rounded-md"
              >
                إلغاء
              </button>
              <button
                type="submit"
                disabled={loading}
                className="px-4 py-2 text-sm font-medium text-white bg-blue-600 hover:bg-blue-700 rounded-md disabled:opacity-50"
              >
                {loading ? 'جاري الحفظ...' : 'حفظ النتيجة'}
              </button>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
}

// Result Detail Modal Component
function ResultDetailModal({ result, onClose }: { result: Result; onClose: () => void }) {
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
                  <span className="text-gray-600">تاريخ الإضافة:</span>
                  <span className="font-medium">{new Date(result.createdAt).toLocaleDateString('ar-SA')}</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-gray-600">المريض:</span>
                  <span className="font-medium">{result.user.firstName} {result.user.lastName}</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-gray-600">الخصوصية:</span>
                  <span className="font-medium">{result.isPublic ? 'عام' : 'خاص'}</span>
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

