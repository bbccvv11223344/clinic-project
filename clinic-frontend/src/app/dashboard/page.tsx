'use client';

import { motion } from 'framer-motion';
import { useState } from 'react';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import { 
  UserGroupIcon, 
  CalendarIcon, 
  ChatBubbleLeftRightIcon,
  PhotoIcon,
  StarIcon,
  CogIcon
} from '@heroicons/react/24/outline';
import { useAuth } from '@/contexts/AuthContext';

export default function DashboardPage() {
  const { user, logout } = useAuth();
  const router = useRouter();

  const handleLogout = () => {
    logout();
    router.push('/');
  };

  if (!user) {
    router.push('/login');
    return null;
  }

  const dashboardItems = [
    {
      title: 'المواعيد',
      description: 'إدارة المواعيد والحجوزات',
      icon: CalendarIcon,
      href: '/dashboard/appointments',
      color: 'blue'
    },
    {
      title: 'الاستشارات',
      description: 'الاستشارات الإلكترونية المباشرة',
      icon: ChatBubbleLeftRightIcon,
      href: '/dashboard/consultations',
      color: 'green'
    },
    {
      title: 'النتائج',
      description: 'عرض وإدارة نتائج العمليات',
      icon: PhotoIcon,
      href: '/dashboard/results',
      color: 'purple'
    },
    {
      title: 'التقييمات',
      description: 'آراء وتقييمات المرضى',
      icon: StarIcon,
      href: '/dashboard/reviews',
      color: 'yellow'
    },
    {
      title: 'المستخدمين',
      description: 'إدارة المستخدمين والصلاحيات',
      icon: UserGroupIcon,
      href: '/dashboard/users',
      color: 'indigo',
      adminOnly: true
    },
    {
      title: 'الإعدادات',
      description: 'إعدادات النظام والحساب',
      icon: CogIcon,
      href: '/dashboard/settings',
      color: 'gray'
    }
  ];

  const filteredItems = dashboardItems.filter(item => 
    !item.adminOnly || user.role === 'ADMIN'
  );

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header */}
      <header className="bg-white shadow-sm border-b border-gray-200">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center py-6">
            <div className="flex items-center">
              <div className="flex-shrink-0">
                <div className="w-10 h-10 bg-gradient-primary rounded-full flex items-center justify-center">
                  <span className="text-white font-bold">م</span>
                </div>
              </div>
              <div className="mr-4">
                <h1 className="text-2xl font-bold text-gray-900">لوحة التحكم</h1>
                <p className="text-sm text-gray-500">مرحباً، {user.firstName} {user.lastName}</p>
              </div>
            </div>
            <div className="flex items-center space-x-4 space-x-reverse">
              <span className="text-sm text-gray-500">{user.role}</span>
              <button
                onClick={handleLogout}
                className="bg-red-600 hover:bg-red-700 text-white px-4 py-2 rounded-lg text-sm font-medium"
              >
                تسجيل الخروج
              </button>
            </div>
          </div>
        </div>
      </header>

      {/* Main Content */}
      <main className="max-w-7xl mx-auto py-6 sm:px-6 lg:px-8">
        <div className="px-4 py-6 sm:px-0">
          {/* Welcome Section */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="bg-white overflow-hidden shadow rounded-lg mb-8"
          >
            <div className="px-4 py-5 sm:p-6">
              <h2 className="text-lg font-medium text-gray-900 mb-2">
                مرحباً بك في لوحة التحكم
              </h2>
              <p className="text-gray-600">
                يمكنك من هنا إدارة جميع جوانب النظام والوصول إلى الميزات المختلفة
              </p>
            </div>
          </motion.div>

          {/* Dashboard Grid */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.2 }}
            className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3"
          >
            {filteredItems.map((item, index) => (
              <motion.div
                key={item.title}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.1 * index }}
                whileHover={{ scale: 1.02 }}
                className="bg-white overflow-hidden shadow rounded-lg hover:shadow-lg transition-shadow"
              >
                <Link href={item.href}>
                  <div className="p-6">
                    <div className="flex items-center">
                      <div className={`flex-shrink-0 p-3 rounded-lg bg-${item.color}-100`}>
                        <item.icon className={`h-6 w-6 text-${item.color}-600`} />
                      </div>
                      <div className="mr-4 flex-1">
                        <h3 className="text-lg font-medium text-gray-900">
                          {item.title}
                        </h3>
                        <p className="text-sm text-gray-500 mt-1">
                          {item.description}
                        </p>
                      </div>
                    </div>
                  </div>
                </Link>
              </motion.div>
            ))}
          </motion.div>

          {/* Quick Stats */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.4 }}
            className="mt-8"
          >
            <h3 className="text-lg font-medium text-gray-900 mb-4">إحصائيات سريعة</h3>
            <div className="grid grid-cols-1 gap-5 sm:grid-cols-2 lg:grid-cols-4">
              <div className="bg-white overflow-hidden shadow rounded-lg">
                <div className="p-5">
                  <div className="flex items-center">
                    <div className="flex-shrink-0">
                      <CalendarIcon className="h-6 w-6 text-gray-400" />
                    </div>
                    <div className="mr-3 w-0 flex-1">
                      <dl>
                        <dt className="text-sm font-medium text-gray-500 truncate">
                          المواعيد اليوم
                        </dt>
                        <dd className="text-lg font-medium text-gray-900">12</dd>
                      </dl>
                    </div>
                  </div>
                </div>
              </div>

              <div className="bg-white overflow-hidden shadow rounded-lg">
                <div className="p-5">
                  <div className="flex items-center">
                    <div className="flex-shrink-0">
                      <ChatBubbleLeftRightIcon className="h-6 w-6 text-gray-400" />
                    </div>
                    <div className="mr-3 w-0 flex-1">
                      <dl>
                        <dt className="text-sm font-medium text-gray-500 truncate">
                          الاستشارات النشطة
                        </dt>
                        <dd className="text-lg font-medium text-gray-900">8</dd>
                      </dl>
                    </div>
                  </div>
                </div>
              </div>

              <div className="bg-white overflow-hidden shadow rounded-lg">
                <div className="p-5">
                  <div className="flex items-center">
                    <div className="flex-shrink-0">
                      <UserGroupIcon className="h-6 w-6 text-gray-400" />
                    </div>
                    <div className="mr-3 w-0 flex-1">
                      <dl>
                        <dt className="text-sm font-medium text-gray-500 truncate">
                          المرضى الجدد
                        </dt>
                        <dd className="text-lg font-medium text-gray-900">24</dd>
                      </dl>
                    </div>
                  </div>
                </div>
              </div>

              <div className="bg-white overflow-hidden shadow rounded-lg">
                <div className="p-5">
                  <div className="flex items-center">
                    <div className="flex-shrink-0">
                      <StarIcon className="h-6 w-6 text-gray-400" />
                    </div>
                    <div className="mr-3 w-0 flex-1">
                      <dl>
                        <dt className="text-sm font-medium text-gray-500 truncate">
                          متوسط التقييم
                        </dt>
                        <dd className="text-lg font-medium text-gray-900">4.8</dd>
                      </dl>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </motion.div>
        </div>
      </main>
    </div>
  );
}

